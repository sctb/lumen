var fs = require("fs");
var child_process = require("child_process");
var readFile = function (path) {
  return fs.readFileSync(path, "utf8");
};
var writeFile = function (path, data) {
  return fs.writeFileSync(path, data, "utf8");
};
var fileExists63 = function (path) {
  return fs.existsSync(path, "utf8") && fs.statSync(path).isFile();
};
var directoryExists63 = function (path) {
  return fs.existsSync(path, "utf8") && fs.statSync(path).isDirectory();
};
var pathSeparator = require("path").sep;
var pathJoin = function () {
  var __parts = unstash(Array.prototype.slice.call(arguments, 0));
  return reduce(function (x, y) {
    return x + pathSeparator + y;
  }, __parts) || "";
};
var getEnvironmentVariable = function (name) {
  return process.env[name];
};
var write = function (x) {
  return process.stdout.write(x);
};
var exit = function (code) {
  return process.exit(code);
};
var argv = cut(process.argv, 2);
var reload = function (module) {
  delete require.cache[require.resolve(module)];
  return require(module);
};
var run = function (command) {
  return child_process.execSync(command).toString();
};
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.fileExists63 = fileExists63;
exports.directoryExists63 = directoryExists63;
exports.pathSeparator = pathSeparator;
exports.pathJoin = pathJoin;
exports.getEnvironmentVariable = getEnvironmentVariable;
exports.write = write;
exports.exit = exit;
exports.argv = argv;
exports.reload = reload;
exports.run = run;
