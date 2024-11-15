"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="flex items-center">
      <div className="flex gap-6">
        <Link 
          href="/landing" 
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-gray-900 transition-colors"
        >
          Home
        </Link>
        {user && (
          <>
            <Link 
              href="/projects" 
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-gray-900 transition-colors"
            >
              Projects
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;