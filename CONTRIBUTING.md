# Engineering workflow

## Setup

Use Git and the Node version in [.nvmrc](.nvmrc). Use a version manager for Node and install the exact pnpm release in [package.json](package.json).

```sh
nvm install
nvm use
npm install --global --ignore-scripts "pnpm@$(node -p 'require("./package.json").engines.pnpm')"
pnpm install --frozen-lockfile
pnpm dev
```

The current server exposes `GET /api/health` at `http://localhost:3000/api/health`. It returns `{"status":"ok"}` without consulting external services. This phase requires zero environment variables or vendor accounts. Introduce documented, validated environment variables as integrations land. Put safe example values in `.env.example` and source live values from the client’s secret store. Every `NEXT_PUBLIC_*` value must be safe to bundle and disclose.

## From issue to merge

1. Start with a ticket that describes the user outcome, applicable requirements, acceptance criteria, and owners for engineering and domain review.
2. Branch from current `main` using `feat/<ticket>-<summary>` or `fix/<ticket>-<summary>`. Use the approved developer Git identity and keep commits focused.
3. Keep behavioral changes, verification and relevant documentation together. Use synthetic fixtures or approved anonymized examples. Record architectural decisions with the date, alternatives, rationale, owners and consequences in an ADR when the change affects a lasting boundary.
4. Run the validation commands below. Run targeted checks for the changed behavior and include results in the pull request. Document known gaps, rollout and rollback requirements, and any new dependencies or credentials.
5. Request a maintainer review. Include the domain reviewer for source, effective-date, calculation or evaluation changes and the security owner for trust-boundary changes. Resolve review threads and pass required CI before merging.

```sh
pnpm check
pnpm audit --audit-level high
pnpm build
pnpm test:smoke
```

`pnpm check` verifies the Git index, formatting, Biome lint rules and strict TypeScript after generating Next.js route types. Use `pnpm format` to apply formatting. The smoke test starts the production build on loopback, checks the health response and security headers, then stops the server. Set `ECHONANCE_SMOKE_PORT` to a free port if 3100 is in use.

## Verification as features land

- Unit-test deterministic rules and validation, including historical dates, boundary amounts, rounding, locale and failure cases.
- Test service contracts, database constraints, migrations, role enforcement and isolation across tenants and users. Use ephemeral databases in CI.
- Exercise top user journeys through Playwright once they exist. Include keyboard use and assistive technology checks for bilingual and citation-heavy flows.
- Maintain a versioned evaluation suite for retrieval, citations, answer quality and abstention. Keep its results visible alongside ordinary software verification.
- Pin direct packages and commit the lockfile. Review license, maintenance, transitive dependencies and build scripts before taking on a package. The package manager holds newly published versions for 24 hours during resolution. Document reviewed exceptions for time-sensitive security updates.

See the [delivery runbook](docs/release.md) for repository settings, environments and production rollout.
