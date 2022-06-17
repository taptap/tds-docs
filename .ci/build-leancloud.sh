#!/bin/sh

set -e

mkdir tmp tmp/zh-Hans tmp/en
cp -r docs/sdk/_partials docs/sdk/domain docs/sdk/engine docs/sdk/storage tmp/zh-Hans
cp -r i18n/en/docusaurus-plugin-content-docs/current/sdk/_partials i18n/en/docusaurus-plugin-content-docs/current/sdk/storage tmp/en
rm -rf tmp/zh-Hans/storage/fulltext-search tmp/zh-Hans/storage/features.mdx tmp/zh-Hans/storage/rest.mdx tmp/zh-Hans/storage/security.mdx
rm -rf tmp/en/storage/fulltext-search tmp/en/storage/features.mdx tmp/en/storage/rest.mdx tmp/en/storage/security.mdx
rm -rf docs i18n/en/docusaurus-plugin-content-docs/current src/constants/env.ts src/styles/override.scss versioned_docs versioned_sidebars docusaurus.config.js sidebars.js versions.json
cp .ci/leancloud/env.ts src/constants/env.ts
cp .ci/leancloud/override.scss src/styles/override.scss
cp .ci/leancloud/docusaurus.config.js docusaurus.config.js
cp .ci/leancloud/sidebars.js sidebars.js
mkdir docs
mv tmp/zh-Hans docs/sdk
mkdir i18n/en/docusaurus-plugin-content-docs/current
mv tmp/en i18n/en/docusaurus-plugin-content-docs/current/sdk

yarn build --out-dir build-leancloud

# git clean -df
# git checkout -f
