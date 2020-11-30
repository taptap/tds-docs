---
id: tap-unity2ios
title: unity打包Xcode项目
sidebar_label: Unity2iOS
---

## 1. 工程导出并打开

1.用Unity导出Xcode工程并打开
![](http://qnblog.ijemy.com/xd_unity_ios_release.png)
2.保存的文件点击'Unity-iPhone.xcodeproj'打开xcode工程

## 2. 导入SDK文件

1. [获取SDK资源文件](#)
2. 将SDK目录下resoure文件添加到Xcode的"Copy Bundle Resources"中，可直接拖拽
![](http://qnblog.ijemy.com/xd_ios_import.png)

**resources是心动SDK需要或依赖的资源文件，需要保证所有文件都被添加到了Xcode的“Copy Bundle Resources”中**


## 3. 添加系统依赖库
如果下列库文件不存在"Frameworks"目录时，可以手动添加。

```
libz.tbd
libsqlite3.0.tbd
libicucore.tbd
Security.framework
CFNetwork.framework
UIKit.framework
QuartzCore.framework
Foundation.framework
CoreGraphics.Framework
CoreTelephony.framework
SystemConfiguration.framework
libiconv.tbd
libc++.tbd
AuthenticationServices.framework
```  
![](http://qnblog.ijemy.com/xd_ios_import_01.png)


## 4. 设置URLTypes

多平台验证登陆时需要在Xcode中设置多个URL Types，URL Types主要是需要设置URL Schemes，其它选项可任意填写。按照下面表格的内容填写，注意替换其中的各项AppID。

URL Schemes | 用途 |示例 |备注
---|---|---|---|
XD-{心动AppID}|用于支付宝支付后跳回|XD-ci2dos1ktzsca4f
{微信AppID}| 用于微信授权登录后跳回|wx19f231d77ac408d9
tencent{QQ AppID}|用于QQ授权登录后跳回|tencent317081|如果给到的心动AppID没有对应的QQ AppID，可以不配置该项
tt{TapTap AppID}|用户TapTap授权登录后跳回|tt123456

![](http://qnblog.ijemy.com/xd_ios_urltype.png)

## 5. 配置工程capability  

更新SDK 2.1.0之后，需要在xcode工程中添加两项capability：Associated Domains \ Sign in with apple.  



Associated Domains添加一项，格式为『applinks + 域名』如「applinks:www.xd.com」。
**域名为游戏官网地址，请联系平台方确认**   

## 6. 处理第三方应用跳回事件  

**在UnityAppController.mm中增加如下两个方法，如果已经存在这些方法，在其中追加相应的处理代码即可。请务必添加下列代码，否则将影响第三方登录的授权回调。**    

**SDK 2.1.0 新增universalLink处理**   

```
#import <XdComPlatform/XDCore.h>
```

```
- (BOOL)application:(UIApplication*)application openURL:(NSURL*)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation{

	...
	...
    ...
   return [XDCore HandleXDOpenURL:url];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options{

    return [XDCore HandleXDOpenURL:url];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
    return [XDCore handleOpenUniversalLink:userActivity];
}
```

## 7. Buid Settings  

Enable Bitcode = NO  

在编译选项‘Other Linker Flags’中加入「-ObjC」和 「-all_load」。

**Swift Language Version 设置为 Swift 5**  

**BuildSetting中,Always Embed Swift Standard Libraries设置为YES**  

**完成以上配置即可进行编译打包。**  

## FAQ  

- "_registerHandler", referenced from error
	![](http://qnblog.ijemy.com/xd_ios_build_error_01.png)
	是因为unity工程引入了[Common脚本](#)，build为iOS工程后需要依赖TDSCommon.framework，您可以从[这里](#)下载并导入

- linker command failed with exit code 1  
	需要按照[第三步](# "3. 添加系统依赖库")的方式添加XDSDK依赖的包

- does not contain bitcode. You must rebuild it with bitcode enabled
	找到Targets-->Build Setting-->Build Options-->Enable Bitcode , 设置 Enable Bitcode = NO

如遇问题，请联系TapTap技术支持：tapts@xd.com
