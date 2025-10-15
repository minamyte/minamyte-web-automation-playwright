# List of content

* [Web Automation Test Framework Feature](#WEB-Automation-Test-Framework-Feature)


# WEB Automation Test Framework Feature
- Uses Playwright for browser automation and end-to-end testing.
- Tests include UI interactions, assertions, and role-based element selectors.
- Implements a custom method to dynamically adjust selector type based by input json file
- Abstracted actions and assertions into a reusable BasePageObject class.
- Loads sensitive data (e.g., credentials) via .env file.
- UI element selectors are externalized in a JSON file for easy updates and maintenance.
- Includes a minimal CI setup to run npx playwright test automatically on push or pull request.

# Setup

```shell
Prerequisites
Node.js v18.17.1 or later

Git (optional, but recommended)
```
## Playwright Installation

* Once node is installed you may run this command

```shell
cd path/to/your/local
git clone https://github.com/minamyte/minamyte-web-automation-playwright.git
```

## Install dependencies

```shell
npm install
```

## Setup local .env variables

* In order to install the environment variables you may run this command

```shell
sh env.sh
or
bash env.sh
```
if on windows, ensure you have git bash terminal, or you can run it from powershell command prompt

## Running Test
* To run tests, you can use the following command:
```shell
npx playwright test
```
* To run specific file tests, you can use the following command:
```shell
npx playwright test tests/example.spec.js
```
* You can also use -g to capture test titles matching with regex, you can use the following command:
```shell
npx playwright test -g "/Open Order on [^.]* with maximum/"
```
this will execute test that Contains "Open Order on `any_exchange` with maximum"
