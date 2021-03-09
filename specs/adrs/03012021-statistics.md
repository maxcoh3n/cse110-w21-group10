# What statistics to show to user and how to compute them

* Status: accepted
* Deciders: Max, Jerry, Nir
* Date: 2021-03-01

## Context and Problem Statement

What statistics do we want to have available for the user?
How will we compute these?

## Decision Drivers

Computing statistics each time that the user asks for them will be O(n), increasing each time the user uses the app, and we ideally want a solution that is O(1).

## Considered Options

* Calculate based on completedSessions
* Store statistics in localstorage, and update it independently

## Decision Outcome

* Chosen Options: Store statistics in localStorage

Storing statistics in localStorage and updating it separately allows us to obtain the desired runtime of O(1) and it also allows more simplicity, even though there's an additional calculation abstracted away in a different function.

### Details of what statistics will be displayed and what values they will use

* Average number of sessions to complete a task
  * Calculation: (total number of session of completed tasks/ # of completed tasks)
  * Stored as: numCompletedTaskSessions
    * Add to onclick for completed button- add size of duration array
      * Undo must get rid of these, so you need to store number of tasksAdded and then subtract them when you hit undo
        * Set this var to 0
* Total number of completed tasks
  * Stored as: numCompletedTasks
  * Add to onclick for completed button
* Average tasks completed per day
* Total number of days that the user has used our app
  * Stored as: numDaysWorking
    * must store a new value called lastDayWorked
avg sessions per day
* Total number of pomo sessions
  * Stored as: totalsessions
    * increment when timer hits zero

### Variables going into localStorage

* numCompletedTaskSessions
* numCompletedTasks
* numDaysWorking
* totalsessions
