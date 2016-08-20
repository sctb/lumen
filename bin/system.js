var fs = require("fs");
var path = require("path");
var child_process = require("child_process");
var read_file = function (path) {
  return(fs.readFileSync(path, "utf8"));
};
var write_file = function (path, data) {
  return(fs.writeFileSync(path, data, "utf8"));
};
var file_exists63 = function (path) {
  return(fs.existsSync(path, "utf8"));
};
var path_separator = path.sep;
var path_join = function () {
  var parts = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (x, y) {
    return(x + path_separator + y);
  }, parts) || "");
};
var get_environment_variable = function (name) {
  return(process.env[name]);
};
var write = function (x) {
  return(process.stdout.write(x));
};
var exit = function (code) {
  return(process.exit(code));
};
var argv = cut(process.argv, 2);
var reload = function (module) {
  delete require.cache[require.resolve(module)];
  return(require(module));
};
var run = function (command) {
  var f = child_process.execSync(command);
  return(f.toString());
};
exports["read-file"] = read_file;
exports["write-file"] = write_file;
exports["file-exists?"] = file_exists63;
exports["path-separator"] = path_separator;
exports["path-join"] = path_join;
exports["get-environment-variable"] = get_environment_variable;
exports.write = write;
exports.exit = exit;
exports.argv = argv;
exports.reload = reload;
exports.run = run;
