---
id: tap-fun-login
title: Sign-in
sidebar_label: Sign-in
---

import MultiLang from'@theme/MultiLang';

The [quick start](/sdk) guide briefly describes [how to integrate TapTap Sign-in to your game](/sdk#TapTap-登录). This is a detailed introduction to the [TapTap Sign-in function](/pro/pro-login/) of the TapSDK.

## Check the Sign-in Status

Try to obtain the Access Token of the current user. If the Access Token is empty, the user is not logged in.
Before invoking the loginmethod, check the sign-in status first. This avoids repeated logins.

<MultiLang>

```cs
TapBootstrap.GetAccessToken((accessToken, error) => {
   if (accessToken == null)
   {
       Debug.Log("not logged in");
   }
   else
   {
       Debug.Log("logged in");
   }
});
```

```java
if (TapBootstrap.getCurrentToken() == null) {
    // not logged in
} else {
    // logged in
}
```

```objectivec
AccessToken *accessToken = [TapBootstrap getCurrentToken];
if (accessToken == nil) {
    // not logged in
} else {
    // logged in
}
```

</MultiLang>

## Get User Information

Get basic information of the currently logged-in user, such as the user ID, nickname, and avatar.

:::caution
Please only get user information when the user is logged in. If the user is not logged in, getting the user information regardless may cause abnormal behavior or program crash.
:::

<MultiLang>

```cs
TapBootstrap.GetUser((user, error) => {
    Debug.Log(user.ToJSON());
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
```

```objectivec
[TapBootstrap getUser:^(TapUser * _Nullable userInfo, NSError * _Nullable error) {
    if (error) {
        NSLog(@"Failed to get user information%@", error);
    } else {
        NSLog(@"Get user information successfully%@", userInfo);
    }
}];
```

</MultiLang>


## Sign-in

TapSDK will first try to utilize the TapTap application to complete the sign-in process. When the TapTap application is not installed, it will use the built-in WebView.
Please also check the [login button design guidelines](/pro/login-design.md).  


<MultiLang>

```cs
LoginType loginType = LoginType.TAPTAP;
TapBootstrap.Login(loginType, new string[] { "public_profile" });
```

```java
TapBootstrap.login(MainActivity.this, LoginType.TAPTAP, "public_profile");
```

```objectivec  
TapBootstrapLoginType loginType = TapBootstrapLoginTypeTapTap;
[TapBootstrap login:(loginType) permissions:@[@"public_profile"]];
```

</MultiLang>

In the above code sample, the login type is a fixed value (TapTap login), and the permission is also a fixed value (`public_profile`).

## Sign Out

Signing out the user will clear the login cache.

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