---
id: upgrade2.x
title: 2.x 升级 3.x 指南
sidebar_label: 2.x 升级 3.x
sidebar_position: 3
---

import MultiLang from '/src/docComponents/MultiLang';

因新版接口与旧版接口有明显差别，所以需将旧版接口删除，通过如下方式重新接入以便使用新版本接口。

## TapSDK 3.x 版本的导入

去除 2.x 方式导入的 SDK 相关包和文件，引入 3.x SDK，详情请参考[项目配置](/sdk/start/quickstart/#项目配置)。

## 初始化

TapSDK 3.x 的初始化方法较 TapSDK 2.x 只多了一个参数的设置，即 ServerUrl，具体初始化方式请参考[初始化参数](/sdk/start/quickstart/#初始化)。


## TapTap 登录并获取登录结果

TapSDK 2.x 获取用户信息后会得到用户唯一标识 `userID`，该唯一标识和 TapSDK 3.x 授权后得到的 `userID` 是一样的。

### TapSDK 2.x 版本登录后获取用户信息方式

获取当前登录用户的 `userID`、昵称、头像等基本信息。

<MultiLang>

```cs
TapBootstrap.GetUser((user, error) => {
    Debug.Log(user.ToJSON()); // 获取用户唯一标识 userID
});
```

```java
TapBootstrap.getUser(new Callback<TapUser>() {
    @Override
    public void onSuccess(TapUser tapUser) {
        String userID  = tapUser.userId; // 获取用户唯一标识 userID
    }

    @Override
    public void onFail(TapError tapError) {

    }
});
```

```objectivec
[TapBootstrap getUser:^(TapUser * _Nullable userInfo, NSError * _Nullable error) {
    if (error) {
        NSLog(@"获取用户信息失败 %@", error);
    } else {
        NSLog(@"获取用户信息成功 %@", userInfo); // 获取用户唯一标识 userID
    }
}];
```

</MultiLang>

### TapSDK 3.x 版本登录后获取用户信息方式

`TDSUser` 即是当前玩家的账户系统，登录成功之后开发者可以：

- 通过访问 `nickname` 属性来获得 TapTap 账户的用户名；
- 通过访问 `avatar` 属性来获得 TapTap 账户的头像；
- 通过访问 `objectId` 来得到该账户系统的 `userID`，该 `userID` 和 TapSDK 2.x 版本授权后得到的 `userID` 是一样的；该 `userID` 可用于游戏服务器内玩家与 TDS 内建账户的绑定或匹配。

<MultiLang>

```cs
try
{
    var tdsUser = await TDSUser.LoginWithTapTap();  // 通过访问 `objectId` 来得到该账户系统的 userID
    Debug.Log($"login sucess:{tdsUser}");
}
catch (Exception e)
{
    if (e is TapException tapError)  // using TapTap.Common
    {
        Debug.Log($"encounter exception:{tapError.code} message:{tapError.message}");
        if (tapError.code == TapErrorCode.ERROR_CODE_BIND_CANCEL) // 取消登录
        {
            Debug.Log("登录取消");
        }
    }
}
```

```java
TDSUser.loginWithTapTap(MainActivity.this, new Callback<TDSUser>() {
    @Override
    public void onSuccess(TDSUser resultUser) {
        Toast.makeText(MainActivity.this, "succeed to login with Taptap.", Toast.LENGTH_SHORT).show();
        // 开发者可以调用 resultUser 的方法获取更多属性。
        String userId = resultUser.getObjectId();  // 用户唯一标识 userID
        String avatar = (String) resultUser.get("avatar");  // 头像
        String nickName = (String) resultUser.get("nickname");  // 昵称
    }

    @Override
    public void onFail(TapError error) {
        Toast.makeText(MainActivity.this, error.getMessage(), Toast.LENGTH_SHORT).show();
    }
}, "public_profile");
```

```objectivec
[TDSUser loginByTapTapWithPermissions:@[@"public_profile"] callback:^(TDSUser * _Nullable user, NSError * _Nullable error) {
    if (user) {
        // 开发者可以调用 user 的方法获取更多属性。
        NSString *userId = user.objectId; // 用户唯一标识 userID
        NSString *username = user[@"nickname"];
        NSString *avatar = user[@"avatar"];
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>

