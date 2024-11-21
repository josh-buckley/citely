'use client'

import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { highCourtTranscriptRules } from '../../lib/highCourtTranscriptRules'
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";

interface HighCourtTranscriptRulesProps {
  activeField: string;
}

export function HighCourtTranscriptRules({ activeField }: HighCourtTranscriptRulesProps) {
  // Map field names to rule keys
  const fieldToRuleKey: { [key: string]: keyof typeof highCourtTranscriptRules } = {
    'case_name': 'caseName',
    'year': 'year',
    'number': 'number',
    'pinpoint': 'pinpoint'
  };

  const ruleKey = fieldToRuleKey[activeField];
  if (!ruleKey || !highCourtTranscriptRules[ruleKey]) {
    return null;
  }

  const { title, rules, examples } = highCourtTranscriptRules[ruleKey];

  return (
    <Card className="mb-4">
      <CardHeader className="py-4 pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 pb-4">
        <div className="space-y-2">
          {groupRules(formatRules(rules)).map((group, groupIndex) => {
            switch (group.type) {
              case 'regular':
                return group.items.map((text, index) => (
                  <div key={`${groupIndex}-${index}`} className="text-sm text-muted-foreground">
                    {parseItalics(text)}
                  </div>
                ));
              case 'bullet':
                return (
                  <ul key={groupIndex} className="list-disc pl-6 space-y-1">
                    {group.items.map((text, index) => (
                      <li key={`${groupIndex}-${index}`} className="text-sm text-muted-foreground">
                        {parseItalics(text)}
                      </li>
                    ))}
                  </ul>
                );
              case 'number':
                return (
                  <ol key={groupIndex} className="list-decimal pl-6 space-y-1">
                    {group.items.map((text, index) => (
                      <li key={`${groupIndex}-${index}`} className="text-sm text-muted-foreground">
                        {parseItalics(text)}
                      </li>
                    ))}
                  </ol>
                );
            }
          })}
        </div>
        {examples && examples.length > 0 && (
          <div className="mt-4 space-y-3">
            {examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm bg-green-100 text-green-800 p-2 rounded-lg flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-800" />
                  {parseItalics(example.correct)}
                </div>
                {'incorrect' in example && (
                  <div className="text-sm bg-red-100 text-red-800 p-2 rounded-lg flex items-center gap-2">
                    <X className="h-4 w-4 text-red-800" />
                    {parseItalics(example.incorrect as string)}
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
