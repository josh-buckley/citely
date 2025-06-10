export const delegatedNonGovernmentLegislationRules = {
  issuingBody: {
    title: "Issuing Body",
    rules: [
      "Omit terms designating the issuing body as a company (e.g. 'Pty', 'Ltd', 'Co', 'Inc') from its name.",
      "Omit 'the' at the start of the name.",
      "Use the name of the non-government entity as it appears, after applying the above rules."
    ],
    examples: [
      {
        correct: "ASX",
        incorrect: "The ASX Ltd",
        explanation: "Omit 'the' at the start and company designators from the name."
      },
      {
        correct: "Law Society of the Australian Capital Territory",
        incorrect: "The Law Society of the Australian Capital Territory Inc",
        explanation: "Omit 'the' at the start and 'Inc' from the name."
      },
      {
        correct: "Victorian Bar",
        incorrect: "The Victorian Bar Inc",
        explanation: "Omit 'the' at the start and 'Inc' from the name."
      }
    ]
  },
  title: {
    title: "Title",
    rules: [
      "Include the full title of the delegated legislation as it appears on the document.",
      "If the legislation is frequently updated or does not include a document number, use the date of the version cited or the effective date of the provision cited in parentheses, introduced by 'at'."
    ],
    examples: [
      {
        correct: "Listing Rules (at 19 December 2016)",
        explanation: "Title with version date in parentheses."
      },
      {
        correct: "ACT Legal Profession (Solicitors) Conduct Rules 2015 (at 20 November 2015)",
        explanation: "Title with version date in parentheses."
      },
      {
        correct: "Compulsory Continuing Professional Development Rules (at 1 April 2011)",
        explanation: "Title with version date in parentheses."
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
        correct: "r 8.1",
        explanation: "Rule 8.1 of the delegated legislation."
      },
      {
        correct: "rr 4–5",
        explanation: "Rules 4 to 5 of the delegated legislation."
      }
    ]
  },
  citationExamples: {
    title: "Full Citation Examples",
    examples: [
      {
        correct: "ASX, Listing Rules (at 19 December 2016).",
        explanation: "Delegated legislation by a non-government entity, with version date."
      },
      {
        correct: "Law Society of the Australian Capital Territory, ACT Legal Profession (Solicitors) Conduct Rules 2015 (at 20 November 2015) r 8.1.",
        explanation: "Delegated legislation with pinpoint reference."
      },
      {
        correct: "Victorian Bar, Compulsory Continuing Professional Development Rules (at 1 April 2011) rr 4–5.",
        explanation: "Delegated legislation with pinpoint reference to multiple rules."
      }
    ]
  }
}; 