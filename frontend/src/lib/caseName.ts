export const basicRules = {
    title: "Parties' Names — General Rule",
    rules: [
      "A citation to an Australian case should generally include the parties' names (as they appear on the first page of the decision) in italics except:",
      "- Full stops should not be used in abbreviations.",
      "- Words should be capitalised where they are at the beginning of the case name or are proper nouns.",
      "- Where the parties are individuals, only the surname should be cited (ie given names and initials should be omitted).",
      "- Only the first plaintiff and first defendant should be cited (ie '& Anor' or '& Ors' should not be used to indicate other parties).",
      "- Where the case involves more than one action, only the first action should be cited.",
      "The parties' names should be separated as they appear in the decision, which will generally mean that they are separated by <i>v</i>."
    ],
    examples: [
      {
        correct: "<i>Momentum Productions Pty Ltd v Lewarne</i> (2009) 174 FCR 268",
        incorrect: "<i>Momentum Productions Pty Ltd v Richard John Lewarne</i> (2009) 174 FCR 268",
        explanation: "Given names should be omitted."
      },
      {
        correct: "<i>2 Hot Holdings Pty Ltd v Creasy</i> (1996) 185 CLR 149",
        incorrect: "<i>Hot Holdings Pty Ltd v Creasy and Ors</i> (1996) 185 CLR 149",
        explanation: "Additional parties should not be referenced with '& Ors'."
      },
      {
        correct: "<i>Tame v New South Wales</i> (2002) 211 CLR 317",
        incorrect: "<i>Tame v New South Wales; Annetts v Australian Stations Pty Ltd</i> (2002) 211 CLR 317",
        explanation: "Only cite the first action."
      }
    ]
  };
  
  export const specialPartyRules = {
    business: {
      title: "Business Corporations and Firms",
      rules: [
        "Use the following abbreviations:",
        "- Company -> Co.",
        "- Limited -> Ltd.",
        "- Proprietary -> Pty.",
        "- Incorporated -> Inc.",
        "- (in liquidation) -> (in liq).",
        "- (in provisional liquidation) -> (in prov liq).",
        "- (administrator appointed) -> (admin apptd).",
        "- (manager appointed) -> (mgr apptd).",
        "- (receiver appointed) -> (rec apptd).",
        "Other (including foreign) words designating corporate status ('GmbH', 'AG', 'plc', 'SA', 'Sarl', etc) should be abbreviated according to convention.",
        "Include 'the' if it forms part of a corporation name.",
        "'Trading as' or 't/as', trading names and former company names should not be included.",
        "Company's ACN should generally be omitted, unless there is no other name."
      ],
      examples: [
        {
          correct: "<i>Andrew Shelton & Co Pty Ltd v Alpha Healthcare Ltd</i> (2002) 5 VR 577",
          explanation: "Uses standard corporate abbreviations."
        },
        {
          correct: "<i>Lumbers v W Cook Builders Pty Ltd (in liq)</i> (2008) 232 CLR 635",
          explanation: "Uses standard liquidation abbreviation."
        }
      ]
    },
    commonwealth: {
      title: "The Commonwealth and the States and Territories",
      rules: [
        "Use 'Commonwealth' for Commonwealth of Australia.",
        "For states and territories, use only the name (eg 'Queensland', not 'State of Queensland').",
        "'The' should be omitted from such names."
      ],
      examples: [
        {
          correct: "<i>JT International SA v Commonwealth</i> (2012) 250 CLR 1",
          incorrect: "<i>JT International SA v The Commonwealth of Australia</i> (2012) 250 CLR 1",
          explanation: "Use 'Commonwealth' without 'the' or full name."
        },
        {
          correct: "<i>Unions NSW v New South Wales</i> (2013) 252 CLR 530",
          incorrect: "<i>Unions NSW v State of New South Wales</i> (2013) 252 CLR 530",
          explanation: "Use state name only."
        }
      ]
    },
    crown: {
      title: "The Crown",
      rules: [
        "Rex ('the King') and Regina ('the Queen') should be abbreviated to 'R' where the Crown is the first-named party.",
        "Where the Crown is the respondent, 'The King' or 'The Queen' (as appropriate) should be written in full."
      ],
      examples: [
        {
          correct: "<i>R v Reid</i> [2007] 1 Qd R 64",
          explanation: "Crown as first-named party."
        },
        {
          correct: "<i>Honeysett v The Queen</i> (2014) 253 CLR 122",
          explanation: "Crown as respondent."
        }
      ]
    },
    government: {
      title: "Government Entities, Foreign Governments and International Organisations",
      rules: [
        "Use the conventional shortened form (if one exists), rather than the full elaborate form.",
        "Use the full form only where necessary to avoid ambiguity.",
        "'The' should be omitted from such names."
      ],
      examples: [
        {
          correct: "<i>BP Refinery (Westernport) Pty Ltd v Shire of Hastings</i> (1977) 180 CLR 266",
          incorrect: "<i>BP Refinery (Westernport) Pty Ltd v President, Councillors and Ratepayers of the Shire of Hastings</i> (1977) 180 CLR 266  ",
          explanation: "Use conventional shortened form."
        },
        {
          correct: "<i>European Community v Commissioner of Patents</i> (2006) 68 IPR 539",
          explanation: "Use conventional shortened form."
        }
      ]
    },
    ministers: {
      title: "Ministers and Officers of the Commonwealth, States and Territories, and Government Departments",
      rules: [
        "Use conventional shortened form of title (if one exists).",
        "Include only title (omit name) if both are in decision.",
        "Include name only if no title in decision.",
        "Include jurisdiction in parentheses if not evident in title.",
        "For department officers, include position and department name, separated by comma.",
        "'The' should be omitted from such titles."
      ],
      examples: [
        {
          correct: "<i>MacCormick v Federal Commissioner of Taxation</i> (1984) 158 CLR 622",
          incorrect: "<i>MacCormick v Commissioner of Taxation of the Commonwealth of Australia</i> (1984) 158 CLR 622",
          explanation: "Use conventional shortened form."
        },
        {
          correct: "<i>M238 of 2002 v Minister for Immigration and Multicultural and Indigenous Affairs</i> [2003] FCAFC 260",
          incorrect: "<i>M238 of 2002 v Ruddock, The Minister for Immigration</i> [2003] FCAFC 260",
          explanation: "Omit minister's name when title is available."
        }
      ]
    },
    attorneysGeneral: {
      title: "Attorneys-General and Directors of Public Prosecutions",
      rules: [
        "Use 'Attorney-General' in text and 'A-G' in footnote citations.",
        "Use 'Director of Public Prosecutions' in text and 'DPP' in footnote citations.",
        "Add abbreviated jurisdiction in parentheses.",
        "'The' should not precede 'A-G' or 'DPP' in footnote citations."
      ],
      examples: [
        {
          correct: "<i>DPP (Vic) v Finn</i> (2008) 186 A Crim R 235",
          explanation: "Using DPP abbreviation with jurisdiction."
        },
        {
          correct: "<i>Bradshaw v A-G (Qld)</i> [2000] 2 Qd R 7",
          explanation: "Using A-G abbreviation with jurisdiction."
        }
      ]
    }
  };
  
  export const advancedRules = {
    re: {
      title: "Use of 'Re'",
      rules: [
        "Procedural phrases such as 'In re' and 'In the matter of' should be shortened to 'Re'."
      ],
      examples: [
        {
          correct: "<i>Re Judiciary and Navigation Acts</i> (1921) 29 CLR 257",
          incorrect: "<i>In re Judiciary and Navigation Acts</i> (1921) 29 CLR 257",
          explanation: "Use 'Re' not 'In re'."
        }
      ]
    },
    exParte: {
      title: "Use of 'Ex parte'",
      rules: [
        "'Ex parte' should not be abbreviated.",
        "'Ex' should be capitalised.",
        "'parte' should not be capitalised."
      ],
      examples: [
        {
          correct: "<i>Re McBain; Ex parte Australian Catholic Bishops Conference</i> (2002) 209 CLR 372",
          explanation: "Correct format for Ex parte."
        }
      ]
    },
    exRel: {
      title: "Use of 'ex rel'",
      rules: [
        "When citing a relator action, the first-named relator should always be included.",
        "Should be introduced by the abbreviation 'ex rel'."
      ],
      examples: [
        {
          correct: "<i>A-G (Vic) ex rel Dale v Commonwealth</i> (1945) 71 CLR 237",
          incorrect: "<i>A-G (Vic) (at the relation of Dale and Others)</i> (1945) 71 CLR 237",
          explanation: "Use 'ex rel' format."
        }
      ]
    },
    v: {
      title: "Use of 'v'",
      rules: [
        "A <i>v</i> should generally separate the parties' names.",
        "In family law cases, <i>v</i> should replace '&' to separate the parties.",
        "<i>v</i> should not be followed by a full stop and should be italicised."
      ],
      examples: [
        {
          correct: "<i>K-Generation Pty Ltd v Liquor Licensing Court</i> (2007) 99 SASR 58",
          explanation: "Standard use of v."
        },
        {
          correct: "<i>Lam v Zeng</i> [2017] FamCA 951",
          incorrect: "<i>Lam & Zeng</i> [2017] FamCA 951",
          explanation: "Use v not & in family law cases."
        }
      ]
    },
    admiralty: {
      title: "Admiralty Cases",
      rules: [
        "For admiralty cases in rem, only the name of the vessel should appear as the case name.",
        "For admiralty cases in personam, the parties' names should appear with vessel name in parentheses as short title.",
        "'The' should be included in names of vessels."
      ],
      examples: [
        {
          correct: "<i>The Maria Luisa [No 2]</i> (2003) 130 FCR 12",
          incorrect: "<i>Kent v Vessel 'Maria Luisa' [No 2]</i> (2003) 130 FCR 12",
          explanation: "Use vessel name only for in rem cases."
        }
      ]
    },
    multipleProceedings: {
      title: "Multiple Proceedings between the Same Parties",
      rules: [
        "Number of decision should be indicated in square brackets if it appears in case name itself.",
        "Where numbers don't appear in case names, use descriptive short titles."
      ],
      examples: [
        {
          correct: "<i>Bahr v Nicolay [No 2]</i> (1988) 164 CLR 604",
          explanation: "Include number in square brackets."
        }
      ]
    },
    omittingName: {
      title: "Omitting the Case Name",
      rules: [
        "Case name should be omitted in footnote citation if it appears in full in accompanying sentence.",
        "If footnote is subsequent reference, case name should always appear (may be short title)."
      ],
      examples: [
        {
          correct: "In <i>Thomas v Mowbray</i>,47 the control order regime was challenged.\n__________\n47 (2007) 233 CLR 307",
          explanation: "Case name omitted in footnote when in sentence."
        }
      ]
    }
  };