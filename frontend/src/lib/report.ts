export const reportRules = {
  authors: {
    title: "General Rules for Authors",
    rules: [
      "The author should be cited in accordance with rule 4.1.",
      "If a report does not prominently indicate an author — as is often the case with reports of Royal Commissions and with other ad hoc reports — no author should be included in the citation of the report.",
      "Authors' names should appear exactly as on title page, with exceptions:",
      "- No spaces between initials and no full stops after initials.",
      "- Omit post-nominals (AM, LLB, etc).",
      "- Omit honorific titles (Dr, Prof, etc) except 'Sir', 'Dame' and peerage titles.",
      "Use honorific titles in discursive text only (both body and footnotes)."
    ],
    examples: [
        {
            correct: "<i>Review of the Law of Negligence</i> (Final Report, September 2002) 37–57.",
            incorrect: "Panel of Eminent Persons, <i>Review of the Law of Negligence</i> (Final Report, September 2002) 37–57.",
            explanation: "If a report does not prominently indicate an author, no author should be included."
        }
    ]
  },
  multipleAuthors: {
    title: "Multiple Authors",
    rules: [
      "For two or three authors, include all names.",
      "Separate last two authors with 'and'.",
      "For more than three authors, use first author's name followed by 'et al'.",
      "Follow same rules in subsequent references."
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
            correct: "Community Law Australia, <i>Unaffordable and Out of Reach: The Problem of Access to the Australian Legal System</i> (Report, July 2012).",
            explanation: "Use the body's name as the author where it is prominently credited."
        },
        {
            correct: "Investment and Enterprise Division, UNCTAD, <i>Improving Investment Dispute Settlement: UNCTAD Policy Tools</i> (IIA Issues Note No 4, 23 November 2017).",
            explanation: "For subdivisions of a body, format as: Subdivision, Body."
        }
    ]
  },
  title: {
    title: "Title",
    rules: [
      "If the title includes a reference to the document type (eg 'Interim Report', 'Final Report'), this may be omitted from the title and included within the parentheses.",
      "Where the document type forms an integral part of the title, this should not be omitted from the title, nor should it be repeated in the document type; instead, the generic document type should be used as the document type.",
      "For example, if the title of a document is 'Annual Report', this should be used as the title and the document type should be 'Report', not 'Annual Report'."
    ],
    examples: [
        {
            correct: "<i>Qantas Annual Report 2017: Positioning for Sustainability and Growth</i> (Report, 2017) 12.",
            incorrect: "<i>Qantas Annual Report 2017: Positioning for Sustainability and Growth</i> (Annual Report, 2017) 12.",
            explanation: "Where the document type forms an integral part of the title, use the generic document type in parentheses."
        }
    ]
  },
  documentDetails: {
    title: "Document Details",
    documentTypeAndSeries: {
        title: "Document Type/Series",
        rules: [
            "The document type or series should be included in parentheses."
        ],
        examples: [
            {
                correct: "(Final Report, ...)",
                explanation: "The document type, such as 'Final Report', is included in parentheses."
            },
            {
                correct: "(Report, ...)",
                explanation: "A generic document type like 'Report' can be used."
            },
            {
                correct: "(IIA Issues Note No 4, ...)",
                explanation: "Include the series information if available."
            }
        ]
    },
    documentNumber: {
        title: "Document Number",
        rules: [
            "If the report prominently indicates a document number, this should be included.",
            "Where the document is not part of a numbered series, the document number should be omitted."
        ],
        examples: [
            {
                correct: "(IIA Issues Note No 4, 23 November 2017)",
                explanation: "Include the document number if it is part of a numbered series."
            }
        ]
    },
    fullDate: {
        title: "Full Date",
        rules: [
            "The full date should be included after the document type/series and number.",
            "Where there is no full date on the source, as much of the full date as appears should be included (eg 'September 1997' or '1998')."
        ]
    }
  },
  pinpointReferences: {
    title: "Pinpoint References",
    rules: [
      "Pinpoint references should adhere to rules 1.1.6–1.1.7.",
      "Pinpoints should generally be to page numbers and, where appropriate, to paragraphs.",
      "Where a report contains multiple volumes, the volume number should be included in pinpoint references (even where the volumes are consecutively paginated), in accordance with rule 6.5."
    ],
    examples: [
        {
            correct: "<i>...</i> (Final Report, September 2002) 37–57.",
            explanation: "Pinpoint references to pages follow the publication details."
        },
        {
            correct: "<i>...</i> (Report, 2017) 12.",
            explanation: "A single page pinpoint."
        }
    ]
  },
  url: {
      title: "URL",
      rules: [
        "A URL may be included after the first reference to a source, where this would aid its retrieval, in accordance with rules 4.4–4.5."
      ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Report with no author",
        correct: "<i>Review of the Law of Negligence</i> (Final Report, September 2002) 37–57."
      },
      {
        context: "Report with organisational author",
        correct: "Community Law Australia, <i>Unaffordable and Out of Reach: The Problem of Access to the Australian Legal System</i> (Report, July 2012)."
      },
      {
        context: "Report with 'Annual Report' in title",
        correct: "Qantas Airways, <i>Qantas Annual Report 2017: Positioning for Sustainability and Growth</i> (Report, 2017) 12."
      },
      {
        context: "Report with series and number",
        correct: "Investment and Enterprise Division, UNCTAD, <i>Improving Investment Dispute Settlement: UNCTAD Policy Tools</i> (IIA Issues Note No 4, 23 November 2017)."
      }
    ]
  }
}; 