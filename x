#!/bin/sh

HOST=${X_HOST:-lua}
BOOT=boot/x.lua

if [ "$HOST" = "node" ]
then
    BOOT=boot/x.js
fi

$HOST $BOOT "$@"
