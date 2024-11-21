import { basicRules } from './caseName';
import { reportedDecisionsRules } from './reportedDecisions';

export const arbitrationRules = {
  caseName: reportedDecisionsRules.caseName,
  awardDescription: {
    title: "Award Description",
    rules: [
      "The award description and forum should include the type of award (e.g., 'Award', 'Preliminary Award', 'Final Award', 'Award and Opinion')",
    ],
    examples: [
      {
        correct: "Sandline International Inc v Papua New Guinea (Award, Sir Edward Somers, Sir Michael Kerr and Sir Daryl Dawson, 9 October 1998) [10.2]",
        explanation: "Basic award with arbitrators' names and pinpoint reference"
      },
      {
        correct: "Beckman Instruments Inc v Overseas Private Investment Corporation (Award and Opinion, American Arbitration Association Commercial Arbitration Tribunal, Case No 16 199 00209 87G, 20 February 1988) reported in (1988) 27 ILM 1260, 1263",
        explanation: "Award with tribunal name, case number, and report citation"
      },
      {
        correct: "Meiki Co Ltd v Bucher-Guyer SA (Preliminary Award, International Chamber of Commerce, Case No 2114 of 1972, 10 October 1972) reported in Sigvard Jarvin and Yves Derains (eds), Collection of ICC Arbitral Awards: 1974–1985 (Kluwer, 1990) 49, 51",
        explanation: "Award reported in a collection with editors"
      },
      {
        correct: "Final Award, Netherlands Arbitration Institute, Case No 1930, 12 October 1999 reported in (2001) 26 Yearbook — Commercial Arbitration 181, 184 [5]–[6]",
        explanation: "Award without party names reported in yearbook with paragraph references"
      }
    ]
  },
  forum: {
    title: "Forum",
    rules: [
      "The forum should be specified using the full name of the arbitration institution (e.g., 'International Chamber of Commerce', 'American Arbitration Association').",
    ],
    examples: [
      {
        correct: "(Award, International Chamber of Commerce, Case No 2114 of 1972)",
        explanation: "Institutional arbitration with forum name"
      },
      {
        correct: "(Award, Sir Edward Somers, Sir Michael Kerr and Sir Daryl Dawson)",
        explanation: "Ad hoc arbitration with arbitrators' names"
      }
    ]
  },
  caseAwardNumber: {
    title: "Case/Award Number",
    rules: [
      "The case or award number should:",
      "1. Use the designation appropriate to the forum (e.g., 'Case No', 'Award No', 'Matter No')",
      "2. Be presented in the format used by the forum",
      "3. Include any year designations if part of the forum's numbering system"
    ],
    examples: [
      {
        correct: "Case No 16 199 00209 87G",
        explanation: "AAA Commercial Arbitration Tribunal format"
      },
      {
        correct: "Case No 2114 of 1972",
        explanation: "ICC format with year designation"
      },
      {
        correct: "Case No 1930",
        explanation: "Simple case number format"
      }
    ]
  },
  pinpoint: reportedDecisionsRules.pinpointReference
};
