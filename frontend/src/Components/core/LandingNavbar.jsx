'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HoveredLink, Menu, MenuItem, ProductItem } from '../ui/navbar-menu.jsx';

export default function LandingNavbar() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar w-full backdrop-blur-md sticky top-0 left-0 p-4 border z-50">
        <div className="outer-container flex justify-between items-center gap-60">
          <div className="first-section flex-shrink-0">
            <a href="/" className="logo block w-24">
              <img src="/public/brand/logo.png" alt="logo" className="w-full" />
            </a>
          </div>
          <div className="middle-section hidden lg:block">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="flex flex-col gap-4 text-sm">
                  <HoveredLink href="/">Web Development</HoveredLink>
                  <HoveredLink href="/">Interface Design</HoveredLink>
                  <HoveredLink href="/">Search Engine Optimization</HoveredLink>
                  <HoveredLink href="/">Branding</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Products">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <ProductItem
                    title="Tailwind Master Kit"
                    href="https://tailwindmasterkit.com"
                    src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                    description="Production ready Tailwind css components for your next project"
                  />
                  <ProductItem
                    title="Moonbeam"
                    href="https://gomoonbeam.com"
                    src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                    description="Never write from scratch again. Go from idea to blog in minutes."
                  />
                  <ProductItem
                    title="Rogue"
                    href="https://userogue.com"
                    src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                    description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Pricing">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/hobby">Hobby</HoveredLink>
                  <HoveredLink href="/individual">Individual</HoveredLink>
                  <HoveredLink href="/team">Team</HoveredLink>
                  <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>
          <div className="last-section flex gap-4 items-center">
            <span onClick={() => navigate('/login')} className="cursor-pointer">
              Login
            </span>
            <button
              onClick={() => navigate('/signup')}
              className="bg-slate-700 px-3 py-1 rounded-md">
              Signup
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
