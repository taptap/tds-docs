---
id: tap-unity-faq
title: TapSDK Unity FAQ
sidebar_label: Unity
---
## The type or namespace name 'TapSDK' could not be found
不需要手动引入命名空间 using TapSDK; 直接使用就可以，详情参考 [快速开始](/sdk#初始化) 的用法

## 打开动态页面出现视频声音跟游戏声音重合
请在 `openTapMoment` 调用时，主动屏蔽游戏声音

## 点击动态后小红点未消失
OpenMoment 后会刷新动态，小红点逻辑需要游戏手动根据 FetchNotification 来改变
