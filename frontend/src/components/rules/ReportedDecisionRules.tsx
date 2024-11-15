import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { basicRules, specialPartyRules, advancedRules } from "../../lib/caseName";
import { reportedDecisionsRules } from "../../lib/reportedDecisions";
import { parseItalics, formatRules, groupRules } from "../../lib/formatters";
import { useState } from "react";

interface ReportedDecisionRulesProps {
  activeField: string;
}

export function ReportedDecisionRules({ activeField }: ReportedDecisionRulesProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<string>('');

  // Handle case name rules
  if (activeField === 'case_name') {
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
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              value={expandedAccordion}
              onValueChange={setExpandedAccordion}
            >
              {Object.entries(advancedRules).map(([key, category]) => (
                <AccordionItem 
                  key={key}
                  value={key}
                  className="border-b"
                >
                  <AccordionTrigger className="text-sm hover:no-underline text-left">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
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
                    {'examples' in category && (
                      <div className="mt-4 space-y-3">
                        {category.examples.map((example, index) => (
                          <div key={index} className="space-y-2">
                            <div className="text-sm bg-green-100 text-green-800 p-2 rounded-lg flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-800" />
                              {parseItalics(example.correct)}
                            </div>
                            <div className="text-sm text-gray-500">{example.explanation}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3 pb-2">
            <CardTitle>Examples</CardTitle>
          </CardHeader>
          <CardContent className="py-2 space-y-3">
            {Object.values(advancedRules)
              .flatMap(category => 'examples' in category ? category.examples : [])
              .map((example, index) => (
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

  // Handle year and volume rules
  if (activeField === 'year' || activeField === 'volume') {
    return (
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>{reportedDecisionsRules.yearAndVolume.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(reportedDecisionsRules.yearAndVolume.rules)).map((group, groupIndex) => {
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
            {reportedDecisionsRules.yearAndVolume.examples.map((example, index) => (
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

  // Handle law report series rules
  if (activeField === 'law_report_series') {
    return (
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>{reportedDecisionsRules.lawReportSeries.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(reportedDecisionsRules.lawReportSeries.rules)).map((group, groupIndex) => {
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
            {reportedDecisionsRules.lawReportSeries.examples.map((example, index) => (
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
    );
  }

  // Handle starting page rules
  if (activeField === 'starting_page') {
    return (
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>{reportedDecisionsRules.startingPage.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(reportedDecisionsRules.startingPage.rules)).map((group, groupIndex) => {
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
            {reportedDecisionsRules.startingPage.examples.map((example, index) => (
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

  // Handle pinpoint rules
  if (activeField === 'pinpoint') {
    return (
      <>
        {/* Court */}
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{reportedDecisionsRules.pinpointCourt.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(reportedDecisionsRules.pinpointCourt.rules)).map((group, groupIndex) => {
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
              {reportedDecisionsRules.pinpointCourt.examples.map((example, index) => (
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

        {/* Judicial Officers */}
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{reportedDecisionsRules.pinpointJudges.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(reportedDecisionsRules.pinpointJudges.rules)).map((group, groupIndex) => {
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
              {reportedDecisionsRules.pinpointJudges.examples.map((example, index) => (
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

        {/* Agreement or Dissent */}
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{reportedDecisionsRules.pinpointAgreement.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(reportedDecisionsRules.pinpointAgreement.rules)).map((group, groupIndex) => {
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
              {reportedDecisionsRules.pinpointAgreement.examples.map((example, index) => (
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

        {/* Joint and Separate Judgments */}
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{reportedDecisionsRules.pinpointJoint.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(reportedDecisionsRules.pinpointJoint.rules)).map((group, groupIndex) => {
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
              {reportedDecisionsRules.pinpointJoint.examples.map((example, index) => (
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

        {/* Arguments and Submissions */}
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{reportedDecisionsRules.pinpointArgument.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(reportedDecisionsRules.pinpointArgument.rules)).map((group, groupIndex) => {
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
              {reportedDecisionsRules.pinpointArgument.examples.map((example, index) => (
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

        {/* References to Two or More Judicial Officers */}
        <Card className="mb-4">
          <CardHeader className="py-4 pb-2">
            <CardTitle>{reportedDecisionsRules.pinpointMultiple.title}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {groupRules(formatRules(reportedDecisionsRules.pinpointMultiple.rules)).map((group, groupIndex) => {
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
              {reportedDecisionsRules.pinpointMultiple.examples.map((example, index) => (
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

  // Handle short title rules
  if (activeField === 'shortTitle') {
    return (
      <Card className="mb-4">
        <CardHeader className="py-4 pb-2">
          <CardTitle>{reportedDecisionsRules.shortTitle.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="space-y-2">
            {groupRules(formatRules(reportedDecisionsRules.shortTitle.rules)).map((group, groupIndex) => {
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
            {reportedDecisionsRules.shortTitle.examples.map((example, index) => (
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