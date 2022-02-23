---
id: features
title: DLC 功能介绍
sidebar_label: 功能介绍
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';


TapTap 开发者服务，支持付费的可下载内容（DLC），让玩家不离开游戏便能浏览、购买、拥有新内容。你需要在游戏内向玩家显示 DLC 的示意内容与购买按钮，所销售的商品内容由游戏决定，你也可以随意决定游戏内商品的数量，可以单独出售商品，也可以捆绑销售。每个 DLC 内容都拥有一个唯一的身份标识（商品 ID）。DLC SDK 会向玩家显示购买环节的操作。

:::note
目前，DLC 服务仅提供给付费下载的游戏。
:::

## 开通与配置

如需要使用 DLC 服务，请先联系对接的 TapTap 商务或运营进行开通。

## 更新 DLC

DLC 通常在玩家购买成功后则立即拥有。如玩家在购买过程中，取消付款或付款失败，你均会收到通知。详情请参照开发流程进行接入。

DLC 与游戏包体为绑定发布，如要新增 DLC 商品，你必须将新增的 DLC 加入到游戏包体中，并在 TapTap 商店里更新你的 APK。当玩家更新 APK 后，会在游戏内看到新增的商品。

## 售卖与退款

当游戏正式上线后，DLC 便开始售卖。为了维护玩家的体验，TapTap 给玩家提供了可以退款的功能。你可以在 [TapTap 开发者中心](https://developer.taptap.com/) 的概览中，查看 DLC 的售卖情况，包括订单数量、售卖金额、退款订单与金额等数据。

<img src={useBaseUrl('/img/dlc1.png')} alt="" width="1000" />
