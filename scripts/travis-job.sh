#!/usr/bin/env bash

GITHUB_TOKEN="57a47ddab5708846b7e43ceefb75aaa3376c3e45"

#TRAVIS_POST_TOKEN="$( curl -X POST \
#  https://api.travis-ci.org/auth/github \
#  -H 'Accept: application/json' \
#  -H 'Content-Type: application/json' \
#  -d '{"github_token":"57a47ddab5708846b7e43ceefb75aaa3376c3e45"}' 2> /dev/null )"
#
#TRAVIS_TOKEN=(`echo $TRAVIS_POST_TOKEN | sed -e 's/[{}]/''/g' | sed -e 's/[{"access_token":}]/''/g' `)

#echo "token" $TRAVIS_TOKEN
JOB_ID=$1
echo "starting from $JOB_ID";

TRAVIS_JOB_UNIT_TEST_CORE=$(($JOB_ID + 1))
TRAVIS_JOB_UNIT_TEST_PROCESS_SERVICE=$(($JOB_ID + 2))
TRAVIS_JOB_UNIT_TEST_CONTENT_SERVICE=$(($JOB_ID + 3))
TRAVIS_JOB_UNIT_TEST_PROCESS_SERVICE_CLOUD=$(($JOB_ID + 4))
TRAVIS_JOB_UNIT_TEST_EXTENSIONS=$(($JOB_ID + 5))
TRAVIS_JOB_UNIT_TEST_INSIGHT=$(($JOB_ID + 6))
TRAVIS_JOB_UNIT_TEST_DEMO_SHELL=$(($JOB_ID + 7))

#cancel unit test
./scripts/travis-cancel-job.sh $TRAVIS_JOB_UNIT_TEST_CORE
./scripts/travis-cancel-job.sh $TRAVIS_JOB_UNIT_TEST_PROCESS_SERVICE
./scripts/travis-cancel-job.sh $TRAVIS_JOB_UNIT_TEST_CONTENT_SERVICE
./scripts/travis-cancel-job.sh $TRAVIS_JOB_UNIT_TEST_EXTENSIONS
./scripts/travis-cancel-job.sh $TRAVIS_JOB_UNIT_TEST_INSIGHT
./scripts/travis-cancel-job.sh $TRAVIS_JOB_UNIT_TEST_DEMO_SHELL

TRAVIS_JOB_E2E_TEST_CORE=$(($JOB_ID + 8))
TRAVIS_JOB_E2E_TEST_PROCESS_SERVICE_CLOUD=$(($JOB_ID + 9))
TRAVIS_JOB_E2E_TEST_PROCESS_SERVICE=$(($JOB_ID + 10))
TRAVIS_JOB_E2E_TEST_CONTENT_SERVICE=$(($JOB_ID + 11))
TRAVIS_JOB_E2E_TEST_INSIGHT=$(($JOB_ID + 12))

#cancel e2e test
./scripts/travis-cancel-job.sh $TRAVIS_JOB_E2E_TEST_CORE
./scripts/travis-cancel-job.sh $TRAVIS_JOB_E2E_TEST_PROCESS_SERVICE
./scripts/travis-cancel-job.sh $TRAVIS_JOB_E2E_TEST_CONTENT_SERVICE
./scripts/travis-cancel-job.sh $TRAVIS_JOB_E2E_TEST_INSIGHT
