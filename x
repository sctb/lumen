#!/bin/sh

HOST=${X_HOST:-lua}
BOOT=boot/x.lua

if [ "$HOST" = "node" ]
then
    BOOT=boot/x.js
fi

pushd `dirname $0` > /dev/null
DIR=`pwd`
popd > /dev/null

$HOST $DIR/$BOOT "$@"
