#!/bin/sh

source .ci/consts.sh

# 移除 TDS 文档
rm -rf ${DIFF_FILES}

# 移动 TDS HK 文档
mv tds_hk/* .

# 构建
yarn build --out-dir build-hk

# 重置到初始状态
# git clean -df
# git checkout -f
