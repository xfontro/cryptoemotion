#!/bin/bash -e

while :
do
  for fn in `cat tokens.txt`; do
    echo -e "Refreshing ${fn}\n"
    curl --silent http://localhost:3000/api/details/${fn}
    sleep 60
  done
  sleep 1800
done
