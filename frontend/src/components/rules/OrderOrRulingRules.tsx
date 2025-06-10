import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { orderOrRulingRules } from "../../lib/orderOrRuling";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";

interface OrderOrRulingRulesProps {
  activeField: string;
}

export function OrderOrRulingRules({ activeField }: OrderOrRulingRulesProps) {
  const rulesMap: Record<string, any> = {
    instrumentalityOfficer: orderOrRulingRules.instrumentalityOfficer,
    instrumentTitle: orderOrRulingRules.instrumentTitle,
    documentNumber: orderOrRulingRules.documentNumber,
    pinpoint: orderOrRulingRules.pinpoint,
    citationExamples: orderOrRulingRules.citationExamples,
  };

  const field = rulesMap[activeField];

  if (!field) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="py-4 pb-2">
        <CardTitle>{field.title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        {field.rules && (
          <div className="space-y-2 mb-4">
            {groupRules(formatRules(field.rules)).map((group, groupIndex) => {
              switch (group.type) {
                case 'regular':
                  return group.items.map((text, index) => (
                    <div key={`${groupIndex}-${index}`} className="text-sm">
                      {parseItalics(text)}
                    </div>
                  ));
                case 'bullet':
                  return (
                    <ul key={groupIndex} className="list-disc pl-6 space-y-1">
                      {group.items.map((text, index) => (
                        <li key={`${groupIndex}-${index}`} className="text-sm">
                          {parseItalics(text)}
                        </li>
                      ))}
                    </ul>
                  );
                case 'number':
                  return (
                    <ol key={groupIndex} className="list-decimal pl-6 space-y-1">
                      {group.items.map((text, index) => (
                        <li key={`${groupIndex}-${index}`} className="text-sm">
                          {parseItalics(text)}
                        </li>
                      ))}
                    </ol>
                  );
              }
            })}
          </div>
        )}
        {field.examples && (
          <div className="mt-4 space-y-3">
            {field.examples.map((example: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="text-sm bg-green-100 text-green-800 p-2 rounded-lg flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-800" />
                  {parseItalics(example.correct)}
                </div>
                {example.incorrect && (
                  <div className="text-sm bg-red-100 text-red-800 p-2 rounded-lg flex items-center gap-2">
                    <X className="h-4 w-4 text-red-800" />
                    {parseItalics(example.incorrect)}
                  </div>
                )}
                <div className="text-sm text-gray-500">{example.explanation}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 