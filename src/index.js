var xmpp = require("./xmpp.js");
var api = require("./api.js");
var path = require("path");
var program = require("commander");
var rollbar = require("rollbar");

program
  .version("0.1.2")
  .option(
    "-p, --port <n>",
    "The server port number. Defaults to 5269.",
    parseInt
  )
  .option("-b, --bindAddress <value>", "The server bind address")
  .option("-d, --domainAddress <value>", "The server domain")
  .option("-k, --keyPath <path>", "The path of the TLS key")
  .option("-c, --certPath <path>", "The path of the TLS certificate")
  .option(
    "-r, --rollbar <api_token>",
    "Optional: The API Token for Rollbar crash reporting"
  )
  .parse(process.argv);

var rollbarKey = program.rollbar;
if (rollbarKey) {
  var options = {
    // Call process.exit(1) when an uncaught exception occurs but after reporting all
    // pending errors to Rollbar.
    //
    // Default: false
    exitOnUncaughtException: true
  };
  rollbar.handleUncaughtExceptions(rollbarKey, options);
}
var port = program.port || 5269;
var bindAddress = program.bindAddress;
var domain = program.domainAddress;
var tls = {};
tls.keyPath = path.resolve("server.key");
tls.certPath = path.resolve("server.cert");
var options = {
  tls: tls
};

var xServer = new xmpp.xmppServer();
xServer.setup(port, bindAddress, domain, options);
xServer.on("push", function(pushInfo) {
  console.log("they want us to push, shit", pushInfo);
});
