import React, { useEffect, useRef } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return selectedUser ? (
    <div className="relative h-full overflow-scroll bg-slate-900/70 backdrop-blur-lg">
      {/* --------Header-------- */}
      <div className="my-4 flex items-center gap-3 border-b border-slate-700 py-3">
        <img
          src={assets.profile_martin}
          alt="Profile"
          className="w-8 rounded-full"
        />
        <div className="flex flex-1 items-center gap-2 text-slate-100">
          Martin Jhonson
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="max-w-7 cursor-pointer md:hidden"
        />
        <img
          src={assets.help_icon}
          alt="Help"
          className="max-w-4 cursor-pointer max-md:hidden"
        />
      </div>

      {/* --------Chat Area-------- */}
      <div className="flex h-[calc(100%-120px)] flex-col overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end justify-end gap-2 ${
              msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'
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
                className={`mb-8 max-w-[200px] rounded-lg p-2 font-light break-all text-white md:text-sm ${
                  msg.senderId === '680f50e4f10f3cd28382ecf9'
                    ? 'rounded-br-none bg-indigo-600/70'
                    : 'rounded-bl-none bg-violet-600/70'
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === '680f50e4f10f3cd28382ecf9'
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt="Avatar"
                className="w-7 rounded-full"
              />
              <p className="text-slate-400">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* --------Bottom Input-------- */}
      <div className="absolute right-0 bottom-0 left-0 flex items-center gap-3 bg-slate-900/80 p-3">
        <div className="flex flex-1 items-center rounded-full border border-slate-600 bg-slate-800 px-3">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 rounded-lg border-none bg-transparent p-3 text-sm text-slate-100 placeholder-slate-400 outline-none"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="Gallery"
              className="mr-2 w-5 cursor-pointer opacity-80 hover:opacity-100"
            />
          </label>
        </div>
        <img
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
