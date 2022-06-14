#!/bin/sh

set -e

mkdir tmp
cp -r docs/sdk/_partials docs/sdk/domain docs/sdk/engine docs/sdk/storage/_partials tmp
cp -r docs/sdk/storage/dotnet-guide/_category_.json docs/sdk/storage/dotnet-guide/setup-dotnet.mdx tmp
cp -r docs/sdk/storage/java-guide/_category_.json docs/sdk/storage/java-guide/setup-java.mdx tmp
cp -r docs/sdk/storage/objc-guide/_category_.json docs/sdk/storage/objc-guide/setup-objc.mdx tmp
rm -rf docs i18n src/constants/env.ts src/styles/override.scss versioned_docs versioned_sidebars docusaurus.config.js sidebars.js versions.json
cp .ci/leancloud/env.ts src/constants/env.ts
cp .ci/leancloud/override.scss src/styles/override.scss
cp .ci/leancloud/docusaurus.config.js docusaurus.config.js
cp .ci/leancloud/sidebars.js sidebars.js
mkdir docs
mv tmp docs/sdk

yarn build --out-dir build-leancloud

# git clean -df
# git checkout -f
