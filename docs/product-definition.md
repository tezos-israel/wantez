# Wantez

Wantez provides means for OSS maintainers to publish bounties on different bugs and features in their projects. Once a user completes a pull request that closes the posted issue, the amount set on the bounty will be transferred to the user. This process should be as automatic as possible.

Bounty prices can be set in tezos and FA1.2/2 tokens.

## Features

The following features will be available:

- Anyone can browse the list of bounties.
- Any registered user can post a bounty
- Any registered user can apply to work on a bounty
- When a PR fixing the issue is merged, the fixing user will be paid for his contribution.

## Business Model

- A fee will be taken from any fixed bug (from the funder, not the contributor).
- For the first version the fee will 0%

## Terms

- Bounty - an amount of tez and an OSS issue where the tez is promised to be paid when the issue is resolved.
- Funder - a user who publishes a bounty - right now it can be whomever
- Contributor - a user who works on a bounty

## Screens

- Every screen will have the top bar with:
  - the Wantez logo,
  - a button to login/logout,
  - status of the wallet (if no wallet is configured, the user should see something about that)
  - Links to other views of the app
- Dashboard / main screen - shows a list of bounties, with option to filter/sort them
  - a click on a bounty moves the user to the bounty page
  - some fast options on each bounty
    - apply - if the user is not the funder
    - delete - if the user is the funder.
- A place (page/popup) to create a new bounty
- A page to read details about a bounty, to see its applications and for the funder to approve an application to work, to transfer the money to the applicant, to refund and close the issue
