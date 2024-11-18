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

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="w-full px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="inline-block font-bold">CiteCounsel</span>
          </Link>
          <NavBar />
        </div>
        <div>
          {user ? (
            <Button 
              variant="outline"
              onClick={handleSignOut}
              className="transition-transform duration-200 hover:scale-105"
            >
              Sign Out
            </Button>
          ) : (
            <Button 
              variant="outline"
              className="transition-transform duration-200 hover:scale-105"
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
