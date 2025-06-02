import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Clock, Files } from "lucide-react";

export function Solution({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-[20vh] p-4 bg-background">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <motion.div 
          className="space-y-8 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4"
            >
              <h2 className="text-2xl">
                But, that's not the end of the story. What this means is, perfect citations <i>really</i> stand out.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-4"
            >
              <div className="space-y-4 text-lg">
                <p className="font-medium">
                  Take it from us, <span className="text-primary font-semibold">perfect citations stand out</span>.
                </p>
                <p>
                  It's the kind of precision and attention to detail that:
                </p>
                <ul className="list-none space-y-2 pl-4">
                  <li className="font-medium">→ professors remember</li>
                  <li className="font-medium">→ colleagues notice</li>
                  <li className="font-medium">→ partners value</li>
                </ul>
                <p className="mt-4 font-medium">
                  Oh, and with us you'll take <span className="text-primary font-semibold">less than 50% of the time</span> to do it.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-8"
          >
            <Button 
              size="lg"
              onClick={onComplete}
              className="text-xl px-8 bg-white text-black border border-black hover:bg-gray-100 font-serif"
              variant="outline"
            >
              Let's get started
            </Button>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
} 