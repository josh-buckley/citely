export const symposiumRules = {
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
          "Cite individual symposium articles as regular symposium articles."
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
          "For a symposium organized by volume number:",
          "- Year should appear in parentheses ( ).",
          "- For volumes spanning multiple years, use year article was published.",
          "For a symposium organized by year:",
          "- Year should appear in square brackets [ ].",
          "- For volumes spanning multiple years, include full span in square brackets (e.g., '[1992–93]')."
        ],
        examples: [
          {
            correct: "(2002)",
            incorrect: "[2002]",
            explanation: "Use parentheses for a symposium organized by volume."
          },
          {
            correct: "[2010]",
            incorrect: "(2010)",
            explanation: "Use square brackets for a symposium organized by year."
          },
          {
            correct: "[1992–93]",
            incorrect: "[1992-93]",
            explanation: "Use en dash for year spans."
          }
        ]
      },
      volumeAndIssue: {
        title: "Volume and Issue",
        rules: [
          "If a symposium uses volume numbers:",
          "- Include volume number.",
          "- Omit if a symposium is organized by year.",
          "If a symposium uses issue numbers:",
          "- Include issue number in parentheses ( ) after volume number.",
          "- Omit if each issue starts from page 1.",
          "If a symposium has a series number:",
          "- Include in parentheses before volume number (e.g., '(ser 3) 12').",
          "For forthcoming articles:",
          "- Use placeholder text like '(forthcoming)'.",
          "If volume number is not available, use issue number or other identifier."
        ],
        examples: [
          {
            correct: "(2002) 26(2) Melbourne University Law Review",
            explanation: "Symposium with volume and issue numbers."
          },
          {
            correct: "[2010] Public Law",
            explanation: "Symposium organized by year, no volume."
          },
          {
            correct: "(1995) (ser 3) 12 Canterbury Law Review",
            explanation: "Symposium with a series number."
          }
        ]
      },
      symposiaTitle: {
        title: "Symposium Title",
        rules: [
          "Use full symposium title as it appears on title page.",
          "Use recognised abbreviations if available and consistently applied.",
          "Omit 'The' from beginning of title.",
          "Capitalise according to rule 1.7.1, not as on title page.",
          "Italicise symposium title.",
          "For an electronic symposium, format is same as print."
        ],
        examples: [
          {
            correct: "<i>Melbourne University Law Review</i>",
            incorrect: "Melbourne University Law Review",
            explanation: "Italicise symposium title."
          },
          {
            correct: "<i>MULR</i>",
            incorrect: "<i>Melb U L Rev</i>",
            explanation: "Use recognised abbreviation."
          }
        ]
      },
      startingPage: {
        title: "Starting Page",
        rules: [
          "Provide starting page number of article.",
          "For an electronic symposium, provide starting page or article number.",
          "Follow page number with comma.",
          "For forthcoming articles, use placeholder like '(forthcoming)' instead of page number."
        ],
        examples: [
          {
            correct: "Melbourne University Law Review 251",
            incorrect: "Melbourne University Law Review, 251",
            explanation: "No comma after symposium title before page."
          }
        ]
      },
      forthcomingArticles: {
        title: "Forthcoming Articles",
        rules: [
          "Cite as a regular symposium article, but replace page number with '(forthcoming)'.",
          "Include as much detail as available.",
          "If available online, include URL and access date."
        ],
        examples: [
          {
            correct: "Katy Barnett, 'Accounting for Gain: The Fiduciary's Account of Profits' (2012) 36(2) Melbourne University Law Review (forthcoming).",
            explanation: "Citation for a forthcoming article."
          }
        ]
      },
      pinpoints: {
        title: "Pinpoints",
        rules: [
          "Pinpoint to a specific page or paragraph.",
          "Page pinpoints are numbers only.",
          "Paragraph pinpoints are in square brackets [ ].",
          "Span of pages uses en dash (–).",
          "Non-consecutive pages use comma.",
          "Pinpoints follow starting page, separated by a space.",
          "For electronic articles with no page numbers, use paragraph numbers."
        ],
        examples: [
          {
            correct: "251, 255",
            explanation: "Pinpoint to page 255."
          },
          {
            correct: "251, [34]",
            explanation: "Pinpoint to paragraph 34."
          },
          {
            correct: "251, 255–258",
            explanation: "Pinpoint to page span."
          },
          {
            correct: "251, 255, 258",
            explanation: "Pinpoint to non-consecutive pages."
          }
        ]
      },
      onlineJournals: {
        title: "Online Symposia",
        rules: [
          "Format citation same as print version.",
          "If no page numbers, use paragraph numbers in square brackets [ ].",
          "If no paragraph numbers, cite to section heading in single quotes.",
          "Include URL if a symposium is exclusively online.",
          "Include access date if content is likely to change."
        ],
        examples: [
          {
            correct: "Katy Barnett, 'Accounting for Gain' (2012) 36(2) <i>Melbourne University Law Review</i> [34].",
            explanation: "Online article with paragraph numbers."
          },
          {
            correct: "Barnett (n 5) 'Introduction'.",
            explanation: "Online article citing to section heading."
          }
        ]
      },
      articleParts: {
          title: "Parts of an Article",
          rules: [
            "When citing a specific part of an article (eg, Abstract, Introduction), include the part name in single inverted commas after the pinpoint or main citation if no pinpoint exists.",
            "This is particularly useful for online articles where page numbers may not be consistent or available."
          ],
          examples: [
            {
              correct: "Katy Barnett, 'Accounting for Gain' (2012) 36(2) Melbourne University Law Review 251, 'Abstract'.",
              explanation: "Citing the abstract of an article."
            },
            {
              correct: "Barnett (n 5) [34] 'Conclusion'.",
              explanation: "Citing the conclusion section with a paragraph pinpoint."
            }
          ]
      },
    citationExamples: {
      title: "Citation Examples",
      examples: [
        {
          context: "Symposium with volume, no issue",
          correct: "James Edelman, 'Unnecessary Complication' (2015) 39 <i>Australian Bar Review</i> 1."
        },
        {
          context: "Symposium with volume and issue",
          correct: "Paul Rishworth, 'The Rule of Law and the Rule of Judges' (2017) 28(1) <i>Public Law Review</i> 54."
        },
        {
          context: "Symposium with year as volume",
          correct: "Sir Anthony Mason, 'The Use and Abuse of Precedent' [1988] <i>Adelaide Law Review</i> 1."
        },
        {
          context: "Forthcoming article",
          correct: "Katy Barnett, 'Accounting for Gain: The Fiduciary's Account of Profits' (2012) 36(2) <i>Melbourne University Law Review</i> (forthcoming)."
        },
        {
          context: "Online only symposium",
          correct: "John Doe, 'The Future of Legal Tech' (2021) 7 <i>Journal of Online Law</i>, <https://example.com/article>."
        }
      ]
    }
  }; 