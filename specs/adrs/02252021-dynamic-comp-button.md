# Dynamic Completed Button

* Status: accepted
* Deciders: entirety of group
* Date: 2021-02-25

## Context and Problem Statement

We made a significant amount of decisions regarding our final task-list implementation - specifically with regard to the dynamic completed button - and we need to log those.

## Decision Drivers

* Wanted to bring our wireframe more in line with what our final implementation was going to look like.
* Wanted to reshape our design to encourage the user to utilize the app as intended (for the purpose of ensuring the adherence to the Pomodoro Technique)

## Decision Outcome

* We have one dynamic complete, undo, and delete button whose functionality changes depending on which case the user is in
* Dynamic button functions as a delete button in the case that a user entered a task incorrectly, or decided they don't need to work on that particular task
  * This delete button only exists after they add a task and before they start a pomo. After a pomo is started, we want to disallow users from "deleting" tasks as opposed to "completing" them
* Dynamic button functions as a complete button in the case the user just completed a pomo and wants to indicate completion of a particular task.
* In the case that a user just completed a task and it is still selected and loaded into the task list (just a strikethrough through it), the button will read undo, and will allow the user to undo having completed a particular task
  * This works well if the user accidentally indicated a task was complete, when it actually wasn't.

## Caveats/Workarounds

* Complexity is a bit higher than previously, so novice, non-tech savvy users may find these features not helpful
  * Workaround: Task list is an optional feature, and users who do not use the task list are not exposed to any of this complexity.
  