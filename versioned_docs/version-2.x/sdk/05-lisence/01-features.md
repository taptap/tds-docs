---
id: features
title: 功能介绍
sidebar_label: 功能介绍
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## 业务介绍
TapTap 的正版验证服务适用于付费下载的游戏，当玩家在使用付费游戏时，校验玩家是否已经成功购买付费游戏。

## 开启正版验证

请确认在 TapTap 开发者中心的游戏服务中，已经完成了申请开启正版验证服务的操作。

<img src={useBaseUrl('/img/license_introduce1.png')} alt="" width="1000" />

## 售卖设置

TapTap 的正版验证服需与付费游戏的售卖设置配合使用。TapTap 为开发者和玩家提供游戏付费下载的服务，并支持多种支付渠道。开发者可在 [TapTap 开发者中心](https://developer.taptap.com/)的售卖设置中，开启付费下载的服务，并设定游戏价格。如游戏有折扣活动，可以开启折扣功能并设定折扣时间与折扣价格。

<img src={useBaseUrl('/img/license_introduce2.png')} alt="" width="1000" />

## 集成正版验证 SDK

游戏集成正版验证 SDK 后，当用户启动游戏时，SDK 会查询校验其购买结果。如已购买，则可正常进入游戏。如查询到未购买，则会提示用户进行购买。可参考[“开发流程”](/sdk/lisence/guide)进行集成。