---
layout: default
title: Event filters
---

Event filters
-------------

Event filters can be used to

-   filter which unsynced / unreplicated differences should be processed by rubyrep
-   implement custom sync / replication actions

This is done by assigning the custom event filter to the (table specific) option `:event_filter`.
An event filter implements the `before_sync` and `before_replicate` methods[1].

The `before_sync` / `before_replicate` methods

-   are called for each each detected sync / replication difference
-   must return *true* for rubyrep to proceed with syncing / replicating the difference
-   can use the calling parameters to access both databases for custom actions

Sync filter
-----------

`before_sync` is called with

-   `table`: name of the left table (of the sync difference)
-   `key`: the column\_name =&gt; value hash of the primary key of the sync difference
-   `sync_helper`: a [`SyncHelper`](http://rubyrep.rubyforge.org/classes/RR/SyncHelper.html) through which the database can be accessed
-   `type`: type of sync difference (`:left`, `:right` or `:conflict`)
-   `row`:
    -   for `:left` or `:right` differences: the column\_name =&gt; value pairs of the unsynced row
    -   for `:conflict`: an array of conflicting left and right row

Replication filter
------------------

`before_replicate` is called with

-   `table`: name of the left table (of the unreplicated change)
-   `key`: the column\_name =&gt; value hash of the primary key of the changed row
-   `replication_helper`: a [`ReplicationHelper`](http://rubyrep.rubyforge.org/classes/RR/ReplicationHelper.html) enabling database access
-   `diff`: the [`ReplicationDifference`](http://rubyrep.rubyforge.org/classes/RR/ReplicationDifference.html) describing the unreplicated change.

Example
-------

The following simple example configures rubyrep to sync / replicate only accounts with a primary key &lt; 100:

```ruby
    ...

    class AccountFilter
      def before_sync(table, key, sync_helper, type, row)
        key['id'] < 100
      end

      def before_replicate(table, key, replication_helper, diff)
        key['id'] < 100
      end
    end 

    config.add_table_option 'accounts', :event_filter => AccountFilter.new

    ...   
```

[1] It is OK to only implement one of the methods.
