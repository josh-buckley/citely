export const hardCopyDictionaryRules = {
  dictionaryTitle: {
    title: "Dictionary Title",
    rules: [
      "The title of the dictionary is cited first."
    ],
    examples: [
      {
        correct: "Macquarie Dictionary ...",
        explanation: "The title of the dictionary."
      },
      {
        correct: "Chambers Dictionary ...",
        explanation: "Another example of a dictionary title."
      },
      {
        correct: "Oxford English Dictionary ...",
        explanation: "The full title of the dictionary should be used."
      }
    ]
  },
  editionNumber: {
    title: "Edition Number",
    rules: [
      "The edition number is included in parentheses after the title.",
      "Edition numbers should be cited according to rule 6.3.2 (e.g., 2nd ed, 5th ed)."
    ],
    examples: [
      {
        correct: "Macquarie Dictionary (5th ed, ...)",
        explanation: "The edition number follows the title."
      }
    ]
  },
  publicationYear: {
    title: "Publication Year",
    rules: [
      "The year of publication follows the edition number within the parentheses."
    ],
    examples: [
      {
        correct: "...(5th ed, 2009)...",
        explanation: "The year of publication."
      }
    ]
  },
  entryTitle: {
    title: "Entry Title",
    rules: [
      "The entry title appears in single quotation marks after the publication details."
    ],
    examples: [
      {
        correct: "...(5th ed, 2009) 'demise'",
        explanation: "The specific entry being cited."
      }
    ]
  },
  definitionNumber: {
    title: "Definition Number",
    rules: [
      "If there are multiple entries for the same word (e.g., as a noun and a verb), indicate which entry is being referred to by using the abbreviation from the dictionary (eg 'adj' or 'n1').",
      "If there are multiple definitions for an entry, provide the number of the relevant definition preceded by 'def'.",
      "These details are enclosed in parentheses after the entry title."
    ],
    examples: [
      {
        correct: "...'demise' (def 4).",
        explanation: "Pinpointing the 4th definition of the entry."
      },
      {
        correct: "...'school' (v2, def 2b).",
        explanation: "Pinpointing a specific entry type (the second verb entry) and a specific sub-definition."
      }
    ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Entry with definition number",
        correct: "Macquarie Dictionary (5th ed, 2009) 'demise' (def 4)."
      },
      {
        context: "Simple entry without definition number",
        correct: "Chambers Dictionary (13th ed, 2014) 'éclair'."
      },
      {
        context: "Entry with version and sub-definition",
        correct: "Oxford English Dictionary (2nd ed, 1989) 'school' (v2, def 2b)."
      }
    ]
  }
}; 