---
title: Appsflyer
---

1. 确保你的游戏已完成与 Appsflyer 的对接，且已购买 **API 权限套餐**

2. 在 TapDB 后台创建一个广告平台为 Appsflyer 的广告，选择 media_source*（图中以 Facebook 为例）*

:::caution 注意
硬件平台及广告平台选择后不可改动
:::

![](https://static.tapdb.net/web/res/img/upload/2019/03/08/zh1.png)

3. media_source 配置

   - 后台仅显示已创建过 media_source 的数据
   - 未配置 media_source 的数据可能丢失*（如，已投放 unity 并产生数据，但未配置该 media_source，则 unity 的数据则不会被记录及显示，也不会被计算为自然量）*

4. 将生成的投放链接填入 Appsflyer 对接后台*（对接 → API 数据接口 → Push API 添加回传）*

选择或填入图中红框勾起的部分

![](https://static.tapdb.net/web/res/img/upload/2019/03/08/zh2.png)

添加后无需测试，保存即可（测试可能会显示不成功，但不影响回传）

同一游戏不同硬件平台，需在 Appsflyer 后台分别配置回传

同一游戏的回传网址是一致的，仅需在 Appsflyer 后台配置一次（分 Android 及 IOS）

5. Facebook 对接

Facebook 要在媒体平台配置（Integrated partner）中授权，数据才能回传到 TapDB 后台

![](https://static.tapdb.net/web/res/img/upload/2019/03/08/zh3.png)

点击 Terms of Service，登录正在投放的账号，授权使用
