---
id: tap-unity-faq
title: TapSDK Unity FAQ
sidebar_label: Unity
---

## 按步骤导入SDK后，脚本无法挂载
1. 确认[.amsdef文件的配置](./tap-unity.md#4-sdk脚本引用)。缺少'Editor'会出现这个情况
2. 脚本目录下有脚本出现语法错误

## The type or namespace name 'TapSDK' could not be found
不需要手动引入命名空间using TapSDK;直接使用就可以，详情参考[快速开始](./tap-unity.md#5-初始化)的用法
