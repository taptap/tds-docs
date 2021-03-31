---
id: unity-tapbootstrap
title: TapBootstrap
---
## method
### Init
初始化 SDK

#### API

```cs
public TapConfig (string cliendID, bool isCn);
public static void Init (TapConfig tapConfig);
```


#### 示例代码

```cs
TapConfig tapConfig = new TapConfig("FwFdCIr6u71WQDQwQN", true);
TapBootstrap.Init(tapConfig);
```

| 字段        | 可为空 | 说明                                                           |
| --------- | --- | ------------------------------------------------------------ |
| clientId    | 否   | 开发者中心获取到的 clientId |
| isCN    | 是   | true 为国内，false 为国外，默认 true                                           |


### Login
开始登录

#### API

```cs
public static void Login (LoginType loginType, string[] permissions);
```

#### 示例代码

```cs
TapBootstrap.TapConfig config = new TapConfig();
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```


### RegisterLoginResultListener
设置登录回调

#### API

```cs
public static void RegisterLoginResultListener (ITapLoginResultListener listener);
```

#### 示例代码

```cs
TapBootstrap.RegisterLoginResultListener(new MyLoginCallback());

public class MyLoginCallback : TapBootstrap.ITapLoginResultListener {
  public void OnLoginSuccess(AccessToken accessToken)
  {
      Debug.Log("登录成功:  " + accessToken.ToJSON());
  }

  public void OnLoginError(TapError error)
  {
      Debug.Log("登录失败的error信息:  " + error.errorDescription);

  }

  public void OnLoginCancel()
  {
      Debug.Log("登录取消");
  }
}
```

### RegisterUserStatusChangedListener
设置登录回调

#### API

```cs
public static void RegisterUserStatusChangedListener (ITapUserStatusChangedListener listener);
```

#### 示例代码

```cs
TapBootstrap.RegisterUserStatusChangedListener(this);

public void OnLogout(TapError error) {
      Debug.Log("登出失败的error信息:  " + error.errorDescription);
  }

public void OnBind(TapError error) {
    Debug.Log("绑定的error信息:  " + error.errorDescription);
}
```

### GetAccessToken
获取 accessToken

#### API

```cs
public static void GetAccessToken (Action<AccessToken, TapError> action);
```

#### 示例代码

```cs
TapBootstrap.GetAccessToken((accessToken, error) => {
    if (accessToken == null)
    {
        Debug.Log("当前未登录");
    }
    else
    {
        Debug.Log("已经登录");
    }
});
```
### getUser
修改登录配置

#### API

```cs
	public static void GetUser (Action<TapUser, TapError> action);
```

#### 示例代码

```cs
TapBootstrap.GetUser((user, error) => {
    string str = user.ToJSON();
});
```

### GetDetailUser
获取登录信息

#### API

```cs
public static void GetDetailUser (Action<TapUserDetail, TapError> action);
```

#### 示例代码

```cs
TapBootstrap.GetDetailUser((userDetail, error) => {
    string str = userDetail.ToJSON();
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
TapBootstrap.Logout();
```

### SetPreferLanguage
获取 accessToken
#### API

```cs
public static void SetPreferLanguage (TapLanguage tapLanguage);
```

#### 示例代码

```cs
TapBootstrap.SetPreferLanguage(TapLanguage.ZH_HANS);
```

### Bind
修改登录配置

#### API

```cs
public static void Bind (LoginType loginType, string[] permissions);
```

#### 示例代码

```cs
TapBootstrap.TapConfig config = new TapConfig();
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Bind(loginType, new string[] { "public_profile" });
```
