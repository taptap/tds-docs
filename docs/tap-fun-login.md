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
您可以通过LoginSdkConfig配置您的需要的登录页面、直角和是否需要开启国际化，请在登录前调用
#### API
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
  changeTapLoginConfig(TapTapSdk.LoginSdkConfig var0);
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
//TapLoginHelper
+ (void)changeTapLoginConfig:(TTSDKConfig *_Nullable)config;
```
  </TabItem>

  <TabItem value="unity">

```c#
public static void Init(string clientId, bool isCN, bool isRoundCorner)
```

  </TabItem>
</Tabs>

#### 示例代码

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
  loginSdkConfig.regionType = RegionType.CN;
  TapLoginHelper.changeTapLoginConfig(loginSdkConfig);
  ```
  </TabItem>

  <TabItem value="ios">

  ```objectivec
  TTSDKConfig *config = [[TTSDKConfig alloc] init];
  config.regionType = RegionTypeCN;// 海外为 RegionTypeIO（默认值为RegionTypeCN）
  config.roundCorner = YES;// NO 则网页登录是边框为直角（默认值为YES）
  [TapLoginHelper changeTapLoginConfig:config];
 ````
  </TabItem>
  <TabItem value="unity">

```c#
  /**
  clientId: 控制台获取的clientID
  isCN: 国内外，默认为true
  isRoundCorner: 登录框是否圆角，默认为true
  **/
  //public static void Init(string clientId, bool isCN, bool isRoundCorner)

  TapSDK.TDSCore.Init("FwFdCIr6u71WQDQwQN",true,true);
```

  </TabItem>
</Tabs>

## 登录
执行登录操作，跳转TapTap APP登录，当没有TapTap APP时，会默认打开内置webview登录  

#### API
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
  public void startTapLogin(Activity activity, String... var2);
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
+ (void)startTapLogin:(NSArray *)permissions;
```
  </TabItem>

  <TabItem value="unity">

```c#
public static void StartLogin(string[] permissions)
```

  </TabItem>
</Tabs>

#### 示例代码

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
TapLoginHelper.startTapLogin(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec  
[TapLoginHelper startTapLogin:@[@"public_profile"]];
````
  </TabItem>
  <TabItem value="unity">

```c#
TapSDK.TDSLogin.StartLogin(new string[]{"public_profile"});
```
  </TabItem>
</Tabs>


## 登出
退出登录，清除用户登录缓存记录  
#### API
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
public static void logout();
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
+ (void)logout;
```
  </TabItem>

  <TabItem value="unity">

```c#
public static void Logout();
```

  </TabItem>
</Tabs>

#### 示例代码

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
TapLoginHelper.logout();
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec
[TapLoginHelper logout];
```
  </TabItem>
  <TabItem value="unity">

```c#
TapSDK.TDSLogin.Logout();
```
  </TabItem>
</Tabs>
