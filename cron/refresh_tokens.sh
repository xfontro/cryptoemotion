#!/bin/bash -e

for fn in `cat tokens.txt`; do
  echo -e "Refreshing ${fn}\n"
  curl --silent http://localhost:3000/api/details/${fn}
  sleep 30
done

