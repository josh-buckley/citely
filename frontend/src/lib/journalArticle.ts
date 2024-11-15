export const journalArticleRules = {
    authors: {
      title: "General Rules for Authors",
      rules: [
        "Authors' names should appear exactly as on title page, with exceptions:",
        "- No spaces between initials and no full stops after initials.",
        "- Omit post-nominals (AM, LLB, etc).",
        "- Omit honorific titles (Dr, Prof, etc) except 'Sir', 'Dame' and peerage titles.",
        "Use honorific titles in discursive text only (both body and footnotes)."
      ],
      examples: [
        {
          context: "In citations",
          correct: "Katy Barnett",
          incorrect: "Associate Professor Katy Barnett",
          explanation: "Omit honorific titles in citations."
        },
        {
          context: "In citations",
          correct: "Lord Nicholls",
          incorrect: "The Rt Hon Lord Nicholls",
          explanation: "Include only peerage title."
        },
        {
          context: "In discursive text",
          correct: "Professor Ian Malkin",
          incorrect: "Ian Malkin",
          explanation: "Honorific titles may be used in text."
        }
      ],
      nameFormats: [
        { inText: "Associate Professor Katy Barnett", inCitation: "Katy Barnett" },
        { inText: "Dame Nellie Melba", inCitation: "Dame Nellie Melba" },
        { inText: "Lord Nicholls", inCitation: "Lord Nicholls" },
        { inText: "Professor Ian Malkin", inCitation: "Ian Malkin" },
        { inText: "Baroness Hale", inCitation: "Baroness Hale" },
        { inText: "Dr Cockburn", inCitation: "John Cockburn" },
        { inText: "Ms Sharon Rodrick", inCitation: "Sharon Rodrick" },
        { inText: "Mr Gageler SC", inCitation: "Stephen Gageler" },
        { inText: "HLA Hart", inCitation: "HLA Hart" },
        { inText: "Chief Justice Susan Kiefel", inCitation: "Chief Justice Susan Kiefel" }
      ]
    },
    multipleAuthors: {
      title: "Multiple Authors",
      rules: [
        "For two or three authors, include all names.",
        "Separate last two authors with 'and'.",
        "For more than three authors, use first author's name followed by 'et al'.",
        "Follow same rules in subsequent references."
      ],
      examples: [
        {
          correct: "James Edelman and Elise Bant",
          explanation: "Two authors separated by 'and'."
        },
        {
          correct: "Paul Rishworth et al",
          explanation: "More than three authors using et al."
        }
      ]
    },
    bodyAuthors: {
      title: "Publications Authored by a Body",
      rules: [
        "Use body's name as author.",
        "Include jurisdiction abbreviation in parentheses for government departments if not apparent.",
        "For subdivisions format as: Individual/Subdivision, Body.",
        "Include only most specific subdivision unless ambiguous.",
        "Omit author if not prominently credited.",
        "Use 'Commonwealth' for Commonwealth of Australia.",
        "Omit corporate status terms (Pty, Ltd, Co, Inc).",
        "Use English-language title only for multilingual bodies."
      ],
      examples: [
        {
          correct: "Department for Women (NSW)",
          explanation: "Government department with jurisdiction."
        },
        {
          correct: "Information Management Committee, Department of Justice and Attorney-General (Qld)",
          explanation: "Subdivision of government body."
        },
        {
          correct: "Commonwealth",
          incorrect: "Commonwealth of Australia",
          explanation: "Correct rendering of Commonwealth."
        }
      ]
    },
    judicialOfficers: {
      title: "Judicial Officers",
      rules: [
        "For curial writing (judgments):",
        "- Include surname and judicial/peerage title.",
        "- Use appropriate abbreviation after name.",
        "- Follow rules for multiple judicial officers.",
        "For extra-curial writing (not judgments):",
        "- Omit judicial title unless it appears on source.",
        "- Include 'Sir', 'Dame' or peerage titles.",
        "- For former officers, omit judicial title but may include honorifics in text.",
        "Omit territorial designation of peers unless needed to avoid confusion."
      ],
      examples: [
        {
          context: "Curial writing",
          correct: "Dixon J noted in Essendon Corporation v Criterion Theatres Ltd...",
          explanation: "Judicial officer writing in judgment."
        },
        {
          context: "Extra-curial writing",
          correct: "James Edelman and Elise Bant",
          incorrect: "Justice James Edelman and Elise Bant",
          explanation: "Judicial officer writing outside judgment."
        },
        {
          context: "Former judicial officer",
          correct: "Michael Kirby",
          incorrect: "Justice Michael Kirby",
          explanation: "Former judicial officer in citation."
        }
      ]
    },
    title: {
      title: "Title",
      rules: [
        "Titles should appear as in original source, with exceptions:",
        "- Punctuation should adhere to rule 1.6.",
        "- Capitalisation should adhere to rule 1.7.",
        "- Use colon to separate title from subtitle, regardless of original punctuation.",
        "- Include only first subtitle, unless second subtitle is a span of dates.",
        "- For older sources with comma-separated initial short title, include only initial short title.",
        "Words normally italicised should only be italicised if italicised in original source.",
        "If entire source title should be italicised (eg books), no part should appear in roman font."
      ],
      examples: [
        {
          correct: "CB Cato, 'The Mareva Injunction and Its Application in New Zealand'",
          incorrect: "CB Cato, 'The <i>Mareva</i> Injunction and Its Application in New Zealand'",
          explanation: "Do not italicise words unless italicised in original source."
        },
        {
          correct: "FA Trindade and HP Lee (eds), <i>The Constitution of Malaysia: Further Perspectives and Developments</i>",
          incorrect: "FA Trindade and HP Lee (eds), <i>The Constitution of Malaysia: Further Perspectives and Developments: Essays in Honour of Tun Mohamed Suffian</i>",
          explanation: "Include only first subtitle."
        },
        {
          correct: "Adam Webster, 'Sharing Water from Transboundary Rivers in Australia: An Interstate Common Law?'",
          originalTitle: "Sharing Water from Transboundary Rivers in Australia — An Interstate Common Law?",
          explanation: "Use colon instead of dash between title and subtitle."
        },
        {
          correct: "Loretta De Plevitz, 'The Briginshaw \"Standard of Proof\" in Anti-Discrimination Law: \"Pointing with a Wavering Finger\"'",
          originalTitle: "The Briginshaw 'Standard of Proof' in Anti-Discrimination Law: 'Pointing with a Wavering Finger'",
          explanation: "Use double quotes instead of single quotes within title."
        }
      ],
      titleFormatting: {
        separators: [
          { type: "Title and subtitle", use: ": " },
          { type: "Multiple subtitles", use: "Include first only (except date spans)" }
        ],
        italicisation: [
          { rule: "Only italicise words that are italicised in original source.", 
            exception: "Unless entire source title should be italicised (eg books)." }
        ],
        quotes: [
          { rule: "Use double quotes within title when appearing in single-quoted context.",
            example: "'The Briginshaw \"Standard of Proof\" in Anti-Discrimination Law: \"Pointing with a Wavering Finger\"'" }
        ]
      }
    },
    symposia: {
        title: "Symposia",
        rules: [
          "For whole symposium citation:",
          "- Use 'Symposium' in place of author name.",
          "- Place symposium title in inverted commas.",
          "- Use starting page of first article or symposium title page.",
          "Cite individual symposium articles as regular journal articles."
        ],
        examples: [
          {
            correct: "Symposium, 'Contemporary Human Rights in Australia' (2002) 26(2) Melbourne University Law Review 251.",
            explanation: "Citation for entire symposium."
          }
        ]
      },
    shortTitle: {
      title: "Short Title and Subsequent References",
      rules: [
        "Short title may be provided and used in subsequent references.",
        "Use 'Ibid' for all materials in accordance with rule 1.4.3.",
        "Short title formatting requirements:",
        "- Should be italicised in accordance with Guide rules.",
        "- Should appear in single inverted commas.",
        "- Should be placed within parentheses.",
        "- In footnotes, should appear after pinpoints or parenthetical clauses.",
        "Full title requirements:",
        "- Provide full title on first reference in text.",
        "- Provide full title on first citation in footnotes.",
        "- If short title was only in footnotes, provide it in text on first text usage."
      ],
      examples: [
        {
          context: "In text first mention",
          text: "The last 20 years has seen a steady increase in the number of Investor State Dispute Settlement ('ISDS') claims, with fewer than 10 being initiated in 1997 to 62 being initiated in 2016.",
          explanation: "Introducing short title in text with full term and abbreviation in parentheses."
        },
        {
          context: "In footnote first mention",
          citation: "Investment and Enterprise Division, UNCTAD, <i>Investor–State Dispute Settlement: Review of Developments in 2016</i> (IIA Issues Note No 1, 19 May 2017) 2 ('ISDS 2016 Review').",
          explanation: "Full citation with short title introduction in footnote."
        },
        {
          context: "Subsequent reference",
          citation: "ISDS 2016 Review (n 27) 4.",
          explanation: "Using established short title in subsequent reference."
        },
        {
          context: "First text usage after footnote introduction",
          correct: "The potential financial consequences were outlined in <i>Investor–State Dispute Settlement: Review of Developments in 2016</i> ('ISDS 2016 Review').",
          incorrect: "The potential financial consequences were outlined in ISDS 2016 Review.",
          explanation: "Must provide full title and short title on first text usage even if previously introduced in footnotes."
        }
      ],
      formatting: {
        shortTitlePlacement: [
          { context: "In footnotes", rule: "After pinpoints and parenthetical clauses." },
          { context: "In text", rule: "Immediately following full title." }
        ],
        requirements: [
          { rule: "Use full title on first mention in both text and footnotes.", 
            explanation: "Ensures proper introduction of source." },
          { rule: "Provide short title in both locations.", 
            explanation: "Even if previously introduced elsewhere." },
          { rule: "Maintain consistent formatting of short title.", 
            explanation: "Including italicisation where required." }
        ]
      }
    },
    year: {
        title: "Year",
        rules: [
          "For journals organized by volume number:",
          "- Year should appear in parentheses ( ).",
          "- For volumes spanning multiple years, use year article was published.",
          "For journals organized by year:",
          "- Year should appear in square brackets [ ].",
          "- For volumes spanning multiple years, include full span in square brackets (e.g., '[1992–93]')."
        ],
        examples: [
          {
            correct: "Jeremy Masters, 'Easing the Parting' (2008) 82(11) Law Institute Journal 68, 69–71.",
            explanation: "Volume-organized journal using parentheses for year."
          },
          {
            correct: "John Kleinig, 'Paternalism and Personal Integrity' [1983] (3) Bulletin of the Australian Society of Legal Philosophy 27.",
            explanation: "Year-organized journal using square brackets."
          }
        ]
      },
  
      volumeAndIssue: {
        title: "Volume and Issue",
        rules: [
          "Include both volume and issue numbers.",
          "Place issue number in parentheses after volume number (e.g., '40(1)').",
          "For year-organized journals:",
          "- Place issue number in parentheses after year with space.",
          "- Format as '[2000] (1)'.",
          "For non-numeric issue identifiers:",
          "- Place in parentheses after volume/year with space.",
          "- Format as '31 (Winter)' or '[1982] (Summer)'.",
          "For multiple issues in one bound edition:",
          "- Separate with en-dash inside parentheses.",
          "- Format as '21(2–3)' or '[1957] (5–6)'."
        ],
        examples: [
          {
            correct: "Andrew Edgar, 'Administrative Regulation-Making: Contrasting Parliamentary and Deliberative Legitimacy' (2017) 40(3) Melbourne University Law Review 738, 747–9.",
            incorrect: "(2017) 40 Melbourne University Law Review 738",
            explanation: "Include issue number in parentheses."
          },
          {
            correct: "Dawn Oliver, 'Is the Ultra Vires Rule the Basis of Judicial Review?' [1987] (Winter) Public Law 543.",
            explanation: "Non-numeric issue identifier in parentheses."
          }
        ]
      },
  
      journal: {
        title: "Journal",
        rules: [
          "Use full title of journal in italics.",
          "Place after year and volume/issue number.",
          "Use title as it appears on title page, with exceptions:",
          "- Omit 'the' from start of journal title.",
          "- Omit subtitles where this does not cause ambiguity.",
          "Do not abbreviate journal titles."
        ],
        examples: [
          {
            correct: "<i>Australian Law Journal</i>",
            incorrect: "The Australian Law Journal, ALJ, Australian L J",
            explanation: "Use full title without 'the' or abbreviations."
          },
          {
            correct: "<i>Copyright Reporter</i>",
            incorrect: "<i>Copyright Reporter: Journal of the Copyright Society of Australia</i>",
            explanation: "Omit subtitle when unambiguous."
          }
        ]
      },
  
      startingPage: {
        title: "Starting Page",
        rules: [
          "Include number of first page of article after journal title.",
          "No punctuation between journal title and starting page."
        ],
        examples: [
          {
            correct: "Hailegabriel G Feyissa, 'European Extraterritoriality in Semicolonial Ethiopia' (2016) 17(1) Melbourne Journal of International Law 107.",
            explanation: "Starting page follows journal title without punctuation."
          }
        ]
      },
  
      articleParts: {
        title: "Articles Published in Parts",
        rules: [
          "Give full citation for each part cited.",
          "Insert '(Pt Number)' between title and year.",
          "Omit any reference to part within article title."
        ],
        examples: [
          {
            correct: "RN Gooderson, 'Claim of Right and Dispute of Title' (Pt 1) [1966] (1) Cambridge Law Journal 90.",
            explanation: "Part number inserted between title and year."
          },
          {
            correct: "Michelle Foster, Jane McAdam and Davina Wadley, 'The Protection of Stateless Persons in Australian Law' (Pt 1) (2016) 40(2) Melbourne University Law Review 401.",
            incorrect: "Michelle Foster, Jane McAdam and Davina Wadley, 'Part One: The Protection of Stateless Persons in Australian Law'",
            explanation: "Part reference removed from title and placed after title."
          }
        ]
      },
  
  
      onlineJournals: {
        title: "Articles Published in Online Journals",
        rules: [
          "Cite like printed journals where possible.",
          "When no volume/issue/page numbers available:",
          "- Use article number or identifier instead of starting page.",
          "- For PDF articles, use format: Article Number/Identifier : Page Range of Article, Pinpoint.",
          "Use appropriate pinpoint format based on article format (paragraph, part, etc)."
        ],
        examples: [
          {
            correct: "Azzurra Annunziata et al, 'Do Consumers Want More Nutritional and Health Information on Wine Labels?' (2016) 8(7) Nutrients 416:1–19, 8.",
            explanation: "Online journal with article number and page range."
          },
          {
            correct: "William van Caenegem, 'Copyright Liability for the Playing of \"Music on Hold\"' (1996) 2 High Court Review 5:1–7, 4–6 [9]–[12].",
            explanation: "Online journal with article identifier and paragraph numbers."
          }
        ]
      },
      pinpoints: {
        title: "Pinpoints",
        rules: [
          "Pinpoint references should appear after the starting page, preceded by a comma and space.",
          "Where pinpoint reference is to the starting page of an article, the page number should be repeated.",
          "Multiple pinpoints should be separated by en-dashes for ranges, commas for discrete pages.",
        ],
        examples: [
          {
            correct: "Sir Zelman Cowen, 'The Press, the Courts and the Law' (1979) 12(1) Melbourne University Law Review 1, 1–9",
            explanation: "Page range pinpoint with en-dash."
          },
          {
            correct: "Gordon Goldberg, 'Certain Contemporary Confusions Concerning Consideration, a Common Count and Conversion' (2000) 8(2) Restitution Law Review 189, 189",
            explanation: "Single page pinpoint repeating starting page."
          }
        ]
      },
  
      forthcomingArticles: {
        title: "Forthcoming and Advance Journal Articles",
        rules: [
          "For forthcoming articles:",
          "- Replace starting page with '(forthcoming)'.",
          "For advance articles:",
          "- Replace starting page with '(advance)'.",
          "Include as much information as available."
        ],
        examples: [
          {
            correct: "Geneviève Helleringer and Anne-Lise Sibony, 'European Consumer Protection through the Behavioral Lens' (2017) 23 Columbia Journal of European Law (forthcoming).",
            explanation: "Forthcoming article citation."
          },
          {
            correct: "Michael Crommelin, 'Powers of the Head of State' (2015) 38(3) Melbourne University Law Review (advance).",
            explanation: "Advance article citation."
          }
        ]
      }
    };