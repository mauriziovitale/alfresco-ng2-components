#!/usr/bin/env bash

libs="$(./scripts/affected-libs.sh -b "$TRAVIS_BRANCH")"

#core
for i in "${libs[@]}"
do
    if [ "$i" == "core" ] ; then
        #compile everythings
        exit 0
    fi
done

#process-services-cloud$
for i in "${libs[@]}"
do
    if [ "$i" == "process-services-cloud$" ] ; then
        echo "====== Build ======"
        ng build process-services-cloud || exit 1

        echo "====== Build style ======"
        node ./lib/config/bundle-process-services-cloud-scss.js || exit 1

        echo "====== Copy i18n ======"
        mkdir -p ./lib/dist/process-services-cloud/bundles/assets/adf-process-services-cloud/i18n
        cp -R ./lib/process-services-cloud/src/lib/i18n/* ./lib/dist/process-services-cloud/bundles/assets/adf-process-services-cloud/i18n

        echo "====== Copy assets ======"
        cp -R ./lib/process-services-cloud/src/lib/assets/* ./lib/dist/process-services-cloud/bundles/assets

        echo "====== Move to node_modules ======"
        rm -rf ./node_modules/@alfresco/adf-process-services-cloud/ && \
        mkdir -p ./node_modules/@alfresco/adf-process-services-cloud/ && \
        cp -R ./lib/dist/process-services-cloud/* ./node_modules/@alfresco/adf-process-services-cloud/
        exit 0
    fi
done

#content-services$
for i in "${libs[@]}"
do
    if [ "$i" == "content-services$" ] ; then
        echo "====== Build ======"
        npm run ng-packagr -- -p ./lib/content-services/ || exit 1

        echo "====== Build style ======"
        node ./lib/config/bundle-content-services-scss.js || exit 1

        echo "====== Copy i18n ======"
        mkdir -p ./lib/dist/content-services/bundles/assets/adf-content-services/i18n
        cp -R ./lib/content-services/i18n/* ./lib/dist/content-services/bundles/assets/adf-content-services/i18n

        echo "====== Copy assets ======"
        cp -R ./lib/content-services/assets/* ./lib/dist/content-services/bundles/assets

        echo "====== Move to node_modules ======"
        rm -rf ./node_modules/@alfresco/adf-content-services/ && \
        mkdir -p ./node_modules/@alfresco/adf-content-services/ && \
        cp -R ./lib/dist/content-services/* ./node_modules/@alfresco/adf-content-services/

        exit 0
    fi
done
