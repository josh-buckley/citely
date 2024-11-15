import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { bookRules } from "../../lib/books";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";

interface BookRulesProps {
  activeField: string;
}

interface RuleExample {
  correct: string;
  incorrect?: string;
  explanation: string;
}

export function BookRules({ activeField }: BookRulesProps) {
  const fieldToRulesMap: Record<string, string[]> = {
    author: ['authors', 'multipleAuthors', 'bodyAuthors', 'judicialOfficers'],
    title: ['title'],
    publisher: ['publicationDetails'],
    edition: ['editionNumber', 'revisedEditions'],
    year: ['publicationYear'],
    pinpoint: ['pinpointReferences'],
    volume: ['multiVolume']
  };

  const ruleSections = fieldToRulesMap[activeField] || [];
  if (!ruleSections.length) return null;

  return (
    <>
      {(ruleSections as (keyof typeof bookRules)[]).map(section => (
        bookRules[section] ? (
          <Card key={section} className="mb-4">
            <CardHeader className="py-4 pb-2">
              <CardTitle>{bookRules[section].title}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-2">
                {groupRules(formatRules(
                  'publisher' in bookRules[section] 
                    ? (bookRules[section] as any)[activeField]?.rules 
                    : (bookRules[section] as any).rules
                )).map((group, groupIndex) => {
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
              {(('publisher' in bookRules[section] 
                ? (bookRules[section] as any)[activeField]?.examples
                : (bookRules[section] as any).examples)) && (
                <div className="mt-4 space-y-3">
                  {(('publisher' in bookRules[section]
                    ? (bookRules[section] as any)[activeField]?.examples
                    : (bookRules[section] as any).examples))?.map((example: RuleExample, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="text-sm bg-green-100 text-green-800 p-2 rounded-lg flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-800" />
                        {parseItalics(example.correct as string)}
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
        ) : null
      ))}
    </>
  );
} 
