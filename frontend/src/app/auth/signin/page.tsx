'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const SignIn: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/projects');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        else {
          setSuccess('Account created successfully. Please click the confirmation link sent to your email address to get started.');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md relative">
        {/* Toggle Switch */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md">
          <div className="flex items-center p-1 space-x-1 relative">
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-full transition-all duration-300 ease-in-out"
              style={{
                left: isSignIn ? '4px' : 'calc(50% + 4px)',
              }}
            />
            <button
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                isSignIn
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 relative z-10 ${
                !isSignIn
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 mt-4">
          {isSignIn ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {isSignIn 
            ? 'Let\'s continue where you left off 🚀!' 
            : 'Get started and 👋 goodbye to citation struggles!'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mb-4"
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignIn ? 'Sign In' : 'Sign Up'}
          </button>

          {!isSignIn && (
            <p className="text-xs text-gray-500 text-center mb-4">
              By signing up, you agree to our{' '}
              <a href="/terms" className="underline hover:text-gray-700">Terms of Service</a>{' '}
              and{' '}
              <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>
            </p>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;