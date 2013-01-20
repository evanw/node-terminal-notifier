# Terminal Notifier

This module provides a node API for notifications on Mac OS X Lion by wrapping Eloy Durán's library https://github.com/alloy/terminal-notifier.

### Installation

    npm install terminal-notifier

### Usage

    var notifier = require('terminal-notifier');

    notifier('message text');
    notifier('message with title', { title: 'Title' });

Pass an object as the second argument to set additional options:

* `title` The notification title. Defaults to ‘Terminal’.
* `subtitle` The notification subtitle.
* `group` A string which identifies the group the notifications belong to. Old notifications with the same ID will be removed.
* `activate` The bundle identifier of the application to activate when the user clicks the notification.
* `open` The URL of a resource to open when the user clicks the notification.
* `execute` A shell command to perform when the user clicks the notification.
