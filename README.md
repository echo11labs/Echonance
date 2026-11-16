# Echonance

Echonance is a planned Nepal tax intelligence platform from Eco Eleven Tech. It brings tax legislation, Inland Revenue Department guidance and related legal materials into one research workspace. Chartered accountants, tax consultants, auditors and finance teams will be able to find relevant provisions, establish which version applied in a given period and trace an explanation back to the underlying evidence. The product also serves accounting students and businesses that need to understand Nepal’s tax requirements.

## What the platform will do

| Capability                        | Intended outcome                                                                                                                                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tax AI assistant                  | Ask questions in Nepali or English and receive source-grounded explanations with provision references and effective dates. The assistant will identify insufficient evidence and keep generated interpretation distinct from the source text. |
| Tax law library                   | Browse Acts, Rules, Finance Acts, official notices and applicable tax treaties. Find specific provisions and open original source documents.                                                                                                  |
| Directives and circulars          | Find relevant administrative guidance and understand its issuing authority, publication date and scope.                                                                                                                                       |
| Legal search                      | Combine exact section and keyword matches with semantic search. Filter by source type, language and applicable period.                                                                                                                        |
| Amendment tracker                 | Trace amendment sources, compare versions and retrieve the version applicable to a selected period.                                                                                                                                           |
| Tax calculators and case research | Apply versioned calculation rules and find related tax judgments as coverage expands.                                                                                                                                                         |
| Compliance and document tools     | Track obligations, work with private PDFs and spreadsheets, and prepare research reports in later releases.                                                                                                                                   |

## How Echonance handles evidence

Research starts with official materials, including legislation, rules, Finance Acts, IRD circulars and directives, and available judgments. The platform will preserve originals, record issuance and effective dates, and require expert review before publication. An answer should let a reader open the exact cited provision or page and see the version used. Unverified material is held out of the published research corpus.

The product is designed for professional decision support. Practitioners remain responsible for applying the law to client circumstances and exercising professional judgment.

## Project status

The repository currently contains the engineering foundation. The initial product milestone covers the verified legal library, directives and circulars, hybrid search, historical versioning, and the bilingual tax assistant. The PRD places calculators in the first expansion in its priority table and includes them in the recommended MVP summary. The product owner will resolve that release decision before the milestone is committed.

## Project documentation

- [Architecture and library decisions](docs/architecture.md)
- [Legal knowledge and quality standards](docs/legal-knowledge.md)
- [Delivery and GitHub administration](docs/release.md)
- [Engineering workflow](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
