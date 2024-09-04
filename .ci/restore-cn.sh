#!/bin/sh

source .ci/consts.sh

# 移动 TDS HK 文档
mv ${DIFF_FILES} tds_hk/

# 还原 CN 文档
mv cn_bak/* .
rm -rf cn_bak
