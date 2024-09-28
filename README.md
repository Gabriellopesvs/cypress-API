# Cypress API Testing Project

[![Build Status](https://travis-ci.org/your-username/cypress-api.svg?branch=master)](https://travis-ci.org/your-username/cypress-api "Travis CI")
[![codecov](https://codecov.io/gh/your-username/cypress-api/branch/master/graph/badge.svg)](https://codecov.io/gh/your-username/cypress-api)
[![NPM Version](https://img.shields.io/npm/v/cypress.svg?label=NPM)](https://www.npmjs.com/package/cypress)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview:

This project is an automated API testing framework using **Cypress**, designed to validate API endpoints and ensure that they return the expected responses. It provides a structured approach for performing API tests, verifying JSON responses, and simulating API requests.

## Problem Statement:
- Automating the validation of API endpoints to ensure that they return the correct responses.
- Testing API requests with different payloads and verifying the response status, headers, and body.

## Solution:
This project uses Cypress to create API tests that can validate responses, handle dynamic data, and ensure the APIs are behaving as expected.

## 📑 Files

- [cypress.env.json](#📑cypress-env-json)
- [test-api.cy.js](#📑test-api-cy-js)
- [validate-api.cy.js](#📑validate-api-cy-js)

## 💻 Functions

- [utils.js](#💻utils-js)
- [body.js](#💻body-js)
- [commands.js](#💻commands-js)

### 📑 cypress.env.json

The `cypress.env.json` file contains environment variables and settings used by Cypress. It allows easy configuration for different environments, helping to manage API URLs and other global variables without needing to modify the test scripts.

`Example`:

```json
{
  "run": "QA",
  "QA": {
    "apiUrl": "https://api.qa.example.com"
  },
  "DEV": {
    "apiUrl": "https://api.dev.example.com"
  }
}
```

### Usage

The "run" variable sets the environment (e.g., "QA" or "DEV"), while the "QA" and "DEV" objects contain environment-specific API URLs. This allows for easy switching between environments.

## 📑 test-api.cy.js

The test-api.cy.js file includes Cypress API test cases that validate the basic functionality of the API endpoints. These tests check the status codes, response body, and headers to ensure that the API behaves as expected.

## 📑 validate-api.cy.js

The validate-api.cy.js file contains tests to validate the API response structure. It checks for specific fields in the JSON response and verifies their values.

## 💻 utils.js

The utils.js file includes utility functions that support the API tests. These functions help format requests, process responses, and perform validation on the JSON structure.

## 💻 body.js

The body.js file defines the request payloads for the API tests. These payloads are used to simulate different API requests.

`Exemple`

```javaScript
const requestBody = {
  name: "John Doe",
  email: "john.doe@example.com"
};
```

## 💻 commands.js

The commands.js file includes custom Cypress commands for interacting with the API, sending requests, and validating the responses.

## What's New?

This project now supports the following technologies:

- Cypress 13.x for API testing.
- JavaScript/ES6+ for test scripting.

## How to Use This Project:

To use this project, simply install Cypress and the required dependencies via npm or clone the GitHub repository.

### Install Cypress via NPM:

```bash
npm install cypress --save-dev
```

### Running the Tests:

```bash
npx cypress open
```
### Alternatively, run the tests in headless mode:

```bash
npx cypress run
```
