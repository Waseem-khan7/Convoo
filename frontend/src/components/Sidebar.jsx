import React, { useContext } from 'react';
import assets, { userDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div
      className={`h-full overflow-y-scroll rounded-r-xl bg-slate-900 p-5 text-slate-100 ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      <div className="pb-5">
        {/* Logo + Menu */}
        <div className="flex items-center justify-between">
          <img src={assets.logo} alt="Logo" className="max-w-40" />
          <div className="group relative py-2">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 hidden w-32 rounded-md border border-slate-700 bg-slate-800 p-5 text-slate-100 group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm hover:text-rose-500"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-slate-600" />
              <p
                onClick={() => logout()}
                className="cursor-pointer text-sm hover:text-rose-500"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5 flex items-center gap-2 rounded-full bg-slate-800 px-4 py-3">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            type="text"
            placeholder="Search User..."
            className="flex-1 border-none bg-transparent text-xs text-slate-100 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user)}
            className={`relative flex cursor-pointer items-center gap-2 rounded p-2 pl-4 transition-colors max-sm:text-sm ${
              selectedUser?._id === user._id
                ? 'bg-slate-700'
                : 'hover:bg-slate-800'
            }`}
          >
            <img
              src={user.profilePic || assets.avatar_icon}
              alt="Profile Pic"
              className="aspect-[1/1] w-[35px] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p className="text-xs">{user.fullName}</p>
              {index < 3 ? (
                <span className="text-xs text-green-400">Online</span>
              ) : (
                <span className="text-xs text-slate-500">Offline</span>
              )}
            </div>
            {index > 2 && (
              <p className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
