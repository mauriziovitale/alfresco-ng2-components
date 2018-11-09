#!/usr/bin/env bash

affected="$(./scripts/affected-libs.sh -b "$TRAVIS_BRANCH")"
libs=(`echo $affected | sed 's/^$/\n/g'`)

#core
for i in "${libs[@]}"
do
    if [ "$i" == "core" ] ; then
        #compile everythings
        exit 0
    fi
done

#process-services-cloud
for i in "${libs[@]}"
do
    if [ "$i" == "process-services-cloud$" ] ; then
        ./scripts/build-process-services-cloud.sh
    fi
done

#content-services
for i in "${libs[@]}"
do
    if [ "$i" == "content-services$" ] ; then
        echo "content"
        ./scripts/build-content-services.sh
    fi
done

#process-services
for i in "${libs[@]}"
do
    if [ "$i" == "process-services$" ] ; then
        echo "process-services"
        ./scripts/build-process-services-cloud.sh
    fi
done
