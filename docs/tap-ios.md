---
id: tap-ios
title: TapSDK iOS快速开始
sidebar_label: iOS快速开始
---

本文主要介绍iOS如何将TapSDK快速接入并实现登录功能。TapSDK同时还包含用户数据收集和动态发布功能，详情可以参考[数据收集](./tap-fun-db)、[动态](./tap-fun-moment)文档介绍

:::note
如需通过示例项目了解如何在 iOS 应用中集成 TapSDK，请参阅 GitHub 中的 [TapSDKSample](#)。
:::

## 1. 登录TapTap开发者中心
请登录 [TapTap开发者中心](#) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
[点击下载](#) TapTap 应用

## 3. 环境要求
- 最低支持到iOS 9.0  

## 4. 工程导入
<!-- ### 方式一、自动导入(推荐pod集成)  

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
4. 安装SDk并更新  

安装  
```objectivec
pod install
```  

&nbsp;更新   
```objectivec
pod update
``` -->

<!-- ### 方式二、手动导入 -->
直接拖拽[下载](#)的SDK到项目目录即可  

![](https://qnblog.ijemy.com/xd_ios_importsdk.png)


## 5. 添加系统依赖库
请仔细核对下面依赖库是否都添加成功   
```objectivec
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

## 6. 跳转TapTap登录配置
`未做此配置或者用户无TapTap应用时，默认会打开webview登录`  
1. 打开info.plist，添加如下配置
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
            <string>ttCqBgq73t1JdHFE3Rk3</string>
        </array>
    </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
   <string>tapiosdk</string>
   <string>tapsdk</string>
</array>
```

2. 根据项目中是否有SceneDelegate.m文件分两种情况  

a. 如果有SceneDelegate.m，请添加如下代码到 SceneDelegate.m 文件中即可。
```objectivec
#import <TapSDK/TTSDKApplicationDelegate.h>
- (void)scene:(UIScene *)scene openURLContexts:(NSSet<UIOpenURLContext *> *)URLContexts{
    [[TTSDKApplicationDelegate sharedInstance] handleTapTapOpenURL:URLContexts.allObjects.firstObject.URL];
}
```

b. 如果没有SceneDelegate.m，只有AppDelegate.m，请添加如下代码到 AppDelegate.m 文件中。
```objectivec
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
   return [[TTSDKApplicationDelegate sharedInstance] handleTapTapOpenURL:url];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
   return [[TTSDKApplicationDelegate sharedInstance] handleTapTapOpenURL:url];
}
```
并在AppDelegate.h中添加UIWindow，然后删除info.plist里面的
```objectivec
@property (strong, nonatomic) UIWindow *window;
```
![](https://qnblog.ijemy.com/xd_ios_appmanifest.png)


## 7. 初始化
TapSDK初始化  

**示例代码**
```objectivec
TDSConfig *config = [[TDSConfig alloc] init];
config.clientId = @"you client id";
[TDSInitializer initWithConfig:config];
```

## 8. 登录
TapTap登录，当没有安装TapTap app时，会打开内置webview进行TapTap验证登录  

**示例代码**  
```objectivec
[[[TapLoginHelper alloc] init] startTapLogin:@[@"public_profile"] handler:^(TTSDKLoginResult *result, NSError *error) {
   if (error) {
       // 授权失败或用户拒绝授权
       NSLog([error localizedDescription]);
   } else {
       if (result.isCancelled) {
           //授权流程被取消
           NSLog(@"isCancelled");
       } else {
           // 授权成功
           NSLog(@"success");
       }
   }
}];
```
## 9. 登出
**示例代码**  
```objectivec
[[[TapLoginHelper alloc] init] logout];
```
