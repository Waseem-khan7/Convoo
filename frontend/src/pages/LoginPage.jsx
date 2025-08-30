import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../context/authContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [currState, setCurrState] = useState('Sign up');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    if (currState === 'Sign up') {
      // signup requires full details
      login('signup', { fullName, email, password, bio });
    } else {
      // login only needs email + password
      login('login', { email, password });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 bg-slate-900/70 bg-cover bg-center backdrop-blur-2xl max-sm:flex-col sm:justify-evenly">
      {/* --------Left Side-------- */}
      <img src={assets.logo_big} alt="logo" className="w-[min(30vw,250px)]" />

      {/* --------Right Side-------- */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-lg border border-slate-700 bg-slate-800/70 p-6 text-slate-100 shadow-lg backdrop-blur-md"
      >
        <h2 className="flex items-center justify-between text-2xl font-semibold text-slate-200">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === 'Sign up' && !isDataSubmitted && (
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="rounded-md border border-slate-600 bg-transparent p-2 text-slate-100 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              required
              className="rounded-md border border-slate-600 bg-transparent p-2 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="rounded-md border border-slate-600 bg-transparent p-2 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </>
        )}

        {currState === 'Sign up' && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            placeholder="Provide a short bio..."
            required
            className="rounded-md border border-slate-600 bg-transparent p-2 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
        )}

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <input
            type="checkbox"
            className="cursor-pointer accent-indigo-500"
            required
          />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <button
          type="submit"
          className="cursor-pointer rounded-md bg-indigo-600/80 py-3 font-medium text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-indigo-700"
        >
          {currState === 'Sign up' ? 'Create Account' : 'Login'}
        </button>

        <div className="flex flex-col gap-2">
          {currState === 'Sign up' ? (
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <span
                onClick={() => {
                  setCurrState('Login');
                  setIsDataSubmitted(false);
                }}
                className="cursor-pointer font-medium text-indigo-400 hover:text-indigo-300"
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              Create an account-
              <span
                onClick={() => {
                  setCurrState('Sign up');
                }}
                className="cursor-pointer font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
