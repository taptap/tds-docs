#!/bin/sh

set -e

rm -rf docs/community docs/design docs/sdk/achievement docs/sdk/anti-addiction docs/sdk/tap-canary docs/sdk/tap-play docs/store
rm -rf i18n/en/docusaurus-plugin-content-docs/current/store
cp -r .ci/hk/zh-Hans/store docs/store
cp -r .ci/hk/en/store i18n/en/docusaurus-plugin-content-docs/current/store

rm -rf src/constants/env.ts  docusaurus.config.js sidebars.js
cp .ci/hk/env.ts src/constants/env.ts
cp .ci/hk/docusaurus.config.js docusaurus.config.js
cp .ci/hk/sidebars.js sidebars.js

rm -rf versioned_docs versioned_sidebars versions.json

yarn build --out-dir build-hk

git clean -df
git checkout -f
