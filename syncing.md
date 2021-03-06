---
layout: default
title: Syncing two databases for differences
---

Syncing two databases
---------------------

Step-by-step instructions on how to sync two databases.
This assumes, rubyrep has already been [installed](installation.html).

Step 1: Set up the configuration file
-------------------------------------

At it's simplest, a sync is simply a scan where differences are not just printed but also reconciled.
This means, that a configuration file created as per ["Scanning two databases for differences"](scanning.html) can be used straight away to execute a sync.

Such a sync will use the following default sync policy:

-   records that only exist in one of the databases, are copied to the other.
-   conflicting records are ignored.

Step 2: Execute the sync
------------------------

To run the sync, execute: `rubyrep sync -c myrubyrep.conf`
This will sync all configured tables.

It is possible, to overwrite which tables to sync.
E. g. to sync 'dept' and all tables starting with 'e':
   `rubyrep sync -c myrubyrep.conf dept /^e/`

Per default, rubyrep will re-order the table syncs so to minimize foreign key conflicts.

The output generated, will look similar to scan results as explained in the [scanning tutorial](scanning.html)

Appendix A: Tweaking the sync policy
------------------------------------

If the sync policy as explained above is not suitable for your setup, you can modify it.

Handling of "left only" (`:left_record_handling`) or "right only" (`:right_record_handling`)
records:

-   `:ignore`: no action
-   `:delete`: delete from source database
-   `:insert`: insert into the other database (**default behavior**)
-   ruby `Proc` object: specify custom behavior. Refer to the [RDoc](http://www.rubydoc.info/github/rubyrep/rubyrep/RR/Syncers/TwoWaySyncer) on how to do this.

Handling of conflicts (`:sync_conflict_handling`):

-   `:ignore`: no action (**default behavior**)
-   `:left_wins`: update the record in the right database
-   `:right_wins`: update the record in the left database
-   ruby `Proc` object: specify custom behavior. Refer to the [RDoc](http://www.rubydoc.info/github/rubyrep/rubyrep/RR/Syncers/TwoWaySyncer) on how to do this.

Examples

-   `config.options[:left_record_handling] = :ignore`
    All records that only exist in the left database will be ignored
-   `config.add_table_options /^e/, :sync_conflict_handing => :update_right`
    If there is a conflict in any table starting with 'e', update the right database.
-   `config.include_tables 'dept', :left_record_handling => :ignore, :right_record_handling => :ignore, :sync_conflict_handling => :right_wins`
    This sets up many behaviors at the same time:
    -   Add table 'dept' to the tables that will be synced.
    -   For table 'dept', ignore records that only exist in one of the databases
    -   For table 'dept', if there are conflicts, update the left database

Appendix B: Tweaking the logging policy
---------------------------------------

Rubyrep can log sync events in a database. It will do this if the left databases has a "logged events" table.
This table is automatically created during creation. Normally it is named "rr\_logged\_events".

The default logging policy is to log only ignored conflicts. This can be modified with the `:logged_sync_events` option:

-   `:ignored_changes`: log ignored (but not synced) non-conflict changes
-   `:all_changes`: log all non-conflict changes
-   `:ignored_conflicts`: log ignored (but not synced) conflicts
-   `:all_conflicts`: log all conflicts

To activate multiple options, specify them in an array:

```ruby
...
config.options[:logged_sync_events] = [
  :ignored_changes, 
  :ignored_conflicts
]
...
```

Appendix C: Complete Example
----------------------------

A sync with the following configuration file would

-   sync all tables
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
  config.add_table_options 'emp', :sync_conflict_handling => :left_wins

  config.include_tables /./
end
```

Appendix D: Further Information
-------------------------------

Refer to the [sync command reference](sync_command.html) for the complete reference to the sync command.

Go to the [configuration reference](configuration.html) to see a list of all available configuration options.
