---
id: tap-unity-faq
title: TapSDK Unity FAQ
sidebar_label: Unity
---

## 按步骤导入SDK后，脚本无法挂载
1. 确认[.amsdef文件的配置](/sdk/tap-unity#6-添加sdk引用)。缺少'Editor'会出现这个情况
2. 脚本目录下有脚本出现语法错误

## The type or namespace name 'TapSDK' could not be found
不需要手动引入命名空间using TapSDK;直接使用就可以，详情参考[快速开始](/sdk/tap-unity#7-初始化)的用法

## 打开动态页面出现视频声音跟游戏声音重合
请在`openTapMoment`调用时，主动屏蔽游戏声音

## 点击动态后小红点未消失
OpenMoment后会刷新动态，小红点逻辑需要游戏手动根据GetNoticeData来改变
