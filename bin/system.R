read_file <- function (path) {
}
write_file <- function (path, data) {
}
file_exists63 <- function (path) {
}
directory_exists63 <- function (path) {
}
path_separator
path_join <- function (...) {
  V__parts <- list(...)
  reduce(function (x, y) {
    cat(x, path_separator, y)
  }, V__parts) || ""
}
get_environment_variable <- function (name) {
}
write <- function (x) {
}
exit <- function (code) {
}
argv
reload <- function (module) {
  NULL <- NULL
  require(module)
}
run <- function (command) {
}
return list("read-file" = read_file, "write-file" = write_file, "file-exists?" = file_exists63, "directory-exists?" = directory_exists63, "path-separator" = path_separator, "path-join" = path_join, "get-environment-variable" = get_environment_variable, write = write, exit = exit, argv = argv, reload = reload, run = run)
