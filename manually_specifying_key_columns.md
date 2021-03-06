---
layout: default
title: Manually specifying key columns
---

Manually specifying key columns
-------------------------------

rubyrep can only scan, sync or replicate tables whose records can be identified by unique keys.
Those keys can be single columns or combinations of multiple columns.

By default, rubyrep will using the primary key columns of the according table.
If a table does not have a primary key, it can be manually specified using

-   `:key` option or
-   `:auto_key_limit` option

:key option
-----------

Usage examples:

```ruby

...  
config.include_tables 'articles', :key => 'id'
config.include_tables 'articles_tags', :key => ['article_id', 'tag_id']
...   
```

:auto\_key\_limit option
------------------------

If you have many e. g. many-to-many relationship tables, all of them without primary key, it might be troublesome to specify the key columns manually.
`:auto_key_limit` is a convenience option to address this problem.

It basically says, that if a table

-   has no primary key and
-   not more than the specified number of columns

then rubyrep shall automatically consider the combination of all columns of the table as unique.

E. g. all of the options in the following example are equivalent (but with the `:auto_key_limit` versions applying to potentially more than one table):

```ruby
...  

# applies to all tables with not more than 2 columns and 
# not having a primary key
config.options[:auto_key_limit] = 2

# like above, but only for tables whose name contains an underscore
config.add_table_options /_/, :auto_key_limit => 2

# specify the key columns for this table only
config.include_tables 'articles_tags', :key => ['article_id', 'tag_id']

...   
```
