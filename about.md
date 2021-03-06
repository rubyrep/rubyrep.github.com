---
layout: default
title: About
---

About
-----

rubyrep has been developed by Arndt Lehmann.

I am a German who has been living since 2001 in Tokyo, Japan.
I develop several web applications for for [TUV Rheinland](http://www.tuv.com).

I have no blogging habit. You can find an outdated personal homepage [here](http://www.arndtlehmann.com). Occasionally I go on multi-day bicyling tours through Japan and post pictures on [Facebook](https://www.facebook.com/arndt.lehmann.3?ref=bookmarks).

Motivation
----------

At my work for TUV Rheinland I develop business-to-business web applications. Tolerance for downtimes if much lower compared to e. g. free social networking sites.
Our strategy is redundancy: keep 2 independent infrastructures. If there is a problem, first switch, then fix.
For application servers this is no problem: just switch the load balancer and done.

It is not so easy for databases.
There are many master-slave replication solutions available. But setup is somewhat complex and application specific.
And if the database is switched, additionally work is necessary to promote the slave to master and demote the (old) master to slave.

I wanted a solution where you just say: keep this database and that one in sync. Period.
rubyrep is intended to be that solution.

Thanks
------

Additionally this project was not made in a vacuum.
I have to thank the following persons whose great works make this software possible:

-   [Yukihiro 'matz' Matsumoto](http://www.rubyist.net/~matz/) for developing [Ruby](http://www.ruby-lang.org), an incredibly powerful, yet easy to use programming language.
-   [Charles Oliver Nutter](http://blog.headius.com/) for developing [JRuby](http://jruby.codehaus.org/).
    Thanks to JRuby rubyrep can be used everywhere where Java runs (i.e. everywhere).
-   [Erwin Aligam](http://www.styleshout.com) for making a great website design.
    (Where this site is ugly, it is because I messed with the design.)

Last but *not* least:
Without my work at TUV Rheinland Japan I would never have developed the itch that led to the development of rubyrep.
It also offered ample opportunities to evaluate rubyrep under production conditions.
And TUV Rheinland Japan kindly supports the hosting of this project.
