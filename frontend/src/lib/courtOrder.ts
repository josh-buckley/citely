import { basicRules } from './caseName';
import { reportedDecisionsRules } from './reportedDecisions';

export const courtOrderRules = {
  judicialOfficer: reportedDecisionsRules.pinpointJudges,
  caseName: reportedDecisionsRules.caseName,
  court: {
    title: "Court",
    rules: [
      "Write the full name of the court.",
      "Do not use abbreviations unless they are part of the official court name.",
      "Include the jurisdiction in parentheses if not clear from context."
    ],
    examples: [
      {
        correct: "Supreme Court of Victoria",
        explanation: "Full court name without abbreviation"
      },
      {
        correct: "Federal Court of Australia",
        explanation: "Full court name for federal jurisdiction"
      },
      {
        correct: "District Court of Queensland",
        explanation: "Full court name with state jurisdiction"
      }
    ]
  },
  proceedingNumber: {
    title: "Proceeding Number",
    rules: [
      "Write the proceeding number exactly as it appears on the court order.",
      "Include any letters, numbers, and punctuation in the original format.",
      "Do not add additional spaces or formatting."
    ],
    examples: [
      {
        correct: "S CI 2023 01234",
        explanation: "Supreme Court proceeding number"
      },
      {
        correct: "QUD123/2023",
        explanation: "Federal Court proceeding number"
      }
    ]
  }
};
