#!/bin/sh

set -e

mkfifo /tmp/docusaurus-dev-output
./node_modules/.bin/docusaurus start --no-open --no-minify >/tmp/docusaurus-dev-output &
pid=$!
grep --max-count=1 'compiled successfully' /tmp/docusaurus-dev-output
rm /tmp/docusaurus-dev-output
kill $pid
