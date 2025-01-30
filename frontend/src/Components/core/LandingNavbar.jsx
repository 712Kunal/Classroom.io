// Navbar.jsx

import { useNavigate } from 'react-router-dom';

export default function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar w-full backdrop-blur-lg fixed top-0 left-0 p-4 border">
        <div className="outer-container flex justify-evenly items-center gap-60">
          <div className="first-section w-24">
            <a href="/" className="logo w-full">
              <img src="/public/brand/logo.png" alt="logo" />
            </a>
          </div>
          <div className="middle-section border rounded-xl flex items-center px-5 py-2">
            <ul className="flex items-center gap-10">
              <li className='cursor-pointer'>Product</li>
              <li className='cursor-pointer'>Pricing</li>
              <li className='cursor-pointer'>Company</li>
              <li className='cursor-pointer'>Blog</li>
              <li className='cursor-pointer'>Changelog</li>
            </ul>
          </div>
          <div className="last-section flex gap-4 items-center">
            <span onClick={() => navigate('/login')} className="cursor-pointer">
              Login
            </span>
            <button
              onClick={() => navigate('/signup')}
              className="bg-slate-700 px-3 py-1 rounded-md">
              Start free trial
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
