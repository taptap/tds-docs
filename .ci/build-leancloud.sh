#!/bin/sh

set -e

mkdir tmp
cp -r docs/sdk/_partials docs/sdk/16-engine tmp
rm -rf docs i18n src/constants/env.ts src/styles/override.scss versioned_docs versioned_sidebars docusaurus.config.js sidebars.js versions.json
cp .ci/leancloud/env.ts src/constants/env.ts
cp .ci/leancloud/override.scss src/styles/override.scss
cp .ci/leancloud/docusaurus.config.js docusaurus.config.js
cp .ci/leancloud/sidebars.js sidebars.js
mkdir docs
mv tmp docs/sdk

yarn build --out-dir build-leancloud

git clean -df
git checkout -f
