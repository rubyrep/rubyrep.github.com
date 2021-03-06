---
layout: default
title: Scanning two databases for differences
---

Scanning two databases for differences
--------------------------------------

Step-by-step instructions to scan two databases for data differences.
This assumes that rubyrep has already been [installed](installation.html).

Step 1: Generate a basic configuration file
-------------------------------------------

This is done with command
`rubyrep generate myrubyrep.conf`

This will generate a configuration file skeleton like this:

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

  config.include_tables 'dept'
  config.include_tables /^e/ # regexp matches all tables starting with e
  # config.include_tables /./ # regexp matches all tables
end
```

Please note that this is valid ruby code. So you can do whatever you want.

Step 2: Specify how to connect to both databases
------------------------------------------------

rubyrep always works on two databases known as "left" and "right".
Above example should be fairly self-explaining...

**Special encodings**
If your database uses special encodings, you might want to specify them also in the connection paramters. (Apparently especially necessary with MySQL.)
Use the `:encoding` parameter for this.
Refer to the according explanations for [PostreSQL](http://ar.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/PostgreSQLAdapter.html) and [MySQL](http://ar.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/MysqlAdapter.html).

**PostgreSQL schema support**
If you are using PostgreSQL and your tables do not reside in the 'public' schema, add `:schema_search_path` to the database connection parameters. Example:
   `:schema_search_path => 'accounting'`.
Refer to the [ActiveRecord documentation](http://ar.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/PostgreSQLAdapter.html) for more background information.

Step 3: Configure which tables to scan
--------------------------------------

Use the `include_tables` option to specify which tables should be covered.
Different forms are possible:

-   single table: just specify the table name,
    e. g. `config.include_tables 'dept'`
-   multiple tables: specify any regular expression,
    e. g. all tables starting with 'e': `config.include_tables /^e/`
-   match tables that are named differently in left and right database:
    e. g. table 'dept' in left and table 'dept\_backup' in right database: `config.include_tables 'dept, dept_backup'`

Additionally it is possible to exclude tables. Excludes always trump includes.
Example: To match all tables except those ending with 'backup':

```ruby
config.include_tables /./
config.exclude_tables /backup$/
```

Step 4: Run the scan
--------------------

To run the scan, execute: `rubyrep scan -c myrubyrep.conf`
This will scan all configured tables.

It is possible, to overwrite which tables to scan.
E. g. to scan 'dept' and all tables starting with 'e':
`rubyrep scan -c myrubyrep.conf dept /^e/`

A scan with default options will produce output like this:

```ruby
                                dept 100% .........................   0
                                 emp 100% .........................   1
```

Here the 'dept' table is fully in sync, while table 'emp' has one difference.
(The dots and percentage values are printed during the scan to show the progress.)

Appendix: Further Information
-----------------------------

A scan can not only print scarce summaries as shown above.
Refer to the [scan command reference](scan_command.html) to see how rubyrep can show more detailed scan summaries as well as actual row differences.

Go to the [configuration reference](configuration.html) to see a list of all available configuration options.
