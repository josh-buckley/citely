export const onlineLegalEncyclopediaRules = {
  publisher: {
    title: "Publisher",
    rules: [
      "The publisher's name should be cited first and adhere to standard publisher citation rules."
    ],
    examples: [
      {
        correct: "LexisNexis, ...",
        explanation: "The name of the publisher."
      },
      {
        correct: "Westlaw AU, ...",
        explanation: "Another example of a publisher."
      }
    ]
  },
  encyclopediaTitle: {
    title: "Title of Encyclopedia",
    rules: [
      "The title of the encyclopedia follows the publisher's name."
    ],
    examples: [
      {
        correct: "...Halsbury's Laws of Australia...",
        explanation: "The title of the encyclopedia."
      },
      {
        correct: "...The Laws of Australia...",
        explanation: "Another example of an encyclopedia title."
      }
    ]
  },
  retrievalDate: {
      title: "Date of Retrieval",
      rules: [
          "For entries in online legal encyclopedias, the date at which the entry was retrieved should be included in parentheses, preceded by 'online at'."
      ],
      examples: [
          {
              correct: "...(online at 15 February 2018)...",
              explanation: "The date of retrieval."
          },
          {
            correct: "...(online at 20 February 2018)...",
            explanation: "Another example of a retrieval date."
        }
      ]
  },
  titleNumber: {
    title: "Title Number",
    rules: [
      "The title number is included after the retrieval date information."
    ],
    examples: [
        {
            correct: "2",
            explanation: "The title number precedes the name of the title, for example: 2 Administrative Law."
        },
        {
            correct: "Equitable Jurisdiction",
            explanation: "In some cases, a name is used instead of a number for the title."
        }
    ]
  },
  nameOfTitle: {
    title: "Name of Title",
    rules: [
      "The name of the title follows the title number."
    ],
    examples: [
        {
            correct: "Administrative Law",
            explanation: "The name of the title follows the title number, for example: 2 Administrative Law."
        },
        {
            correct: "4 Principles of Equitable Jurisdiction",
            explanation: "If there is no separate title name, the chapter details may follow directly after the title number/name."
        }
    ]
  },
  chapterNumber: {
    title: "Chapter Number",
    rules: [
      "The chapter number is included before the chapter name."
    ],
    examples: [
        {
            correct: "2.3",
            explanation: "A chapter number can include a decimal, for example: '2.3 Access to Information'."
        },
        {
            correct: "4",
            explanation: "A simple chapter number, for example: '4 Principles of Equitable Jurisdiction'."
        }
    ]
  },
  nameOfChapter: {
    title: "Name of Chapter",
    rules: [
        "The name of the chapter follows the chapter number and is enclosed in single quotes with the number."
    ],
    examples: [
        {
            correct: "Access to Information",
            explanation: "The chapter name follows the chapter number inside single quotes, for example: '2.3 Access to Information'."
        },
        {
            correct: "Principles of Equitable Jurisdiction",
            explanation: "Another example of a chapter name, for example: '4 Principles of Equitable Jurisdiction'."
        }
    ]
  },
  paragraph: {
    title: "Paragraph",
    rules: [
      "Pinpoint references should be to paragraphs and enclosed in square brackets."
    ],
    examples: [
        {
            correct: "[2.3.10]",
            explanation: "A single paragraph number, which can include decimals."
        },
        {
            correct: "[101]",
            explanation: "A simple paragraph number."
        }
    ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Full citation for an online legal encyclopedia",
        correct: "Westlaw AU, The Laws of Australia (online at 15 February 2018) 2 Administrative Law, '2.3 Access to Information' [2.3.10]."
      },
      {
        context: "Another example with a different structure",
        correct: "LexisNexis, Halsbury's Law of England (online at 20 February 2018) Equitable Jurisdiction, '4 Principles of Equitable Jurisdiction' [101]."
      }
    ]
  }
}; 