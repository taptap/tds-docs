---
id: tap-fun-login
title: 登录功能
sidebar_label: 登录
---


import MultiLang from '@theme/MultiLang';

本文主要介绍登录的使用方式，详细介绍请参考 [登录产品介绍](/pro/pro-login)
## 介绍
跳转 TapTap APP 登录，当没有 TapTap APP 时，会默认打开内置 webview 登录。

## 检查登录状态
可以先校验该用户是否登录过，对未登录的用户调用 login ()  

#### API

<MultiLang>

```cs
public static void GetAccessToken (Action<AccessToken, TapError> action);
```

```java
public static AccessToken getCurrentToken;
```

```objectivec
+ (AccessToken *)getCurrentToken;
```

</MultiLang>

#### 示例代码

<MultiLang>

```cs
TapBootstrap.GetAccessToken((accessToken, error) => {
   if (accessToken == null)
   {
       Debug.Log("当前未登录");
   }
   else
   {
       Debug.Log("已登录");
   }
});
```

```java
// 未登录用户会返回 null
if (TapBootstrap.getCurrentToken() == null) {
    //TODO 用户未登录
} else {
    //TODO 用户已经登录过
}
```

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
   if(accessToken == nil){
       //未登录，请登录
   }else{
       //已经登录
   }
```

</MultiLang>



## 获取用户信息
获取用户信息
#### API

<MultiLang>

```cs
public static void GetDetailUser (Action<TapUserDetail, TapError> action);
```

```java
public static void getUser(Callback<TapUser> user);
public static void getUserDetails(Callback<TapUserDetails> userDetails);
```  

```objectivec
+ (void)getUserDetails:(TapUserDetailsHandler)handler;
```

</MultiLang>

#### 示例代码

<MultiLang>

```cs
// 需要先判空，否则会崩溃
TapBootstrap.GetDetailUser((userDetail, error) => {
  Debug.Log(userDetail.ToJSON());
});
```

```java
TapBootstrap.getUser(new Callback<TapUser>() {
    @Override
    public void onSuccess(TapUser tapUser) {

    }

    @Override
    public void onFail(TapError tapError) {

    }
});

TapBootstrap.getUserDetails(new Callback<TapUserDetails>() {
    @Override
    public void onSuccess(TapUserDetails tapUserDetails) {

    }

    @Override
    public void onFail(TapError tapError) {

    }
});
```

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

</MultiLang>


## 登录
执行登录操作，优先跳转 TapTap APP 登录，当没有 TapTap APP 时，会打开内置 Webview 登录  
请仔细阅读[登录按钮设计规范](/pro/login-design.md)  

#### API

<MultiLang>
<>

```cs
public static void Login (LoginType loginType, string[] permissions);
```

**LoginType参数说明**

参数  | 描述
| ------ | ------ |
LoginType.TAPTAP | TapTap 登录

</>

<>

```java
/**
 * @param type TapTap = 0
 */
public static void login(Activity activity, @LoginType.ThirdPartyType int type, String... permissions);
``` 

**LoginType参数说明**
 
参数  | 描述
| ------ | ------ |
0 | TapTap 登录

</>

<>

```objectivec
+ (void)login:(TapBootstrapLoginType)type permissions:(NSArray *_Nullable)permissions;
```

**LoginType参数说明**
 
参数  | 描述
| ------ | ------ |
TapBootstrapLoginTypeTapTap | TapTap 登录

</>
</MultiLang>

#### 示例代码

<MultiLang>

```cs
TapConfig config = new TapConfig();
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

```java
// 登陆类型：固定0 表示TapTap登陆
// 本例使用TapTap登陆
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP);
```

```objectivec  
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

</MultiLang>

## 登出
退出登录，清除用户登录缓存记录  
#### API

<MultiLang>

```cs
public static void Logout()
```

```java
public static void logout();
```

```objectivec
+ (void)logout;
```

</MultiLang>

#### 示例代码

<MultiLang>

```cs
TapBootstrap.Logout();
```

```java
TapBootstrap.logout();
```

```objectivec
[TapBootstrap logout];
```

</MultiLang>