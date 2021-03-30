---
id: tap-fun-login
title: 登录功能
sidebar_label: 登录
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本文主要介绍登录的使用方式，详细介绍请参考 [登录产品介绍](/pro/pro-login)
## 介绍
跳转 TapTap APP 登录，当没有 TapTap APP 时，会默认打开内置 webview 登录。

## 检查登录状态
可以先校验该用户是否登录过，对未登录的用户调用 login ()  

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
public static AccessToken getCurrentToken;
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
+ (AccessToken *)getCurrentToken;
```
  </TabItem>

  <TabItem value="unity">

```cs
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
  // 未登录用户会返回 null
  if (TTapBootStrap.getCurrentToken() == null) {
      //TODO 用户未登录
  } else {
     //TODO 用户已经登录过
  }
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
   if(accessToken == nil){
       //未登录，请登录
   }else{
       //已经登录
   }
```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSLogin.GetCurrentAccessToken((token)=>{
  if (token != null)
  {
      // 用户已经登录
      Debug.Log(token.toJSON());
  }
  else {
      // 用户未登录
  }
});
```
  </TabItem>
</Tabs>


## 获取用户信息
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
public static void getUser(Callback<TapUser> user);
public static void getUserDetails(Callback<TapUserDetails> userDetails);
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
+ (void)getUserDetails:(TapUserDetailsHandler)handler;
```
  </TabItem>

  <TabItem value="unity">

```cs
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
TapBootStrap.getUser(new Callback<TapUser>() {
    @Override
    public void onSuccess(TapUser tapUser) {
                
    }

    @Override
    public void onFail(TapError tapError) {

    }
});

TapBootStrap.getUserDetails(new Callback<TapUserDetails>() {
    @Override
    public void onSuccess(TapUserDetails tapUserDetails) {
                
    }

    @Override
    public void onFail(TapError tapError) {

    }
});
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec
// 需要先判空，否则会崩溃
[TapBootstrap getUserDetails:^(TapUserDetails *_Nullable userDetail, NSError *_Nullable error) {
    if (error) {
        NSLog(@"获取用户信息失败 %@", error);
    } else {
        NSLog(@"获取用户信息成功 %@", userDetail.name);
    }
}];
```
  </TabItem>
  <TabItem value="unity">

```cs
// 需要先判空，否则会崩溃
TapSDK.TDSLogin.GetCurrentProfile((profile) => {
    if (profile != null) {
        Debug.Log(profile.toJSON());
    }
});
```
  </TabItem>
</Tabs>


## 登录
执行登录操作，优先跳转 TapTap APP 登录，当没有 TapTap APP 时，会打开内置 Webview 登录  

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
  /**
 * @param type like {TapTap = 0, apple = 1, guest = 2}
 */
  public static void login(Activity activity, int type, String... permissions);
  ```  
  </TabItem>

  <TabItem value="ios">

```objectivec
+ (void)login:(TapBootstrapLoginType)type permissions:(NSArray *_Nullable)permissions;
```
  </TabItem>

  <TabItem value="unity">

```cs
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
// 登陆类型：0 表示TapTap登陆, 1 表示苹果登陆, 2 表示游客登陆 
// 本例使用TapTap登陆
TapBootStrap.login(MainActivity.this, 0);
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec  
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
````
  </TabItem>
  <TabItem value="unity">

```cs
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

```cs
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
TapBootStrap.logout();
  ```
  </TabItem>

  <TabItem value="ios">

```objectivec
[TapBootstrap logout];
```
  </TabItem>
  <TabItem value="unity">

```cs
TapSDK.TDSLogin.Logout();
```
  </TabItem>
</Tabs>
