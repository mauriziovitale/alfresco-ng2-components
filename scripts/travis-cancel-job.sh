#!/usr/bin/env bash

TRAVIS_JOB_ID=$1

curl -X POST \
  https://api.travis-ci.org/v3/job/$TRAVIS_JOB_ID/cancel \
  -H 'Authorization: token XuS9JOIaajRe828fezc30Q' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: b928e8d4-2d90-f4c3-7a70-c3bec1d5f1bb'

