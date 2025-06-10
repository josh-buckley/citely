export const hansardRules = {
  jurisdiction: {
    title: "Jurisdiction",
    rules: [
      "Include the jurisdiction (e.g. Commonwealth, State, or Territory) responsible for the parliamentary debate.",
      "Use the full name of the jurisdiction as it appears in the Hansard citation."
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
        correct: "Commonwealth",
        explanation: "Jurisdiction responsible for the debate."
      },
      {
        correct: "Victoria",
        explanation: "Jurisdiction responsible for the debate."
      }
    ]
  },
  chamber: {
    title: "Chamber",
    rules: [
      "Include the name of the chamber (e.g. Senate, House of Representatives, Legislative Council, Legislative Assembly) as it appears in the Hansard citation."
    ],
    examples: [
      {
        correct: "Senate",
        explanation: "Chamber of the Commonwealth Parliament."
      },
      {
        correct: "Legislative Council",
        explanation: "Chamber of the Victorian Parliament."
      }
    ]
  },
  pinpoint: {
    title: "Pinpoint Reference",
    rules: [
      "Use the page number as the pinpoint reference in the Hansard citation."
    ],
    examples: [
      {
        correct: "39",
        explanation: "Page number in the Hansard."
      },
      {
        correct: "6854",
        explanation: "Page number in the Hansard."
      }
    ]
  },
  nameOfSpeaker: {
    title: "Name of Speaker",
    rules: [
      "If a speaker's name is included, their first and last names should appear.",
      "Do not include 'MP', 'MLC', 'MLA', 'Senator' or other designations indicating membership of Parliament in the speaker's name.",
      "If relevant, the position of the speaker within a ministry or shadow ministry (or any part of their position which is relevant) may be included after their name, preceded by a comma."
    ],
    examples: [
      {
        correct: "George Brandis, Attorney-General",
        incorrect: "Senator the Hon George Brandis QC",
        explanation: "Only the first and last names and relevant position should be included. Parliamentary titles and honorifics should be omitted."
      }
    ]
  },
  citationExamples: {
    title: "Full Citation Examples",
    examples: [
      {
        correct: "Commonwealth, Parliamentary Debates, Senate, 7 February 2017, 39 (George Brandis, Attorney-General).",
        explanation: "Hansard citation with jurisdiction, chamber, date, page, and speaker's name and position."
      },
      {
        correct: "Victoria, Parliamentary Debates, Legislative Council, 14 December 2017, 6854.",
        explanation: "Hansard citation with jurisdiction, chamber, date, and page."
      }
    ]
  }
}; 