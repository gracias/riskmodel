# irm
Insurance risk model

## Create insurance policies
- Set the portfolio size of the policies
- Create an insurance policy
  - Randomised over 'age' and 'sum assured'
  - Calculate premium for the policy per mortality rate
- Issue additional policies as required, until portfolio size reached

## Create scenarios of possible outcomes
- Set the scenario count for the stochastic simulation
- Generate a scenario by selecting which of the policies raise a claim
  - Calculate the payout required to settle claims raised in the scenario
- Generate additional scenarios as required, until scenario count is reached

Assumptions: Claims raised are considered genuine for the purpose of this modeling

## Calculate the capital adequacy at certain percentiles
- Set the precentiles or interest say pt1, pt2, pt3
- Order the scenarios in ascending order of payouts
- Calculate the percetiles for the scenarios
- Fetch the profit/loss at each of the percentile levels of interest


# Approach

## Core Logic
- Simulation logic

## Lit
- Create lit action function and deploy
- Encrypt / Decrypt data through lit action

## Ceramic
### Orbis
- Get studio access
- Operate through SDK
- Save / fetch data from the database

### ComposeDB
- Graph like not suited