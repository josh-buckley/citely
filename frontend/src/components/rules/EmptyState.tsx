import { BookOpen, MousePointerClick } from "lucide-react";
import { Card } from "../ui/card";

export function EmptyState() {
  return (
    <Card className="h-full flex items-stretch">
      <div className="flex-1 relative overflow-hidden opacity-0 animate-fade-up">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200 rounded-bl-[100px] -mr-8 -mt-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-200 rounded-tr-[80px] -ml-6 -mb-6" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
          <div className="inline-block p-3 bg-gray-100 rounded-2xl mb-6 opacity-0 animate-fade-up">
            <BookOpen className="w-8 h-8 text-gray-900" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-4 opacity-0 animate-fade-up">
            Citation Rules
          </h1>
          
          <p className="text-gray-500 text-sm max-w-md mx-auto opacity-0 animate-fade-up-delay">
            Each field has specific rules to help you format your citation correctly.
          </p>
          
          {/* Interactive indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400 opacity-0 animate-fade-up-delay">
            <MousePointerClick className="w-4 h-4 animate-float" />
            <span>Click any field to begin</span>
          </div>
        </div>
      </div>
    </Card>
  );
}