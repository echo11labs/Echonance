# Delivery runbook

## Repository commissioning

1. The client’s repository administrator confirms the GitHub owner, repository visibility, approved developer accounts and maintaining team. During the approved public launch period, publish only material cleared for public release. The repository owner manages the transition to private visibility.
2. Review collaborators, teams, outside collaborators, installed GitHub Apps, integration grants, deploy keys and invitations. Keep access to the approved client roster and purpose-specific infrastructure integrations. Recheck the roster before handoff and during access reviews.
3. Configure the `main` ruleset to require pull requests, at least one approving reviewer, resolved conversations and the `CI / Validate` check once GitHub registers it. Dismiss stale approvals after changes. Restrict direct pushes, branch deletion, force pushes and bypass access. Assign client-owned review teams for workflows and sensitive paths after team identities are confirmed.
4. Default Actions to read-only tokens and permit only approved actions. Enable private vulnerability reporting, dependency alerts, secret scanning and push protection where the client plan supports them. Record the checks or equivalent controls the administrator can enable.
5. Verify the proposed Git index with `pnpm check:repository`. Verify the Git author and committer identity and review co-author trailers for the commits being published. Keep local instructions, workstation configuration, secrets, client records and tool-generated attribution out of published Git and pull request metadata. Ignore rules apply to local files and CI rejects tracked entries matching them. GitHub collaborator and app access is managed separately by the administrator.

See [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets), [Next.js Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy).

## Environments and promotion

| Environment  | Data and purpose                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Local and CI | Synthetic fixtures and isolated dependencies. Pull request checks run without deployment secrets.                   |
| Staging      | Nonproduction accounts and approved sanitized datasets for integration, domain evaluation and migration rehearsals. |
| Production   | Client-approved providers, monitoring, access controls, retention policy and recovery configuration.                |

Use separate credentials per environment and least-privilege identities per service. Prefer short-lived federated deployment credentials. Deploy the same approved build artifact through environments after completing checks. When infrastructure is selected, adopt reproducible container images and publish their immutable digests with the release record.

CI validates pull requests and changes on `main`. Deployment workflows depend on client approval of the hosting target, access settings and release owners.

## Release checklist

- Confirm the approved scope and commit, CI status and dependency audit. Record the application revision, schema and corpus versions, and any model configuration that changed.
- Check migration compatibility with the previous application version. Back up affected data, rehearse restoration, and document whether rollback uses a prior image, a forward fix or an approved restore.
- Smoke-test the staging artifact. For applicable changes, exercise sign-in, access isolation, citation resolution, withdrawal and effective-date behavior. Obtain product and tax-expert acceptance for legal content changes.
- Obtain approval through the client’s release owner, deploy the approved artifact, verify health and affected flows, and watch error rates, latency, worker backlog, source publication and provider usage.
- If a check fails, stop promotion, preserve evidence and use the tested rollback path. Escalate data or security exposure through the private incident channel.

## Open decisions

The client team still needs to approve the official source inventory, calculator release priority, ERD and API contracts, supported browsers, identity and hosting providers, data-processing and retention requirements, and the pilot owners and acceptance criteria.
