// Navbar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blocks, Menu, X } from 'lucide-react';

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar w-full backdrop-blur-lg fixed top-0 left-0 p-4 border z-50">
        <div className="outer-container flex justify-between lg:justify-evenly items-center gap-60">
          <div className="first-section flex-shrink-0">
            <a href="/" className="logo block w-24">
              <img src="/public/brand/logo.png" alt="logo" className="w-full" />
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="border rounded-xl px-5 py-2">
              <ul className="flex items-center space-x-8">
                <li className="cursor-pointer hover:text-blue-500 transition-colors">Product</li>
                <li className="cursor-pointer hover:text-blue-500 transition-colors">Pricing</li>
                <li className="cursor-pointer hover:text-blue-500 transition-colors">Company</li>
                <li className="cursor-pointer hover:text-blue-500 transition-colors">Blog</li>
                <li className="cursor-pointer hover:text-blue-500 transition-colors">Changelog</li>
              </ul>
            </div>
          </div>
          <div className="last-section hidden md:flex gap-4 items-center">
            <span onClick={() => navigate('/login')} className="cursor-pointer">
              Login
            </span>
            <button
              onClick={() => navigate('/signup')}
              className="bg-slate-700 px-3 py-1 rounded-md">
              Start free trial
            </button>
          </div>

          {/* Mobile Menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center duration-100 ease-in-out border">
              {isOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}></div>
        </div>
      </nav>
    </>
  );
}
