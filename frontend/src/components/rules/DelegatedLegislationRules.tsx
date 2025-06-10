import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { delegatedLegislationRules } from "../../lib/delegatedLegislation";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";
import { RulesTable } from "../ui/rules-table";

interface DelegatedLegislationRulesProps {
  activeField: string;
}

export function DelegatedLegislationRules({ activeField }: DelegatedLegislationRulesProps) {
  if (activeField === 'pinpoint') {
    return (
      <>
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{delegatedLegislationRules.pinpoint.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(delegatedLegislationRules.pinpoint.rules)).map((group, groupIndex) => {
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
            {delegatedLegislationRules.pinpoint.designationTable && (
              <RulesTable 
                headers={["Designation", "Abbreviation", "Plural"]}
                rows={delegatedLegislationRules.pinpoint.designationTable.map(item => ({
                  designation: item.designation,
                  abbreviation: item.abbreviation,
                  plural: item.plural
                }))}
              />
            )}
            <div className="mt-4 space-y-3">
              {delegatedLegislationRules.pinpoint.examples.map((example, index) => (
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

        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{delegatedLegislationRules.definitions.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(delegatedLegislationRules.definitions.rules)).map((group, groupIndex) => {
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
            <div className="mt-4 space-y-3">
              {delegatedLegislationRules.definitions.examples.map((example, index) => (
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
      </>
    );
  }

  if (activeField === 'year') {
    return (
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>{delegatedLegislationRules.year.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(delegatedLegislationRules.year.rules)).map((group, groupIndex) => {
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
          <div className="mt-4 space-y-3">
            {delegatedLegislationRules.year.examples.map((example, index) => (
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

  if (activeField === 'title') {
    return (
      <>
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{delegatedLegislationRules.title.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(delegatedLegislationRules.title.rules)).map((group, groupIndex) => {
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
            <div className="mt-4 space-y-3">
              {delegatedLegislationRules.title.examples.map((example, index) => (
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

        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{delegatedLegislationRules.parallelCitations.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(delegatedLegislationRules.parallelCitations.rules)).map((group, groupIndex) => {
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
            <div className="mt-4 space-y-3">
              {delegatedLegislationRules.parallelCitations.examples.map((example, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-sm bg-green-100 text-green-800 p-2 rounded-lg flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-800" />
                    {parseItalics(example.correct)}
                  </div>
                  <div className="text-sm text-gray-500">{example.explanation}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  if (activeField === 'jurisdiction') {
    return (
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>{delegatedLegislationRules.jurisdiction.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(delegatedLegislationRules.jurisdiction.rules)).map((group, groupIndex) => {
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
          {delegatedLegislationRules.jurisdiction.jurisdictionTable && (
            <RulesTable 
              headers={["Jurisdiction", "Abbreviation"]}
              rows={delegatedLegislationRules.jurisdiction.jurisdictionTable.map(item => ({
                jurisdiction: item.jurisdiction,
                abbreviation: item.abbreviation
              }))}
            />
          )}
          <div className="mt-4 space-y-3">
            {delegatedLegislationRules.jurisdiction.examples.map((example, index) => (
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

  if (activeField === 'short_title') {
    return (
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>{delegatedLegislationRules.individualParts.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(delegatedLegislationRules.individualParts.rules)).map((group, groupIndex) => {
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
          <div className="mt-4 space-y-3">
            {delegatedLegislationRules.individualParts.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm bg-green-100 text-green-800 p-2 rounded-lg flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-800" />
                  {parseItalics(example.correct)}
                </div>
                <div className="text-sm text-gray-500">{example.explanation}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
} 