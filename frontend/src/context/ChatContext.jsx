import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './authContext';
import toast from 'react-hot-toast';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { axios, socket } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  const typingTimeout = useRef(null);

  // function to get all sidebar Users

  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/messages/users');
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to get messages for the Selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to send message to the Selected User
  const sendMessage = async (messageData, receiverId) => {
    try {
      if (!selectedUser) return;

      const { data } = await axios.post(
        `/api/messages/send/${receiverId}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
        socket.emit('stopTyping', { receiverId });
        setIsTyping(false);
        clearTimeout(typingTimeout.current);
        // toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleTyping = (receiverId) => {
    if (!socket || !selectedUser) return;

    if (!isTyping) {
      socket.emit('typing', { receiverId });
      setIsTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit('stopTyping', { receiverId });
      setIsTyping(false);
    }, 1000);
  };

  // Function to Subscribe to messages for Selected User
  const subscribeToMessage = async () => {
    try {
      if (!socket) return;

      socket.on('newMessage', (newMessage) => {
        if (selectedUser && newMessage.senderId === selectedUser._id) {
          newMessage.seen = true;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          axios.put(`/api/messages/mark/${newMessage._id}`);
        } else {
          setUnseenMessages((prevUnseenMessages) => ({
            ...prevUnseenMessages,
            [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
              ? prevUnseenMessages[newMessage.senderId] + 1
              : 1,
          }));
        }
      });

      // Listen for typing events
      socket.on('typing', (senderId) => {
        if (selectedUser && senderId === selectedUser._id) {
          setIsTyping(true);
          setTypingUser(selectedUser.fullName);
        }
      });

      // Listen for stop typing events
      socket.on('stopTyping', (senderId) => {
        if (selectedUser && senderId === selectedUser._id) {
          setIsTyping(false);
          setTypingUser(null);
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to unsubscribe from Messages
  const unsubscribeFromMessages = () => {
    if (socket) {
      socket.off('newMessage');
      socket.off('typing');
      socket.off('stopTyping');
    }
  };

  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    users,
    selectedUser,
    setSelectedUser,
    messages,
    unseenMessages,
    setUnseenMessages,
    getUsers,
    getMessages,
    sendMessage,
    handleTyping,
    isTyping,
    typingUser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
