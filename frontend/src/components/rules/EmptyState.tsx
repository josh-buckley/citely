import { Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function EmptyState() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Citation Rules</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[calc(100%-80px)] text-center px-6">
        <div className="-mt-[20%]">
          <div className="inline-flex p-6 rounded-full bg-gray-50 mb-4">
            <Scale className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-muted-foreground text-sm">
            Focus on an input field to see relevant guidance and examples.
          </p>
          <p className="text-muted-foreground/60 text-sm mt-2">
            Each field has specific rules to help you format your citation correctly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 