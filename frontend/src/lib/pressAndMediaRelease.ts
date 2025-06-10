export const pressAndMediaReleaseRules = {
  authors: {
    title: "Author",
    rules: [
      "The author of the press or media release should be included.",
      "Where the author is the same as the body, the body should be omitted from the release details."
    ],
    examples: [
      {
        correct: "Department of Defence (Cth), ...",
        explanation: "The author is often the corporate body issuing the release. The body's name is not repeated in the parentheses."
      },
      {
        correct: "ASX, ...",
        explanation: "Another example of a corporate body as the author."
      }
    ]
  },
  title: {
    title: "Title",
    rules: [
      "The title of the release should be enclosed in single quotation marks."
    ],
    examples: [
      {
        correct: "‘Highest East Timorese Honour for Army Officers’",
        explanation: "The title of the media release in single quotes."
      }
    ]
  },
  releaseDetails: {
    title: "Release Details",
    releaseType: {
      title: "Release Type",
      rules: [
        "The release type should appear as it does on the source (eg 'Press Release', 'Media Release', 'Press Statement').",
        "Where the release type does not appear on the source, 'Media Release' should be used."
      ],
      examples: [
        {
          correct: "(Media Release...",
          explanation: "Use 'Media Release' if no specific type is mentioned on the source."
        },
        {
          correct: "(Press Statement...",
          explanation: "Use the release type as it appears on the source."
        }
      ]
    },
    documentNumber: {
      title: "Document Number",
      rules: [
        "A document number should be included only if it appears on the release.",
        "The document number should be reproduced using any abbreviations as they appear on the release (e.g., 'MSPA')."
      ],
      examples: [
        {
          correct: "...(Media Release MSPA 172/09...",
          explanation: "Include the document number if one is provided."
        },
        {
          correct: "...(Media Release, 7 December 2017)...",
          explanation: "Omit the document number if one is not provided on the source."
        }
      ]
    },
    body: {
      title: "Body",
      rules: [
        "The body releasing the press or media release should be included here if it is different from the author."
      ],
      examples: [
        {
          correct: "John Smith, 'New Policy Announced' (Media Release, Department of Communications, 1 January 2024)",
          explanation: "When the author is an individual, include the releasing body in the parentheses."
        }
      ]
    }
  },
  pinpointReferences: {
    title: "Pinpoint References",
    rules: [
      "Pinpoint references should generally be to page numbers, and where appropriate, to paragraphs."
    ],
    examples: [
      {
        correct: "... (Media Release, 7 December 2017) 1.",
        incorrect: "... (Media Release, 7 December 2017), 1.",
        explanation: "Pinpoint to a page number after the publication details without a preceding comma."
      }
    ]
  },
  url: {
    title: "URL",
    rules: [
      "A URL may be included after the first reference to a source, where this would aid its retrieval."
    ],
    examples: [
      {
        correct: "...(Media Release, 7 December 2017) 1 &lt;https://www.asx.com.au/documents/media/asx-selects-dlt.pdf&gt;.",
        explanation: "The URL should be enclosed in angle brackets at the end of the citation."
      }
    ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Media release with document number",
        correct: "Department of Defence (Cth), 'Highest East Timorese Honour for Army Officers' (Media Release MSPA 172/09, 22 May 2009)."
      },
      {
        context: "Media release with pinpoint",
        correct: "ASX, 'ASX Selects Distributed Ledger Technology to Replace CHESS' (Media Release, 7 December 2017) 1."
      },
      {
        context: "Media release with URL",
        correct: "ASX, 'ASX Selects Distributed Ledger Technology to Replace CHESS' (Media Release, 7 December 2017) &lt;https://www.asx.com.au/documents/media/asx-selects-dlt.pdf&gt;."
      }
    ]
  }
}; 