---
layout: default
title: Replicating two databases
---

Replicate two databases
-----------------------

Step-by-step instructions on how to setup replication between two databases.
This assumes, rubyrep has already been [installed](installation.html).

Step 1: Set up the configuration file
-------------------------------------

Replication is no more difficult to set up than scanning or syncing.
Specifically a configuration file created as per ["Scanning two databases for differences"](scanning.html) can be used straight away to start replication.

Such a replication will use the following default policy:

-   non-conflicting changes are replicated to the other database.
-   conflicting changes are ignored.

Step 2: Start the replication
-----------------------------

To start the replication, execute: `rubyrep replicate -c myrubyrep.conf`
This will continously replicate all configured tables.

When the replication is started, the following will happen automatically:

1.  rubyrep will set up necessary infrastructure tables (if not yet existing).
2.  rubyrep will check if any configured tables do not yet have a rubyrep trigger.
    For each such table
    -   The triggers are set up.
    -   An initial scan is executed and all differences are synced.
        (Refer to the [sync tutorial](syncing.html) on how to tweak the sync policies.)
3.  rubyrep will check if any \*non-\*configured tables have rubyrep triggers.
    If yes: rubyrep will remove those triggers and restore the sequences.
4.  rubyrep will tweak the sequences to avoid duplicate keys[1].
    (By default, the "left" database will only generate even, the "right" odd numbers.)

Step 3: Stopping the replication
--------------------------------

The process started in step 2 will not terminate. To stop the replication, kill the process. The replicate command will gracefully exit.

|      |                                                                                                                                                                                                         |
|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Note | Even after the replication is stopped, all changes are still logged via the triggers created by rubyrep.<br/> After the replication is restarted, all pending changes will automatically be replicated. |

Step 4: Uninstall the replication
---------------------------------

If you permanently want to stop replication (that is: removing all triggers and tables created by rubyrep), use the uninstall command:
  `rubyrep uninstall -c myrubyrep.conf`

Appendix A: Tweaking the replication policy
-------------------------------------------

If the replication policy as explained above is not suitable for your setup, you can modify it.

Handling of non-conflicting "left" (`:left_change_handling`) or "right" (`:right_change_handling`) changes (covers inserts, updates and deletes):

-   `:ignore`: no action
-   `:replicate`: apply the change to the other database (**default behaviour**)
-   ruby `Proc` object: specify custom behavior. Refer to the [RDoc](http://www.rubydoc.info/github/rubyrep/rubyrep/RR/Replicators/TwoWayReplicator) on how to do this.

Handling of conflicts (`:replication_conflict_handling`):

-   `:ignore`: no action (**default behavior**)
-   `:left_wins`: apply the change from the "left" database to the "right"
-   `:right_wins`: apply the change from the "right" database to the "left"
-   `:later_wins`: the more recent change will prevail.
-   `:earlier_wins`: the earlier change will prevail.
-   ruby `Proc` object: specify custom behavior. Refer to the [RDoc](http://www.rubydoc.info/github/rubyrep/rubyrep/RR/Replicators/TwoWayReplicator) on how to do this.

Examples

-   `config.options[:left_change_handling] = :ignore`
    Changes in the "left" database will **not** be applied to the "right" database.
-   `config.add_table_options /^e/, :replication_conflict_handing => :left_wins`
    If there is a conflict in any table starting with 'e', apply the change from the "left" database to the "right" database.

Appendix B: Tweaking the logging policy
---------------------------------------

Rubyrep can log replication events to the rubyrep event log table in the "left" database.
This table is automatically created during the first replication. Normally the table is named "rr\_logged\_events".

The default logging policy is to log only ignored conflicts. This can be modified with the `:logged_replication_events` option:

-   `:ignored_changes`: log ignored (but not synced) non-conflict changes
-   `:all_changes`: log all non-conflict changes
-   `:ignored_conflicts`: log ignored (but not synced) conflicts
-   `:all_conflicts`: log all conflicts

To activate multiple options, specify them in an array:

```ruby
...
config.options[:logged_replication_events] = [
  :ignored_changes, 
  :ignored_conflicts
]
...
```

Appendix C: Complete Example
----------------------------

A sync with the following configuration file would

-   replicates all tables
-   resolve conflicts by updating the left database
-   except table 'emp': here in case of conflicts the right database is updated

<!-- -->

```ruby
RR::Initializer::run do |config|
  config.left = {
    :adapter  => 'postgresql', # or 'mysql'
    :database => 'SCOTT',
    :username => 'scott',
    :password => 'tiger',
    :host     => '172.16.1.1'
  }

  config.right = {
    :adapter  => 'postgresql',
    :database => 'SCOTT',
    :username => 'scott',
    :password => 'tiger',
    :host     => '172.16.1.2'
  }

  config.options[:sync_conflict_handling] = :right_wins
  config.options[:replication_conflict_handling] = :right_wins
  config.add_table_options 'emp', 
    :sync_conflict_handling => :left_wins,
    :replication_conflict_handling => :left_wins
  config.include_tables /./

end
```

Appendix D: Further Information
-------------------------------

Refer to the [replicate command reference](replicate_command.html) for the complete reference to the replicate command.

Go to the [configuration reference](configuration.html) to see a list of all available configuration options.

[1] MySQL does not actually have sequences. Here sequences are simulated using "before triggers" on the auto-incrementing keys.
