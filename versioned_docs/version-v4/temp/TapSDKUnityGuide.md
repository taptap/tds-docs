# TapTapSDK V4 Unity 接入指南

本文介绍如何在游戏中加入`TapTapSDK` 的登录、更新唤起模块。

## package 集成

### 依赖库

SDK 修改 JSON 解析库为 `Newtonsoft-json`，如果当前工程已接入该依赖库，则不需额外处理，否则需在 `Packages/manifest.json` 添加依赖 ，同时SDK
使用 `com.google.external-dependency-manager`
管理Android、iOS依赖，如果当前工程已接入该依赖库，则不需额外处理，否则需在 `Packages/manifest.json` 添加如下依赖：

```
{
   "dependencies": {
      "com.unity.nuget.newtonsoft-json":"3.2.1",
      "com.google.external-dependency-manager": "1.2.179"
   },
   "scopedRegistries": [
      {
         "name": "package.openupm.com",
         "url": "https://package.openupm.com",
         "scopes": [
            "com.google.external-dependency-manager"
         ]
      }
  ]
}
```

### 导入UnityPackage

1. 下载 `TapSDK-UnityPackage.zip`，解压到方便的位置，然后在 Unity 项目中导入。
2. 在 Unity 项目中依次转到 **Assets > Import Packages > Custom Packages**，从解压后的 `TapSDK-UnityPackage.zip` 中，选择您希望在应用中使用的 **TapSDK**
   产品导入。
   `TapTapSDK_Core.unitypackage` ： **必选**。TapSDK 核心库
   `TapTapSDK_Login.unitypackage` ： **必选**。TapSDK 登录
   `TapTapSDK_Update.unitypackage` ： **必选**。TapSDK 更新唤起
   
### iOS 配置
为了在 iOS 设备中支持 Tap 登录跳转，游戏需在 Assets/Plugins/iOS/Resource 目录下创建 TDS-Info.plist 文件，复制以下代码并且替换其中的 ClientId。

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>taptap</key>
    <dict>
        <key>client_id</key>
        <string>ClientId</string>
    </dict>
   </dict>
</plist>
```

## 初始化

TapSDK 所有模块使用统一初始化入口，使用方式如下：

```
using TapSDK.Core;

// 添加应用配置
TapTapSDKCoreOptions coreOptions = new TapTapSDKCoreOptions
	{
        clientId = "游戏在开发者中心的 ClientId",
        clientToken = "游戏在开发者中心的 ClientToken",
        region = TapTapRegionType.CN // 区域，海外为 TapTapRegionType.Overseas
	}
	
// 初始化 SDK
TapTapSDK.Init(coreOptions);
```


### TapTap 登录

### 1. 使用 TapTap 登录

在移动端使用 Tap 登录时，如果当前设备已安装 Tap 客户端，会跳转到 Tap 客户端完成授权，否则会在游戏内使用网页登录完成授权。在 PC 中使用时，会跳转到外部浏览器打开对应登录页面完成授权。具体使用方式示例如下：

```
using TapSDK.Login;
using System.Threading.Tasks;

// 设置登录请求的权限
string[] permissions = new string[] {TapTapLogin.TAP_LOGIN_SCOPE_PUBLIC_PROFILE};

// 初始化登录请求 Task
Task<TapTapAccount> loginTask = TapTapLogin.Instance.Login(permissions);

// 发起登录请求
var loginReult = await loginTask;

// 判断登录结果
if (loginTask.IsCanceled)
{
    // 登录取消
} 
else if (loginTask.IsCompleted)
{
	// 登录成功
	Debug.Log($"登录成功  token= : {result.accessToken}");
}
else
{
    Debug.Log($"登录失败: {task.Exception.Message}");
}

```
登录请求的权限分为如下几种：

|参数名 | 对应值 | 场景|
| --- | --- | --- |
|TAP\_LOGIN\_SCOPE\_BASIC\_INFO | basic_info | 游戏只需要获取用户 openId 不需要头像、昵称等信息|
|TAP\_LOGIN\_SCOPE\_PUBLIC\_PROFILE | public_profile | 游戏需要获取用户 openId 、需要头像、昵称等完整信息|
| TAP\_LOGIN\_SCOPE\_USER\_FRIENDS | user_friends | 游戏需要获取用户好友信息 | 

登录成功后返回的 `TapTapAccount`信息如下：

|字段名 | 说明|
| --- | --- | 
| accessToken | 登录 accessToken | 
| openid | 通过用户信息和游戏信息生成的用户唯一标识，每个玩家在每个游戏中的 openid 都是唯一|
| unionid| 通过用户信息和厂商信息生成的用户唯一标识，一个玩家在同一个厂商的所有游戏中 unionid 都相同，不同厂商下 unionid 不同|
| name| 玩家在 TapTap 平台的昵称|
| avatar| 玩家在 TapTap 平台的头像 url|

其中 `openid` 和 `unionid` 使用标准的 Base64（带 Padding）编码，包含的字符有 A-Za-z0-9+/=, 最多为 50 个字符。

### 2. 获取当前登录状态

在发起登录请求前，游戏可以通过该接口判断用户是否已登录过（本地是否有登录信息），使用示例如下：

```
using TapSDK.Login;
using System.Threading.Tasks;

try {
    TapTapAccount account = await TapTapLogin.Instance.GetCurrentAccount();
    if (account == null) {
        // 用户未登录
    } else {
        // 用户已登录
    }
} catch (Exception e) {
    Debug.Log($"获取用户信息失败 {e.Message}");
}
```
### 3. 登出
当用户退出账号时，游戏需调用该接口清除本地用户登录信息，使用示例如下：

```
using TapSDK.Login;

TapTapLogin.Instance.Logout();
```

## 更新唤起

### 开始更新

开发者在判断游戏需要强更后调用该接口，如果当前设备已安装 TapTap 客户端，SDK 会跳转到客户端并引导用户完成更新；如果当前设备未安装，SDK 会引导用户下载及安装 TapTap 客户端，并在完成后引导用户更新，如果下载过程中用户选择取消，则会触发对应取消回调。具体调用示例如下：

```
using TapSDK.Update;

TapTapUpdate.UpdateGame(() => {
    // 用户取消更新
});
```