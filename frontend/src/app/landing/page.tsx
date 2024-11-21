'use client';

import React from 'react';
import Navbar from '../../components/NavBar';
import Hero from '../../components/Hero';
import TrustIndicators from '../../components/TrustIndicators';
import Features from '../../components/Features';
import ProblemSolution from '../../components/ProblemSolution';
import CitationTypeScroll from '../../components/CitationTypeScroll';
import Testimonials from '../../components/Testimonials';
import Integrations from '../../components/Integrations';
import FAQ from '../../components/FAQ';
import CtaSection from '../../components/CtaSection';
import Footer from '../../components/Footer';

export default function LandingPage() {
  return (
    <main className="relative">
      <Hero />
      <CitationTypeScroll />
      <Integrations />
      <Testimonials />
      <ProblemSolution />
      <CtaSection />
      <Footer />
    </main>
  );
}