import { reportedDecisionsRules } from "./reportedDecisions";
import { basicRules as caseNameRules, specialPartyRules, advancedRules } from "./caseName";

export const unreportedNoMediumNeutralRules = {
  caseName: caseNameRules,
  specialPartyRules,
  advancedRules,
  court: {
    title: "Court",
    rules: [
      "Write the court name in full.",
      "Include in parentheses after the case name.",
      "Include with judge and date details."
    ],
    examples: [
      {
        correct: "<i>Ross v Chambers</i> (Supreme Court of the Northern Territory, Kriewaldt J, 5 April 1956) 77–8",
        explanation: "Full court name with judge and date details."
      }
    ]
  },
  judge: reportedDecisionsRules.pinpointJudges,
  pinpoint: reportedDecisionsRules.pinpointReference,
};
