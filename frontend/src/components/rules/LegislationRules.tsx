import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { legislationRules } from "../../lib/legislation";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";
import { RulesTable } from "../ui/rules-table";

interface LegislationRulesProps {
  activeField: string;
}

export function LegislationRules({ activeField }: LegislationRulesProps) {
  if (activeField === 'pinpoint') {
    return (
      <>
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{legislationRules.pinpoint.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(legislationRules.pinpoint.rules)).map((group, groupIndex) => {
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
            {legislationRules.pinpoint.designationTable && (
              <RulesTable 
                headers={["Designation", "Abbreviation", "Plural"]}
                rows={legislationRules.pinpoint.designationTable.map(item => ({
                  designation: item.designation,
                  abbreviation: item.abbreviation,
                  plural: item.plural
                }))}
              />
            )}
            <div className="mt-4 space-y-3">
              {legislationRules.pinpoint.examples.map((example, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-sm bg-green-100 text-green-800 p-2 rounded-lg flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-800" />
                    {parseItalics(example.correct)}
                  </div>
                  {'incorrect' in example && (
                    <div className="text-sm bg-red-100 text-red-800 p-2 rounded-lg flex items-center gap-2">
                      <X className="h-4 w-4 text-red-800" />
                      {parseItalics(example.incorrect)}
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
            <CardTitle>{legislationRules.definitions.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(legislationRules.definitions.rules)).map((group, groupIndex) => {
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
              {legislationRules.definitions.examples.map((example, index) => (
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
          <CardTitle>{legislationRules.year.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(legislationRules.year.rules)).map((group, groupIndex) => {
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
            {legislationRules.year.examples.map((example, index) => (
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
            <CardTitle>{legislationRules.title.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(legislationRules.title.rules)).map((group, groupIndex) => {
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
              {legislationRules.title.examples.map((example, index) => (
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
            <CardTitle>{legislationRules.parallelCitations.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(legislationRules.parallelCitations.rules)).map((group, groupIndex) => {
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
              {legislationRules.parallelCitations.examples.map((example, index) => (
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
          <CardTitle>{legislationRules.jurisdiction.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(legislationRules.jurisdiction.rules)).map((group, groupIndex) => {
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
          {legislationRules.jurisdiction.jurisdictionTable && (
            <RulesTable 
              headers={["Jurisdiction", "Abbreviation"]}
              rows={legislationRules.jurisdiction.jurisdictionTable.map(item => ({
                jurisdiction: item.jurisdiction,
                abbreviation: item.abbreviation
              }))}
            />
          )}
          <div className="mt-4 space-y-3">
            {legislationRules.jurisdiction.examples.map((example, index) => (
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
          <CardTitle>{legislationRules.individualParts.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(legislationRules.individualParts.rules)).map((group, groupIndex) => {
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
            {legislationRules.individualParts.examples.map((example, index) => (
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