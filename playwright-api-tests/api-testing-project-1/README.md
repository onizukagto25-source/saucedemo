# API Testing Project

This project is designed for API testing using Playwright. It provides a structured approach to writing and executing tests for various API endpoints.

## Project Structure

```
api-testing-project
├── src
│   ├── tests
│   │   ├── api
│   │   │   └── example.spec.ts
│   │   └── fixtures
│   │       └── api.fixture.ts
│   ├── clients
│   │   └── apiClient.ts
│   ├── helpers
│   │   └── authHelper.ts
│   └── config
│       └── env.ts
├── scripts
│   └── run-tests.sh
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd api-testing-project
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and define your API base URL and any other necessary environment variables.

4. **Run the tests**:
   Execute the following command to run the API tests:
   ```
   ./scripts/run-tests.sh
   ```

## Usage Guidelines

- The tests are located in the `src/tests/api` directory. You can add new test files following the naming convention `*.spec.ts`.
- Use the `src/tests/fixtures/api.fixture.ts` file to define any mock data or setup required for your tests.
- The `src/clients/apiClient.ts` file contains methods for making HTTP requests to the API. You can utilize these methods in your test cases.
- Authentication-related functions can be found in `src/helpers/authHelper.ts`, which can be used to manage login and token handling.
- Configuration settings are defined in `src/config/env.ts`, which can be adjusted as needed.

## Contributing

Feel free to submit issues or pull requests to improve the project. Ensure that your contributions adhere to the project's coding standards and guidelines.