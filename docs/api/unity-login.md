---
id: unity-login
title: TDSLogin
---
## method
### Init
初始化 SDK

#### API

```cs

public static void Init(string clientId)

public static void Init(string clientId, bool isCN, bool isRoundCorner)
```


#### 示例代码

```cs
TapSDK.TDSLogin.Init("clientId");

TapSDK.TDSLogin.Init("clientId", true,true);
```

| 字段        | 可为空 | 说明                                                           |
| --------- | --- | ------------------------------------------------------------ |
| clientId    | 否   | 开发者中心获取到的 Client ID |
| isCN    | 是   | true 为国内，false 为国外，默认 true                                           |
| isRoundCorner | 是   | 登录框：true 为圆角，false 为直角，默认为 true                     |

### StartLogin
开始登录

#### API

```cs
public static void StartLogin(string[] permissions)
```

#### 示例代码

```cs
TapSDK.TDSLogin.StartLogin(new string[]{"public_profile"});
```


### RegisterLoginCallback
设置登录回调

#### API

```cs
public static void RegisterLoginCallback(LoginCallback callback)
```

#### 示例代码

```cs
TapSDK.TDSLogin.RegisterLoginCallback(new MyLoginCallback());
public class MyLoginCallback : TapSDK.LoginCallback{
    public void LoginSuccess(TapSDK.TDSAccessToken accessToken){
        Debug.Log("Login success");
    }

    public void LoginCancel(){
        Debug.Log("LoginCancel");
    }

    public void LoginError(TapSDK.TDSAccountError error){
        Debug.Log(error.ToString());
    }
}
```



### UnRegisterLoginCallback
设置登录回调

#### API

```cs
public static void UnRegisterLoginCallback()
```

#### 示例代码

```cs
 TapSDK.TDSLogin.UnRegisterLoginCallback();
```

### GetCurrentAccessToken
获取 accessToken

#### API

```cs
public static void GetCurrentAccessToken(Action<TDSAccessToken> callback)
```

#### 示例代码

```cs
TapSDK.TDSLogin.GetCurrentAccessToken((token)=>{
    Debug.Log(token.toJSON());
});
```

### GetCurrentProfile
获取登录信息

#### API

```cs
public static void GetCurrentProfile(Action<TDSLoginProfile> callback)
```

#### 示例代码

```cs
TapSDK.TDSLogin.GetCurrentProfile((profile)=>{
    Debug.Log(profile.toJSON());
});
```

### Logout
登出

#### API

```cs
public static void Logout()
```

#### 示例代码

```cs
TapSDK.TDSLogin.Logout();
```

### FetchProfileForCurrentAccessToken
获取 accessToken
#### API

```cs
public static void FetchProfileForCurrentAccessToken(Action<TDSLoginProfile> callback, Action<string> errorCallback)
```

#### 示例代码

```cs
TapSDK.TDSLogin.FetchProfileForCurrentAccessToken((profile)=>{          
    Debug.Log(profile.toJSON());
}, (error)=>{
     Debug.Log(error);
});
```

### ChangeConfig
修改登录配置

#### API

```cs
public static void ChangeConfig(bool isCN, bool isRoundCorner)
```

#### 示例代码

```cs
TapSDK.TDSLogin.ChangeConfig(true,true);
```
