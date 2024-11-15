'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  return (
    <div className="home">
      <h2>Welcome to Citation Manager</h2>
      <p>This is the home page of your citation management application.</p>
    </div>
  );
}