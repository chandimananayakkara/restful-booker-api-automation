# 🔌 Restful-Booker API Automation Framework

> A comprehensive REST API test automation framework for the
> [Restful-Booker](https://restful-booker.herokuapp.com) hotel booking API,
> built with **Playwright** and **TypeScript** — following industry
> best practices for API quality engineering.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Test Coverage](#-test-coverage)
- [Test Tags](#-test-tags)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Test Reports](#-test-reports)
- [API Reference](#-api-reference)
- [Design Patterns](#-design-patterns--best-practices)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Author](#-author)

---

## 🧭 About the Project

This framework automates the testing of the **Restful-Booker REST API** —
a hotel booking management system. The project demonstrates a
**production-grade API testing approach** covering:

- ✅ Full CRUD lifecycle testing (Create → Read → Update → Delete)
- ✅ Authentication & authorization validation
- ✅ JSON schema / contract testing with **Zod**
- ✅ Negative & boundary testing (error handling)
- ✅ API response chaining (output of one request → input of next)
- ✅ Dynamic test data generation (no hardcoded values)
- ✅ Automated CI/CD pipeline via **GitHub Actions**

---

## 📁 Project Structure
```
restful-booker-api-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .gitignore
├── allure-results/
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
├── src/
│   ├── api/
│   │   ├── AuthClient.ts
│   │   └── BookingClient.ts
│   ├── fixtures/
│   │   └── api-fixtures.ts
│   ├── schemas/
│   │   └── booking.schema.ts
│   └── utils/
│       └── api-helpers.ts
├── test-data/
│   └── bookings.json
└── tests/
    ├── auth/
    │   └── auth.spec.ts
    ├── booking/
    │   ├── crud.spec.ts
    │   └── filter.spec.ts
    ├── contract/
    │   └── schema-validation.spec.ts
    ├── example.spec.ts
    └── health/
        └── health-check.spec.ts

```
### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No browser** | API tests don't need UI — faster execution |
| **API Clients (like POM)** | Encapsulate endpoint details — maintainable |
| **Zod schemas** | Type-safe contract validation at runtime |
| **Custom fixtures** | Eliminate auth token boilerplate per test |
| **Dynamic data** | Unique data per run — no test pollution |
| **API chaining** | Realistic test flows matching production usage |

---

## 🛠️ Tech Stack

| Tool / Library | Version | Purpose |
|----------------|---------|---------|
| [Playwright](https://playwright.dev) | ^1.40.0 | API test engine & HTTP client |
| [TypeScript](https://www.typescriptlang.org) | ^5.0.0 | Type-safe test code |
| [Zod](https://zod.dev) | ^3.22.0 | Runtime schema validation |
| [Allure](https://allurereport.org) | ^2.24.0 | Advanced test reporting |
| [GitHub Actions](https://github.com/features/actions) | — | CI/CD automation |
| [Node.js](https://nodejs.org) | v18+ | Runtime environment |

---

## 🧪 Test Coverage

### By Test Suite

| Suite | File | Tests | Coverage Area |
|-------|------|-------|---------------|
| 🏥 Health | `health-check.spec.ts` | 1 | API availability |
| 🔐 Auth | `auth.spec.ts` | 3 | Token creation, validation |
| 📦 CRUD | `crud.spec.ts` | 8 | Full booking lifecycle |
| 🔍 Filter | `filter.spec.ts` | 2 | Query parameter filtering |
| 📐 Contract | `schema-validation.spec.ts` | 4 | Response structure |
| ❌ Negative | `error-handling.spec.ts` | 7 | Error handling, edge cases |
| **Total** | | **25** | **Complete API coverage** |

### By HTTP Method

| Method | Tests | Scenarios Covered |
|--------|-------|-------------------|
| `GET` | 6 | All bookings, single booking, filters, 404 |
| `POST` | 7 | Create booking, auth token, invalid data |
| `PUT` | 2 | Full update, unauthorized update |
| `PATCH` | 1 | Partial update verification |
| `DELETE` | 3 | Delete + verify, unauthorized delete |

---
### By Test Category

✅ Positive Tests (Happy Path) ████████████████░░░░ 16 tests (64%)<br> ➖ Negative Tests (Error Cases) ████████░░░░░░░░░░░░ 7 tests (28%) <br> 🫙 Contract Tests (Schema) ████░░░░░░░░░░░░░░░░ 4 tests (16%)


---

## 🏷️ Test Tags

Tests are tagged for selective execution in CI/CD pipelines:

| Tag | Tests | Description | Avg. Duration |
|-----|-------|-------------|---------------|
| `@smoke` | 4 | Quick API health verification | ~5s |
| `@critical` | 6 | Business-critical booking flows | ~15s |
| `@regression` | 18 | Full regression coverage | ~45s |

### CI/CD Execution Strategy:

<i>Every commit → @smoke only (seconds — fast feedback) <br>Every PR → @smoke @critical (key flows validated) <br>Nightly build → @regression (full coverage)></i>


---

## 🚀 Getting Started

### Prerequisites

Node.js v18 or higher → https://nodejs.org<br> npm v9 or higher → included with Node.js Git → https://git-scm.com

--- 
### Installation
---

**Step 1 — Clone the repository:**

```bash
git clone https://github.com/chandimananayakkara/restful-booker-api-automation
cd restful-booker-api-automation
```

**Step 2 — Install dependencies:**
```
npm install
```
**Step 3 — Install Playwright:**
```
npx playwright install
```
**Step 4 — Verify setup:**

```Bash
npm run test:health
```

### Expected output:

Running 1 test using 1 worker<br>
  ✓  health-check.spec.ts > API Health Check > should return 201 (312ms)

  1 passed (1s)

# ▶️ Running Tests

  Quick Reference

## Run ALL tests
```
npm test
```
## Run by tag
```
npm run test:smoke         # Quick health check
npm run test:critical      # Business-critical flows
npm run test:regression    # Full regression suite
```
## Run by test suite
```
npm run test:health        # API availability
npm run test:auth          # Authentication
npm run test:booking       # CRUD operations
npm run test:contract      # Schema validation
npm run test:negative      # Error handling
```
<br>

# View report
```
npm run report
```

## Full Command Reference
| Command |	Description |
| :--- | :--- |
|npm test	| Run all 25 tests
|npm run test:smoke	| Run @smoke tagged tests| 
|npm run test:critical	| Run @critical tagged tests | 
|npm run test:regression	| Run @regression tagged tests |
|npm run test:health	| Health check suite only | 
|npm run test:auth	| Authentication suite only | 
|npm run test:booking	| Booking CRUD suite only |
|npm run test:contract	| Contract/schema suite only |
|npm run test:negative	| Negative testing suite only |
|npm run report	| Open Playwright HTML report |
|npm run report:allure	| Generate & open Allure report |

--- 

# 📊 Test Reports

## Playwright HTML Report

```
npm test
npm run report
```

### Opens an interactive browser report with:

```
Pass/fail status per test
Request/response details
Error messages and stack traces
Test duration metrics
```

## Allure Report
```
npm test
npm run report:allure
```
## Provides advanced analytics:

```
Test trend history
Suite breakdown dashboard
Step-by-step execution logs
Severity and priority labels
Environment information
```

## 📡 API Reference

This framework tests the Restful-Booker API.

Base URL
```
https://restful-booker.herokuapp.com
```

## Endpoints Tested
| Method |	Endpoint  |	Auth Required |	Description|
| :--- | :--- | :--- | :--- |
|GET |	/ping	|❌|	Health check
|POST	|/auth	|❌	|Create auth token
|GET	|/booking	|❌|	Get all booking IDs
|GET	|/booking?firstname=X|	❌|	Filter bookings
|GET	|/booking/:id|	❌	|Get single booking
|POST	|/booking	|❌|	Create booking
|PUT	|/booking/:id	|✅|	Full update
|PATCH	|/booking/:id	|✅|	Partial update
|DELETE	|/booking/:id|	✅|	Delete booking

## Authentication

The API uses Cookie-based token authentication:

```
Step 1: POST /auth → { token: "abc123def456" }
Step 2: Use in header: Cookie: token=abc123def456
```
---
# ⚙️ CI/CD Pipeline
GitHub Actions pipeline runs automatically on every push and pull request to main.

##Pipeline Flow

```

Push / PR to main
      │
      ▼
┌──────────────────────┐
│   🔌 Smoke Tests     │  ~5 seconds
│   (API health check) │
└──────────┬───────────┘
           │
      PASS? ── NO ──▶ ❌ FAIL FAST (save time)
           │
          YES
           │
           ▼
┌──────────────────────┐
│  🔄 Full Regression  │  ~60 seconds
│  (All 25 tests)      │
└──────────────────────┘
           │
      ALL PASS? ── NO ──▶ ❌ Review Allure report
           │
          YES
           │
           ▼
      ✅ PIPELINE GREEN

```

## Pipeline Configuration

.github/workflows/playwright.yml

```
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

```


## 👤 Author
Chandima Nanayakkara

```
💼 GitHub: @chandimananayakkara
🔗 LinkedIn: Chandima Nanayakkara
📧 Email: chandimananayakkara94@gmail.com
```
### 📄 License :
This project is for portfolio and educational purposes.

