---
id: tap-ios
title: TapSDK iOS 快速开始
sidebar_label: iOS
---

本文主要介绍 iOS 如何将 TapSDK 快速接入并实现登录功能。


:::note
如需通过示例项目了解如何在 iOS 应用中集成 TapSDK，请参阅 GitHub 中的 [TapSDKSample](https://github.com/xindong/TapSDK_iOS)。
:::

## 1. 登录 TapTap 开发者中心
请登录 [TapTap 开发者中心](https://www.taptap.com/developer-center) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
[点击下载](https://www.taptap.com/mobile) TapTap 应用

## 3. 环境配置
- 最低支持到 iOS 10.0  
- 请在 Xcode 选择工程，到 Build Setting-->Other Linker Flags 添加 - ObjC

## 4. 工程导入
<!-- ### 方式一、自动导入 (推荐 pod 集成)  

1. 安装 CocoaPods
在终端窗口中输入如下命令（需要提前在 Mac 中安装 Ruby 环境）：
```bash
sudo gem install cocoapods
```
2. 创建 Podfile 文件  
进入项目所在路径，输入以下命令行之后项目路径下会出现一个 Podfile 文件。
```bash
pod init
```
3. 编辑 Podfile 文件  
```objectivec
target 'App' do
  pod 'TapSDK', :podspec => '../'
  end
```
4. 安装 SDk 并更新  

安装  
```objectivec
pod install
```  

&nbsp; 更新   
```objectivec
pod update
``` -->

<!-- ### 方式二、手动导入 -->
直接拖拽 [下载](https://github.com/xindong/TapSDK_iOS/releases) 的 SDK 到项目目录即可    
```
// 下载目录包含一下三个资源文件都需要导入
release/TapSDK.framework
release/TDSCommon.framework
TDSMomentResource.bundle
```

![](https://qnblog.ijemy.com/tap_ios_import2.png)


## 5. 添加系统依赖库
请仔细核对下面依赖库是否都添加成功   
```objectivec
'libc++.tbd',
'TapSDK.framework'
'WebKit.framework',
'SystemConfiguration.framework',
'AVFoundation.framework',
'Photos.framework',
'CoreTelephony.framework',
'MobileCoreServices.framework',
'AdSupport.framework',
'Security.framework',
```  

## 6. 跳转 TapTap 登录和打开多媒体
### 配置多媒体权限
`在使用到动态功能时，需要授权相册 / 相机 / 麦克风访问权限`  
打开 info.plist，添加如下配置

```objectivec
<!-- 使用到动态功能时需要配置，可替换授权文案 -->
<key>NSPhotoLibraryUsageDescription</key>
<string>App 需要你的同意，才能访问相册 </string>
<!-- 相机 -->
<key>NSCameraUsageDescription</key>
<string>App 需要你的同意，才能访问相机 </string>
<!-- 麦克风 -->
<key>NSMicrophoneUsageDescription</key>
<string>App 需要你的同意，才能访问麦克风 </string>
```

### 配置跳转 TapTap 应用
`用户无 TapTap 应用时，默认会打开 webview 登录`

1. 打开 info.plist，添加如下配置，然后请替换 clientID 为你在控制台获取的 clientID
![](https://qnblog.ijemy.com/xd_ios_info.png)
```objectivec
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLName</key>
        <string>taptap</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>tt[clientID]</string>
        </array>
    </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
   <string>tapiosdk</string>
   <string>tapsdk</string>
</array>
```

2. 根据项目中是否有 SceneDelegate.m 文件分两种情况  

a. 如果有 SceneDelegate.m，请添加如下代码到 SceneDelegate.m 文件中即可。
```objectivec
#import <TapSDK/TTSDKApplicationDelegate.h>
- (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts{
    [TapLoginHelper handleTapTapOpenURL:URLContexts.allObjects.firstObject.URL];
}
```

b. 如果没有 SceneDelegate.m，只有 AppDelegate.m，请添加如下代码到 AppDelegate.m 文件中。
```objectivec
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
   return [TapLoginHelper handleTapTapOpenURL:url];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
   return [TapLoginHelper handleTapTapOpenURL:url];
}
```
并在 AppDelegate.h 中添加 UIWindow，然后删除 info.plist 里面的 Application Scene Manifest
```objectivec
@property (strong, nonatomic) UIWindow *window;
```
![](https://qnblog.ijemy.com/xd_ios_appmanifest.png)

## 7. 初始化
TapSDK 初始化  

#### 示例代码
```objectivec
NSString *clientID = your client id;
TDSConfig *tconfig = [[TDSConfig alloc]init];
tconfig.clientId =clientID;
[TDSInitializer initWithConfig:tconfig];

/** 修改登录配置。
 此段代码可以不调用，默认配置 (RegionTypeCN 和圆角登录框)
 */
TTSDKConfig *config = [[TTSDKConfig alloc] init];
config.regionType = RegionTypeCN;// 海外为 RegionTypeIO（默认值为 RegionTypeCN）
config.roundCorner = NO;// NO 则网页登录是边框为直角（默认值为 YES）
[TapLoginHelper changeTapLoginConfig:config];

```

#### API
[initWithConfig](/api/ios-initializer.md#initwithconfig)

## 8. 注册登录回调
注册登录回调，登录结果会通过回调告知前端

#### 示例代码
```objectivec
// 注册登录回调
[TapLoginHelper registerLoginResultDelegate:self];

// 实现代理
@interface ViewController () <TDSMomentDelegate,TapLoginResultDelegate>

@end

// 实现回调方法
// 登录成功回调
// @param token token 对象
- (void)onLoginSuccess:(TTSDKAccessToken *)token{
    NSLog (@"onLoginSuccess");
}

// 登录取消
- (void)onLoginCancel{
    NSLog (@"onLoginCancel");
}

// 登录失败
// @param error 失败原因
- (void)onLoginError:(AccountGlobalError *)error{
    NSLog (@"onLoginError error");
}
```
#### API
[registerLoginCallback](/api/ios-loginhelper.md#registerlogincallback)

## 9. 登录
TapTap 登录，当没有安装 TapTap app 时，会打开内置 webview 进行 TapTap 验证登录  

#### 示例代码
```objectivec
[TapLoginHelper startTapLogin:@[@"public_profile"]];
```

#### API
[registerLoginCallback](/api/ios-loginhelper.md#starttaplogin)

## 10. 登出
:::caution
当用户退出登录的时候请务必调用此方法执行退出功能， 避免用户信息错乱。
:::
#### 示例代码
```objectivec
[TapLoginHelper logout];
```

#### API
[registerLoginCallback](/api/ios-loginhelper.md#logout)
