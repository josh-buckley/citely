import { reportedDecisionsRules } from "./reportedDecisions";

export const unreportedDecisionsRules = {
  caseName: reportedDecisionsRules.caseName,
  year: reportedDecisionsRules.year,
  pinpoint: reportedDecisionsRules.pinpoint,
  judge: reportedDecisionsRules.pinpointJudges,
  judgmentNumber: {
    title: "Judgment Number",
    rules: [
      "Write the judgment number exactly as it appears in the decision.",
      "Do not add spaces between components.",
      "Include all numbers in the original format."
    ],
    examples: [
      {
        correct: "<i>Plaintiff S157/2002 v Commonwealth</i> [2003] HCA 2",
        explanation: "Judgment number '2' as it appears in the decision."
      },
      {
        correct: "<i>Commissioner of Taxation v Consolidated Media Holdings Ltd</i> [2012] HCA 55",
        explanation: "Judgment number '55' as it appears in the decision."
      },
      {
        correct: "<i>Construction, Forestry, Mining and Energy Union v Hadgkiss</i> [2007] FCAFC 59",
        explanation: "Full Federal Court judgment number '59' as it appears."
      }
    ]
  },
  courtIdentifier: {
    title: "Unique Court Identifier",
    rules: [
      "A list of the current preferred unique court identifiers for Australian Supreme and superior Commonwealth courts, and the years for which the courts allocated judgment numbers themselves:"
    ],
    courtIdentifierTable: [
      { court: "High Court of Australia", identifier: "HCA", years: "1998–" },
      { court: "High Court of Australia — Special Leave Dispositions", identifier: "HCASL", years: "2008–" },
      { court: "Federal Court of Australia", identifier: "FCA", years: "1999–" },
      { court: "Federal Court of Australia — Full Court", identifier: "FCAFC", years: "2002–" },
      { court: "Family Court of Australia", identifier: "FamCA", years: "1998–" },
      { court: "Family Court of Australia — Full Court", identifier: "FamCAFC", years: "2008–" },
      { court: "Supreme Court of the Australian Capital Territory (including Full Court)", identifier: "ACTSC", years: "1998–" },
      { court: "Australian Capital Territory Court of Appeal", identifier: "ACTCA", years: "2002–" },
      { court: "Supreme Court of New South Wales", identifier: "NSWSC", years: "1999–" },
      { court: "New South Wales Court of Appeal", identifier: "NSWCA", years: "1999–" },
      { court: "New South Wales Court of Criminal Appeal", identifier: "NSWCCA", years: "1999–" },
      { court: "Supreme Court of the Northern Territory (including Full Court)", identifier: "NTSC", years: "2000–" },
      { court: "Northern Territory Court of Appeal", identifier: "NTCA", years: "2000–" },
      { court: "Northern Territory Court of Criminal Appeal", identifier: "NTCCA", years: "1998–" },
      { court: "Supreme Court of Queensland", identifier: "QSC", years: "1998–" },
      { court: "Queensland Court of Appeal", identifier: "QCA", years: "1999–" },
      { court: "Supreme Court of South Australia (including Full Court until end of 2009)", identifier: "SASC", years: "2010–" },
      { court: "Supreme Court of South Australia — Full Court", identifier: "SASCFC", years: "2010–" },
      { court: "Supreme Court of Tasmania (including Full Court until end of 2009)", identifier: "TASSC", years: "1999–" },
      { court: "Tasmanian Court of Criminal Appeal", identifier: "TASCCA", years: "2010–" },
      { court: "Supreme Court of Tasmania — Full Court", identifier: "TASFC", years: "2010–" },
      { court: "Supreme Court of Victoria", identifier: "VSC", years: "1998–" },
      { court: "Victorian Court of Appeal", identifier: "VSCA", years: "1998–" },
      { court: "Supreme Court of Western Australia", identifier: "WASC", years: "1999–" },
      { court: "Western Australian Court of Appeal (including Full Court until end 2004)", identifier: "WASCA", years: "1999–" }
    ],
    examples: [
      {
        correct: "<i>Plaintiff M68/2015 v Minister for Immigration and Border Protection</i> [2016] HCA 1",
        explanation: "Using High Court of Australia identifier 'HCA'."
      },
      {
        correct: "<i>Commissioner of State Revenue v Lend Lease Development Pty Ltd</i> [2014] VSCA 143",
        explanation: "Using Victorian Court of Appeal identifier 'VSCA'."
      }
    ]
  }
};
