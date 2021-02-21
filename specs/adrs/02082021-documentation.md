# Documenation generation via automation JSDocs

* Status: accepted
* Deciders: entirety of group
* Date: 2021-02-08

## Context and Problem Statement

We need the ability to generate documentation for added readability of our code by other team members

## Decision Drivers

* Want to be able to add more in-depth comments via a VSCode extension
* Want to ensure documentation before code gets merged into develop

## Considered Options

* JSDocs

## Decision Outcome

* Chosen option: JSDocs

JSDocs appears to be a widely-accepted standard for documentation and seems to fit our needs.

We will first be incorporating the VSCode extension “Add jsdoc comments” into our individual local VSCode editors. This allows us to make comments that allow us to specify parameters, return values, etc that show up when you hover over an object.

We will also be adding JSDocs into our workflow through GitHub Actions by adding it after the unit tests succeed. This ensures only commented/explained code gets added to develop.

## Caveats/Workarounds

It will add more time before code can be merged into develop, however the benefit of having more easily-understood code far outweighs the time commitment necessary/
