import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { gazetteRules } from "../../lib/gazette";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";
import { RulesTable } from "../ui/rules-table";

interface GazetteRulesProps {
  activeField: string;
}

export function GazetteRules({ activeField }: GazetteRulesProps) {
  const rulesMap: Record<string, any> = {
    authors: gazetteRules.authors,
    titleOfNotice: gazetteRules.titleOfNotice,
    jurisdiction: gazetteRules.jurisdiction,
    gazetteTitle: gazetteRules.gazetteTitle,
    gazetteNumber: gazetteRules.gazetteNumber,
    startingPage: gazetteRules.startingPage,
    pinpoint: gazetteRules.pinpoint,
    citationExamples: gazetteRules.citationExamples,
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
        {field.jurisdictionTable && (
          <RulesTable
            headers={["Jurisdiction"]}
            rows={field.jurisdictionTable.map((item: any) => ({
              jurisdiction: item.jurisdiction
            }))}
          />
        )}
        {field.designationTable && (
          <RulesTable
            headers={["Designation", "Abbreviation", "Plural"]}
            rows={field.designationTable.map((item: any) => ({
              designation: item.designation,
              abbreviation: item.abbreviation,
              plural: item.plural
            }))}
          />
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