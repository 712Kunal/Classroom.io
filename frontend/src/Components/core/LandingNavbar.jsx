'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HoveredLink, Menu, MenuItem, ProductItem } from '../ui/navbar-menu.jsx';

export default function LandingNavbar() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar w-full backdrop-blur-md relative top-0 left-0 p-4 border z-50">
        <div className="outer-container flex justify-between items-center gap-60">
          <div className="first-section flex-shrink-0">
            <a href="/" className="logo block w-24">
              <img src="/brand/logo.png" alt="logo" className="w-full" />
            </a>
          </div>
          <div className="middle-section hidden lg:block">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="flex flex-col gap-4 text-sm">
                  <HoveredLink href="/">AI-Generated Pathways</HoveredLink>
                  <HoveredLink href="/">Gamified Services</HoveredLink>
                  <HoveredLink href="/">Task Scheduling</HoveredLink>
                  <HoveredLink href="/">Analytics & Insights</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Products">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <ProductItem
                    title="Pathway Builder Pro"
                    href="https://tailwindmasterkit.com"
                    src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                    description="AI-powered tool to create customized learning paths tailored to your goals"
                  />
                  <ProductItem
                    title="Gamify Toolkit"
                    href="https://gomoonbeam.com"
                    src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                    description="Engage with gamified challenges, rewards, and progress tracking."
                  />
                  <ProductItem
                    title="Task Scheduler AI"
                    href="https://userogue.com"
                    src="src/assets/scheduler.png"
                    description="Smart task management with AI-suggested prioritization and reminders."
                  />
                  <ProductItem
                    title="Smart Notifications"
                    href="https://smartnotifications.com"
                    src="src/assets/notif.png"
                    description="Stay on track with timely reminders and motivational nudges"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Pricing">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/hobby">Free Plan (Starter)</HoveredLink>
                  <HoveredLink href="/individual">Premium Plan (Enterprise)</HoveredLink>
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
