import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full shadow bg-[#333233]">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/invertedshopnstuff.ico" className="h-24" alt="Shop & Stuff" />
          </Link>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 mr-5">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">Licensing</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400 pt-14">
          © 2024 <Link to="#" className="hover:underline">by Jyotiska</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
