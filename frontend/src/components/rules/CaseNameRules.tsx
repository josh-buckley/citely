import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { basicRules, specialPartyRules, advancedRules } from "../../lib/caseName";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";
import { useState } from "react";

export function CaseNameRules() {
  const [expandedAccordion, setExpandedAccordion] = useState<string>('');

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2 flex flex-row items-center justify-between">
          <CardTitle>General Rules</CardTitle>
        </CardHeader>
        <CardContent className="pt-3 pb-4">
          <div className="space-y-2">
            {groupRules(formatRules(basicRules.rules)).map((group, groupIndex) => {
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
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>Special Party Rules</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={expandedAccordion}
            onValueChange={setExpandedAccordion}
          >
            {Object.entries(specialPartyRules).map(([key, value]) => (
              <AccordionItem 
                key={key}
                value={key}
                className="border-b"
              >
                <AccordionTrigger className="text-sm hover:no-underline text-left">
                  {value.title}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="space-y-2">
                    {groupRules(formatRules(value.rules)).map((group, groupIndex) => {
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
                    {value.examples.map((example, index) => (
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>Advanced Rules</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {Object.values(advancedRules).map((category) => (
              <div key={category.title} className="space-y-4">
                <h3 className="font-medium">{category.title}</h3>
                <div className="space-y-2">
                  {groupRules(formatRules(category.rules)).map((group, groupIndex) => {
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3 pb-2">
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent className="py-2 space-y-3">
          {Object.values(advancedRules).flatMap(category => 
            'examples' in category ? category.examples : []
          ).map((example, index) => (
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
        </CardContent>
      </Card>
    </>
  );
} 