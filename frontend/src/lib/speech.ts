export const speechRules = {
  authors: {
    title: "General Rules for Authors",
    rules: [
      "Authors' names should appear exactly as on title page, with exceptions:",
      "- No spaces between initials and no full stops after initials.",
      "- Omit post-nominals (AM, LLB, etc).",
      "- Omit honorific titles (Dr, Prof, etc) except 'Sir', 'Dame' and peerage titles.",
      "For judicial officers, the title may be included (e.g., 'Justice Dyson Heydon')."
    ],
    examples: [
      {
        correct: "Justice Dyson Heydon, ...",
        explanation: "Include the judicial title for speeches by judicial officers."
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
        correct: "‘Threats to Judicial Independence: The Enemy Within’",
        explanation: "The title of a speech is enclosed in single quotation marks."
      }
    ]
  },
  speechDetails: {
    title: "Speech Details",
    speechOrLecture: {
        title: "Speech or Lecture",
        rules: [
            "If the speech is a named lecture, the lecture name should be included in place of 'Speech'.",
            "If the name of the lecture is preceded by 'The', this should be omitted in the citation.",
            "If the speech is part of a lecture series, its ordinal number should not be included."
        ],
        examples: [
            {
                correct: "(Speech, ...)",
                explanation: "Use 'Speech' for a standard speech."
            },
            {
                correct: "(Lucinda Lecture, ...)",
                incorrect: "(The Lucinda Lecture, ...)",
                explanation: "For named lectures, use the lecture name and omit 'The'."
            },
            {
                correct: "(Sultan Azlan Shah Lecture, ...)",
                incorrect: "(27th Sultan Azlan Shah Lecture, ...)",
                explanation: "Do not include the ordinal number for lecture series."
            }
        ]
    },
    institution: {
        title: "Institution",
        rules: [
            "Include the name of the institution where the speech was delivered."
        ],
        examples: [
            {
                correct: "...Inner Temple...",
                explanation: "The institution where the speech was given."
            },
            {
                correct: "...Monash University...",
                explanation: "Another example of an institution."
            }
        ]
    },
    forum: {
        title: "Forum",
        rules: [
            "If no specific forum is indicated, the city or town in which the speech was delivered should be included.",
            "If a forum is specified, the city or town should not be included."
        ],
        examples: [
            {
                correct: "...Inner Temple, 23 January 2012).",
                incorrect: "...Inner Temple, London, 23 January 2012).",
                explanation: "Do not include the city if a specific forum (Inner Temple) is named."
            },
            {
                correct: "...Kuala Lumpur, 20 November 2013).",
                explanation: "Include the city if no more specific forum is provided."
            }
        ]
    }
  },
  pinpointReferences: {
    title: "Pinpoint References",
    rules: [
      "For a recording, pinpoint to the relevant timestamp (eg 1:23:45).",
      "For a transcript, pinpoint to the page number.",
      "Paragraph numbers may also be used where appropriate."
    ],
    examples: [
      {
        correct: "... (Speech, ...) 15.",
        explanation: "Pinpointing to a page number in a transcript."
      },
      {
        correct: "... (Speech, ...) 0:15:32.",
        explanation: "Pinpointing to a timestamp in a recording."
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
              correct: "...(JD Lecture Series, Melbourne Law School, 24 March 2009) <http://www.hcourt.gov.au/publications/speeches/current/speeches-by-chief-justice-french-ac>.",
              explanation: "A URL can be included at the end of the citation."
          }
      ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Speech at an institution",
        correct: "Justice Dyson Heydon, 'Threats to Judicial Independence: The Enemy Within' (Speech, Inner Temple, 23 January 2012)."
      },
      {
        context: "Named lecture",
        correct: "Virginia Bell, 'Section 80: The Great Constitutional Tautology' (Lucinda Lecture, Monash University, 24 October 2013)."
      },
      {
        context: "Speech with a URL",
        correct: "Chief Justice Robert French, 'Native Title: A Constitutional Shift?' (JD Lecture Series, Melbourne Law School, 24 March 2009) <http://www.hcourt.gov.au/publications/speeches/current/speeches-by-chief-justice-french-ac>."
      }
    ]
  }
}; 