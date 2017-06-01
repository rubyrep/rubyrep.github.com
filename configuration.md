---
layout: default
title: Configuration Reference
---

Configuration Reference
-----------------------

rubyrep comes with sensible defaults for practically everything but the database connection parameters.
Nevertheless a wide range of behaviors can be configured.
This page lists all available configuration settings.

Global vs. table specific settings
----------------------------------

The configuration parameters come in two types

-   global (apply to all tables)
-   table specific

Global configuration settings are specified as in the following example:

```ruby 
RR::Initializer::run do |config|
  ...
  config.options[:sync_conflict_handling] = :right_wins
  ...
end
``` 

Table specific options can be specified either as global default settings (same form as above) or for specific tables:

```ruby 
...  
config.add_table_options 'emp', :sync_conflict_handling => :left_wins
config.include_tables 'dept', 
  :sync_conflict_handling => :left_wins, 
  :logged_sync_events => :ignored_changes
...   
``` 

In the first form above, only the option is set; in the second the "dept" table will also be added to the configured tables list.

List of configuration settings
------------------------------

|              Setting              | Table Specific | Default value | Description                                                                                                                                                                                                    |
|:---------------------------------:|----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        **General Settings**       |
|        `:proxy_block_size`        | yes            | 1000          | For proxied scans / syncs: number of rows that are checksummed                                                                                                                                                 |
|         `:row_buffer_size`        | yes            | 1000          | Number of rows that are ready into memory at a single time. Should be smaller for tables with very large columns.                                                                                              |
|        `:commit_frequency`        |                | 1000          | After how many changes the open transaction is committed and a new one started.                                                                                                                                |
|            `:use_ansi`            | yes            | yes[1]        | If the scan / sync progress bars use ANSI codes for a slicker display.                                                                                                                                         |
|               `:key`              | yes            |               | Manually specify the unique columns of a table. More information [here](manually_specifying_key_columns.html).                                                                                               |
|         `:auto_key_limit`         | yes            | 0             | Convenience option. Maximum number of columns of a table without primary key up to which the combination of all columns is considered unique. More information [here](manually_specifying_key_columns.html). |
|          `:event_filter`          | yes            |               | Filter which differences to sync / replicate. Implement custom sync / replicate actions. More information [here](event_filters.html).                                                                          |
|     **Sync specific settings**    |
|         `:table_ordering`         |                | true          | If the sync sequence of tables is modified to reduce foreign key conflicts.                                                                                                                                    |
|        `:before_table_sync`       | yes            |               | Custom behavior that is executed before a table sync. More information [here](sync_hooks.html).                                                                                                                |
|        `:after_table_sync`        | yes            |               | Same as `:before_table_sync` (but executed after the table sync).                                                                                                                                              |
| **Replication specific settings** |
|           `:rep_prefix`           |                | 'rr'          | The prefix that is put in front of all database objects created by rubyrep.                                                                                                                                    |
|             `:key_sep`            |                | '&#124;'      | The string that separates columns in the key column of the change log table. Must not occure in the key columns of the replicated tables. Can consist of multiple characters.                                  |
|          `:initial_sync`          | yes            | true          | If true, syncs the tables when starting replication. <br/>Disable with care! (I. e. only if sure that tables have the same data in both databases before starting replication                                  |
|        `:adjust_sequences`        | yes            | true          | If true, adjusts the sequences of the tables to avoid duplicate key problems.                                                                                                                                  |
|       `:sequence_increment`       | yes            | 2             | The increment of adjusted sequences.                                                                                                                                                                           |
|      `:left_sequence_offset`      | yes            | 0             | Ensures that adjusted sequences in the "left" database only generate numbers with `number % sequence_increment == left_sequence_offset`                                                                        |
|      `:right_sequence_offset`     | yes            | 1             | Same as `:left_sequence_offset` (but for "right" database).                                                                                                                                                    |
|      `:replication_interval`      |                | 1             | Time in seconds between replication runs. (Can also be parts of a second.)<br/>Note: A replication run without any unreplicated changes is very cheap.                                                         |

[1] True unless output is not going to a terminal OR running under Windows.

|Note|There are a few more settings that have not been mentioned here. These require a good understanding of rubyrep interna. They are documented in the [RDoc](http://www.rubydoc.info/github/rubyrep/rubyrep/RR/Configuration).|
