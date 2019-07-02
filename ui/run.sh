#!/bin/bash

cd `dirname $0`

yarn
./node_modules/.bin/serve
