'use client';

import { useState } from "react";
import { Introduction } from "@/components/OnboardingIntroduction";
import { Questionnaire } from "@/components/OnboardingQuestionnaire";
import { Solution } from "@/components/OnboardingSolution";
import { Features } from "@/components/OnboardingFeatures";
import { Aha } from "@/components/OnboardingAha";
import { AnimatePresence, motion } from "framer-motion";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questionnaire' | 'solution' | 'features' | 'aha'>('intro');

  return (
    <AnimatePresence mode="wait">
      {currentStep === 'intro' && (
        <motion.div
          key="introduction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Introduction onComplete={() => setCurrentStep('questionnaire')} />
        </motion.div>
      )}
      {currentStep === 'questionnaire' && (
        <motion.div
          key="questionnaire"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Questionnaire onComplete={() => setCurrentStep('solution')} />
        </motion.div>
      )}
      {currentStep === 'solution' && (
        <motion.div
          key="solution"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Solution onComplete={() => setCurrentStep('aha')} />
        </motion.div>
      )}
      {currentStep === 'aha' && (
        <motion.div
          key="aha"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Aha onComplete={() => setCurrentStep('features')} />
        </motion.div>
      )}
      {currentStep === 'features' && (
        <motion.div
          key="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Features onComplete={() => {/* Handle final completion */}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
