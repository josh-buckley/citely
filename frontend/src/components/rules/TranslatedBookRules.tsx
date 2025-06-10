import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { translatedBookRules } from "../../lib/translatedBook";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";

interface TranslatedBookRulesProps {
  activeField: string;
}

interface RuleExample {
  correct: string;
  incorrect?: string;
  explanation: string;
}

export function TranslatedBookRules({ activeField }: TranslatedBookRulesProps) {
  const fieldToRulesMap: Record<string, any[]> = {
    author: [translatedBookRules.authors, translatedBookRules.multipleAuthors, translatedBookRules.bodyAuthors, translatedBookRules.judicialOfficers],
    translation_title: [translatedBookRules.translationTitle],
    translator: [translatedBookRules.translator, translatedBookRules.multipleAuthors],
    publisher: [translatedBookRules.publicationDetails.publisher],
    edition: [translatedBookRules.publicationDetails.editionNumber, translatedBookRules.publicationDetails.revisedEditions],
    year: [translatedBookRules.publicationDetails.publicationYear],
    pinpoint: [translatedBookRules.pinpointReferences]
  };

  const ruleSections = fieldToRulesMap[activeField] || [];
  if (!ruleSections.length) return null;

  return (
    <>
      {ruleSections.map((section, index) => (
        section ? (
          <Card key={index} className="mb-4">
            <CardHeader className="py-4 pb-2">
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-2">
                {groupRules(formatRules(section.rules)).map((group: any, groupIndex: number) => {
                  switch (group.type) {
                    case 'regular':
                      return group.items.map((text: string, textIndex: number) => (
                        <div key={`${groupIndex}-${textIndex}`} className="text-sm">
                          {parseItalics(text)}
                        </div>
                      ));
                    case 'bullet':
                      return (
                        <ul key={groupIndex} className="list-disc pl-6 space-y-1">
                          {group.items.map((text: string, textIndex: number) => (
                            <li key={`${groupIndex}-${textIndex}`} className="text-sm">
                              {parseItalics(text)}
                            </li>
                          ))}
                        </ul>
                      );
                    case 'number':
                      return (
                        <ol key={groupIndex} className="list-decimal pl-6 space-y-1">
                          {group.items.map((text: string, textIndex: number) => (
                            <li key={`${groupIndex}-${textIndex}`} className="text-sm">
                              {parseItalics(text)}
                            </li>
                          ))}
                        </ol>
                      );
                  }
                })}
              </div>
              {section.examples && (
                <div className="mt-4 space-y-3">
                  {section.examples.map((example: RuleExample, exampleIndex: number) => (
                    <div key={exampleIndex} className="space-y-2">
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