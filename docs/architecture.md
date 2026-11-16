# Architecture and library decisions

## Foundation

Echonance starts with a Next.js App Router application in `src/app`. This repository currently contains an HTTP health route, a pinned Node.js and pnpm toolchain, strict TypeScript, Biome linting for Next.js and React, Prettier and GitHub Actions validation. Product surfaces and their dependencies enter when a feature needs them. Liveness reports only that the web process can respond. Introduce a separate readiness probe when the deployment depends on backing services.

Next.js owns presentation and same-origin web entry points. Server Components are the default for future pages. Use Client Components for interaction and browser APIs that need them. Future Route Handlers and Server Actions must validate input and authorize the action at the server boundary. Keep service credentials and API adapters in server-only modules. Authenticated and tenant-specific results require private cache behavior and correctly scoped invalidation.

## Application boundaries

Keep a modular FastAPI backend for knowledge management, search, RAG, tax rules and audit operations. Introduce an asynchronous worker for collection, OCR, parsing and index publication. The worker shares backend domain contracts while running with bounded resources and its own least-privilege identity. Split out further services only after an operational or scaling need is measured.

| Boundary                      | Ownership                                                                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Web and API                   | Handle browser session, authorization at each API operation, typed OpenAPI contracts, stable errors and request IDs. Use same-origin browser calls where practical.                                          |
| Knowledge and ingestion       | Collect approved official sources, preserve originals, normalize provisions, review documents and publish immutable versions. Run parsing and indexing outside HTTP handlers.                                |
| PostgreSQL and object storage | Store identities, membership, legal metadata, provisions, admin history and references to original objects. Use separate access controls and object namespaces for client files.                             |
| Search and AI                 | Combine exact identifiers, full-text search and multilingual semantic retrieval. Enforce publication and effective-date filters before generation. Validate citations before material claims reach the user. |
| Tax rules                     | Store reviewed rules by tax year, category and effective date. Calculate with deterministic decimal arithmetic and explicit rounding rules.                                                                  |

Use PostgreSQL and pgvector initially. Benchmark PostgreSQL full-text search against Nepali queries before choosing language configurations. Keep normalized section identifiers and exact matches as independent signals. Add OpenSearch only if benchmark quality or load justifies a second index. Use S3-compatible private object storage, versioned schema migrations, and a controlled publication transaction or outbox so search results agree with the approved source state.

Start the ERD with source → document → version → provision → chunk. Add original files, review events and amendments as linked records. Scope private bookmarks, searches and conversations to their owners and organizations. Every citation must resolve to a published version, provision or page, and its original asset. Full ERD and OpenAPI contracts are delivery milestones.

## Library plan

| Need                               | Choice and adoption point                                                                                                                                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web framework and checks           | Next.js, React, TypeScript, pnpm, Biome and Prettier are installed.                                                                                                                                                          |
| Styling and accessible primitives  | Tailwind CSS and shadcn/ui when design is approved. Commit product component source and add primitives selectively. Verify keyboard behavior, focus and names for the final application.                                     |
| Localization                       | next-intl when Nepali and English routing and message catalogs are introduced. Preserve source text and explicitly label translations. Use locale-aware formatting while storing canonical numeric and date values.          |
| Runtime validation and forms       | Zod for runtime boundaries and React Hook Form when forms need richer state and validation. Prefer native controls and built-in server data fetching for straightforward cases.                                              |
| Research tables and client caching | TanStack Table for interactive legal tables. Add TanStack Query only where client polling, optimistic updates or cross-view invalidation justify a client cache.                                                             |
| Verification                       | Vitest for module behavior and Playwright with axe-core for browser coverage when interactive workflows exist.                                                                                                               |
| Backend and extraction             | FastAPI, Pydantic, SQLAlchemy and Alembic for API validation, persistence and migrations. Evaluate PyMuPDF licensing before adoption. Use an approved OCR engine and bounded parsers for PDF and spreadsheet workloads.      |
| Operations and AI                  | OpenTelemetry for traces and metrics, with an approved error reporting service. Use a provider adapter for LLM, embeddings and reranking. Benchmark Nepali and English quality, latency and cost before choosing a provider. |

Vendor decisions for identity, hosting, storage, monitoring and AI remain with the client team. Keep personal and client content out of provider calls until data retention, residency, processing terms and redaction are approved.

## Browser and accessibility standards

Target WCAG 2.2 AA for product interfaces. Use semantic HTML, progressive enhancement, explicit `lang` attributes for Nepali and English passages, and tested fallbacks for essential workflows. Validate Devanagari rendering and mixed-script numerals with product content. Set a browser support matrix from client needs and test it across desktop and responsive layouts. Consult Baseline compatibility before adopting platform features.

See [Next.js App Router](https://nextjs.org/docs/app), [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [shadcn/ui](https://ui.shadcn.com/docs), [Chrome Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance-src), [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
