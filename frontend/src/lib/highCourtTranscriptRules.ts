import { reportedDecisionsRules } from './reportedDecisions';
import { transcriptPinpointRules } from './transcriptRules';

export const highCourtTranscriptRules = {
  caseName: reportedDecisionsRules.caseName,
  year: {
    title: "Year",
    rules: [
      "Use the year the transcript was created.",
      "The year will be enclosed in square brackets [ ].",
      "Note: This citation type should only be used for transcripts from the High Court of Australia from July 2003."
    ],
    examples: [
      {
        correct: "Transcript of Proceedings, <i>Ruhani v Director of Police</i> [2005] HCATrans 205",
        explanation: "Basic High Court transcript citation with year."
      },
      {
        correct: "Transcript of Proceedings, <i>Mulholland v Australian Electoral Commission</i> [2004] HCATrans 8, 2499–517 (Callinan J and JBR Beach QC), 2589–93 (McHugh J)",
        explanation: "High Court transcript with year and pinpoint references."
      }
    ]
  },
  number: {
    title: "Number",
    rules: [
      "Include the transcript number as it appears on the High Court transcript.",
      "The number follows 'HCATrans' without any punctuation."
    ],
    examples: [
      {
        correct: "Transcript of Proceedings, <i>Ruhani v Director of Police</i> [2005] HCATrans 205",
        explanation: "The number '205' is the transcript number."
      }
    ]
  },
  pinpoint: transcriptPinpointRules
};
