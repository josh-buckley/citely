import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { journalArticleRules } from "../../lib/journalArticle";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";

interface JournalArticleRulesProps {
  activeField: string;
}

export function JournalArticleRules({ activeField }: JournalArticleRulesProps) {
  const fieldToRulesMap: Record<string, string[]> = {
    author: ['authors', 'multipleAuthors', 'bodyAuthors', 'judicialOfficers'],
    title: ['title', 'symposia','articleParts'],
    short_title: ['shortTitle'],
    year: ['year'],
    volume: ['volumeAndIssue'],
    issue: ['volumeAndIssue'],
    journal: ['journal'],
    starting_page: ['startingPage', 'forthcomingArticles'],
    pinpoint: ['pinpoints', 'onlineJournals']
  };

  const ruleSections = fieldToRulesMap[activeField] || [];
  if (!ruleSections.length) return null;

  return (
    <>
      {(ruleSections as (keyof typeof journalArticleRules)[]).map(section => (
        journalArticleRules[section] ? (
          <Card key={section} className="mb-4">
            <CardHeader className="py-4 pb-2">
              <CardTitle>{journalArticleRules[section].title}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="space-y-2">
                {groupRules(formatRules(journalArticleRules[section].rules)).map((group, groupIndex) => {
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
              {journalArticleRules[section].examples && (
                <div className="mt-4 space-y-3">
                  {journalArticleRules[section].examples.map((example, index) => (
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