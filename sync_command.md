---
layout: default
title: Sync Command Reference
---

Sync Command Reference
----------------------

Syncs the differences between matching tables of 'left' and 'right' database.
This is the complete command reference. For background explanations please check the [sync tutorial](syncing.html).

|      |                                                                                                                                            |
|------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Note | If this looks very similar to the [scan command](scan_command.html) then because it is.<br/>The command line options are exactly the same. |

Usage
-----

Usage: `rubyrep sync [options] [table_spec] [table_spec] ...`

`table_spec` can be either:

-   a specific table name (e. g. 'users') or
-   a pair of (specific) table names (e. g.: 'users,users\_backup')
    (In this case the first table in the 'left' database is compared with the second table in the 'right' database.)
-   a regular expression (e. g. '/^user/') \[case insensitive match\]

Options
-------

-   `-s, --summary[=detailed]`
    Print the number of differences of each table. Either totals only, e. g.
       left\_table / right\_table \[differences\]
    or
       left\_table / right\_table \[conflicts\] \[left\_only records\] \[right\_only records\]
-   `-d, --detailed[=mode]`
    Print the number of differences of each table. E. g.
       left\_table / right\_table \[differences\]
    followed by a full dump of the differences in the YAML format.
    The 'mode' argument determines how the row differences are printed:
    -   `full` shows the full records
    -   `keys` shows the primary key columns only
    -   `diff` shows the primary key and differing columsn only
-   `-b, --progress-bar[=length]`
    Show the progress of the table scanning process as progress bar with the specified length.
-   `-c, --config=CONFIG_FILE`
    Mandatory. Path to configuration file.
-   `--help`
    Show a summary of the command line options
