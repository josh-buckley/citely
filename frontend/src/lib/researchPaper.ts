export const researchPaperRules = {
  authors: {
    title: "General Rules for Authors",
    rules: [
      "If the document is published by an organisation, but a particular author is prominently indicated, the author's name should be used and the organisation should be included after the document type.",
      "Authors' names should appear exactly as on title page, with exceptions:",
      "- No spaces between initials and no full stops after initials.",
      "- Omit post-nominals (AM, LLB, etc).",
      "- Omit honorific titles (Dr, Prof, etc) except 'Sir', 'Dame' and peerage titles."
    ],
    examples: [
      {
        correct: "Matthew H Kramer, 'The Illusion of Neutrality...'",
        explanation: "Use the author's name if prominently indicated, even if published by an organisation."
      }
    ]
  },
  multipleAuthors: {
    title: "Multiple Authors",
    rules: [
      "For two or three authors, include all names.",
      "Separate the last two authors with 'and'.",
      "For more than three authors, use the first author's name followed by 'et al'."
    ],
    examples: [
        {
            correct: "Theodor Baums and Paul Krüger Andersen, 'The European Model...'",
            explanation: "For two authors, separate their names with 'and'."
        }
    ]
  },
  title: {
    title: "Title",
    rules: [
      "Titles should appear as in original source, with exceptions:",
      "- Punctuation should adhere to rule 1.6.",
      "- Capitalisation should adhere to rule 1.7.",
      "- Use colon to separate title from subtitle, regardless of original punctuation.",
      "- Include only first subtitle, unless second subtitle is a span of dates.",
      "- For older sources with comma-separated initial short title, include only initial short title.",
      "Words normally italicised should only be italicised if italicised in original source.",
      "If entire source title should be italicised, no part should appear in roman font."
    ],
    examples: [
      {
        correct: "‘The Illusion of Neutrality: Abortion and the Foundations of Justice’",
        explanation: "Use a colon to separate the title from the subtitle."
      },
      {
        correct: "‘“Light Touch” Labour Regulation by State Governments in Australia: A Preliminary Assessment’",
        explanation: "Use double quotes for a quotation within a title that is already enclosed in single quotes."
      }
    ],
    titleFormatting: {
      separators: [
        { type: "Title and subtitle", use: ": " },
        { type: "Multiple subtitles", use: "Include first only (except date spans)" }
      ],
      italicisation: [
        { rule: "Only italicise words that are italicised in original source.", 
          exception: "Unless entire source title should be italicised." }
      ],
      quotes: [
        { rule: "Use double quotes within title when appearing in single-quoted context.",
          example: "'The Briginshaw \"Standard of Proof\" in Anti-Discrimination Law: \"Pointing with a Wavering Finger\"'" }
      ]
    }
  },
  documentDetails: {
    title: "Document Details",
    documentTypeAndSeries: {
        title: "Document Type/Series",
        rules: [
            "The document type should be reproduced as it appears on the source (eg 'Working Paper', 'Discussion Paper', 'Research Report', 'Conference Paper')."
        ],
        examples: [
            {
                correct: "(Research Paper...",
                explanation: "Document type 'Research Paper'."
            },
            {
                correct: "(Working Paper...",
                explanation: "Document type 'Working Paper'."
            }
        ]
    },
    documentNumber: {
        title: "Document Number",
        rules: [
            "If the document prominently indicates a document number, this should be included.",
            "If a research paper or working paper has a unique identifier, the identifier should be included as it appears on the paper.",
            "Where the document is not part of a numbered series, the document number should be omitted."
        ],
        examples: [
            {
                correct: "...No 9/2017...",
                explanation: "Include the document number or unique identifier as it appears on the source."
            },
            {
                correct: "...No 40...",
                explanation: "A simple document number."
            }
        ]
    },
    institutionForum: {
        title: "Institution/Forum",
        rules: [
            "For the institution/forum, the most specific subdivision and the umbrella body's name should be included."
        ],
        examples: [
            {
                correct: "...Faculty of Law, University of Cambridge...",
                explanation: "Include both the specific subdivision (Faculty of Law) and the main institution (University of Cambridge)."
            },
            {
                correct: "...Centre for Employment and Labour Relations Law, The University of Melbourne...",
                explanation: "Another example of including both the subdivision and the main institution."
            }
        ]
    },
    fullDate: {
        title: "Full Date",
        rules: [
            "Where there is no full date on the source, as much of the full date as appears should be included (eg 'September 1997' or '1998')."
        ]
    }
  },
  pinpointReferences: {
    title: "Pinpoint References",
    rules: [
      "Pinpoint references should adhere to rules 1.1.6–1.1.7.",
      "Pinpoints should generally be to page numbers, and where appropriate, to paragraphs."
    ],
    examples: [
        {
            correct: "...December 2006) 6",
            explanation: "A pinpoint reference to a page number."
        },
        {
            correct: "...2004) 11–12.",
            explanation: "A pinpoint reference to a page range."
        }
    ]
  },
  url: {
      title: "URL",
      rules: [
        "A URL may be included after the first reference to a source, where this would aid its retrieval, in accordance with rules 4.4–4.5."
      ],
      examples: [
          {
              correct: "...December 2006) 6 <http://papers.ssrn.com/sol3/papers.cfm?abstract_id=961528>.",
              explanation: "A URL can be included at the end of the citation to help locate the source."
          }
      ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Research paper with unique ID",
        correct: "Matthew H Kramer, 'The Illusion of Neutrality: Abortion and the Foundations of Justice' (Research Paper No 9/2017, Faculty of Law, University of Cambridge, January 2017)."
      },
      {
        context: "Working paper from an institute",
        correct: "Theodor Baums and Paul Krüger Andersen, 'The European Model Company Law Act Project' (Working Paper No 97/2008, European Corporate Governance Institute, March 2008)."
      },
      {
        context: "Working paper with pinpoint and URL",
        correct: "John Howe and Ingrid Landau, '“Light Touch” Labour Regulation by State Governments in Australia: A Preliminary Assessment' (Working Paper No 40, Centre for Employment and Labour Relations Law, The University of Melbourne, December 2006) 6 <http://papers.ssrn.com/sol3/papers.cfm?abstract_id=961528>."
      }
    ]
  }
}; 