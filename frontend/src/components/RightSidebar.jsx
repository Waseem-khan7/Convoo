import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';

const RightSidebar = ({ selectedUser }) => {
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
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            {selectedUser.fullName}
          </h1>
          <p className="mx-auto px-10 text-gray-400">{selectedUser?.bio}</p>
        </div>
        <hr className="my-4 border-gray-700/60" />

        {/* --------Media Section-------- */}
        <div className="flex-1 overflow-y-auto px-5 text-xs">
          <p className="text-slate-100">Media</p>
          <div className="mt-2 grid max-h-[200px] grid-cols-2 gap-4 overflow-y-scroll opacity-80">
            {imagesDummyData.map((url, index) => (
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
        <button className="mx-auto my-4 cursor-pointer rounded-full border-none bg-gradient-to-r from-violet-500 to-purple-600 px-20 py-2 text-sm font-medium text-white shadow-lg transition hover:scale-105 hover:opacity-90">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
