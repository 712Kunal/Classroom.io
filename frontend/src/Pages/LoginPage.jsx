import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import {  toast } from 'react-toastify';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/Firebase/firebase';

import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log('Please fill in both email and password');
      toast.error('Please fill in both email and password!', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        theme: "dark",
        });
      navigate('/app/profile'); 
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found. Please check your email and try again.', {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
          });
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
          });
      }else if (error.code === 'auth/invalid-credential') {
        toast.error('Incorrect password. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
          });
      }  
      else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="w-[100dvw] h-[100dvh] grid grid-cols-1 lg:grid-cols-2">
      {/* Left section (3D model) */}
      <div className="banner hidden lg:grid border-r-2">
        <div className="3d-model h-screen dark:bg-black">
          <Spline scene="https://prod.spline.design/yKAqjNG7bTUqOaqT/scene.splinecode" />
        </div>
      </div>

      <div className="signupform grid place-items-center p-4">
        <div className="w-auto max-w-md space-y-8 Dark:bg-white p-8 rounded-lg shadow-md border-2 border-orange-100">
          <div className="flex items-center justify-center">
            <img src="brand/logo.png" alt="Your Company" className="w-32 h-auto" />
          </div>

          <h2 className="mb-8 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Log-in to your account
          </h2>

          {/* Login Form */}
          <form className="space-y-6" action="#" method="POST" onSubmit={handelSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                
                autoComplete="email"
                placeholder="Ex-abc@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-700 bg-gray-800 p-2.5 text-gray-100 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="******AB"
                
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-600 bg-gray-800 p-2.5 text-gray-200 shadow-sm placeholder-gray-500 focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
              />
            </div>

            {/* Show Password Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={passwordVisible}
                onChange={togglePasswordVisibility}
                className="rounded border-gray-300"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-500">
                Show Password
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/forgot-password" 
                  className="font-medium text-purple-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              If you don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Create a new account.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
