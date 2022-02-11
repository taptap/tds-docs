#!/bin/sh

set -e

rm -rf docs i18n/en src/constants/env.ts versioned_docs versioned_sidebars docusaurus.config.js sidebars.js versions.json
cp .ci/hk/env.ts src/constants/env.ts
cp .ci/hk/docusaurus.config.js docusaurus.config.js
cp .ci/hk/sidebars.js sidebars.js
mv i18n/eng i18n/en
cp -r i18n/en/docusaurus-plugin-content-docs/current docs

yarn build --out-dir build-hk

git clean -df
git checkout -f
