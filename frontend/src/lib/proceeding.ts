import { basicRules as caseNameRules, specialPartyRules, advancedRules } from "./caseName";
import { unreportedNoMediumNeutralRules } from "./unreportedNoMediumNeutral";

export const proceedingRules = {
  caseName: caseNameRules,
  specialPartyRules,
  advancedRules,
  court: unreportedNoMediumNeutralRules.court,
  proceedingNumber: {
    title: "Proceeding Number",
    rules: [
      "The proceeding number is the number assigned by the court to the matter and should appear without spaces."
    ],
    examples: [
      {
        correct: "<i>Australian Competition and Consumer Commission v Olex Australia Pty Ltd</i> (Federal Court of Australia, VID725/2014, commenced 3 December 2014)",
        explanation: "Proceeding number VID725/2014 shown without spaces."
      },
      {
        correct: "<i>Automotive Food Metals Engineering Printing and Kindred Industries Union v Beynon</i> (Federal Court of Australia, VID466/2010, commenced 15 June 2010)",
        explanation: "Proceeding number VID466/2010 shown without spaces."
      }
    ]
  }
};
