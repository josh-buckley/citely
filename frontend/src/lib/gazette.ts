export const gazetteRules = {
  authors: {
    title: "Author(s) (if applicable)",
    rules: [
      "Include the author of the notice if available. This may be a government department, officer, or other entity.",
      "If there is no clear author, this field may be omitted."
    ],
    examples: [
      {
        correct: "Minister for Lands (WA)",
        explanation: "A government officer as the author of the notice."
      },
      {
        correct: "Commonwealth",
        explanation: "The Commonwealth as the author."
      }
    ]
  },
  titleOfNotice: {
    title: "Title of Notice (if applicable)",
    rules: [
      "Include the title of the notice in single quotation marks if available.",
      "If there is no clear title, this field may be omitted."
    ],
    examples: [
      {
        correct: "'Land Acquisition and Public Works Act 1902 — Native Title Act 1993 (Commonwealth) — Notice of Intention to Take Land for a Public Work'",
        explanation: "Full title of the notice in single quotation marks."
      },
      {
        correct: "'Australian Capital Territory Teaching Service'",
        explanation: "Title of the notice in single quotation marks."
      }
    ]
  },
  jurisdiction: {
    title: "Jurisdiction",
    rules: [
      "Include the jurisdiction (e.g. Commonwealth, State, or Territory) responsible for the gazette or notice.",
      "Use the full name of the jurisdiction as it appears in the gazette."
    ],
    jurisdictionTable: [
      { jurisdiction: "Commonwealth" },
      { jurisdiction: "Australian Capital Territory" },
      { jurisdiction: "New South Wales" },
      { jurisdiction: "Northern Territory" },
      { jurisdiction: "Queensland" },
      { jurisdiction: "South Australia" },
      { jurisdiction: "Tasmania" },
      { jurisdiction: "Victoria" },
      { jurisdiction: "Western Australia" }
    ],
    examples: [
      {
        correct: "Western Australia",
        explanation: "Jurisdiction responsible for the gazette."
      },
      {
        correct: "Australian Capital Territory",
        explanation: "Jurisdiction responsible for the gazette."
      }
    ]
  },
  gazetteTitle: {
    title: "Gazette Title",
    rules: [
      "Include the full title of the gazette as it appears on the document."
    ],
    examples: [
      {
        correct: "Western Australian Government Gazette",
        explanation: "Full title of the gazette."
      },
      {
        correct: "Australian Capital Territory Gazette",
        explanation: "Full title of the gazette."
      },
      {
        correct: "Gazette: Special",
        explanation: "Special edition of the Commonwealth Gazette."
      }
    ]
  },
  gazetteNumber: {
    title: "Gazette Number",
    rules: [
      "Include the gazette number as it appears on the document."
    ],
    examples: [
      {
        correct: "No 1",
        explanation: "Gazette number as it appears."
      },
      {
        correct: "No S 489",
        explanation: "Special gazette number."
      },
      {
        correct: "No 27",
        explanation: "Gazette number as it appears."
      }
    ]
  },
  startingPage: {
    title: "Starting Page",
    rules: [
      "Include the starting page number if the notice appears in a paginated gazette."
    ],
    examples: [
      {
        correct: "3",
        explanation: "Starting page of the notice."
      }
    ]
  },
  pinpoint: {
    title: "Pinpoint Reference",
    rules: [
      "Use the page number as the pinpoint reference in the gazette citation."
    ],
    examples: [
      {
        correct: "1142",
        explanation: "Pinpoint to a specific page in the gazette."
      },
      {
        correct: "1142, 1143",
        explanation: "Pinpoint to multiple pages in the gazette."
      }
    ]
  },
  citationExamples: {
    title: "Full Citation Examples",
    examples: [
      {
        correct: "Commonwealth, Gazette: Special, No S 489, 1 December 2004.",
        explanation: "Basic gazette citation with jurisdiction, gazette title, number, and date."
      },
      {
        correct: "'Australian Capital Territory Teaching Service' in Australian Capital Territory, Australian Capital Territory Gazette, No 1, 24 May 1989, 3.",
        explanation: "Notice with title, jurisdiction, gazette title, number, date, and starting page."
      },
      {
        correct: "Minister for Lands (WA), 'Land Acquisition and Public Works Act 1902 — Native Title Act 1993 (Commonwealth) — Notice of Intention to Take Land for a Public Work' in Western Australia, Western Australian Government Gazette, No 27, 18 February 1997, 1142, 1143.",
        explanation: "Notice with author, title, jurisdiction, gazette title, number, date, and multiple starting pages."
      }
    ]
  }
}; 