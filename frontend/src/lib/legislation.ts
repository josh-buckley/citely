export const legislationRules = {
    parallelCitations: {
      title: "Order of Parallel Australian Statutes and Bills",
      rules: [
        "When citing equivalent Acts or Bills across multiple jurisdictions:",
        "1. Commonwealth Acts/Bills appear first",
        "2. State and territory Acts/Bills follow in alphabetical order by jurisdiction",
        "Follow this order even if not citing all jurisdictions",
        "Different order may be used only if important to meaning"
      ],
      examples: [
        {
          correct: "<i>Trade Practices Act 1974</i> (Cth) s 52(1); <i>Fair Trading Act 1992</i> (ACT) s 12(1); <i>Fair Trading Act 1987</i> (NSW) s 42(1)",
          explanation: "Commonwealth first, followed by states/territories alphabetically."
        },
        {
          correct: "<i>Oaths and Affirmations Act 1984</i> (ACT) s 14(1); <i>Oaths Act 1939</i> (NT) s 8; <i>Oaths Act 1867</i> (Qld) s 5",
          explanation: "States/territories in alphabetical order when no Commonwealth legislation."
        }
      ]
    },
    title: {
      title: "Title",
      rules: [
        "Begin with short title of the Act in italics.",
        "Use long title only if Act does not contain a short title.",
        "Titles should appear as in statute book, subject to chapter 1.",
        "Do not use full stops in abbreviations.",
        "Include parliamentary number (e.g., '(No 1)') where multiple Acts have same title."
      ],
      examples: [
        {
          correct: "<i>Evidence Act 1995</i> (NSW)",
          incorrect: "An Act about the law of evidence, and for related purposes (NSW)",
          explanation: "Use short title instead of long title."
        },
        {
          correct: "<i>Financial Framework Legislation Amendment Act (No 2) 2012</i> (Cth)",
          explanation: "Include parliamentary number when multiple Acts have same title."
        }
      ]
    },
    year: {
      title: "Year",
      rules: [
        "Include year Act was originally passed in italics following the title.",
        "Include year whether or not Act includes it in official short title.",
        "Citations refer to Act as amended (and consolidated).",
        "Use year of original enactment regardless of when provisions were introduced.",
        "For ACT and NT, use year original ordinance was enacted."
      ],
      examples: [
        {
          correct: "<i>Meteorites Act 1973</i> (Tas)",
          incorrect: "<i>Meteorites Act</i> 1973 (Tas)",
          explanation: "Year should be italicized with the title."
        }
      ]
    },
    jurisdiction: {
      title: "Jurisdiction",
      rules: [
        "Include abbreviated jurisdiction in parentheses after year.",
        "Do not italicize jurisdiction.",
        "Use standard jurisdiction abbreviations."
      ],
      jurisdictionTable: [
        { jurisdiction: "Commonwealth", abbreviation: "Cth" },
        { jurisdiction: "Australian Capital Territory", abbreviation: "ACT" },
        { jurisdiction: "New South Wales", abbreviation: "NSW" },
        { jurisdiction: "Northern Territory", abbreviation: "NT" },
        { jurisdiction: "Queensland", abbreviation: "Qld" },
        { jurisdiction: "South Australia", abbreviation: "SA" },
        { jurisdiction: "Tasmania", abbreviation: "Tas" },
        { jurisdiction: "Victoria", abbreviation: "Vic" },
        { jurisdiction: "Western Australia", abbreviation: "WA" }
      ],
      examples: [
        {
          correct: "<i>Misrepresentation Act 1972</i> (SA)",
          explanation: "Using standard jurisdiction abbreviation."
        }
      ]
    },
    pinpoint: {
      title: "Pinpoint References",
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
    multiplePinpoints: {
      title: "Multiple Pinpoint References",
      rules: [
        "Use plural abbreviation of highest 'level' cited.",
        "Separate consecutive pinpoints with en-dash (–).",
        "Separate non-consecutive pinpoints with commas.",
        "Do not use 'and' to separate final pinpoints.",
        "Write full section number in spans of alphanumeric or decimal sections."
      ],
      examples: [
        {
          correct: "ss 6(7)(b)–(d)",
          incorrect: "s 6(7)(b)–(d)",
          explanation: "Use plural abbreviation for multiple references."
        },
        {
          correct: "ss 92(1), (4), (7)",
          incorrect: "ss 92(1), (4) and (7)",
          explanation: "Use commas without 'and' for non-consecutive pinpoints."
        }
      ]
    },
    definitions: {
      title: "Definitions",
      rules: [
        "For unnumbered definitions use format: s Section Number (definition of 'Defined Term')",
        "Replace 's Section Number' with appropriate schedule if definition in schedule.",
        "For definition paragraphs, include 'para' reference after defined term without comma.",
        "For numbered definitions, cite as normal section.",
        "Place defined term in single quotes."
      ],
      examples: [
        {
          correct: "<i>Property Law Act 1958</i> (Vic) s 3 (definition of 'legal practitioner')",
          explanation: "Standard definition citation."
        },
        {
          correct: "<i>Corporations Act 2001</i> (Cth) s 9 (definition of 'administrator' para (a)(i))",
          incorrect: "<i>Corporations Act 2001</i> (Cth) s 9(a)(i)",
          explanation: "Include 'definition of' and paragraph reference."
        }
      ]
    },
    individualParts: {
      title: "Individual Parts of Legislative Materials",
      rules: [
        "Short title may be given to portion of Act.",
        "Place short title after pinpoint to relevant portion.",
        "Short title should be italicised.",
        "Only introduce one short title per citation.",
        "Subsequent pinpoints refer to sections within that portion."
      ],
      examples: [
        {
          correct: "<i>Criminal Code Act 1995</i> (Cth) sch 1 ('<i>Criminal Code</i>')",
          explanation: "Short title for portion of Act."
        },
        {
          correct: "<i>Competition and Consumer Act 2010</i> (Cth) sch 2 ('<i>Australian Consumer Law</i>')",
          explanation: "Short title clearly referring to portion of legislation."
        }
      ]
    }
  };