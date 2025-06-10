export const onlineDictionaryRules = {
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
        correct: "Encyclopaedic Australian Legal Dictionary ...",
        explanation: "The full title of the dictionary should be used."
      }
    ]
  },
  retrievalDate: {
    title: "Date of Retrieval",
    rules: [
      "For entries in online dictionaries, the date at which the definition was retrieved should be included in parentheses, preceded by 'online at'."
    ],
    examples: [
      {
        correct: "... (online at 20 February 2018) ...",
        explanation: "The date of retrieval follows the dictionary title."
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
        correct: "... (online at 20 February 2018) 'punctilious'",
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
        correct: "...'default judgment' (def 1).",
        explanation: "Pinpointing the first definition of the entry."
      }
    ]
  },
  citationExamples: {
    title: "Citation Examples",
    examples: [
      {
        context: "Simple online entry",
        correct: "Macquarie Dictionary (online at 20 February 2018) 'punctilious'."
      },
      {
        context: "Online entry with definition number",
        correct: "Encyclopaedic Australian Legal Dictionary (online at 20 February 2018) 'default judgment' (def 1)."
      }
    ]
  }
}; 