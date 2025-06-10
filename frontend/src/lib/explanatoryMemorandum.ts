export const explanatoryMemorandumRules = {
  explanatoryType: {
    title: "Explanatory Type",
    rules: [
      "Use 'Explanatory Memorandum', 'Explanatory Statement', or 'Explanatory Note(s)' as appropriate for the jurisdiction and document.",
      "The type should match the terminology used in the document itself."
    ],
    examples: [
      {
        correct: "Explanatory Memorandum",
        explanation: "Standard type for most jurisdictions."
      },
      {
        correct: "Explanatory Notes",
        explanation: "Used in some jurisdictions, such as Queensland."
      },
      {
        correct: "Explanatory Statement",
        explanation: "Used in some jurisdictions, such as the ACT."
      }
    ]
  },
  billCitation: {
    title: "Bill Citation",
    rules: [
      "Cite the Bill in accordance with the standard bill citation format for the relevant jurisdiction.",
      "Include the full title of the Bill, the year, and the jurisdiction in parentheses."
    ],
    examples: [
      {
        correct: "Charter of Human Rights and Responsibilities Bill 2006 (Vic)",
        explanation: "Full citation of the Bill, including year and jurisdiction."
      },
      {
        correct: "Adoption Bill 2009 (Qld)",
        explanation: "Full citation of the Bill, including year and jurisdiction."
      },
      {
        correct: "Human Rights Bill 2003 (ACT)",
        explanation: "Full citation of the Bill, including year and jurisdiction."
      }
    ]
  },
  pinpoint: {
    title: "Pinpoint Reference",
    rules: [
      "Use the page number as the pinpoint reference in the explanatory memorandum citation."
    ],
    examples: [
      {
        correct: "5",
        explanation: "Pinpoint to page 5."
      },
      {
        correct: "6-7",
        explanation: "Pinpoint to pages 6 to 7."
      },
      {
        correct: "29",
        explanation: "Pinpoint to page 29."
      }
    ]
  },
  citationExamples: {
    title: "Full Citation Examples",
    examples: [
      {
        correct: "Explanatory Memorandum, Charter of Human Rights and Responsibilities Bill 2006 (Vic).",
        explanation: "Standard explanatory memorandum citation."
      },
      {
        correct: "Explanatory Notes, Adoption Bill 2009 (Qld) 5–6, 29.",
        explanation: "Explanatory notes with pinpoint to pages."
      },
      {
        correct: "Explanatory Statement, Human Rights Bill 2003 (ACT) 3.",
        explanation: "Explanatory statement with pinpoint to page 3."
      }
    ]
  }
}; 