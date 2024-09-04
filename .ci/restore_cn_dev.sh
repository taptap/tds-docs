#!/bin/sh

set -e

# 移动 TDS HK 文档
mv docs i18n tds_hk/
mv src/constants/env.ts docusaurus.config.js sidebars.js tds_hk/conf/

# 还原 CN 文档
rm -rf src
mv cn_bak/* .
rm -rf cn_bak

# 预览
yarn start
