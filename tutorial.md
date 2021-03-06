---
layout: default
title: Tutorial
---

Tutorial
--------

Step-by-step instructions for common tasks.

Basic Tasks
-----------

-   [Installation](installation.html)
-   [Scanning](scanning.html) two databases for differences
-   [Syncing](syncing.html) two databases
-   Setting up continuous [replication](replication.html) between two databases

Advanced Tasks
--------------

-   [Dealing with tables without primary keys](manually_specifying_key_columns.html).
-   Executing custom behavior [before or after syncing a table](sync_hooks.html).
-   [Filter](event_filters.html) which differences to sync / replicate or execute custom sync / replication actions.
-   Scanning or syncing between two databases with [minimal network load](using_rubyrep_proxies.html).
    (Only actualy differences go through the network; good for off-site installations.)
-   Replication between [more than two databases](replication_between_more_than_two_databases.html).
-   Coordinating rubyrep triggers with [application specific triggers](coordinating_with_application_specific_triggers.html).
-   (Useful for troubleshooting:) [Log](logging_sql.html) all executed SQL commands
