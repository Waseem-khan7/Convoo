import React, { useContext, useEffect, useState } from 'react';
import assets, { imagesDummyData } from '../assets/assets';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/authContext';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  const [msgImages, setMsgImages] = useState([]);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`relative flex w-full flex-col overflow-y-scroll bg-gradient-to-b from-slate-900 to-slate-800 text-gray-100 ${selectedUser ? 'max-md:hidden' : ''}`}
      >
        {/* --------Header-------- */}
        <div className="mx-auto flex flex-col items-center gap-2 pt-10 text-xs font-light">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="Profile picture"
            className="aspect-[1/1] w-20 rounded-full border-2 border-violet-400 shadow-lg"
          />
          <h1 className="mx-auto flex items-center gap-2 px-10 text-xl font-semibold text-slate-100">
            {onlineUsers.includes(selectedUser._id) ? (
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
            ) : (
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="mx-auto px-10 text-gray-400">{selectedUser?.bio}</p>
        </div>
        <hr className="my-4 border-gray-700/60" />

        {/* --------Media Section-------- */}
        <div className="flex-1 overflow-y-auto px-5 text-xs">
          <p className="text-slate-100">Media</p>
          <div className="mt-2 grid max-h-[200px] grid-cols-2 gap-4 overflow-y-scroll opacity-80">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded-lg transition hover:scale-[1.02]"
              >
                <img
                  src={url}
                  alt="Media images"
                  className="h-full rounded-md border border-gray-700"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --------Logout Button-------- */}
        <button
          onClick={() => logout()}
          className="mx-2 my-4 cursor-pointer rounded-full border-none bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-2 text-xs font-medium text-white shadow-lg transition hover:scale-105 hover:opacity-90 sm:px-8 sm:py-2.5 sm:text-sm md:px-12 md:py-3 md:text-base lg:px-16 lg:text-lg"
        >
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
