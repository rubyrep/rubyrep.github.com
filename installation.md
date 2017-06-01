---
layout: default
title: Installation
---

Installation
------------

This page explains how to install the standard Ruby or JRuby flavors of rubyrep.

Which flavor?
-------------

If you just want to get started in the quickest way, choose JRuby.

For more background information, here a comparison between both flavors:

|                      | Standard Ruby flavor | JRuby flavor                                |
|----------------------|:--------------------:|---------------------------------------------|
| Capabilities         |   exactly the same   |
| Performance          |        slower        | **faster** (by about one third)[1]          |
| Ease of installation |        harder        | **easier** (more [info](installation.html)) |

Installing the JRuby version
----------------------------

Pre-condition: Java is installed (tested with version 1.8).

1.  Download the latest JRuby rubyrep package from [Bintray](https://bintray.com/rubyrep/rubyrep/rubyrep-jruby).
2.  Unzip
3.  Done

The `rubyrep` command (through which everything is controlled) is available in the created folder.

Installing the standard Ruby version
------------------------------------

1.  Install the Ruby environment[2]
2.  Install the database driver.
    Normally
    `sudo gem install pg`
    or
    `sudo gem install mysql2`
    will do the trick.
3.  Install rubyrep
    `sudo gem install rubyrep`

After installation, the `rubyrep` command will be placed in the path.

Next Steps
----------

Next step would be to configure rubyrep for whatever you want it to do.
Head to the [tutorial](tutorial.html) for guides to typical scenarios.

[1] rubyrep command startup time under JRuby is slower though (around 9 seconds). Under standard Ruby it is not noticable.

[2] Explanation not in the scope of this document, refer to [this site](http://www.techotopia.com/index.php/Getting_and_Installing_Ruby) for some pointers.
