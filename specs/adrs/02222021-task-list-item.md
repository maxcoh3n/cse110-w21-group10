# Task List Item

* Status: accepted
* Deciders: entirety of group
* Date: 2021-02-22

## Context and Problem Statement

We needed to lock down a decision on how we are going to implement each individual item in the task list.

## Decision Drivers

* Want simplicity in code (for added maintainability)
  * There's no need to overengineer a solution
* Need to be able to mimic a radio button in functionality to ensure easy usage.
* Want to be able to add and remove these task items easily

## Considered Options

* Create a custom component that is based on a radio button
  * Add in custom features such as buttons that pop up allowing you to edit task created
* Store each item added into localStorage and dynamically render them as radio buttons on the screen

## Decision Outcome

* Chosen option: Store each item added into localStorage and dynamically render them as radio buttons on the screen

Using localStorage is not only the most straightforward solution, but also meets our needs. We need a function that goes into localStorage and renders each task in the form of a radio button option, which will give us radio button functionality. 

Implementing them as radio buttons allows us to ensure that only one is going to be selected at a time (displayed in the "Current Task Selected" box in the center of the screen). It also ensures we can select them individually to "complete" upon completion of a task.

By using localStorage, we can easily add and subtract task list items stored, and not have to worry about the complexity of diving into the world of custom components.
