var child_process = require('child_process');
var os = require('os');
var fs = require('fs');

/**
 * options.title     The notification title. Defaults to ‘Terminal’.
 * options.subtitle  The notification subtitle.
 * options.group     A string which identifies the group the notifications belong to.
 *                   Old notifications with the same ID will be removed.
 * options.activate  The bundle identifier of the application to activate when the user clicks the notification.
 * options.open      The URL of a resource to open when the user clicks the notification.
 * options.execute   A shell command to perform when the user clicks the notification.
 */
module.exports = function(message, options) {
  options = options || {};
  options.message = message;
  var args = [];
  Object.keys(options).map(function(key) {
    args = args.concat('-' + key, options[key]);
  });

  // Copy the app to attempt to to work around an OS X bug that says
  // 'You can't open the application "terminal-notifier.app" because
  // it may be damaged or incomplete.'
  var app = __dirname + '/terminal-notifier.app';
  var temp = os.tmpDir() + '/' + Math.random().toString(36).slice(2) + '.app';
  child_process.spawn('cp', ['-r', app, temp]).on('close', function() {
    child_process.spawn(temp + '/Contents/MacOS/terminal-notifier', args).on('close', function() {
      child_process.spawn('rm', ['-fr', temp]);
    });
  });
};

// Also work as a command-line program
if (require.main === module) {
  var args = process.argv.slice(2);
  var message = '';
  var options = {};
  while (args.length > 0) {
    switch (args.shift()) {
      case '-message': message = args.shift(); break;
      case '-title': options.title = args.shift(); break;
      case '-subtitle': options.subtitle = args.shift(); break;
      case '-group': options.group = args.shift(); break;
      case '-activate': options.activate = args.shift(); break;
      case '-open': options.open = args.shift(); break;
      case '-execute': options.execute = args.shift(); break;
    }
  }
  module.exports(message, options);
}
