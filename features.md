---
layout: default
title: Features
---

Simple Configuration
--------------------

Complete setup is done via a single simple configuration file.
(Expressed in a Domain specific language done in <acronym title="programming language">ruby</acronym>.)

Simple Installation
-------------------

Installation can be done either via

-   traditional ruby stack OR
-   JRuby

In case of JRuby this means:

1.  Installation of a JVM (Java Virtual Machine)
2.  Download and extracting of a zip file
3.  Done.

Platform independent
--------------------

Runs on both Linux and Windows platforms.
(But on Windows it is considerably slower and less frequently tested.)

Table Design independent
------------------------

All commands work on tables no matter if they have

-   a simple primary key (all data types acceptable),
-   a combined primary key or
-   no primary key at all[1].

rubyrep successfully processes

-   multi-byte texts
-   "big" data types[2]

Scan Features
-------------

rubyrep can scan corresponding tables of left and right database[3] for diverging data.

-   Different output modes: from count of differences over row diffs to full row dumps.
-   Low bandwidth mode available: reduced number of round-trips; only actual differences go through the network
-   Shows progress bar with estimated remaining amount of work

Sync Features
-------------

rubyrep can sync the data in corresponding tables of left and right database.

-   All scan features also apply to syncs
-   Automatically orders table syncs to avoid foreign key conflicts.
-   Sync policy specifyable: ignore deletes in left database, ignore created records in right database, etc.
-   Prebuild conflict resolution methods available: left db wins, right db wins
-   Custom conflict resolution methods specifiable via ruby code snippets
-   Merge decisions can optionally be logged in the rubyrep event log table.

Replication Features
--------------------

rubyrep can continously replicate changes between left and right databases.

-   Automatically sets up necessary triggers, log tables, etc.
-   Automatically discovers newly added tables and synchronizes the table content
-   Automatically reconfigures sequences to avoid duplicate key conflicts
-   Tracks changes to primary key columns
-   Can implement both master-slave and master-master replication
-   Prebuild conflict resolution methods availble: left / right wins; earlier / later change wins
-   Custom conflict resolution specifiable via ruby code snippets
-   Replication decisions can optionally be logged in the rubyrep event log table

[1] In that case, a unique column (or combination of columns) has to be specified in the configuration file

[2] In MySQL tested with "blob" and "text"; In PostgreSQL tested with "bytea" and "text"

[3] Rubyrep always operates on two databases. The databases are referred to as "left" and "right" database respectively.
