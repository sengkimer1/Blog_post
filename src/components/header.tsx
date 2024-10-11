'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo_blog.png';
import img from '@/images/background.png';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleCreateBlog = () => {
    router.push('/create'); 
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="p-4 md:p-6 shadow-md text-white fixed top-0 left-0 right-0"
      style={{
        backgroundImage: `URL(${img.src})`,
      }}
    >
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" passHref>
            <Image
              className="rounded-full w-10 md:w-14 transition-transform duration-300 transform hover:scale-110"
              src={logo}
              alt="Blog Logo"
            />
          </Link>
        </div>

        {/* Create Blog Button */}
        <div className="hidden md:block">
          <button
            onClick={handleCreateBlog}
            className="px-6 py-2 text-white font-bold mt-2 rounded-full border-solid border-2 border-white transform transition-transform hover:-rotate-2"
          >
            CREATE BLOG
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg mr-4">
          {token ? (
            <>
              <li className="hover:text-gray-200 transition-colors duration-200">
                <Link href="/">HOME</Link>
              </li>
              <li className="hover:text-gray-200 transition-colors duration-200">
                <Link href="/profile">PROFILE</Link>
              </li>
              <li className="hover:text-gray-200 transition-colors duration-200">
                <Link href="/">LOGOUT</Link> 
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-gray-200 transition-colors duration-200">
                <Link href="/signup">Signup</Link>
              </li>
              <li className="hover:text-gray-200 transition-colors duration-200">
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="space-y-4 text-lg">
            {token ? (
              <>
                <li className="hover:text-gray-200 transition-colors duration-200">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-gray-200 transition-colors duration-200">
                  <Link href="/profile">Profile</Link>
                </li>
                <li className="hover:text-gray-200 transition-colors duration-200">
                  <Link href="/">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-gray-200 transition-colors duration-200">
                  <Link href="/signup">Signup</Link>
                </li>
                <li className="hover:text-gray-200 transition-colors duration-200">
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleCreateBlog}
                className="w-full py-2 text-white font-bold rounded-full border-solid border-2 border-white transform transition-transform hover:-rotate-2"
              >
                CREATE BLOG
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
