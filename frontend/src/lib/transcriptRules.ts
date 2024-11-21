import { basicRules } from './caseName';
import { courtOrderRules } from './courtOrder';
import { proceedingRules } from './proceeding';
import { reportedDecisionsRules } from './reportedDecisions';

export const transcriptPinpointRules = {
  title: "Pinpoint References",
  rules: [
    "A pinpoint reference refers to a specific page or line number in the transcript.",
    "Basic formatting:",
    "- Use page numbers or line numbers (where line numbering is continuous across a transcript).",
    "- If a pinpoint is included, a speaker's name may be included after it.",
    "- Do not include '(during argument)' after speaker names.",
    "- Separate multiple pinpoint references with commas.",
    "- Use an en dash (–) to indicate a range of numbers."
  ],
  examples: [
    {
      correct: "<i>R v Smith</i> (Transcript of Proceedings, Supreme Court of Victoria, 12 March 2023) 45 (Jones J)",
      explanation: "Basic pinpoint reference with page number and speaker."
    },
    {
      correct: "<i>Smith v Jones</i> (Transcript of Proceedings, County Court of Victoria, 15 April 2023) lines 123–125 (Defence Counsel)",
      explanation: "Line number range with speaker."
    },
    {
      correct: "<i>R v Thompson</i> (Transcript of Proceedings, Supreme Court of Victoria, 20 June 2023) 12, 15–16",
      explanation: "Multiple page references without speaker."
    }
  ]
};

export const transcriptRules = {
  caseName: reportedDecisionsRules.caseName,
  court: courtOrderRules.court,
  proceedingNumber: proceedingRules.proceedingNumber,
  judicialOfficer: reportedDecisionsRules.pinpointJudges,
  pinpoint: transcriptPinpointRules
};
