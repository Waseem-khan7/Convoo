import React from "react";
import assets, { userDummyData } from "../assets/assets";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* --------Header-------- */}
      <div className="flex items-center gap-3 py-3 my-4 border-b border-stone-700">
        <img
          src={assets.profile_martin}
          alt="Profile Image"
          className="w-8 rounded-full"
        />
        <p className="flex flex-1 text-white items-center gap-2">
          Martin Jhonson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7"
        />
        <img
          src={assets.help_icon}
          alt="Help icon"
          className="max-md:hidden max-w-4"
        />
      </div>
      {/* --------Chat Area-------- */}
      <div>
        
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-slate-800 max-md:hidden">
      <img src={assets.logo_icon} alt="Logo icon" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
