import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '@/Firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spline from '@splinetool/react-spline';


function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = 'Username is required.';
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is not valid.';
    }
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });

      toast.success('User registered successfully', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: 'dark',
      });

      await setDoc(doc(db, 'Users', user.uid), {
        email: user.email,
        username: username,
      });

      console.log('User registration completed.');

      const backendUrl = `http://localhost:8080/api/user-signUp/${user.uid}`;

      try {
        await axios.post(backendUrl, {
          email: user.email,
          username: username,
        });
        console.log('Notification and email request sent to backend.');
        toast.success('Notification and email request sent successfully.', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: 'dark',
        });
      } catch (axiosError) {
        console.error('Error sending notification:', axiosError.message);
        toast.error('Failed to send notification.', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      toast.error('Registration failed. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: 'dark',
      });
      setErrorMessage(error.message);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-auto max-w-md space-y-8 Dark:bg-white p-8 rounded-lg shadow-md border-2 border-orange-100">
      <div className="flex items-center justify-center">
        <img src="brand/logo.png" alt="Your Company" className="w-32 h-auto" />
      </div>

      <h2 className="mb-8 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
        Create your Pathify account
      </h2>

      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">
          <p>{errorMessage}</p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleRegister}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={`mt-2 w-full rounded-md border border-gray-700 bg-gray-800 p-2.5 text-gray-100 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.username ? 'border-red-500' : ''
              }`}
          />
          {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex-abc@mail.com"
            className={`mt-2 w-full rounded-md border border-gray-700 bg-gray-800 p-2.5 text-gray-100 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''
              }`}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******AB"
            className={`mt-2 w-full rounded-md border border-gray-700 bg-gray-800 p-2.5 text-gray-100 shadow-sm placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.password ? 'border-red-500' : ''
              }`}
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
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

        {/* Sign Up Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sign up
          </button>
        </div>
      </form>

      {/* Link to Log In */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Already have a Pathify account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

// SignupPage Component
export default function SignupPage() {
  return (
    <div className="w-[100dvw] h-[100dvh] grid grid-cols-1 lg:grid-cols-2">
      <div className="banner hidden lg:grid border-r-2">
        <div className="3d-model h-screen dark:bg-black">
          <Spline scene="https://prod.spline.design/yKAqjNG7bTUqOaqT/scene.splinecode" />
        </div>
      </div>
      <div className="signupform grid place-items-center p-4">
        <Signup />
      </div>
    </div>
  );
}
