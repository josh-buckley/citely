export const orderOrRulingRules = {
  instrumentalityOfficer: {
    title: "Instrumentality or Officer",
    rules: [
      "Only the title of an officer (not their name) should be included.",
      "Where a government department or an officer promulgates the instrument, the jurisdiction should be included in parentheses after the name of the department or officer, using the standard jurisdiction abbreviations."
    ],
    examples: [
      {
        correct: "Minister for Immigration and Border Protection (Cth)",
        incorrect: "Peter Dutton, Minister for Immigration and Border Protection (Cth)",
        explanation: "Only the officer's title, not their name, should be included. Jurisdiction is included in parentheses."
      },
      {
        correct: "Australian Taxation Office",
        explanation: "A government department as the instrumentality."
      }
    ]
  },
  instrumentTitle: {
    title: "Instrument Title",
    rules: [
      "Include the full title of the instrument as it appears on the document.",
      "If the instrument has a number or designation as part of its title, include it as it appears."
    ],
    examples: [
      {
        correct: "Income Tax: Carrying on a Business as a Professional Artist",
        explanation: "Full title of the instrument."
      },
      {
        correct: "Direction No 65: Visa Refusal and Cancellation under s501 and Revocation of a Mandatory Cancellation of a Visa under s501CA",
        explanation: "Full title including designation and description."
      }
    ]
  },
  documentNumber: {
    title: "Document Number",
    rules: [
      "A document number should be included only if it appears on the instrument.",
      "The document number should be reproduced using any abbreviations as they appear on the instrument. Do not use full stops in abbreviations."
    ],
    examples: [
      {
        correct: "TR 2005/1",
        explanation: "Document number as it appears on the instrument, with abbreviations and no full stops."
      },
      {
        correct: "CO 05/1230",
        explanation: "Document number as it appears on the instrument."
      }
    ]
  },
  pinpoint: {
    title: "Pinpoint Reference",
    rules: [
      "Use abbreviation of designation and number, separated by space.",
      "Use standard abbreviations except at start of sentence.",
      "Place subsection numbers in parentheses immediately after section number without space.",
      "Use highest 'level' abbreviation for combined references.",
      "No comma between multiple designation-number combinations.",
      "For decimal numbering systems, use lowest 'level' abbreviation with full decimal number."
    ],
    designationTable: [
      { designation: "Appendix", abbreviation: "app", plural: "apps" },
      { designation: "Article", abbreviation: "art", plural: "arts" },
      { designation: "Chapter", abbreviation: "ch", plural: "chs" },
      { designation: "Clause", abbreviation: "cl", plural: "cls" },
      { designation: "Division", abbreviation: "div", plural: "divs" },
      { designation: "Paragraph", abbreviation: "para", plural: "paras" },
      { designation: "Part", abbreviation: "pt", plural: "pts" },
      { designation: "Schedule", abbreviation: "sch", plural: "schs" },
      { designation: "Section", abbreviation: "s", plural: "ss" },
      { designation: "Sub-clause", abbreviation: "sub-cl", plural: "sub-cls" },
      { designation: "Subdivision", abbreviation: "sub-div", plural: "sub-divs" },
      { designation: "Sub-paragraph", abbreviation: "sub-para", plural: "sub-paras" },
      { designation: "Subsection", abbreviation: "sub-s", plural: "sub-ss" }
    ],
    examples: [
      {
        correct: "s 14(1)(a)",
        incorrect: "s 14 (1) (a)",
        explanation: "No spaces between section number and subsections."
      },
      {
        correct: "pt 7 div 3 sub-div 8",
        incorrect: "pt 7, div 3, sub-div 8",
        explanation: "No commas between designation-number combinations."
      }
    ]
  },
  citationExamples: {
    title: "Full Citation Examples",
    examples: [
      {
        correct: "Australian Taxation Office, Income Tax: Carrying on a Business as a Professional Artist (TR 2005/1, 12 January 2005).",
        explanation: "Order or ruling by a government department, with document number and date."
      },
      {
        correct: "Australian Securities and Investments Commission, ASIC Class Order — Credit Rating Agencies (CO 05/1230, 31 December 2005) [4].",
        explanation: "Order with document number, date, and pinpoint reference."
      },
      {
        correct: "Minister for Immigration and Border Protection (Cth), Direction No 65: Visa Refusal and Cancellation under s501 and Revocation of a Mandatory Cancellation of a Visa under s501CA (22 December 2014).",
        explanation: "Order or ruling by an officer, with jurisdiction and date."
      }
    ]
  }
}; 