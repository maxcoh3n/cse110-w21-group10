# Unit Tests Via Automation

* Status: accepted
* Deciders: entirety of group
* Date: 2021-02-08

## Context and Problem Statement

We needed to decide on a unit tester to be able to ensure that we aren't breaking the project when pushing new changes.

## Decision Drivers

* Need a utility to be able to check basic functionality of our program
* Need one that integrates with GitHub actions to make it programmable for each Pull Request

## Considered Options

* Jest
* Mocha/Chai

## Decision Outcome

* Chosen option: Jest

Jest is a utility that can integrate seamlessly into GitHub actions to test automatically for each new Pull Request made. Jest seems straightforward to use and there's a multitude of resources available to help integrate it into our project. Adding unit tests is simple and can be done along each stage of development.

It was not immediately clear how Mocha and Chai could be integrated with GitHub actions, and the tool itself was more complex, so we elected to go with Jest instead.
