import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg bg-slate-900/70">
      {/* --------Header-------- */}
      <div className="flex items-center gap-3 py-3 my-4 border-b border-slate-700">
        <img
          src={assets.profile_martin}
          alt="Profile"
          className="w-8 rounded-full"
        />
        <div className="flex flex-1 text-slate-100 items-center gap-2">
          Martin Jhonson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </div>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt="Help"
          className="max-md:hidden max-w-4 cursor-pointer"
        />
      </div>

      {/* --------Chat Area-------- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] border border-slate-600 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all text-white ${
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? "bg-indigo-600/70 rounded-br-none"
                    : "bg-violet-600/70 rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
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
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-slate-900/80">
        <div className="flex flex-1 items-center bg-slate-800 px-3 rounded-full border border-slate-600">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-slate-100 placeholder-slate-400 bg-transparent"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="Gallery"
              className="w-5 mr-2 cursor-pointer opacity-80 hover:opacity-100"
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          alt="Send"
          className="w-7 cursor-pointer hover:scale-110 transition"
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
