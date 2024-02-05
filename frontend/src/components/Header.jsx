'use client';

import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useAuth } from '../helpers/AuthContext';

const Header = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-blue-700 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Blog app</h1>
        <nav>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">{user.username || 'Profile'}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthForm(!showAuthForm)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up / Log In
            </button>
          )}
        </nav>
      </div>
      {showAuthForm && !user && <AuthForm />}
    </header>
  );
};

export default Header;
