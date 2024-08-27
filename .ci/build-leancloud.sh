#!/bin/sh

set -e

# 移除 TDS 文档
rm -rf docs i18n versioned_docs versioned_sidebars versions.json

# 移动 LC 文档
mv leancloud/docs .
mv leancloud/i18n .

# 替换配置文件
mv leancloud/conf/env.ts src/constants/env.ts
cp leancloud/conf/override.scss src/styles/override.scss
cp leancloud/conf/docusaurus.config.js docusaurus.config.js
cp leancloud/conf/sidebars.js sidebars.js

# 构建
yarn build --out-dir build-leancloud

# 重置到初始状态
# git clean -df
# git checkout -f
