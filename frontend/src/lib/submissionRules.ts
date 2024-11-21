import { reportedDecisionsRules } from './reportedDecisions';
import { proceedingRules } from './proceeding';

export const submissionRules = {
  caseName: reportedDecisionsRules.caseName,
  partyName: {
    title: "Party Name",
    rules: [
      "Include the full name of the party making the submission.",
      "For government parties, include the jurisdiction in parentheses.",
      "Include any official title or role (e.g., 'Attorney-General', 'Minister for')."
    ],
    examples: [
      {
        correct: "Attorney-General (Cth)",
        explanation: "Government party with jurisdiction."
      },
      {
        correct: "Minister for Immigration and Border Protection",
        explanation: "Full ministerial title."
      }
    ]
  },
  submissionTitle: {
    title: "Title of Submission",
    rules: [
      "Include the title of the submission only if it appears in the submission.",
      "For amicus curiae submissions, include this information in the title."
    ],
    examples: [
      {
        correct: "Attorney-General (Cth), 'Outline of Submissions of the Attorney-General of the Commonwealth as Amicus Curiae', Submission in <i>Humane Society International Inc v Kyodo Senpaku Kaisha Ltd</i>",
        explanation: "Title with amicus curiae status."
      },
      {
        correct: "Attorney-General (Cth), 'Written Submissions', Submission in <i>Commonwealth v ACT</i>",
        explanation: "Basic submission title."
      }
    ]
  },
  proceedingNumber: proceedingRules.proceedingNumber,
  pinpoint: reportedDecisionsRules.pinpointReference
};
