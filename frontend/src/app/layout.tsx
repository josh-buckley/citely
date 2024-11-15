'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '@/components/Header';
import '@/styles/globals.css';  // Move your CSS imports here
import { AuthProvider } from '../contexts/AuthContext';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-background flex flex-col">
              <Header />
              <main className="flex-1 w-full">
                {children}
              </main>
              {/* Your footer code */}
            </div>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}