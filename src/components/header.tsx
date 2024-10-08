'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo_blog.png';

const Header: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/" passHref>
            <Image
              className="rounded-full w-8 sm:w-14 transition-transform duration-300 transform hover:scale-110"
              src={logo}
              alt="Blog Logo"
            />
          </Link>
        </div>

        <ul className="flex space-x-10 text-xl mr-12">
          {token ? (
            <>
              <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/">Logout</Link>
            </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
