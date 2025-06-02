import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Database, BookOpen, Brain } from "lucide-react";

export function Features({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <motion.div 
        className="w-full max-w-2xl space-y-8 font-serif"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4"
          >
            <Brain className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <p className="text-lg">
              We've automated the AGLC4 citation rules so that they are always right where you need them, and explained in plain English so they're far easier to follow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-4"
          >
            <Database className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <p className="text-lg">
              In addition (and we know you'll love this) we've streamlined the extraction of legal sources from your most-used legal databases such as Westlaw, Lexis Advance, and Jade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-4"
          >
            <BookOpen className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <p className="text-lg">
              We also support research tools including HeinOnline, SSRN and Google Scholar.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <Button 
            size="lg"
            onClick={onComplete}
            className="text-xl px-8 bg-white text-black border border-black hover:bg-gray-100 font-serif"
            variant="outline"
          >
            Get Started Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
} 