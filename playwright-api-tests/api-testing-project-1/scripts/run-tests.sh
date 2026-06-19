#!/bin/bash

# This script is used to run the API tests using Playwright.

# Exit immediately if a command exits with a non-zero status.
set -e

# Define the test directory
TEST_DIR="./src/tests"

# Run the tests using Playwright
npx playwright test $TEST_DIR --reporter=html --timeout=30000