#!/bin/sh

set -e

mkdir tmp
cp -r docs/sdk/_partials docs/sdk/16-engine tmp
rm -rf docs i18n src/constants/env.ts versioned_docs versioned_sidebars sidebars.js versions.json
cp .ci/sidebars-leancloud.js sidebars.js
cp .ci/env-leancloud.ts src/constants/env.ts
mkdir docs
mv tmp docs/sdk

BRAND=leancloud yarn build --out-dir build-leancloud

git clean -df
git checkout -f
