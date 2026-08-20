<div align="center">

# Rayls Auditor Explorer

**Web UI for auditing and exploring cross-chain transactions on the Rayls network — Atomic transfers, arbitrary messages, Enygma, and DvP.**

[![License: Apache 2.0][license-badge]][license-url]
[![Angular][angular-badge]][angular-url]
[![TypeScript][ts-badge]][ts-url]

[![Discord][discord-badge]][discord-url]
[![X][x-badge]][x-url]
[![LinkedIn][linkedin-badge]][linkedin-url]
[![YouTube][youtube-badge]][youtube-url]

[Overview](#overview) | [Tech stack](#tech-stack) | [Configuration](#configuration) | [Development](#development) | [License](#license)

</div>

A web application for auditing and exploring blockchain transactions on the Rayls network. The app provides a real-time interface to search, filter, and inspect cross-chain transactions across multiple protocols, including Atomic transfers, arbitrary messages, Enygma and DvP transactions (Deposit, Withdraw and Swap).

---

## Table of Contents

- [Rayls Auditor Explorer](#rayls-auditor-explorer)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Terminology](#terminology)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Features](#features)
    - [Pages \& Routes](#pages--routes)
    - [Supported Protocols](#supported-protocols)
  - [Configuration](#configuration)
    - [Local development](#local-development)
    - [Docker (production)](#docker-production)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Install dependencies](#install-dependencies)
    - [Run locally](#run-locally)
    - [Run tests](#run-tests)

---

## Overview

The Rayls Auditor Explorer connects to the Rayls Governance API and allows operators to:

- Search transactions by Message ID, Transaction ID, Source/Destination Chain ID, Source/Destination Address, or Resource ID
- View full transaction details including Privacy Node Hub (PNH) references, timestamps, and block numbers
- Inspect batch and Enygma privacy batch operations
- Track DvP atomic swap pairs end-to-end

### Terminology

| Term | Description |
|---|---|
| **Privacy Node (PN)** | A private blockchain node in the Rayls network |
| **Private Network Hub (Hub / PNH)** | The central hub that coordinates cross-chain communication |
| **Private Network** | The overall private network connecting Privacy Nodes through the Hub |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 16 |
| Language | TypeScript 5.1 |
| UI Components | ng-zorro-antd 16 (Ant Design) |
| Additional UI | Angular Material 16, Angular CDK |
| Reactive | RxJS 7.8 |
| Date Formatting | Moment.js 2.30 |
| Styling | SCSS + BEM + Ant Design theme (Less) |
| Testing | Karma + Jasmine |
| Containerization | Docker (Node 18 Alpine + Nginx) |

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── main/                          # Search & filter landing page
│   │   ├── message-details/               # Single transaction detail view
│   │   ├── message-preview/               # Transaction card (list item)
│   │   ├── messages-preview/              # Paginated transaction list
│   │   ├── batch-details/                 # Batch transaction list page
│   │   ├── batch-transaction-preview/     # Batch transaction row
│   │   ├── batch-transactions-preview/    # Batch list container
│   │   ├── enygma-details/                # Enygma privacy batch page
│   │   ├── enygma-transaction-preview/    # Enygma transaction row
│   │   ├── enygma-transactions-preview/   # Enygma list container
│   │   ├── dvp-swap-details/              # DvP atomic swap detail view
│   │   ├── dvp-swap-transaction-preview/  # DvP swap row
│   │   └── dvp-swap-transactions-preview/ # DvP swap list container
│   ├── models/
│   │   └── transaction.ts                 # All types, interfaces, and enums
│   ├── services/
│   │   ├── transactions.service.ts        # API communication
│   │   └── config.service.ts             # Runtime configuration loader
│   └── utils/
│       ├── helpers.service.ts             # Date formatting, protocol mapping
│       ├── constants.ts                   # Pagination and chain constants
│       ├── types.ts                       # Shared UI types
│       ├── services/
│       │   └── notification.service.ts    # Toast notifications
│       └── components/
│           ├── page/                      # Page layout wrapper
│           ├── button/                    # Custom button
│           ├── select/                    # Custom dropdown
│           ├── copy-and-share/            # Copy-to-clipboard widget
│           ├── status/                    # Status badge
│           ├── skeleton-loading/          # Loading placeholder
│           └── page-not-found/            # 404 page
├── assets/
│   ├── config.json                        # Runtime config (generated at container start)
│   └── config-template.json               # Template with ${RAYLS_API} placeholder
└── environments/
    ├── environment.ts                     # Production environment
    └── environment.development.ts         # Development environment (local proxy)
```

---

## Features

### Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Main | Search and filter all transactions |
| `/message/:id` | Message Details | Full detail of a single transaction |
| `/message/:id/:index` | Message Details | Same, with batch navigation context |
| `/batch/:id` | Batch Details | Paginated list of transactions in a batch |
| `/enygma/:id` | Enygma Details | Paginated list of Enygma batch transactions |
| `/dvpSwap/:id` | DvP Swap Details | Atomic swap pair detail (two-sided) |
| `**` | 404 | Page not found |

### Supported Protocols

`VANILLA`, `ATOMIC`, `ENYGMA`, `CUSTOM`, `DVP_DEPOSIT`, `DVP_WITHDRAW`, `DVP_SWAP`

---

## Configuration

The app resolves the API base URL at startup by reading `src/assets/config.json` (via `ConfigService`). The value of the `RAYLS_API` key is prepended to every API request made by `TransactionsService`.

### Local development

`config.json` ships with `"RAYLS_API": "/api"`. The Angular dev server intercepts all `/api/*` requests and proxies them to the real API via `src/proxy.conf.json`. To change the target API, edit the `target` field:

```json
{
  "/api": {
    "target": "http://<your-api-host>",
    "secure": false,
    "pathRewrite": { "^/api": "" },
    "changeOrigin": true
  }
}
```

### Docker (production)

`src/assets/config-template.json` contains a `${RAYLS_API}` placeholder. At container startup, the entrypoint runs `envsubst` to replace it with the `RAYLS_API` environment variable and writes the result to `config.json`. In this case `proxy.conf.json` is not used, requests go directly to the configured URL.

```bash
docker run -p 8080:80 -e RAYLS_API='http://<your-api-host>' rayls-auditor-explorer
```

---

## Development

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
# Starts Angular dev server at http://localhost:4200
# API requests are proxied according to src/proxy.conf.json
```

### Run tests

```bash
npm test
```

## Contributing

We are not accepting external contributions at this time — see [CONTRIBUTING.md](./CONTRIBUTING.md). Please also read our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

To report a security vulnerability, see [SECURITY.md](./SECURITY.md) — please do not open a public issue.

## License

Licensed under the Apache License, Version 2.0 — see [LICENSE](./LICENSE).

Bundled third-party assets remain under their own licenses; see [NOTICE](./NOTICE). The bundled
Rethink Sans font is licensed under the SIL Open Font License 1.1 ([licenses/OFL.txt](./licenses/OFL.txt)).

Copyright 2026 Rayls Core Ltd.

[license-badge]: https://img.shields.io/badge/License-Apache_2.0-blue.svg
[license-url]: ./LICENSE
[angular-badge]: https://img.shields.io/badge/Angular-16-DD0031?logo=angular&logoColor=white
[angular-url]: https://angular.io
[ts-badge]: https://img.shields.io/badge/TypeScript-5.1-3178C6?logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org
[discord-badge]: https://img.shields.io/badge/Discord-join%20chat-5865F2?logo=discord&logoColor=white
[discord-url]: https://discord.gg/6THZ96357r
[x-badge]: https://img.shields.io/badge/X-%40RaylsLabs-000000?logo=x&logoColor=white
[x-url]: https://x.com/RaylsLabs
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-Rayls-0A66C2?logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/company/rayls/
[youtube-badge]: https://img.shields.io/badge/YouTube-Rayls-FF0000?logo=youtube&logoColor=white
[youtube-url]: https://www.youtube.com/@Rayls_blockchain