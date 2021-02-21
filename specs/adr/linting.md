# Linting

* Status: accepted
* Deciders: entirety of group
* Date: 2021-02-08

## Context and Problem Statement

We needed to consolidate our preliminary research and decide on which linting tool to use.

## Decision Drivers

* Need to be sure that our code is easily readable by others, especially for the purpose of human review of PRs
* Readable code is maintainable code

## Considered Options

* Prettier Code-Formatter

## Decision Outcome

Chosen option: Prettier Code-Formatter as it is language-flexible (will be using it with HTML, CSS, JavaScript). It can help catch syntax errors and some logic errors in addition to ensuring a consistent style across each team member's code.