---
title: 正版验证开发指南
sidebar_label: 开发指南
sidebar_position: 2
---

import {Conditional} from '/src/docComponents/conditional';
import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';
import AndroidFaq from '../_partials/android-package-visibility.mdx';
import {Gray,Blue, Red, Black} from '/src/docComponents/doc';


## 正版验证

<Gray>为了游戏售卖服务的功能，避免 APK 流出导致盗版横行；当游戏准备在 TapTap 开放售卖时，可以接入此功能。</Gray>

在项目的 `Packages/manifest.json` 文件中添加以下依赖：

<CodeBlock className="json">
{`"dependencies":{
// 公共库
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#${sdkVersions.taptap.unity}",
// 付费购买
"com.taptap.tds.dlc": "https://github.com/TapTap/TapLicense-Unity.git#${sdkVersions.taptap.unity}",
}`}
</CodeBlock>

### 设置授权回调

<MultiLang>

```cs
// 需要引入 license 库
using TapTap.License;

// 默认情况下 SDK 会弹出不可由玩家手动取消的弹窗来避免未授权玩家进入游戏，如果需要回调来触发流程，请添加如下代码
TapLicense.SetLicencesCallback(ITapLicenseCallback callback);

public interface ITapLicenseCallback
{
    // 授权成功回调
    void OnLicenseSuccess();
}

```

```java
// 默认情况下 SDK 会弹出不可由玩家手动取消的弹窗来避免未授权玩家进入游戏，如果需要回调来触发流程，请添加如下代码
TapLicenseHelper.setLicenseCallback(new TapLicenseCallback() {
    @Override
    public void onLicenseSuccess() {
        // 授权成功回调
    }
});
```

```objc
// 暂不支持
```
</MultiLang>

### 检查付费授权

<MultiLang>

```cs
TapLicense.Check();
```

```java
TapLicenseHelper.check(Activity activity);
```

```objc
// 暂不支持
```
</MultiLang>

## 测试

为了保证上线后，游戏对于用户是否购买的判断能够正常生效，**请务必按照以下说明完成自测。**

### 上传 APK

上传需要测试的 APK 至开发者中心，并通过审核。

### 添加测试用户

前往开发者中心   >>   点击<Blue>游戏服务</Blue>   >>   点击<Blue>生态服务</Blue>   >>   点击<Blue>正版验证</Blue>   >>   填写测试用户的 TapTap ID 。

### 开始测试

在 TapTap 客户端使用已填写的测试用户账号登录。

## 正式开始售卖

### 完善应用信息

前往开发者中心，按照[物料要求](/store/store-material/)填写应用信息，并审核通过。

### 设置售卖价格

前往开发者中心 >> <Blue>售卖设置</Blue> ，开启售卖开关，设置游戏售卖金额，提交审核，并同步对接的 TapTap 运营相关信息。

### 正式上线

所有流程都确保顺利后，游戏可<Conditional region='cn'>[正式上线](/store/store-release/)</Conditional><Conditional region='global'>[正式上线](/store/store-publish-game)</Conditional>。


---

## 常见问题

### 关于 Android 11 无法拉起 TapTap 客户端的解决方案

<AndroidFaq />
