var fs = require("fs");
var child_process = require("child_process");
var read_file = function (path) {
  var _e;
  if (path === "-") {
    _e = "/dev/stdin";
  } else {
    _e = path;
  }
  var _path = _e;
  return(fs.readFileSync(_path, "utf8"));
};
var write_file = function (path, data) {
  var _e1;
  if (path === "-") {
    _e1 = "/dev/stdout";
  } else {
    _e1 = path;
  }
  var _path1 = _e1;
  return(fs.writeFileSync(_path1, data, "utf8"));
};
var file_exists63 = function (path) {
  return(path === "-" || fs.existsSync(path, "utf8"));
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
  var _e2;
  if (fd === "stdin") {
    _e2 = 0;
  } else {
    var _e3;
    if (fd === "stdout") {
      _e3 = 1;
    } else {
      var _e4;
      if (fd === "stderr") {
        _e4 = 2;
      } else {
        var _e5;
        if (number63(fd)) {
          _e5 = fd;
        } else {
          return(false);
        }
        _e4 = _e5;
      }
      _e3 = _e4;
    }
    _e2 = _e3;
  }
  var _fd = _e2;
  return("1" === run("[ -t " + _fd + " ] && printf 1 || exit 0"));
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
