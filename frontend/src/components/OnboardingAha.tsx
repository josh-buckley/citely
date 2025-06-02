import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { CitationForm } from "@/components/CitationForm";

export function Aha({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <motion.div 
        className="w-full max-w-2xl space-y-8 font-serif"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-4"
        >
          <Lightbulb className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <p className="text-lg">
            Now, you're in on the secret. Why don't you give it a try - this one's on us, just so you can get the hang of it. Try creating a citation using our engine:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CitationForm 
            onSubmit={onComplete}
            onCancel={() => {}}
            initialValues={{}}
          />
        </motion.div>
      </motion.div>
    </div>
  );
} 