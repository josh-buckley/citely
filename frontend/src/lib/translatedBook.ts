export const translatedBookRules = {
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
  multipleAuthors: {
    title: "Multiple Authors or Translators",
    rules: [
      "For two or three authors/translators, include all names.",
      "Separate last two authors/translators with 'and'.",
      "For more than three authors/translators, use first author's name followed by 'et al'.",
      "Follow same rules in subsequent references."
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
  translationTitle: {
    title: "Translation Title",
    rules: [
      "Titles should appear as in original source, with exceptions:",
      "- Punctuation should adhere to rule 1.6.",
      "- Capitalisation should adhere to rule 1.7.",
      "- Use colon to separate title from subtitle, regardless of original punctuation.",
      "- Include only first subtitle, unless second subtitle is a span of dates.",
      "- For older sources with comma-separated initial short title, include only initial short title.",
      "Words normally italicised should only be italicised if italicised in original source.",
      "If entire source title should be italicised (eg books), no part should appear in roman font.",
      "The title used is the translated version of the title."
    ],
    examples: [
      {
        correct: "CB Cato, 'The Mareva Injunction and Its Application in New Zealand'",
        incorrect: "CB Cato, 'The <i>Mareva</i> Injunction and Its Application in New Zealand'",
        explanation: "Do not italicise words unless italicised in original source."
      },
      {
        correct: "FA Trindade and HP Lee (eds), <i>The Constitution of Malaysia: Further Perspectives and Developments</i>",
        incorrect: "FA Trindade and HP Lee (eds), <i>The Constitution of Malaysia: Further Perspectives and Developments: Essays in Honour of Tun Mohamed Suffian</i>",
        explanation: "Include only first subtitle."
      },
      {
        correct: "Adam Webster, 'Sharing Water from Transboundary Rivers in Australia: An Interstate Common Law?'",
        originalTitle: "Sharing Water from Transboundary Rivers in Australia — An Interstate Common Law?",
        explanation: "Use colon instead of dash between title and subtitle."
      },
      {
        correct: "Loretta De Plevitz, 'The Briginshaw \"Standard of Proof\" in Anti-Discrimination Law: \"Pointing with a Wavering Finger\"'",
        originalTitle: "The Briginshaw 'Standard of Proof' in Anti-Discrimination Law: 'Pointing with a Wavering Finger'",
        explanation: "Use double quotes instead of single quotes within title."
      }
    ],
    titleFormatting: {
      separators: [
        { type: "Title and subtitle", use: ": " },
        { type: "Multiple subtitles", use: "Include first only (except date spans)" }
      ],
      italicisation: [
        { rule: "Only italicise words that are italicised in original source.", 
          exception: "Unless entire source title should be italicised (eg books)." }
      ],
      quotes: [
        { rule: "Use double quotes within title when appearing in single-quoted context.",
          example: "'The Briginshaw \"Standard of Proof\" in Anti-Discrimination Law: \"Pointing with a Wavering Finger\"'" }
      ]
    }
  },
  translator: {
    title: "General Rules for Translators",
    rules: [
        "Translator's names should be treated in the same way as authors' names."
    ],
    examples: [
      {
        correct: "Gareth Morgan,",
        explanation: "Single translator, followed by a comma."
      }
    ]
  },
  publicationDetails: {
    title: "Publication Details",
    publisher: {
      title: "Publisher",
      rules: [
        "Include publisher's name in parentheses after title and/or translator details.",
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
          correct: "(Martinus Nijhoff, 1993–2002)",
          explanation: "Completed multi-volume work year span."
        },
        {
          correct: "(Department of Foreign Affairs and Trade, 1975–)",
          explanation: "Ongoing publication with open-ended year."
        }
      ]
    }
  },
  pinpointReferences: {
    title: "Pinpoint References",
    rules: [
      "Follow rules 1.1.6–1.1.7 for pinpoint references.",
      "Place after publication details without comma.",
      "Use comma before pinpoint only when citing specific volume.",
      "Generally use page numbers for pinpoints.",
      "May include paragraph numbers with page numbers.",
      "Use 'ch' or 'pt' (plural: 'chs' or 'pts') for chapter or part references."
    ],
    examples: [
      {
        correct: "<i>Essays on Contract</i> (Clarendon Press, 1986) 247–8",
        incorrect: "<i>Essays on Contract</i> (Clarendon Press, 1986), 247–8",
        explanation: "No comma before pinpoint."
      },
      {
        correct: "<i>Subrogation: Law and Practice</i> (Oxford University Press, 2007) 9 [2.02]",
        explanation: "Page number with paragraph number."
      },
      {
        correct: "<i>The Constitution of Australia: A Contextual Analysis</i> (Hart Publishing, 2011) ch 5",
        incorrect: "<i>The Constitution of Australia: A Contextual Analysis</i> (Hart Publishing, 2011) 147–183",
        explanation: "Use chapter reference instead of page range."
      }
    ]
  },
  multiVolume: {
    title: "Multi-Volume Books",
    rules: [
      "Include volume number after publication details.",
      "Precede with 'vol' or 'bk' (if source uses 'books').",
      "Use Arabic numerals regardless of source format.",
      "Include comma between volume number and pinpoint."
    ],
    examples: [
      {
        correct: "<i>The Moral Limits of the Criminal Law</i> (Oxford University Press, 1984–88) vol 4, 45",
        explanation: "Multi-volume work with volume number and pinpoint."
      },
      {
        correct: "<i>Tenancy Law of New South Wales</i> (Butterworths, 1966) bk 2",
        explanation: "Using 'bk' designation for source using 'books'."
      }
    ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Translated book",
        correct: "Nicos Poulantzas, <i>State, Power, Socialism</i> (Gareth Morgan tr, Verso, 2014)."
      }
    ]
  }
}; 