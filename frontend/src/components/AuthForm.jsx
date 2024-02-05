'use client';

import React, { useState } from 'react';
import { useAuth } from '../helpers/AuthContext';
import { registerUser, loginUser } from '../helpers/api';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
  const { setUser } = useAuth();

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      const userData = { email, password, username: email };
      const response =
        isLoginOrRegister === 'register'
          ? await registerUser(userData)
          : await loginUser({ identifier: email, password });
      const { data } = response;

      setUser(data.user);
      localStorage.setItem('authToken', data.jwt);
    } catch (error) {
      alert('Error during authentication. Please try again.');
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-96 mx-auto" onSubmit={handleAuth}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            onClick={() =>
              setIsLoginOrRegister(
                isLoginOrRegister === 'register' ? 'login' : 'register',
              )
            }
          >
            {isLoginOrRegister === 'register'
              ? 'Already have an account? Log in'
              : "Don't have an account? Register"}
          </a>
        </div>
      </form>
    </div>
  );
}
