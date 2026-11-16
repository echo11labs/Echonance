# Security policy

## Scope and reporting

The current foundation has a public-by-design liveness route, web configuration, build tooling and CI. Production hosting, sign-in, tenant data, uploads and AI processing are planned. The controls below are engineering requirements for the relevant features as they are introduced.

Report suspected vulnerabilities privately to the client’s designated security contact. For existing team members, use the approved internal incident channel. After a GitHub repository is provisioned, use its private vulnerability reporting feature if the client has enabled it. The repository owner must provide a monitored private reporting address or intake channel before external access is opened.

Include affected versions or environments, impact, when the issue was found and sanitized evidence. Keep credentials, taxpayer information, financial files and vulnerability details out of public issues. Use an authorized test environment and synthetic records for verification.

## Trust boundaries and invariants

- **Identity and authorization.** Validate session provenance server-side. Require MFA for privileged accounts. Authorize every sensitive read, mutation and file download against principal, tenant and role. Apply least-privilege roles, session expiry and revocation. Treat browser-supplied tenant IDs, claims and resource identifiers as untrusted.
- **Data isolation.** Scope database queries, storage keys, search indexes, cache entries, exports and asynchronous jobs to the authorized principal and tenant. Test cross-tenant and cross-user access explicitly. Keep approved public corpus data separate from conversations and private documents.
- **Processing untrusted content.** Validate schemas, URL destinations, file signatures, size and resource limits at boundaries. Use parameterized queries and context-appropriate output encoding. Quarantine uploads until scanning passes, run parsers with bounded CPU, memory, time and network access, and issue short-lived download links only after authorization. Limit collection to approved upstream destinations and validate redirects.
- **AI integrity.** Treat user prompts, corpus text and uploads as untrusted data. Prevent retrieved instructions from changing authorization or accessing tools, secrets or another tenant’s material. Validate citations and source versions before display. Use rate and cost limits, timeouts and cancellation for model requests.
- **Browser and API boundaries.** Enforce TLS at the public edge, set secure session cookies, and protect cookie-backed writes against CSRF. Use narrow CORS allowlists as needed. Before releasing HTML surfaces, validate a Content Security Policy and enforce HSTS once the HTTPS domain configuration is ready. The scaffold applies framing, referrer, content-type and permissions headers.
- **Storage and operations.** Encrypt transport, storage and backups. Keep secrets in the approved secret store and rotate them after suspected exposure. Define retention and deletion for logs, files, conversations, exports, provider copies and backups. Log privileged access, membership changes, publication and incident actions with actor and request identifiers. Keep credentials and user content out of telemetry.
- **Supply chain.** Review dependency and workflow changes, pin third-party Actions to full commit SHAs, use reproducible installs and minimize CI token permissions. Keep deployment secrets outside pull request workflows. Gate high-severity npm advisories and triage findings with the security owner.

Cross-tenant access, privilege escalation, exposed credentials, unintended disclosure, publication integrity failures and meaningful bypasses of ingestion or citation controls are reportable. Assess severity using reachability, data sensitivity and scale of impact. Track exceptions with owner, rationale, compensating controls and review date.

## Incident response and launch

Triage with the security and service owners. Contain affected features or credentials, preserve authorized evidence and assess data exposure. Coordinate notifications through the client’s incident lead. Verify corrective changes in staging, restore service and record follow-up actions.

Before opening a pilot, assign security and on-call owners and rehearse recovery. Obtain client and Nepal-qualified legal review of source reuse, privacy, provider processing, retention, terms and professional disclosures. Document availability and recovery objectives based on the approved deployment.
