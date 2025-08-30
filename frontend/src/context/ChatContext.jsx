import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import toast from 'react-hot-toast';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { axios, socket } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unseenMessages, setUnseenMessages] = useState({});

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
        setMessages(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to send message to the Selected User
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send${receiverId}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to unsubscribe from Messages
  const unsubscribeFromMessages = () => {
    if (socket) socket.off('newMessage');
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
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
