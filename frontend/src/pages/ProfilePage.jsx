import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState('Waseem Khan');
  const [bio, setBio] = useState('Hi Everyone, I am using Convoo');

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900/70 bg-cover bg-center backdrop-blur-2xl">
      <div className="flex w-5/6 max-w-2xl items-center justify-between rounded-lg border border-slate-700 bg-slate-800/70 text-slate-100 shadow-lg backdrop-blur-md max-sm:flex-col-reverse">
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 p-10"
        >
          <h3 className="text-lg font-semibold text-slate-200">
            Profile Details
          </h3>
          <label
            htmlFor="avatar"
            className="flex cursor-pointer items-center gap-3 text-slate-300 transition-colors duration-200 hover:text-indigo-400"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt="avatar image"
              className={`h-12 w-12 ${selectedImg && 'rounded-full'}`}
            />
            <span className="font-medium"> Upload profile image</span>
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
            required
            className="rounded-md border border-slate-600 bg-transparent p-2 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Write profile bio"
            required
            className="rounded-md border border-slate-600 bg-transparent p-2 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-indigo-600/80 py-3 font-medium text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-indigo-700"
          >
            Save
          </button>
        </form>
        <img
          src={assets.logo_icon}
          alt="Logo icon"
          className="max-10 mx-5 aspect-square max-w-44 rounded-full max-sm:mt-10"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
