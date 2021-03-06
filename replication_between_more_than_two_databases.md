---
layout: default
title: Replication between more than two databases
---

Replication between more than two databases
-------------------------------------------

Basically rubyrep can only scan / sync / replicate betwee two databases.
However there is a simple approach possible to keep more than two databases in sync.

Example:

-   Scenario: The databases A, B and C should be kept in sync.
-   Solution:
    -   A replicates with C
    -   B replicates with C

Effectively this is a replication in the star schema and an arbitrary number of databases could be kept in syn.

To accomplish this, the `:rep_prefix` of all replication setups has to be kept unique.
(This will ensure that each replication uses it's own triggers, change log tables, etc.)

|      |                                                                                                                                                  |
|------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Hint | Use the ruby [`require`](http://www.ruby-doc.org/core/classes/Kernel.html) command to keep the rubyrep config files DRY (Don't repeat yourself). |

|           |                                                                                                            |
|-----------|------------------------------------------------------------------------------------------------------------|
| Important | MySQL only supports one after trigger per table. This means that above approach is not possible with MySQL |
