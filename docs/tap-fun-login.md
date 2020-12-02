---
id: tap-fun-login
title: 登录功能
sidebar_label: 登录
---
## 介绍
跳转TapTap APP登录，当没有TapTap APP时，会默认打开内置webview登录

## 功能开启
**API**  
TapSDK.enableTapLogin(LoginSdkConfig)  
**`LoginSdkConfig为可配置项，非必须`**详细参数说明参考[登陆配置](#登录配置)

**示例代码**


```
    //不开启TapDB统计功能
    LoginSdkConfig config = new LoginSdkConfig();
    config.roundCorner = false;
    config.regionType = RegionType.IO;//标识为国际版，从2.5版本才开始支持
    TapSDK.enableTapLogin(getApplicationContext(), "client id", config);
```

```
    //开启TapDB统计功能
    LoginSdkConfig config = new LoginSdkConfig();
    config.roundCorner = false;
    config.openTapDB = true;
    config.channel = "default";
    config.gameVersion = "v1.0.0";
    config.regionType = RegionType.CN;//标识为国内版，从2.5版本才开始支持

    TapSDK.enableTapLogin(getApplicationContext(), "client id", config,true);
```

## 登录配置

**LoginSdkConfig 参数说明**  
**`openTapDB 参数注意：设置为true的前提是游戏集成了TapDB,否则无效；`**

| 参数      |  类型    |    说明   |必须            | 默认  |
| :--------| :--------| :-------- | :--------  | :--     |
| roundCorner |bool| 网页登录时边框是否使用圆角| 否 | true |
|openTapDB|bool|在游戏里集成了TapDB的前提下，是否开启TapDB的统计功能；如没有集成TapDB,此值设置为true无效|否 | false |
| channel |string| 标识游戏安装包的渠道，长度大于0并小于等于256,当开启TapDB的统计功能即openTapDB为true时赋值，可作为控制后台的过滤条件| 否 | null |
| gameVersion |string| 游戏版本，长度大于0并小于等于256。当开启TapDB的统计功能即openTapDB为true时赋值，为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName）| 否 | null|
| regionType |enum| 枚举类型，是国内版(RegionType.CN)还是国际版(RegionType.IO)，从而呼起对应的TapTap版本（国内还是国际）| 否 | RegionType.CN|
