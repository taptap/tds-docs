#!/bin/sh

set -e

rm -rf docs/ad-apply docs/community docs/sdk/anti-addiction docs/sdk/domain docs/sdk/engine/dedicated-IP.mdx docs/sdk/engine/deep-dive.mdx docs/sdk/multiplayer docs/sdk/push/guide/android-mixpush.mdx docs/sdk/start/agreement.mdx docs/sdk/tap-canary docs/sdk/tap-play docs/sdk/taptap-login/guide/upgrade1.x.mdx docs/sdk/taptap-login/guide/upgrade2.x.mdx docs/store
rm -rf i18n/en/docusaurus-plugin-content-docs/current/store
cp -r .ci/hk/zh-Hans/operations docs/operations
cp -r .ci/hk/zh-Hans/store docs/store
cp .ci/hk/zh-Hans/sdk/push/guide/android-mixpush.mdx docs/sdk/push/guide/android-mixpush.mdx
cp -r .ci/hk/en/operations i18n/en/docusaurus-plugin-content-docs/current/operations
cp -r .ci/hk/en/store i18n/en/docusaurus-plugin-content-docs/current/store

rm -rf src/constants/env.ts  docusaurus.config.js sidebars.js
cp .ci/hk/env.ts src/constants/env.ts
cp .ci/hk/docusaurus.config.js docusaurus.config.js
cp .ci/hk/sidebars.js sidebars.js

rm -rf versioned_docs versioned_sidebars versions.json

yarn build --out-dir build-hk

git clean -df
git checkout -f
