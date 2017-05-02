var fs = require("fs");
var child_process = require("child_process");
var read_file = function (path) {
  return(fs.readFileSync(path, "utf8"));
};
var write_file = function (path, data) {
  return(fs.writeFileSync(path, data, "utf8"));
};
var file_exists63 = function (path) {
  return(fs.existsSync(path, "utf8") && fs.statSync(path).isFile());
};
var directory_exists63 = function (path) {
  return(fs.existsSync(path, "utf8") && fs.statSync(path).isDirectory());
};
var path_separator = require("path").sep;
var path_join = function () {
  var _parts = unstash(Array.prototype.slice.call(arguments, 0));
  return(reduce(function (x, y) {
    return(x + path_separator + y);
  }, _parts) || "");
};
var get_environment_variable = function (name) {
  return(process.env[name]);
};
var write = function (x) {
  var _out = process.stdout;
  return(_out.write(x));
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
  return(child_process.execSync(command)["toString"]());
};
exports["read-file"] = read_file;
exports["write-file"] = write_file;
exports["file-exists?"] = file_exists63;
exports["directory-exists?"] = directory_exists63;
exports["path-separator"] = path_separator;
exports["path-join"] = path_join;
exports["get-environment-variable"] = get_environment_variable;
exports.write = write;
exports.exit = exit;
exports.argv = argv;
exports.reload = reload;
exports.run = run;
