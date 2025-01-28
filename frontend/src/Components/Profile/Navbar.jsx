// Navbar.jsx
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FaBars, FaBell, FaCog, FaTimes } from 'react-icons/fa'; // Imported from react-icons
import { useState } from 'react';
import Profile from '@/Components/Profile/Profile.jsx';
import Dashboard from '@/Components/Profile/Dashboard.jsx';

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

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center w-full justify-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <div className="flex justify-center items-center space-x-4 rounded-full border-2 border-gray-300 p-2 transition-all duration-300 hover:border-gray-500">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTabChange(item.name);
                        }}
                        aria-current={activeTab === item.name ? 'page' : undefined}
                        className={classNames(
                          activeTab === item.name
                            ? 'bg-gray-900 rounded-full text-white transform scale-105 transition-all duration-300'
                            : 'text-gray-600 rounded-full hover:bg-gray-500 hover:text-gray-900',
                          'rounded-full px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Settings Icon */}
                <button
                  type="button"
                  className="relative rounded-full bg-transparent p-1 text-black-400 hover:text-gray-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Settings</span>
                  <FaCog aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <FaBars aria-hidden="true" className="block h-6 w-6 group-data-open:hidden" />
                <FaTimes aria-hidden="true" className="hidden h-6 w-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(item.name);
                }}
                aria-current={activeTab === item.name ? 'page' : undefined}
                className={classNames(
                  activeTab === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <header className="shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {activeTab}
          </h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {activeTab === 'Profile' && <Profile user={user} />}
          {activeTab === 'Dashboard' && <Dashboard user={user} />}
        </div>
      </main>
    </div>
  );
}
