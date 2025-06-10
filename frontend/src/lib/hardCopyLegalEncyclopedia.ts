export const hardCopyLegalEncyclopediaRules = {
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
  volumeNumber: {
    title: "Volume Number",
    rules: [
      "The volume number follows the encyclopedia title, preceded by 'vol'."
    ],
    examples: [
      {
        correct: "...vol 15...",
        explanation: "The volume number."
      },
      {
        correct: "...vol 2...",
        explanation: "Another example of a volume number."
      }
    ]
  },
  lastUpdateDate: {
      title: "Date of Last Update",
      rules: [
          "Where a legal encyclopedia indicates the date of last update of a chapter, this date should be included in parentheses, preceded by 'at'."
      ],
      examples: [
          {
              correct: "...(at 25 May 2009)...",
              explanation: "The date of the last update."
          },
          {
            correct: "...(at 18 June 2011)...",
            explanation: "Another example of a last update date."
        }
      ]
  },
  titleNumber: {
    title: "Title Number",
    rules: [
      "The title number is included after the volume and date information."
    ],
    examples: [
        {
            correct: "235",
            explanation: "The title number precedes the name of the title, for example: 235 Insurance."
        },
        {
            correct: "2",
            explanation: "Another example of a title number, for example: 2 Administrative Law."
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
            correct: "Insurance",
            explanation: "The name of the title follows the title number, for example: 235 Insurance."
        },
        {
            correct: "Administrative Law",
            explanation: "Another example of a title name, for example: 2 Administrative Law."
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
            correct: "2",
            explanation: "The chapter number is combined with the chapter name inside single quotes, for example: '2 General Principles'."
        },
        {
            correct: "2.3",
            explanation: "A chapter number can also include a decimal, for example: '2.3 Access to Information'."
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
            correct: "General Principles",
            explanation: "The chapter name follows the chapter number inside single quotes, for example: '2 General Principles'."
        },
        {
            correct: "Access to Information",
            explanation: "Another example of a chapter name, for example: '2.3 Access to Information'."
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
            correct: "[235-270]",
            explanation: "A paragraph range."
        },
        {
            correct: "[2.3.10]",
            explanation: "A single paragraph number, which can include decimals."
        }
    ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Full citation for a hard copy legal encyclopedia",
        correct: "LexisNexis, Halsbury's Laws of Australia, vol 15 (at 25 May 2009) 235 Insurance, '2 General Principles' [235-270]."
      },
      {
        context: "Another example of a full citation",
        correct: "Westlaw AU, The Laws of Australia, vol 2 (at 18 June 2011) 2 Administrative Law, '2.3 Access to Information' [2.3.10]."
      }
    ]
  }
}; 