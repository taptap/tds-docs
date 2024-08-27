#!/bin/sh

set -e

# 移除 TDS 文档
rm -rf docs i18n versioned_docs versioned_sidebars versions.json

# 移动 TDS HK 文档
mv tds_hk/docs .
mv tds_hk/i18n .

# 替换配置文件
mv tds_hk/conf/env.ts src/constants/env.ts
mv tds_hk/conf/docusaurus.config.js docusaurus.config.js
mv tds_hk/conf/sidebars.js sidebars.js

# 构建
yarn build --out-dir build-hk

# 重置到初始状态
# git clean -df
# git checkout -f
