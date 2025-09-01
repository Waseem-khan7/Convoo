import React, { useContext, useEffect, useRef, useState } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/authContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, getMessages, sendMessage } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState('');

  const scrollEnd = useRef();

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      toast.error('Text or Image required');
      return;
    }
    await sendMessage({ text: input.trim() }, selectedUser._id);
    setInput('');
  };

  // Handle sending a Image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result }, selectedUser._id);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Use useLayoutEffect instead of useEffect. useLayoutEffect runs after DOM painting, so the scroll will work immediately:
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="relative h-full overflow-scroll bg-slate-900/70 backdrop-blur-lg">
      {/* --------Header-------- */}
      <div className="mx-2 my-4 flex items-center gap-3 border-b border-slate-700 py-3">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-8 rounded-full"
        />
        <div className="flex flex-1 items-center gap-2 text-slate-100">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) ? (
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </div>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="arrow icon"
          className="max-w-7 cursor-pointer md:hidden"
        />
        <img
          src={assets.help_icon}
          alt="Help icon"
          className="max-w-4 cursor-pointer max-md:hidden"
        />
      </div>

      {/* --------Chat Area-------- */}
      <div className="flex h-[calc(100%-120px)] flex-col overflow-y-scroll p-3 pb-6">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end justify-end gap-2 ${
                msg.senderId !== authUser._id && 'flex-row-reverse'
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="mb-8 max-w-[230px] overflow-hidden rounded-lg border border-slate-600"
                />
              ) : (
                <p
                  className={`mb-8 max-w-[200px] rounded-lg bg-indigo-600/70 p-2 font-light break-all text-white md:text-sm ${
                    msg.senderId === authUser._id
                      ? 'rounded-br-none'
                      : 'rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </p>
              )}
              <div className="mb-1 text-center text-xs">
                <img
                  src={
                    msg.senderId === authUser._id
                      ? authUser?.profilePic || assets.avatar_icon
                      : selectedUser?.profilePic || assets.avatar_icon
                  }
                  alt="Avatar"
                  className="w-7 rounded-full"
                />
                <p className="text-slate-400">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="m-auto text-sm text-slate-500">
            No messages yet. Start the conversation!
          </p>
        )}
        <div ref={scrollEnd}></div>
      </div>

      {/* --------Bottom Input Area-------- */}
      <div className="absolute right-0 bottom-0 left-0 flex items-center gap-3 p-3">
        <div className="flex flex-1 items-center rounded-full border border-slate-600 bg-slate-800 px-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 rounded-lg border-none bg-transparent p-3 text-sm text-slate-100 placeholder-slate-400 outline-none"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="Gallery"
              className="mr-2 w-5 cursor-pointer opacity-80 hover:opacity-100"
            />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="Send"
          className="w-7 cursor-pointer transition hover:scale-110"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 bg-slate-800 text-slate-400 max-md:hidden">
      <img src={assets.logo_icon} alt="Logo" className="max-w-16 opacity-80" />
      <p className="text-lg font-medium text-slate-200">
        Chat anytime, anywhere
      </p>
    </div>
  );
};

export default ChatContainer;
