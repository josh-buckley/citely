export const reportedDecisionsRules = {
    caseName: {
      title: "Case Name",
      rules: [
        "Write case names in italics.",
        "Use 'v' (not 'vs' or 'versus') between party names.",
        "For criminal cases:",
        "- Use 'R v' for Crown prosecutions.",
        "- Use 'DPP v' for Director of Public Prosecutions.",
        "For civil cases:",
        "- Use party names as they appear in the report.",
        "- Omit given names unless needed to avoid ambiguity.",
        "- Include business suffixes (Pty Ltd, Inc, etc).",
        "For multiple parties:",
        "- Use only first party on each side.",
        "- Add '[No 2]' etc for subsequent decisions between same parties."
      ],
      examples: [
        {
          correct: "<i>Smith v Jones</i>",
          explanation: "Basic civil case format."
        },
        {
          correct: "<i>R v Thompson</i>",
          explanation: "Criminal case format."
        },
        {
          correct: "<i>Woolworths Ltd v Smith</i>",
          explanation: "Company name with suffix."
        },
        {
          correct: "<i>Jones v Smith [No 2]</i>",
          explanation: "Subsequent decision indicator."
        }
      ]
    },
    yearAndVolume: {
      title: "Year and Volume",
      rules: [
        "Law report series are organised either by year or by volume number.",
        "For volume-organized series:",
        "- Use parentheses '( )' around year of decision.",
        "- Year is when decision was handed down (not necessarily year of report).",
        "For year-organized series:",
        "- Use square brackets '[ ]' around year.",
        "- Use year of the volume in which case is reported.",
        "- If multiple volumes in a year, include volume number between year and series abbreviation."
      ],
      examples: [
        {
          correct: "<i>R v Lester</i> (2008) 190 A Crim R 468",
          explanation: "Volume-organized series using parentheses."
        },
        {
          correct: "<i>King v King</i> [1974] Qd R 253",
          explanation: "Year-organized series using square brackets."
        },
        {
          correct: "<i>Rowe v McCartney</i> [1976] 2 NSWLR 72",
          explanation: "Year-organized series with multiple volumes."
        }
      ]
    },
    lawReportSeries: {
      title: "Law Report Series",
      rules: [
        "Do not use parallel citations.",
        "Follow citation preference order (from highest to lowest). Write out series names in full if acronym not know:",
      ],
      citationOrderTable: [
        { version: "Authorised report", examples: "CLR, FCR, VR, NSWLR" },
        { version: "Generalist unauthorised report", examples: "ALR, ALJR, FLR, ACTR" },
        { version: "Subject-specific unauthorised report", examples: "A Crim R, ACSR, IR, IPR" },
        { version: "Unreported (medium neutral citation)", examples: "HCA, FCA, NSWSC, VSC" },
        { version: "Unreported (no medium neutral citation)", examples: "See that citation type." }
      ],
      examples: [
        {
          correct: "<i>Vo v The Queen</i> (2013) 33 NTLR 65",
          incorrect: "<i>Vo v The Queen</i> [2013] NTCCA 4",
          explanation: "Use authorised report over medium neutral citation."
        },
        {
          correct: "<i>Plaintiff M68/2015 v Minister for Immigration and Border Protection</i> (2016) 257 CLR 42",
          incorrect: "<i>Plaintiff M68/2015 v Minister for Immigration and Border Protection</i> (2016) 257 CLR 42; (2016) 327 ALR 369",
          explanation: "Do not use parallel citations."
        }
      ],
      citationOrder: [
        { type: "Authorised report", examples: "CLR, FCR, VR, NSWLR" },
        { type: "Generalist unauthorised report", examples: "ALR, ALJR, FLR, ACTR" },
        { type: "Subject-specific unauthorised report", examples: "A Crim R, ACSR, IR, IPR" },
        { type: "Unreported (medium neutral citation)", examples: "HCA, FCA, NSWSC, VSC" },
        { type: "Unreported (no medium neutral citation)", examples: "See rule 2.3.2." }
      ],
      reportSeries: [
        {
          jurisdiction: "High Court of Australia",
          series: "CLR",
          years: "1903–"
        },
        {
          jurisdiction: "Federal Court of Australia",
          series: "FCR",
          years: "1984–"
        },
        {
          jurisdiction: "Australian Capital Territory",
          series: [
            { name: "ACTR (in ALR)", years: "1973–2008" },
            { name: "ACTLR", years: "2007–" }
          ]
        },
        {
          jurisdiction: "New South Wales",
          series: [
            { name: "SR (NSW)", years: "1901–59" },
            { name: "NSWR", years: "1960–70" },
            { name: "NSWLR", years: "1971–" }
          ]
        },
        {
          jurisdiction: "Northern Territory",
          series: [
            { name: "NTR (in ALR)", years: "1979–91" },
            { name: "NTLR", years: "1990–" }
          ]
        },
        {
          jurisdiction: "Queensland",
          series: [
            { name: "St R Qd", years: "1902–57" },
            { name: "Qd R", years: "1958–" }
          ]
        },
        {
          jurisdiction: "South Australia",
          series: [
            { name: "SALR", years: "1899–1920" },
            { name: "SASR", years: "1921–" }
          ]
        },
        {
          jurisdiction: "Tasmania",
          series: [
            { name: "Tas LR", years: "1904–40" },
            { name: "Tas SR", years: "1941–78" },
            { name: "Tas R", years: "1979–" }
          ]
        },
        {
          jurisdiction: "Victoria",
          series: [
            { name: "VLR", years: "1875–1956" },
            { name: "VR", years: "1957–" }
          ]
        },
        {
          jurisdiction: "Western Australia",
          series: [
            { name: "WALR", years: "1898–1958" },
            { name: "WAR", years: "1958–" }
          ]
        }
      ],
      commonUnauthorised: [
        "ALR",
        "ALJR",
        "FLR",
        "Fam LR",
        "A Crim R"
      ]
    },
    startingPage: {
      title: "Starting Page",
      rules: [
        "Include first page of case after report series abbreviation.",
        "If case uses unique reference instead of page, use that reference including symbols.",
        "Reference should follow report series abbreviation."
      ],
      examples: [
        {
          correct: "<i>Theophanous v Herald & Weekly Times Ltd</i> (1994) 182 CLR 104",
          explanation: "Standard page number citation."
        },
        {
          correct: "<i>Borg v Commissioner, Department of Corrective Services</i> (2002) EOC 93-198",
          explanation: "Unique reference citation."
        }
      ]
    },
    pinpointReference: {
      title: "Pinpoint References",
      rules: [
        "A pinpoint reference refers to a specific page, paragraph, footnote or section of a source.",
        "Basic formatting:",
        "- Do not use 'p', 'pg', or 'at' before the reference",
        "- Separate multiple references with commas",
        "Paragraph references:",
        "- Use square brackets around paragraph numbers",
        "- Do not use 'para' prefix (except for legislative materials)",
        "- If both page and paragraph, format as: Page [Paragraph]",
        "Sources without page numbers:",
        "- Use paragraph numbers only",
        "- Applies to looseleaf services, unreported judgments, legal encyclopedias",
        "Spans of references:",
        "- Use non-spaced en-dash (–)",
        "- Pages: 431–2",
        "- Paragraphs: [57]–[63]",
        "- Pages and paragraphs: 312–13 [5]–[11]",
        "- Footnotes: 466 nn 7–8",
        "Shortening rules:",
        "- Shorten page spans (eg '121–7')",
        "- Keep full paragraph numbers in brackets (eg '[56]–[59]')"
      ],
      examples: [
        {
          correct: "<i>Agius v South Australia [No 6]</i> [2018] FCA 358, [90]–[97] (Mortimer J)",
          explanation: "Paragraph span with square brackets."
        },
        {
          correct: "<i>City of Swan v Lehman Brothers Australia Ltd</i> (2009) 179 FCR 243, 262–5 [50]–[59] (Rares J)",
          explanation: "Combined page and paragraph spans with correct shortening."
        },
        {
          correct: "<i>Wurridjal v Commonwealth</i> (2009) 237 CLR 309, 389–90 [196]–[197]",
          explanation: "Page span with full paragraph numbers."
        },
        {
          correct: "<i>HLA Hart, The Concept of Law</i> (Clarendon Press, 1970) 15 n 7",
          explanation: "Single page with footnote reference."
        }
      ]
    },
    pinpointGeneral: {
      title: "General Pinpoint Rules",
      rules: [
        "Pinpoints should be preceded by comma and space.",
        "Multiple pinpoints should be separated by commas.",
        "For paginated reports:",
        "- Use page numbers.",
        "- Include page number even if same as starting page.",
        "For reports with both page and paragraph numbers:",
        "- Always include page numbers.",
        "- May include paragraph numbers additionally.",
        "- When using 'ibid', include both unless referring to same page and paragraph."
      ],
      examples: [
        {
          correct: "<i>Murphy v Overton Investments Pty Ltd</i> (2004) 216 CLR 388, 402 [29]",
          explanation: "Page and paragraph pinpoint."
        },
        {
          correct: "<i>De L v Director-General, Department of Community Services (NSW) [No 2]</i> (1997) 190 CLR 207, 211, 221–2",
          explanation: "Multiple page pinpoints."
        }
      ]
    },
    pinpointCourt: {
      title: "Court Identification",
      rules: [
        "Generally omit court name for reported cases.",
        "Include court name in parentheses if important and not apparent.",
        "Place after pinpoints and before short title.",
        "Omit jurisdiction if apparent from report series."
      ],
      examples: [
        {
          correct: "<i>Aldrick v EM Investments (Qld) Pty Ltd</i> [2000] 2 Qd R 346 (Court of Appeal)",
          explanation: "Court identification included when necessary."
        }
      ]
    },
    pinpointJudges: {
        title: "Identifying Judicial Officers",
        rules: [
          "Include judicial officer(s) in parentheses after pinpoint reference.",
          "Omit if identity is otherwise apparent.",
          "Do not use 'Per'.",
          "Omit honorifics when citing judicial officer writing curially.",
          "Include first name/initials only if needed for unambiguous identification.",
          "Use judicial office held at time of decision.",
          "Do not include phrase 'as he/she then was'.",
          "Use standard abbreviations for judicial offices.",
          "Titles marked with asterisk (*) should always appear in full before judicial officers' names."
        ],
        examples: [
          {
            correct: "<i>Kartinyeri v Commonwealth</i> (1998) 195 CLR 337, 383, 385–6 (Gummow and Hayne JJ), 386 (Kirby J)",
            explanation: "Multiple judicial officers with different pinpoints."
          },
          {
            correct: "<i>R v Merritt</i> (2004) 59 NSWLR 557, 567 [35]–[38] (Wood CJ at CL)",
            explanation: "Judicial officer with specific title."
          }
        ],
        judicialOfficers: [
          { office: "Acting Chief Justice", abbreviation: "ACJ" },
          { office: "Acting Justice of Appeal", abbreviation: "AJA" },
          { office: "Acting Justices of Appeal", abbreviation: "AJJA" },
          { office: "Acting Justice", abbreviation: "AJ" },
          { office: "Acting Justices", abbreviation: "AJJ" },
          { office: "Acting President", abbreviation: "AP" },
          { office: "Associate Justice", abbreviation: "AsJ" },
          { office: "Auxiliary Judge", abbreviation: "AUJ" },
          { office: "Chief Judge Administrator", abbreviation: "CJA" },
          { office: "Chief Judge at Common Law", abbreviation: "CJ at CL" },
          { office: "Chief Judge in Equity", abbreviation: "CJ in Eq" },
          { office: "Chief Judge of the Commercial Division", abbreviation: "CJ Comm D" },
          { office: "Chief Justice", abbreviation: "CJ" },
          { office: "Commissioner", abbreviation: "Commissioner*" },
          { office: "Deputy Chief Justice/District Court Judge", abbreviation: "DCJ" },
          { office: "Federal Magistrate", abbreviation: "FM" },
          { office: "Judge", abbreviation: "Judge*" },
          { office: "Judicial Registrar", abbreviation: "JR" },
          { office: "Justice of Appeal", abbreviation: "JA" },
          { office: "Justices of Appeal", abbreviation: "JJA" },
          { office: "Justice", abbreviation: "J" },
          { office: "Justices", abbreviation: "JJ" },
          { office: "Magistrate", abbreviation: "Magistrate*" },
          { office: "Master", abbreviation: "Master*" },
          { office: "President", abbreviation: "P" },
          { office: "Senior Judge Administrator", abbreviation: "SJA" },
          { office: "Senior Judge", abbreviation: "SJ" },
          { office: "Senior Judges", abbreviation: "SJJ" },
          { office: "Senior Puisne Judge", abbreviation: "SPJ" },
          { office: "Vice-President", abbreviation: "V-P" }
        ]
    },
    pinpointAgreement: {
      title: "Agreement or Dissent",
      rules: [
        "Indicate agreement within parentheses identifying original judicial officer.",
        "Use 'at' to pinpoint separate judgment of agreement.",
        "Identify each agreeing judicial officer separately.",
        "May indicate dissent in same manner when important."
      ],
      examples: [
        {
          correct: "<i>Guinea Airways Ltd v Federal Commissioner of Taxation</i> (1950) 83 CLR 584, 592–3 (Kitto J, Webb J agreeing at 591)",
          explanation: "Agreement with pinpoint."
        },
        {
          correct: "<i>D'Arcy v Myriad Genetics Inc</i> (2015) 258 CLR 334, 373 [96] (French CJ, Kiefel, Bell and Keane JJ, Gageler and Nettle JJ agreeing at 397 [172], Gordon J agreeing at 419 [285])",
          explanation: "Multiple agreements with separate pinpoints."
        }
      ]
    },
    pinpointJoint: {
      title: "Joint and Separate Judgments",
      rules: [
        "Use 'for the Court' after judicial officer's name when delivering judgment of the Court.",
        "Use 'for' followed by names when delivering judgment for other judicial officers.",
        "Include delivering judge's name in list after 'for'.",
        "Do not use for separate concurring judgments."
      ],
      examples: [
        {
          correct: "<i>Ewart v Fox</i> [1954] VLR 699, 705 (Hudson AJ for the Court)",
          explanation: "Judgment delivered for entire court."
        },
        {
          correct: "<i>Taylor v McQueen</i> [1954] VLR 661, 666 (Hudson J for Gavan Duffy and Hudson JJ)",
          explanation: "Judgment delivered for specific judges."
        }
      ]
    },
    pinpointArgument: {
      title: "Statements Made during Argument",
      rules: [
        "Include 'during argument' in separate parentheses after name.",
        "Do not use 'Arguendo'.",
        "For counsel, include initials and designations (QC, KC, SC) if in report."
      ],
      examples: [
        {
          correct: "<i>Stephens v Abrahams [No 2]</i> (1903) 29 VLR 229, 239 (Williams J) (during argument), 242–3 (Isaacs KC) (during argument)",
          explanation: "Statements by judge and counsel during argument."
        },
        {
          correct: "<i>Combet v Commonwealth</i> (2005) 224 CLR 494, 497 (SJ Gageler SC) (during argument)",
          explanation: "Statement by counsel with designation."
        }
      ]
    },
    pinpointMultiple: {
      title: "References to Two or More Judicial Officers",
      rules: [
        "Use plural abbreviation (JJ) for multiple judges in joint judgment.",
        "Use singular abbreviation (J) for each judge when not joint judgment.",
        "Use singular form if no plural exists.",
        "Apply after final name in joint judgment."
      ],
      examples: [
        {
          correct: "Gummow, Hayne and Kiefel JJ",
          incorrect: "Gummow J, Hayne J and Kiefel J",
          explanation: "Multiple judges in joint judgment."
        },
        {
          correct: "Heydon J, Kirby J and Crennan J",
          incorrect: "Heydon, Kirby and Crennan JJ",
          explanation: "Multiple judges in separate judgments."
        }
      ]
    },
    shortTitle: {
      title: "Shortened and Popular Case Names and Subsequent References",
      rules: [
        "Popular name or shortened version may be included as short title.",
        "Short title should be italicised and in single quotes within parentheses.",
        "Case name should be in full when first referred to.",
        "Short title should generally be: popular case name, first-named party, second-named party when first is Crown, or ship name."
      ],
      examples: [
        {
          correct: "<i>Commonwealth v Tasmania</i> (1983) 158 CLR 1 ('<i>Tasmanian Dam Case</i>')",
          explanation: "Use of popular name as short title."
        }
      ]
    }
  };