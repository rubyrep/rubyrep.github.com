---
layout: default
title: Coordinating with application specific triggers
---

Coordinating with application specific triggers
-----------------------------------------------

If the database already has triggers (to create audit logs, etc.), care has to be taken so that both rubyrep activity (syncing, replication) does not clash with the application specific triggers.

How rubyrep works is that:

-   It creates triggers on all tables that are to be replicated.
-   Those triggers log the key columns of each modified record into the rubyrep change log table.
-   The rubyrep process checks the change log table and applies all changes to the other database.

Important is here, that rubyrep takes for each record only one action, doesn't matter how often it was modified.
E. g. if a record was (in between two rubyrep replication runs)

1.  created
2.  modified (first time)
3.  modified (second time)

then rubyrep will apply only one change to the other database (creation of the record in its current state).
Only **one** action will take place.

MySQL Limitiations
------------------

MySQL only supports one after trigger per table. Meaning if you already need an application specific after trigger for a table, you cannot replicate it with rubyrep.

MySQL also only supports one before trigger per table. By default rubyrep uses the before trigger to simulate adjustable sequences. Meaning if you already need an application specific before trigger for a table, you have to

-   disable the `:adjust_sequences` option for that table
-   ensure on your own that no duplicate key problems arise for the table

There are **no such limitations** for PostgreSQL.

Recommended strategy
--------------------

The easiest way to coordinate rubyrep activity with application activity is to

-   Keep application specific triggers activated in both database
-   Tell rubyrep to also sync / replicate tables that are not modified directly but only by the application specific triggers (audit log tables, etc.)
-   Modify the appliction specific triggers to **not** take action for rubyrep originated creates / updates / deletes.
    (Otherwise the same change will trigger the application specific triggers twice \[in "left" and "right" database\].)

Teaching application specific triggers to ignore rubyrep activity
-----------------------------------------------------------------

A rubyrep sync / replication run will process according to the following steps\[1\]:

1.  Start a transaction
2.  Create a marker record in the activity marker table
3.  Apply sync / replication changes
4.  Delete the marker record from the activity marker table
5.  Commit the transaction

\[1\] Depending on the `:commit_frequency` paramter and the amount of changes, there will be more than one transaction. But the concept stays the same.

This means that application application specific triggers can detect rubyrep activity by checking if the activity marker table is **not** empty.

Name of the activity marker table: `rr_running_flags` (unless option [`:rep_prefix`](configuration.html) has been modified.)

Example for modification of a PostgreSQL trigger
------------------------------------------------

Add the following to the top of your application specific trigger functions:

```ruby
PERFORM ACTIVE FROM rr_running_flags;
IF FOUND THEN
  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END IF;
```

Example for modification of a MySQL trigger
-------------------------------------------

Add the following to the top of your application specific before trigger functions:

```ruby
DECLARE active INT;
SELECT count(*) INTO active FROM rr_running_flags;
IF active <> 0 THEN
  LEAVE p;
END IF;
```
