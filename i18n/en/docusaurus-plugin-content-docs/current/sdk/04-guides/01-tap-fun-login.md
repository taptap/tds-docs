---
id: tap-fun-login
title: Login
sidebar_label: Login
---

import MultiLang from'@theme/MultiLang';

The [Quick Start](/sdk) briefly describes [how to integrate TapTap Login to your game](/sdk#TapTap-登录). Here you can find the details about the [TapTap Login feature](/sdk/features/pro-login/) of TapSDK.

## Check the Login Status

Obtain the Access Token of the current user. If the Access Token is empty, the user is not logged in.
Before invoking the login method, check the login status first to avoids repeated logins.

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

Get basic information of the logged-in user, such as the user ID, nickname, and profile picture.

:::caution
Please only request user information when the user is logged in. If the user is not logged in, getting the user information may cause abnormality or crash of the program.
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
        NSLog(@"User information received successfully%@", userInfo);
    }
}];
```

</MultiLang>


## Login

TapSDK will first launch the TapTap application to complete the login process. When the TapTap application is not installed, it will use the built-in WebView.
Please also refer to [Login Button Design Guidelines](/design).  


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

## Log Out

Logging out will clear the user’s login cache.

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
