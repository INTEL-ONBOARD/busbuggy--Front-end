import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../assets/logo.png'; // Import your logo

function Footer() {
    return (
        <footer className="bg-transparent rounded-lg m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Your Logo" /> {/* Use the imported logo */}
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <Link to="/about" className="hover:underline mr-4 md:mr-6">About</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="hover:underline mr-4 md:mr-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/licensing" className="hover:underline mr-4 md:mr-6">Licensing</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-black sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">
                    © 2023 <Link to="/" className="hover:underline">BusBuddy™</Link>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
