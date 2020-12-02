---
id: tap-fun-login
title: 登录功能
sidebar_label: 登录
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`本文主要介绍登录相关功能和使用方式`
## 介绍
跳转TapTap APP登录，当没有TapTap APP时，会默认打开内置webview登录

## 登录设置
您可以通过LoginSdkConfig配置您的需要的登录页面是圆角还是直角，及是否需要开启国际化等

**API:** [TapTapSdk.changeTapLoginConfig](./tap-api.md#changetaploginconfig)(LoginSdkConfig)  
**`LoginSdkConfig为可配置项，非必须`**

**示例代码**

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  TapTapSdk.LoginSdkConfig loginSdkConfig = new TapTapSdk.LoginSdkConfig();
  //false：登录页面是直角，true：登录页面是圆角
  loginSdkConfig.roundCorner = false;
  //RegionType.IO标识为国际版，RegionType.CN为国内版
  loginSdkConfig.regionType = RegionType.IO;
  TapTapSdk.changeTapLoginConfig(loginSdkConfig);
  ```
  </TabItem>

  <TabItem value="ios">

  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>

## 登录
执行登录操作，跳转TapTap APP登录，当没有TapTap APP时，会默认打开内置webview登录  
**API:** [logInWithReadPermissions](./tap-api.md#loginwithreadpermissions)(Activity activity, String... var2)

**示例代码**

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
  ```
  </TabItem>

  <TabItem value="ios">

  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>


## 登出
退出登录，清除用户登录缓存记录  
**API:** [logout](./tap-api.md#logout)()  

**示例代码**

<Tabs
groupId="tap-platform"
  defaultValue="Android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'},
    {label: 'unity', value: 'unity'},
  ]}>
  <TabItem value="android">

  ```java
  LoginManager.getInstance().logout();
  ```
  </TabItem>

  <TabItem value="ios">

  </TabItem>
  <TabItem value="unity">

  </TabItem>
</Tabs>
