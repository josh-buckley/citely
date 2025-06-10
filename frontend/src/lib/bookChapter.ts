export const bookChapterRules = {
  authors: {
    title: "General Rules for Authors",
    rules: [
      "Authors' names should appear exactly as on title page, with exceptions:",
      "- No spaces between initials and no full stops after initials.",
      "- Omit post-nominals (AM, LLB, etc).",
      "- Omit honorific titles (Dr, Prof, etc) except 'Sir', 'Dame' and peerage titles.",
      "Use honorific titles in discursive text only (both body and footnotes)."
    ],
    examples: [
      {
        context: "In citations",
        correct: "Katy Barnett",
        incorrect: "Associate Professor Katy Barnett",
        explanation: "Omit honorific titles in citations."
      },
      {
        context: "In citations",
        correct: "Lord Nicholls",
        incorrect: "The Rt Hon Lord Nicholls",
        explanation: "Include only peerage title."
      },
      {
        context: "In discursive text",
        correct: "Professor Ian Malkin",
        incorrect: "Ian Malkin",
        explanation: "Honorific titles may be used in text."
      }
    ],
    nameFormats: [
      { inText: "Associate Professor Katy Barnett", inCitation: "Katy Barnett" },
      { inText: "Dame Nellie Melba", inCitation: "Dame Nellie Melba" },
      { inText: "Lord Nicholls", inCitation: "Lord Nicholls" },
      { inText: "Professor Ian Malkin", inCitation: "Ian Malkin" },
      { inText: "Baroness Hale", inCitation: "Baroness Hale" },
      { inText: "Dr Cockburn", inCitation: "John Cockburn" },
      { inText: "Ms Sharon Rodrick", inCitation: "Sharon Rodrick" },
      { inText: "Mr Gageler SC", inCitation: "Stephen Gageler" },
      { inText: "HLA Hart", inCitation: "HLA Hart" },
      { inText: "Chief Justice Susan Kiefel", inCitation: "Chief Justice Susan Kiefel" }
    ]
  },
  editors: {
    title: "General Rules for Editors",
    rules: [
        "The word 'in' should precede the editor's name(s).",
        "Editors' names should be treated in the same way as authors' names.",
        "The name(s) should be followed by '(ed)' for a single editor, or '(eds)' for multiple editors."
    ],
    examples: [
      {
        correct: "in Grant Huscroft (ed),",
        explanation: "Single editor."
      },
      {
        correct: "in Nicholas Aroney, Scott Prasser and JR Nethercote (eds),",
        explanation: "Multiple editors."
      }
    ]
  },
  multipleAuthors: {
    title: "Multiple Authors or Editors",
    rules: [
      "For two or three authors/editors, include all names.",
      "Separate the last two names with 'and'.",
      "For more than three authors/editors, use the first name followed by 'et al'.",
      "Follow the same rules in subsequent references."
    ],
    examples: [
      {
        correct: "James Edelman and Elise Bant",
        explanation: "Two authors separated by 'and'."
      },
      {
        correct: "Paul Rishworth et al",
        explanation: "More than three authors using et al."
      }
    ]
  },
  bodyAuthors: {
    title: "Publications Authored by a Body",
    rules: [
      "Use body's name as author.",
      "Include jurisdiction abbreviation in parentheses for government departments if not apparent.",
      "For subdivisions format as: Individual/Subdivision, Body.",
      "Include only most specific subdivision unless ambiguous.",
      "Omit author if not prominently credited.",
      "Use 'Commonwealth' for Commonwealth of Australia.",
      "Omit corporate status terms (Pty, Ltd, Co, Inc).",
      "Use English-language title only for multilingual bodies."
    ],
    examples: [
      {
        correct: "Department for Women (NSW)",
        explanation: "Government department with jurisdiction."
      },
      {
        correct: "Information Management Committee, Department of Justice and Attorney-General (Qld)",
        explanation: "Subdivision of government body."
      },
      {
        correct: "Commonwealth",
        incorrect: "Commonwealth of Australia",
        explanation: "Correct rendering of Commonwealth."
      }
    ]
  },
  judicialOfficers: {
    title: "Judicial Officers",
    rules: [
      "For curial writing (judgments):",
      "- Include surname and judicial/peerage title.",
      "- Use appropriate abbreviation after name.",
      "- Follow rules for multiple judicial officers.",
      "For extra-curial writing (not judgments):",
      "- Omit judicial title unless it appears on source.",
      "- Include 'Sir', 'Dame' or peerage titles.",
      "- For former officers, omit judicial title but may include honorifics in text.",
      "Omit territorial designation of peers unless needed to avoid confusion."
    ],
    examples: [
      {
        context: "Curial writing",
        correct: "Dixon J noted in Essendon Corporation v Criterion Theatres Ltd...",
        explanation: "Judicial officer writing in judgment."
      },
      {
        context: "Extra-curial writing",
        correct: "James Edelman and Elise Bant",
        incorrect: "Justice James Edelman and Elise Bant",
        explanation: "Judicial officer writing outside judgment."
      },
      {
        context: "Former judicial officer",
        correct: "Michael Kirby",
        incorrect: "Justice Michael Kirby",
        explanation: "Former judicial officer in citation."
      }
    ]
  },
  title: {
    title: "Book Title",
    rules: [
      "The title of the book should be italicised.",
      "Titles should appear as in original source, with exceptions:",
      "- Punctuation should adhere to rule 1.6.",
      "- Capitalisation should adhere to rule 1.7.",
      "- Use colon to separate title from subtitle, regardless of original punctuation.",
      "- Include only first subtitle, unless second subtitle is a span of dates.",
      "Words normally italicised should only be italicised if italicised in original source.",
      "If entire source title is italicised (as with books), no part should appear in roman font."
    ],
    examples: [
      {
        correct: "<i>Expounding the Constitution: Essays in Constitutional Theory</i>",
        incorrect: "<i>Expounding the Constitution—Essays in Constitutional Theory</i>",
        explanation: "Use a colon to separate a title from a subtitle."
      },
      {
        correct: "<i>The Constitution of Malaysia: Further Perspectives and Developments</i>",
        incorrect: "<i>The Constitution of Malaysia: Further Perspectives and Developments: Essays in Honour of Tun Mohamed Suffian</i>",
        explanation: "Include only the first subtitle."
      }
    ]
  },
  chapterTitle: {
    title: "Chapter Title",
    rules: [
        "The title of the chapter should be enclosed in single quotation marks.",
        "There should be no punctuation other than the closing quotation mark between the chapter title and the word 'in'.",
        "Capitalisation should adhere to rule 1.7."
    ],
    examples: [
        {
            correct: "'Introduction to Tort Law' in ...",
            explanation: "Chapter title in single quotes, followed by 'in'."
        }
    ]
  },
  publicationDetails: {
    title: "Publication Details",
    publisher: {
      title: "Publisher",
      rules: [
        "Include publisher's name in parentheses after title.",
        "Follow with a comma.",
        "Use name as on title page with exceptions:",
        "- Use publication information page if no publisher on title page.",
        "- Omit 'the' at start of publisher's name.",
        "- Omit corporate status abbreviations (Pty, Ltd, Co, etc).",
        "- Generally omit geographical designations unless necessary.",
        "- Omit subdivisions within companies.",
        "Other publisher rules:",
        "- Omit if publisher same as author.",
        "- Include only first-listed publisher if multiple publishers.",
        "- Use only imprint if specified.",
        "- Include only publisher for books published on behalf of another organization.",
        "- Use only English-language name for multilingual publishers.",
        "- Omit publisher for older works listing printers/booksellers instead."
      ],
      examples: [
        {
          correct: "(Federation Press, 2012)",
          incorrect: "(The Federation Press, 2012)",
          explanation: "Omit 'the' from publisher name."
        },
        {
          correct: "(Lawbook, 2nd ed, 2016)",
          incorrect: "(Lawbook Co, 2nd ed, 2016)",
          explanation: "Omit corporate status abbreviations."
        }
      ]
    },
    editionNumber: {
      title: "Edition",
      rules: [
        "Include edition number after publisher's name when multiple editions exist.",
        "Show ordinal indicator in superscript.",
        "Format as: Ordinal Edition Number ed,."
      ],
      examples: [
        {
          correct: "(LexisNexis Butterworths, 15th ed, 2013)",
          explanation: "Edition number with superscript ordinal."
        }
      ]
    },
    revisedEditions: {
      title: "Revised Editions",
      rules: [
        "Use 'rev ed' for revised/expanded/updated editions without new number.",
        "Place after edition number if exists, with space.",
        "Place after publisher's name with comma if no edition number.",
        "Use '1st rev ed' only if edition number appears in book."
      ],
      examples: [
        {
          correct: "(Kluwer Law International, 3rd rev ed, 2008)",
          explanation: "Revised edition with edition number."
        },
        {
          correct: "(Oxford University Press, rev ed, 2012)",
          explanation: "Revised edition without edition number."
        }
      ]
    },
    publicationYear: {
      title: "Year of Publication",
      rules: [
        "Include year of publication after publisher and edition details.",
        "Use year of cited edition (not first publication year).",
        "For multi-volume works:",
        "- Include span of years for completed works.",
        "- Use first year with en-dash for ongoing publications."
      ],
      examples: [
        {
          correct: "(Duckworth, 1982)",
          explanation: "Standard single year."
        },
        {
          correct: "(Cambridge University Press, 1999–2003)",
          explanation: "Span of years for multi-volume work."
        }
      ]
    }
  },
  multiVolume: {
    title: "Multi-volume Works",
    rules: [
      "Include volume number before publisher details.",
      "Format as: vol X,.",
      "If volume has unique title, include it before volume number.",
      "If citing whole work, do not include volume number."
    ],
    examples: [
      {
        correct: "<i>Commentaries on the Laws of England</i>, vol 1, ...",
        explanation: "Citing specific volume."
      },
      {
        correct: "<i>A History of the Crusades: The Kingdom of Acre</i>, vol 3, ...",
        explanation: "Volume with unique title."
      }
    ]
  },
  pinpointReferences: {
    title: "Pinpoint References",
    rules: [
        "Pinpoint references appear at the end of the citation.",
        "If a starting page is included, the pinpoint is separated from it by a comma.",
        "They are not enclosed in parentheses.",
        "Use 'at' only if the pinpoint could be confused with a page number in a law report series."
    ],
    examples: [
      {
        correct: "...(University of Western Australia Press, 2008) 248, 252–3.",
        explanation: "Pinpoint to pages 252-3, following starting page 248."
      }
    ]
  },
  startingPage: {
    title: "Starting Page",
    rules: [
      "Provide the starting page number of the chapter after the book's publication details.",
      "The starting page is followed by a comma, then the pinpoint reference."
    ],
    examples: [
      {
        correct: "...(Oxford University Press, 4th ed, 2020) 123, 125.",
        explanation: "Starting page 123, pinpoint to 125."
      }
    ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Chapter in an edited book",
        correct: "Jeremy Waldron, 'Do Judges Reason Morally?' in Grant Huscroft (ed), <i>Expounding the Constitution: Essays in Constitutional Theory</i> (Cambridge University Press, 2008) 38."
      },
      {
        context: "Chapter with multiple editors",
        correct: "Meg Russell, 'Reform of the House of Lords: Lessons for Bicameralism' in Nicholas Aroney, Scott Prasser and JR Nethercote (eds), <i>Restraining Elective Dictatorship: The Upper House Solution?</i> (University of Western Australia Press, 2008) 119."
      },
      {
        context: "Chapter with a pinpoint reference",
        correct: "Janet Ransley, 'Illusions of Reform: Queensland's Legislative Assembly since Fitzgerald' in Nicholas Aroney, Scott Prasser and JR Nethercote (eds), <i>Restraining Elective Dictatorship: The Upper House Solution?</i> (University of Western Australia Press, 2008) 248, 252–3."
      }
    ]
  }
}; 