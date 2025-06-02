import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Clock, Search } from "lucide-react";

const textWithIcons = [
  { text: "Look.", icon: MessageCircle },
  { text: "We get it.", icon: MessageCircle },
  { text: "No-one likes citations.", icon: MessageCircle },
  { text: "We don't either - that's why we built this app.", icon: MessageCircle },
  { text: "We've all spent far too much of our lives adding in missing commas, searching through PDFs to find obscure reference styles and trying to relocate that one perfect source we'd found weeks ago.", icon: Clock },
  { text: "But what if there was a way to have perfect citations automatically, every time?", icon: Search }
];

export function Introduction({ onComplete }: { onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentSentence >= textWithIcons.length) {
      setIsComplete(true);
      return;
    }

    const currentText = textWithIcons[currentSentence].text;
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setDisplayedText(prev => {
          const previousText = currentSentence > 0 
            ? textWithIcons.slice(0, currentSentence).map(item => item.text).join(" ") + " "
            : "";
          return previousText + currentText.slice(0, currentIndex);
        });
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        setTimeout(() => {
          setCurrentSentence(prev => prev + 1);
        }, 400);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentSentence]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-[20vh] p-4 bg-background">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6 text-xl leading-relaxed font-serif">
            {displayedText.split("\n\n").map((paragraph, index) => {
              const Icon = textWithIcons[index]?.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  {Icon && <Icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />}
                  <p>{paragraph}</p>
                </div>
              );
            })}
          </div>
          
          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-8"
            >
              <Button 
                size="lg"
                onClick={onComplete}
                className="text-xl px-8 bg-white text-black border border-black hover:bg-gray-100 font-serif"
                variant="outline"
              >
                Hmmmm... I'm interested.
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Card>
    </div>
  );
}