---
layout: default
title: Using rubyrep proxies
---

Using rubyrep proxies
---------------------

When scanning or syncing two databases, by default the complete data are transferred via network to the rubyrep process.
For off-site databases that are reachable via low-bandwidth or high-latency networks, this doesn't scale.

rubyrep can be operated in a proxy mode where

-   most of the processing is done on the database servers itself and
-   only actual differences go through the network

Basic approach:

1.  Start [rubyrep proxies](proxy_command.html) on the remote database servers.
    (Or computers that are "near" to them.)
2.  In the rubyrep connection parameters, specify the proxy host and port.

Done! (Everything else will work as usual)

Example
-------

Scenario: the "right" database is off-site and only reachable via a low-bandwidth connection.

Step 1: Modify the database connection parameters

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
        :proxy_host => '172.16.1.5',
        :proxy_port => '9876'
      }

      config.include_tables 'dept'
      config.include_tables /^e/ # regexp matches all tables starting with e
      # config.include_tables /./ # regexp matches all tables
    end
```

Step 2: Start the rubyrep proxy on the "right" database server

```ruby
    rubyrep proxy
```

Step 3: None. rubyrep will work as normal (but use less bandwidth).

|      |                                                                                                            |
|------|------------------------------------------------------------------------------------------------------------|
| Note | rubyrep replications will also work as normal. But not profit in reduced bandwidth or network round-trips. |
