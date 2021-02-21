# Code Quality Via Human Review (Pull Requests)

* Status: accepted
* Deciders: entirety of group
* Date: 2021-02-08

## Context and Problem Statement

We needed to decide on how we are going to structure our GitHub repository for the purpose of ensuring that only working code gets pushed.

## Decision Drivers

* Want to make sure that all Pull Requests get reviewed by at least one other team member before integration
* Need to be sure we have a separate area for code that is currently a work-in-progress as compared to a working demo

## Considered Options

* Built-in GitHub functionality

## Decision Outcome

* Chosen option: Built-in GitHub functionality

The main branch that we will be committing to most will be “develop”. This branch is protected and will require manual review by at least one other person to merge into. All the other branches will be free to be created and merged at each developer’s will when a new feature is made.

We have a master branch which we will use as the live deployment branch. Each major change to this branch will require manual review as it is protected, and we will also create a separate release for this new version using GitHub’s native tools.
