---
layout: default
title: Logging SQL Commands
---

Logging SQL Commands
--------------------

With the default settings, rubyrep communicates problems by

-   Creating according records in the 'rr\_logged\_events' database table
-   Printing out error messages to the console

If those information are not sufficient to uncover the root cause a problems, logging of all executed SQL statements can be enabled.
Needless to say: that will result in some very verbose output.

SQL logging is enabled separately for left and right database by specifying `:logger` as additional database connection parameter.
Value of the option can be either (ordered from simple to complex):

-   `STDOUT` (this will print the SQL statements)
-   `STDERR` (same as above but output goes to Linux stderr)
-   name / path to log file (e. g.: `"/var/log/rubyrep_debug.log"`)
-   a instance of [`Logger`](http://www.ruby-doc.org/stdlib/libdoc/logger/rdoc/classes/Logger.html)
    (Or "`Log4r::Logger`" if you have it installed)

Example:

```ruby
config.left[:logger] = "/var/log/rubyrep_left_sql.log"
config.right[:logger] = "/var/log/rubyrep_right_sql.log"
```
