"use client"
import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import NavBar from './NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/signin');
  };

  const buttonStyles = "bg-white text-black border border-black hover:bg-gray-50 px-3 py-0.5 rounded-md text-sm font-medium";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="w-full px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="inline-block font-bold">Citely</span>
          </Link>
          <NavBar />
        </div>
        <div>
          {user ? (
            <Button 
              onClick={handleSignOut}
              className={buttonStyles}
            >
              Sign Out
            </Button>
          ) : (
            <Button 
              variant="outline"
              className={buttonStyles}
            >
              <Link href="/auth/signin">
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
