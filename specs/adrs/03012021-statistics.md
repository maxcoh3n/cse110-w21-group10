# What statistics to show to user and how to compute them

* Status: accepted
* Deciders: Max, Jerry, Nir
* Date: 2021-03-01

## Context and Problem Statement

What statistics do we want to have available for the user?
Additionally, how will we compute these? Doing them every time user asks for statistics will be O(n) which increases as user uses app, so ideally
we would like to make this O(1)


## Considered Options

* calculate based on completedSessions
* store statistics in localstorage, update it separately


## Decision Outcome

* store statistics in localstorage, update it separately because O(1) and simpler, even if decentralized


## details of what statistics will be displayed and what values they will use:


avg num sessions to complete a task (total number of session of completed tasks/ # of completed tasks)
 - numSessionsForCompletedTasks
    - add to onclick for completed button- add size of duration array
  - numCompletedTasks
    - add to onclick for completed button
avg tasks completed per day (edited) 
    - numCompletedTasks
    - numDaysWorking - total # of days that the user has used our app
        - must store a new value called lastDayWorked
avg sessions per day
    - totalsessions
        - increment when timer hits zero
     - numDaysWorking
total tasks completed
 - numCompletedTasks

## details of what statistics localStorage will store

- numSessionsForCompletedTasks
- numCompletedTasks
- numDaysWorking
- totalsessions

