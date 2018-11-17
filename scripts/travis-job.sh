#!/usr/bin/env bash

GITHUB_TOKEN="57a47ddab5708846b7e43ceefb75aaa3376c3e45"

TRAVIS_POST_TOKEN="$( curl -X POST \
  https://api.travis-ci.org/auth/github \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"github_token":"57a47ddab5708846b7e43ceefb75aaa3376c3e45"}' 2> /dev/null )"

TRAVIS_TOKEN=(`echo $TRAVIS_POST_TOKEN | sed -e 's/[{}]/''/g' | sed -e 's/[{"access_token":}]/''/g' `)
echo "token" $TRAVIS_TOKEN

curl -X GET \
  https://api.travis-ci.org/v3/repo/9235870 \
  -H 'Authorization: token XuS9JOIaajRe828fezc30Q' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 2ea7103c-4906-d251-2f96-29a573558090' \
  -d '{"github_token":"57a47ddab5708846b7e43ceefb75aaa3376c3e45"}'

