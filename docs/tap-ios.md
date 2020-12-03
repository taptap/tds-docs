---
id: tap-ios
title: TapSDK iOS快速开始
sidebar_label: iOS快速开始
---

## 1. 登录TapTap开发者中心
请登录 [TapTap开发者中心](#) 来创建应用或注册为开发者。

## 2. 下载 TapTap 应用
[点击下载](#) TapTap 应用

## 3. 环境配置
- 最低支持到iOS 9.0  

## 4. 工程导入
### 方式一、自动导入(推荐pod集成)  

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
```

### 方式二、手动导入
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

## 6. 初始化
TapSDK.init();
## 4. 功能开启
TapSDK.enableLogin();  
TapSDK.enableMoment();  
TapSDK.enableDB();  
## 5. 注册回调
TapSDK.registerTapSDKCallback();
## 6. 开始使用
LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);

## 7. simple code
从[这里](#)可以下载到快速开始Demo
## 8. API功能参考
