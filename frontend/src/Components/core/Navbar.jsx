
// Navbar.jsx
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FaBell , FaCog } from "react-icons/fa";

import { useState } from 'react';
import Profile from '@/Components/ui/Profile';
import Dashboard from '@/Pages/Dashboard';

export default function Navbar({ user }) {
  const [activeTab, setActiveTab] = useState('Profile'); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const navigation = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Dashboard', href: '#', current: false },
    { name: 'My Courses', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
        </div>
    </nav>
    </>
  );
};
