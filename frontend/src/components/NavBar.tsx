"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between px-2 py-4">
      <div className="flex gap-8 pl-1">
        {user && (
          <>
            <Link 
              href="/projects" 
              className="flex items-center text-base text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-black transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/bibliographies" 
              className="flex items-center text-base text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-black transition-colors"
            >
              Bibliographies
            </Link>
            <Link 
              href="/settings" 
              className="flex items-center text-base text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-black transition-colors"
            >
              Settings
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;