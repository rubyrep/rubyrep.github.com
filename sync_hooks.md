---
layout: default
title: Sync hooks
---

Sync hooks
----------

Sync hooks are custom behavior that can be execute before or after a table sync.
Relevant options:

-   `:before_table_sync`
-   `:after_table_sync`

S&zwnj;Q&zwnj;L Statements as sync hook
---------------------------------------

In it's simplest form, the hook can simply execute an SQL command (E. g. to disable /enable referential constraints, etc.).
Example:

```ruby
...  
config.include_tables 'emp',
  :before_table_sync => "SET foreign_key_checks = 0",
  :after_table_sync => "SET foreign_key_checks = 1"
...   
```

Ruby code as sync hook
----------------------

For more freedom, ruby code can be executed during the hook.
Example:

```ruby
...  
config.include_tables 'emp',
  :before_table_sync => lambda {|helper| 
    $stderr.puts "Hook called for #{helper.left_table}."
  } 
...   
```

For more information, please refer to the [RDoc](http://www.rubydoc.info/github/rubyrep/rubyrep/RR/Configuration)
