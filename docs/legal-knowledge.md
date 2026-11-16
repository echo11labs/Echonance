# Legal knowledge and quality standards

## Collection and publication

Start the source inventory with Income Tax and VAT Acts, Rules and Directives, Excise Acts and Rules, Finance Acts, IRD notices and circulars, applicable treaties and verified tax judgments. Each inventory entry needs a canonical source URL, issuing authority, document type, jurisdiction, language, access and reuse status, and an assigned owner. A tax expert confirms source authority and legal relationships before release.

1. Acquire from an approved publisher and store the original bytes, source URL, fetch time and content checksum. Make repeated collection idempotent.
2. Extract page text and tables, then normalize provision identifiers, dates and language metadata. Preserve the original language, page anchors, and a record of extraction or OCR corrections.
3. Associate the amendment, affected provision, publication date, effective period and fiscal or income year. Store exact applicable intervals and any uncertainty separately. Preserve prior released versions and support withdrawn or superseded records.
4. Have an expert confirm source identity, page coverage, section labels, extraction quality, dates, amendment links and reuse status. Record reviewer and approval time.
5. Publish the approved version, update its search indexes and make previous versions retrievable for their applicable dates. Record withdrawals and remove withdrawn material from active retrieval. Verify that cited locations resolve to the approved original.

Treat Nepali calendar conversion, fiscal year boundaries and effective-date precedence as domain rules. Store original date text alongside canonical values and the version of the conversion rule used. Expert review is required where a date or amendment chain is ambiguous.

## Assistant contract

- Accept Nepali and English questions. Classify the request and preserve relevant research scope across follow-ups.
- Retrieve exact provision and keyword matches plus semantic matches. Filter by verified publication, legal authority and the applicable date or fiscal year, then rerank.
- Generate a concise answer with the applicable law, related administrative or judicial material where supported, interpretation, practical implications and limitations. Link every material legal claim to a verified original and exact provision or page.
- Confirm citation existence, location, effective period and support for the claim before showing it. Withhold unsupported claims. Ask for clarification or abstain where the evidence is insufficient or conflicting. Keep direct quotations and generated interpretations visibly distinct.
- Run tax calculations through reviewed deterministic rules. Record calculation inputs, effective rules and rounding decisions. AI may explain a result using the computed values.

## Release evidence

Build an expert-reviewed benchmark of 300 to 500 questions across major tax subjects, Nepali and English, historical amendments, applicable dates, ambiguous questions and cases with no reliable answer. Version the evaluation inputs and reviewed expectations with the corpus snapshot and model configuration. Report results by language, topic and fiscal period.

| Proposed PRD target                                               | Evidence                                                                |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 100% of published documents verified                              | Publication audit and reconciliation with the approved source registry  |
| 100% of displayed citations valid                                 | Citation location, effective period, authority and claim-support checks |
| At least 90% expert-rated answer quality and search success       | Reviewed benchmark results and documented scoring rubric                |
| At least 95% abstention on unanswerable questions                 | Separate abstention evaluation and false-positive review                |
| Zero critical legal errors in release testing                     | Documented tax expert sign-off and remediation evidence                 |
| Search under 2 seconds and answer latency under 15 seconds at P95 | Staging load test with agreed test traffic and corpus size              |

The product owner and tax lead approve quality gates and the initial source list before pilot release.
