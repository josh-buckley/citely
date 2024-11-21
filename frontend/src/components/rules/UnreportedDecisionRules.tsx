import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { unreportedDecisionsRules } from "../../lib/unreportedDecisions";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";
import { RulesTable } from "../ui/rules-table";

interface UnreportedDecisionRulesProps {
  activeField: string;
}

export function UnreportedDecisionRules({ activeField }: UnreportedDecisionRulesProps) {
  const fieldToRulesMap: Record<string, keyof typeof unreportedDecisionsRules> = {
    case_name: 'caseName',
    year: 'year',
    unique_court_identifier: 'courtIdentifier',
    judgment_number: 'judgmentNumber',
    judge: 'judge',
    pinpoint: 'pinpoint'
  };

  const section = fieldToRulesMap[activeField];
  if (!section || !unreportedDecisionsRules[section]) return null;

  const rules = unreportedDecisionsRules[section];

  return (
    <Card className="mb-4">
      <CardHeader className="py-4 pb-2">
        <CardTitle>{rules.title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="space-y-2">
          {groupRules(formatRules(rules.rules)).map((group, groupIndex) => {
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
        {'courtIdentifierTable' in rules && (
          <RulesTable 
            headers={["Court", "Identifier", "Years"]}
            rows={rules.courtIdentifierTable.map(item => ({
              court: item.court,
              identifier: item.identifier,
              years: item.years
            }))}
          />
        )}
        <div className="mt-4 space-y-3">
          {rules.examples.map((example, index) => (
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
      </CardContent>
    </Card>
  );
}
