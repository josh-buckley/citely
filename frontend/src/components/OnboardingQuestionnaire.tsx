import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CircleIcon, CheckCircle2, FileText, School, GraduationCap, Users, Clock, BookOpen, XCircle, Coffee, PenTool, Check, X } from "lucide-react";

interface Option {
  label: string;
  value: string;
  hasInput?: boolean;
  icon?: React.ReactNode;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "To kick things off, let's get to know each other a bit better.",
    options: [
      { label: "I'm a Lawyer.", value: "lawyer", icon: <div className="bg-blue-50 p-1.5 rounded-lg"><GraduationCap className="text-primary" /></div> },
      { label: "I'm a Law Student.", value: "student", icon: <div className="bg-emerald-50 p-1.5 rounded-lg"><School className="text-primary" /></div> },
      { label: "I'm a Law Clerk.", value: "clerk", icon: <div className="bg-purple-50 p-1.5 rounded-lg"><FileText className="text-primary" /></div> },
      { label: "I'm a Law Professor.", value: "professor", icon: <div className="bg-amber-50 p-1.5 rounded-lg"><BookOpen className="text-primary" /></div> },
      { label: "I am ...", value: "other", hasInput: true, icon: <div className="bg-rose-50 p-1.5 rounded-lg"><Users className="text-primary" /></div> },
    ],
  },
  {
    id: 2,
    text: "What part of creating citations drives you crazy?",
    options: [
      { label: "They take too long.", value: "time", icon: <div className="bg-cyan-50 p-1.5 rounded-lg"><Clock className="text-primary" /></div> },
      { label: "There are too many different citation types to remember.", value: "types", icon: <div className="bg-indigo-50 p-1.5 rounded-lg"><BookOpen className="text-primary" /></div> },
      { label: "It's too easy to make minor formatting errors.", value: "errors", icon: <div className="bg-fuchsia-50 p-1.5 rounded-lg"><XCircle className="text-primary" /></div> },
      { label: "It's just plain boring.", value: "boring", icon: <div className="bg-teal-50 p-1.5 rounded-lg"><Coffee className="text-primary" /></div> },
      { label: "Something else (tell us more).", value: "other", hasInput: true, icon: <div className="bg-orange-50 p-1.5 rounded-lg"><PenTool className="text-primary" /></div> },
    ],
  },
  {
    id: 3,
    text: "Last question, have you ever received negative feedback due to formatting errors?",
    options: [
      { label: "Yes.", value: "yes", icon: <div className="bg-sky-50 p-1.5 rounded-lg"><Check className="text-primary" /></div> },
      { label: "No.", value: "no", icon: <div className="bg-lime-50 p-1.5 rounded-lg"><X className="text-primary" /></div> },
    ],
  },
];

const chartData = [
  { name: "Yes", value: 96 },
  { name: "No", value: 4 },
];

const COLORS = ['bg-sky-200', 'bg-lime-200'].map(color => {
  switch(color) {
    case 'bg-sky-200': return '#bae6fd';  // Tailwind sky-200
    case 'bg-lime-200': return '#d9f99d';  // Tailwind lime-200
    default: return '#000000';
  }
});

const MotionButton = motion(Button);

export function Questionnaire({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { option: string; input?: string }>>({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (option: Option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion + 1]: { option: option.value },
    }));

    if (!option.hasInput) {
      if (currentQuestion === questions.length - 1) {
        setShowResults(true);
      } else {
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
        }, 300);
      }
    }
  };

  const handleInputSubmit = (input: string) => {
    if (!input.trim()) {
      toast("Please provide details.");
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion + 1]: { 
        ...prev[currentQuestion + 1], 
        input: input.trim() 
      },
    }));

    if (currentQuestion === questions.length - 1) {
      setShowResults(true);
    } else {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 300);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl tracking-tight font-serif">
                  {questions[currentQuestion].text}
                </h2>
              </div>
              <motion.div 
                className="grid gap-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {questions[currentQuestion].options.map((option) => (
                  <motion.div key={option.value} variants={item}>
                    <MotionButton
                      variant="outline"
                      className={`w-full justify-start text-left h-auto p-4 transition-colors ${
                        answers[currentQuestion + 1]?.option === option.value 
                          ? 'bg-primary text-primary-foreground'
                          : ''
                      }`}
                      onClick={() => handleOptionSelect(option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={
                        answers[currentQuestion + 1]?.option === option.value
                          ? {
                              scale: [1, 1.05, 1],
                              transition: { duration: 0.3 }
                            }
                          : {}
                      }
                    >
                      <span className="mr-3 transition-transform group-hover:scale-110">
                        {option.icon}
                      </span>
                      <span className="flex-grow">{option.label}</span>
                      <AnimatePresence>
                        {answers[currentQuestion + 1]?.option === option.value && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-auto"
                          >
                            <Check className="h-4 w-4 flex-shrink-0" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </MotionButton>
                    {option.hasInput && answers[currentQuestion + 1]?.option === option.value && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4"
                      >
                        <Textarea
                          placeholder={
                            currentQuestion === 0 
                              ? "Tell us about what you do..."
                              : "Give us a rant - we genuinely want to hear it."
                          }
                          className="min-h-[100px]"
                          value={answers[currentQuestion + 1]?.input || ""}
                          onChange={(e) => {
                            const input = e.target.value;
                            setAnswers(prev => ({
                              ...prev,
                              [currentQuestion + 1]: { 
                                ...prev[currentQuestion + 1], 
                                input: input 
                              }
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleInputSubmit(e.currentTarget.value);
                            }
                          }}
                        />
                        <MotionButton
                          variant="outline"
                          className="mt-2 px-6"
                          onClick={() => handleInputSubmit(answers[currentQuestion + 1]?.input || "")}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue
                        </MotionButton>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl tracking-tight font-serif">
                  Don't worry, you're not alone
                </h2>
                <p className="text-muted-foreground">
                  <span className="font-bold text-sky-400">96%</span> of legal professionals report receiving negative feedback due to citation errors at some point.
                </p>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={100}
                      fill="hsl(var(--primary))"
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-8">
                {chartData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-lg font-medium">{entry.name}</span>
                  </div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center"
              >
                <MotionButton 
                  onClick={onComplete}
                  variant="outline"
                  className="mt-6 px-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </MotionButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}