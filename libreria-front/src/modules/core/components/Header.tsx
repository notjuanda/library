import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

    return (
        <header className="bg-gray-900 text-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <div className="text-xl font-bold">Mi App</div>

            <nav className="hidden md:flex space-x-6">
            <DesktopMenu user={user || null} logout={logout} />
            </nav>

            <button
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
            >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                {mobileOpen ? (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
                ) : (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
                )}
            </svg>
            </button>
        </div>

        {mobileOpen && <MobileMenu user={user || null} logout={logout} toggleMobileMenu={toggleMobileMenu} />}
        </header>
    );
};

export default Header;
