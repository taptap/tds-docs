#!/bin/sh

source .ci/consts.sh

# 备份 CN 文档
mkdir -p cn_bak
rm -rf cn_bak/*
mv ${DIFF_FILES} cn_bak

# 移动 TDS HK 文档
mv tds_hk/* .
