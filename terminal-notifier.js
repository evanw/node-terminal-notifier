var child_process = require('child_process');

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
  child_process.spawn(__dirname + '/terminal-notifier.app/Contents/MacOS/terminal-notifier', args);
};
