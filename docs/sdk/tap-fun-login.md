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
您可以通过LoginSdkConfig配置内置 WebView 的`直角`和`国际化`，请在登录前调用
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
  changeTapLoginConfig(TapTapSdk.LoginSdkConfig loginConfig);
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
  //RegionType.CN 标识为国内版，RegionType.IO 为国国际版
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
执行登录操作，优先跳转TapTap APP登录，当没有TapTap APP时，会打开内置 Webview 登录  

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
  public void startTapLogin(Activity activity, String... permissions);
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

## 检查登录状态
可以先校验该用户是否登录过，对未登录的用户调用login()  

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
public static AccessToken getCurrentAccessToken();
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
+ (TTSDKAccessToken *)currentAccessToken;
```
  </TabItem>

  <TabItem value="unity">

```c#
public static void GetCurrentAccessToken(Action<TDSAccessToken> callback)
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
  //未登录用户会返回null
  if (TapLoginHelper.getCurrentAccessToken() == null) {
      //TODO 用户未登录
  } else {
     //TODO 用户已经登录过
  }
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec
TTSDKAccessToken *currentAccessToken = [TapLoginHelper currentAccessToken];
if(currentAccessToken.accessToken == nil){
    //用户未登录
}else{
    //用户已登录
}
```
  </TabItem>
  <TabItem value="unity">

```c#
TapSDK.TDSLogin.GetCurrentAccessToken((token)=>{
  if (accessToken != null)
  {
      //用户已经登录
      Debug.Log(token.toJSON());
  }
  else {
      //用户未登录
  }
});
```
  </TabItem>
</Tabs>

## 获取用户登录信息
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
public static Profile getCurrentProfile();
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
+ (TTSDKProfile *)currentProfile;
```
  </TabItem>

  <TabItem value="unity">

```c#
public static void GetCurrentProfile(Action<TDSLoginProfile> callback)
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
//需要先判空，否则会崩溃
Profile profile = Profile.getCurrentProfile();
if (profile != null) {
    Log.e(TAG, profile.toString());
}
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec
//需要先判空，否则会崩溃
TTSDKProfile *currentProfile = [TapLoginHelper currentProfile];
if(currentProfile != nil){
   NSLog([currentProfile toJsonString]);
}
```
  </TabItem>
  <TabItem value="unity">

```c#
//需要先判空，否则会崩溃
TapSDK.TDSLogin.GetCurrentProfile((profile) => {
    if (profile != null) {
        Debug.Log(profile.toJSON());
    }
});
```
  </TabItem>
</Tabs>
