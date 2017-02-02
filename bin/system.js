var fs = require("fs");
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
var path_separator = require("path").sep;
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
  var out = process.stdout;
  return(out.write(x));
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
  return(child_process.execSync(command).toString());
};
var tty63 = function (fd) {
  var _e;
  if (fd === "stdin") {
    _e = 0;
  } else {
    var _e1;
    if (fd === "stdout") {
      _e1 = 1;
    } else {
      var _e2;
      if (fd === "stderr") {
        _e2 = 2;
      } else {
        _e2 = fd;
      }
      _e1 = _e2;
    }
    _e = _e1;
  }
  var _fd = _e;
  var s = get_environment_variable("LUMEN_TTY") || "";
  return(yes(search(s, " " + _fd)));
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
exports["tty?"] = tty63;
