#!/bin/sh

set -e

rm -rf docs i18n/en src/constants/env.ts versioned_docs versioned_sidebars sidebars.js versions.json
cp .ci/sidebars-hk.js sidebars.js
cp .ci/env-hk.ts src/constants/env.ts
mv i18n/eng i18n/en
cp -r i18n/en/docusaurus-plugin-content-docs/current docs

REGION=global yarn build --out-dir build-hk

git clean -df
git checkout -f
