"use client"
import React from 'react';
import Image from 'next/image';
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
          <div 
            onClick={() => router.push('/landing')} 
            className="flex items-center space-x-3 cursor-pointer"
          >
            <Image
              src="/images/integrations/logo.png"
              alt="CiteCounsel Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="inline-block font-bold text-xl">CiteCounsel</span>
          </div>
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
              <a href="/auth/signin">
                Sign In
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
