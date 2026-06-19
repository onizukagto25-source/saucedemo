# Playwright UI Tests

This project is a UI testing framework built using Playwright and TypeScript. It provides a structured approach to writing and executing automated tests for web applications.

## Project Structure

```
playwright-ui-tests
├── src
│   ├── pages
│   │   └── basePage.ts
│   ├── tests
│   │   └── example.spec.ts
│   └── utils
│       └── helpers.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd playwright-ui-tests
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the tests:**
   ```
   npx playwright test
   ```

## Usage

- The `src/pages/basePage.ts` file contains the `BasePage` class, which can be extended by other page objects to inherit common functionality.
- The `src/tests/example.spec.ts` file includes example test cases that demonstrate how to use Playwright for UI testing.
- Utility functions can be found in `src/utils/helpers.ts`, which can be used throughout your tests for various tasks.

## Contributing

Feel free to submit issues or pull requests to improve the project. Please ensure that your contributions adhere to the project's coding standards and include appropriate tests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.