---
id: tap-fun-paysdk
title: 购买激活 SDK 使用说明
sidebar_label: 购买激活
---

import {Highlight,Link,ImageLink} from '../component';

<Highlight color='#A0A0A0'>为了游戏售卖服务的 SDK ，避免 APK 流出导致盗版横行；当游戏准备在 TapTap 开放售卖时，请按照此文档操作。</Highlight>

## **防盗版利器：购买激活 SDK**

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)  

当游戏在 TapTap 开放售卖时，建议接入购买激活 SDK 。

接入后，使用 TapTap 账号购买游戏的用户，能够正常打开游戏。通过特殊渠道直接下载 APK 并安装的用户，在游戏开启时，将会看到 「**游戏未激活，请前往 TapTap 购买此游戏**」 <Highlight color='#A0A0A0'>（如下图）</Highlight>，并且无法正常开启游戏。

![游戏未激活，请前往 TapTap 购买此游戏](https://img.tapimg.com/market/images/d62dd12c9ac8f2e2b9bb236506380dfe.jpg)


![用来空行的小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

## **一、 准备工作**
### **1. 申请成为开发者**

前往开发者中心，申请成为开发者，并通过审核  

### **2. 创建游戏**

在开发者中心，创建一款游戏，并通过审核。  

### **3. 申请接入SDK**

具有<Highlight color='#00b9c8'>更新游戏</Highlight>权限的管理员或者<Highlight color='#00b9c8'>主管理员</Highlight>，前往开发者中心   >>   选择<Highlight color='#00b9c8'>SDK控制台 </Highlight>   >> 选择<Highlight color='#00b9c8'>购买激活 SDK</Highlight>   >>   选择<Highlight color='#00b9c8'>申请SDK</Highlight>，填写游戏，并提交审核。审核通过后，可以进行之后的<Highlight color='#00b9c8'>配置</Highlight>。  

### **4. 要求**  
请确保在 TapTap 进行付费下载的游戏安装包包名带有 TapTap 或 taptap 后缀。  

![用来空行的小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

---

## **二、 开始接入SDK**

### **1. 更新日志**

<center>

<table class="table table-striped">
<tr><th>更新内容</th><th>版本号</th><th>更新日志</th></tr>
<tr><td rowspan="2">2020年4月9日</td><td>TapLicense v2.6.1</td><td>修复部分用户已购买无法激活的问题</td></tr>
<tr><td>TapAnti v2.6.1</td><td>针对在<b> TapTap 开放售卖</b>的游戏，增加 TapAnti 防沉迷模块</td></tr>
<tr><td rowspan="2">2020年4月17日</td><td>TapLicense v2.6.2</td><td>增加 Unity 平台的 TapLicense 的回调</td></tr>
<tr><td>TapAnti v2.6.2</td><td>修复用户未登录并弹出登录框时，退到后台重新进入后登录框消失的问题。修复 Unity 退到后台重新进入后倒计时浮窗时间不走动的问题</td></tr>
</table>
</center>


![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

### **2. TapLicense 购买激活**

#### **2.1 修改AndroidManifest.xml**

添加如下权限：

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.REORDER_TASKS"/>
</manifest>
```

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

#### **2.2 检测授权**

<Highlight color='#A0A0A0'>为了保证授权验证长期有效，建议每次打开游戏时，都进行授权检测。</Highlight>

##### **· Unity平台**

① 点击下载按钮，下载 package 文件，并导入该 package   


<ImageLink href="https://doc-files.tapimg.com/dev/TapLicense_v2.6.2.unitypackage">
https://img.tapimg.com/market/images/a6c4670a09d7e42dd68d910cfd29865e.png
</ImageLink>



② 游戏启动时执行如下代码：

```cs
TapLicense.INSTANCE.checkLicense();
```

③ 需要授权成功的回调的话请使用如下代码（参考 Demo.cs）

```cs
TapLicense.INSTANCE.checkLicense(onLicenseSuccess);
```

④ 继承 UnityPlayerActivity 并拦截 UnityActivity 的 onActivityResult 方法  

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  TapTapLicense.onActivityResult(requestCode, resultCode, data);
}
```

⑤ 如果没有额外自定义主 Activity 的需求，可直接拷贝下面代码至 AndroidManifest 内， 即可使用 SDK 中预留的 TapTapUnityActivity。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.unity3d.player"
    xmlns:tools="http://schemas.android.com/tools">
    <application>
        <activity android:name="com.taptap.pay.sdk.library.TapTapUnityActivity"
                  android:theme="@style/UnityThemeSelector">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <meta-data android:name="unityplayer.UnityActivity" android:value="true" />
        </activity>
    </application>
</manifest>
```

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

##### **· 其他平台**

① 点击下载按钮，下载 SDK  


<ImageLink href="https://doc-files.tapimg.com/dev/TapTap_license_v2.6.2.aar">
  https://img.tapimg.com/market/images/a6c4670a09d7e42dd68d910cfd29865e.png
</ImageLink>

② 游戏Activity创建的时候调用如下代码：

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);

//需要回调的话请在check()之前添加回调
  TapTapLicense.setLicenseCallback(new LicenseCallback() {
    @Override
    public void onLicenseSuccess() {
      // 授权成功
    }
  });

 TapTapLicense.check(this);
}
```
③ 拦截 Activity 的 onActivityResult  
```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  TapTapLicense.onActivityResult(requestCode, resultCode, data);
}
```

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

### **3. TapAnti 防沉迷**

<Highlight color='#A0A0A0'>如需使用防沉迷模块，请先调授权验证，回调之后再调用防沉迷验证。</Highlight>

##### **· Unity平台**

① 点击下载按钮，下载 package，并导入该 package  


<ImageLink href="https://doc-files.tapimg.com/dev/TapAnti_v2.6.2.unitypackage">
https://img.tapimg.com/market/images/a6c4670a09d7e42dd68d910cfd29865e.png
</ImageLink>


② SDK 初始化

一般在游戏启动中调用初始化接口。(样例可参考 package 文件中的 TapDemo)

```
AntiAddiction.StandAlone.AntiAddiction.init(onAntiAddictionResult);
```
参数为接收 SDK 回调的方法，回调包括 7 种类型，具体信息如下：

<center>

<table class="table table-striped">
<tr><th>回调名称</th><th>回调时机</th><th>回调值</th></tr>
<tr><td>时长耗尽提示</td><td>当用户在线时长到达防沉迷限制时触发</td><td>1030</td></tr>
<tr><td>触发宵禁提示</td><td>当用户游戏时间进入防沉迷宵禁时间段触发</td><td>1050</td></tr>
<tr><td>信息检查通过</td><td>当配置和用户信息通过防沉迷校验时触发，此时用户可正式进入游戏</td><td>1040</td></tr>
<tr><td>付费限制</td><td>当用户触发防沉迷付费限制时，通知游戏</td><td>1025</td></tr>
<tr><td>付费无限制</td><td>用户付费行为未触发付费限制，可继续付费</td><td>1020</td></tr>
<tr><td>上传付费数据成功</td><td>游戏上传本次付费数据成功</td><td>3000</td></tr>
<tr><td>上传付费数据失败</td><td>游戏上传本次付费数据失败</td><td>3500</td></tr>
</table>
</center>

③ 游戏状态检查

在需要验证用户信息（登录）的时候调用 checkState 接口。

```cs
AntiAddiction.StandAlone.AntiAddiction.checkState();
```


④ SDK 时长统计

为了跟踪用户游戏时长，游戏需要在监听启动和停止的地方调用 SDK 的对应方法, 例如 Unity 的 OnApplicationPause 方法，代码示例如下：

```cs
void OnApplicationPause(bool pauseStatus)
{
	if (pauseStatus)
	{
		AntiAddiction.StandAlone.AntiAddiction.onStop();

           /// 在游戏暂时进入后台时，也要主动调用 Onstop，避免玩家暂时退出游戏时，仍在统计时长  

	}
	else
	{
		AntiAddiction.StandAlone.AntiAddiction.onResume();

	}
}

```

⑤ 检查付费限制

为限制用户过度消费，游戏每次付费前需调用该接口来获取当前用户消费状态，示例如下：

```cs
AntiAddiction.StandAlone.AntiAddiction.checkPayLimit(5000);
```
参数的金额单位为分，SDK 通过回调通知游戏是否可以继续付费。

⑥ 上传付费数据

用户成功付费后，游戏需要调用本接口，更新用户的付费数据。代码示例如下：

```cs
AntiAddiction.StandAlone.AntiAddiction.paySuccess(5000);
```
参数的金额单位为分，结果会通过回调通知游戏。

⑦ 获取用户类型

用户登录后。游戏可以获取当前用户的类型，示例如下：

```cs
int type = AntiAddiction.StandAlone.AntiAddiction.getUserType();
```
返回值为用户的年龄段信息，具体如下：
<table class="table table-striped">
<tr>
  <th>返回值</th>
  <th>类型</th>
</tr>
<tr>
 <td>-1</td>
 <td>未登录</td>
</tr>
<tr>
 <td>0</td>
 <td>未实名</td>
</tr>
<tr>
 <td>1</td>
 <td>8岁以下</td>
</tr>
<tr>
 <td>2</td>
 <td>8-15岁</td>
</tr>
<tr>
 <td>3</td>
 <td>16-17岁</td>
</tr>
<tr>
 <td>4</td>
 <td>18岁及以上</td>
</tr>
</table>

![用来空行的小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

#### **· 其他平台**

① 点击下载按钮，下载SDK  
**注意： AntiAddictionKit 的包名是 com.taptap.antisdk**  


<ImageLink href="https://doc-files.tapimg.com/dev/TapTap_antiLib_v2.6.2.aar">
    https://img.tapimg.com/market/images/a6c4670a09d7e42dd68d910cfd29865e.png
</ImageLink>


② SDK 配置

设置调试模式（可忽略）  

游戏通过打开调试开关,方便检测 SDK 接入的正确性。   
示例：

```java
AntiAddictionKit.setDebug(true);
```


③ SDK 初始化  

游戏接入 SDK 时，首先要调用 SDK 的初始化接口，一般在主 Activity 的 onCreate 方法中，接口声明如下：

```java
 init(Activity activity,AntiAddictionCallback protectCallBack,boolean autoTip)
```
第二个参数是游戏中防沉迷触发的回调，当用户因宵禁或时长用完时，SDK 会触发该回调。第三个参数是游戏是否展示防沉迷提示倒计时弹框，使用示例如下：

```java
AntiAddictionKit.init(this, new AntiAddictionKit.AntiAddictionCallback() {
            @Override
            public void onAntiAddictionResult(int resultCode, String msg) {
                //resultCode 共7种 具体参考下表
            }
        },true);
```
参数为接收 SDK 回调的方法，回调包括 7 种类型，具体信息如下：  

<a name="callback"></a>

<center>

<table class="table table-striped">
<tr><th>回调名称</th><th>回调时机</th><th>回调值</th></tr>
<tr><td>时长耗尽提示</td><td>当用户在线时长到达防沉迷限制时触发</td><td>1030</td></tr>
<tr><td>触发宵禁提示</td><td>当用户游戏时间进入防沉迷宵禁时间段触发</td><td>1050</td></tr>
<tr><td>信息检查通过</td><td>当配置和用户信息通过防沉迷校验时触发，此时用户可正式进入游戏</td><td>1040</td></tr>
<tr><td>付费限制</td><td>当用户触发防沉迷付费限制时，通知游戏</td><td>1025</td></tr>
<tr><td>付费无限制</td><td>用户付费行为未触发付费限制，可继续付费</td><td>1020</td></tr>
<tr><td>上传付费数据成功</td><td>游戏上传本次付费数据成功</td><td>3000</td></tr>
<tr><td>上传付费数据失败</td><td>游戏上传本次付费数据失败</td><td>3500</td></tr>
</table>
</center>


④ 游戏状态检查

为对当前游戏的用户信息、客户端版本等信息进行校验，游戏需要调用 checkState 方法(可以看作是登录接口)。  
示例如下：  

```java
AntiAddictionKit.checkState();
```


⑤ SDK 时长统计

为了跟踪用户游戏时长，游戏需要在项目的主 Activity 中的 onResume 和 onStop 方法 或 其他监听游戏启动和停止的地方调用 SDK 的对应方法，代码示例如下：

```java
@Override
  protected void onResume() {
      super.onResume();
      AntiAddictionKit.onResume();
  }

  @Override
  protected void onStop() {
      super.onStop();
      AntiAddictionKit.onStop();
  }
```

⑥ 付费检查
为了限制用户过度消费，游戏需要在付费前调用该接口检查用户是否可以付费，代码示例如下：

```java
 AntiAddictionKit.checkPayLimit(50*100);
```
参数的金额单位为分，结果会通过回调通知游戏。当游戏收到付费无限制回调时，可继续本次付费。

⑦ 上传付费数据
用户成功付费后，游戏需要调用本接口，更新用户的付费数据。代码示例如下：

```java
AntiAddictionKit.paySuccess(50*100);
```
参数的金额单位为分，结果会通过回调通知游戏。

⑧  获取用户类型
用户登录后，游戏可以获取当前用户的类型，示例如下：

```java
 int type = AntiAddictionKit.getUserType();
```
返回值为用户的年龄段信息，具体如下：
<table class="table table-striped">
<tr>
  <th>返回值</th>
  <th>类型</th>
</tr>
<tr>
 <td>-1</td>
 <td>未登录</td>
</tr>
<tr>
 <td>0</td>
 <td>未实名</td>
</tr>
<tr>
 <td>1</td>
 <td>8岁以下</td>
</tr>
<tr>
 <td>2</td>
 <td>8-15岁</td>
</tr>
<tr>
 <td>3</td>
 <td>16-17岁</td>
</tr>
<tr>
 <td>4</td>
 <td>18岁及以上</td>
</tr>
</table>

![小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

---

## **三、 测试**

为了保证上线后，游戏对于用户是否购买的判断能够正常生效，**请务必按照以下说明完成自测。**

### **1. 上传APK**

上传需要测试的APK至开发者中心，并通过审核。

### **2. 配置SDK**

前往开发者中心   >>   选择<Highlight color='#00b9c8'>SDK控制台 </Highlight>   >>   选择<Highlight color='#00b9c8'>购买激活SDK</Highlight>   >>   选择相应的游戏的<Highlight color='#00b9c8'>配置</Highlight>   >>   填写测试用户的 TapTap ID 。

或者，前往开发者中心   >>   选择已经开放售卖的游戏 >>   选择<Highlight color='#00b9c8'>购买激活SDK设置</Highlight>   >>   填写测试用户的 TapTap ID 。

### **3. 开始测试**

点击下载按钮，下载自测用例。在 TapTap 客户端使用已填写的测试用户账号登录。如需测试防沉迷效果，可使用测试用户账号，在<Highlight color='#00b9c8'>个人中心 </Highlight> >> <Highlight color='#00b9c8'>编辑资料</Highlight>，修改生日后测试。  

<ImageLink href="https://doc-files.tapimg.com/dev/%E8%B4%AD%E4%B9%B0%E6%BF%80%E6%B4%BBSDK%E8%87%AA%E6%B5%8B%E5%86%85%E5%AE%B9.xls">
  https://img.tapimg.com/market/images/a6c4670a09d7e42dd68d910cfd29865e.png
</ImageLink>

![用来空行的小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

---

## **四、 正式开始售卖**

### **1. 完善应用信息**

前往开发者中心，按照[物料要求](/store/store-material)填写应用信息，并审核通过。

### **2. 设置售卖价格**

前往开发者中心 >> <Highlight color='#00b9c8'>售卖设置</Highlight> ，开启售卖开关，设置游戏售卖金额，提交审核，并同步对接的 TapTap 运营相关信息。

### **3. 正式上线**

所有流程都确保顺利后，游戏可[正式上线](/store/store-release)。
![用来空行的小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

---

## **五、 常见问题**

### **1.关于Android 11 无法拉起TapTap 客户端的解决方案** ###

Android 11 加强了隐私保护策略，引入了大量变更和限制，其中一个重要变更 —— [软件包可见性](https://developer.android.com/about/versions/11/privacy/package-visibility) ，将会导致第三方应用无法拉起 TapTap 客户端，从而影响TapTap 相关功能的正常使用 ，包括但不限于更新唤起 TapTap 、购买验证等功能。
特别需要注意的是，Android 11 的该变更只会影响到升级` targetSdkVersion=30 `的应用，未升级的应用暂不受影响。

**方案一：**

编译时将` targetSdkVersion` 改为29（目前=30会触发该问题）

**方案二：**

步骤一：将gradle build tools 改为4.1.0+
```java
classpath 'com.android.tools.build:gradle:4.1.0'
```

步骤二：在AndroidManifest.xml 里添加如下内容
```xml
<queries>
    <package android:name="com.taptap" />
    <package android:name="com.taptap.pad" />
    <package android:name="com.taptap.global" />
  </queries>
```

### **2. 游戏接完 SDK 后，跳转到 TapTap 时，提示页面不存在**

请确保游戏页面通过审核且上架，并且 APK 包名和提交至开发者中心的包名一致。

### **3. 游戏没有收到防沉迷回调**

建议在调用 `checkState` 前打个 log ，确认是否能够调用到。

### **4. 游戏时长统计不准确**

确定 `onStop` 和 `onResume` 是否正确调用。

### **5.第一次打开游戏时，出现两个弹窗叠加**

请在正版校验成功后的回调中调用防沉迷检查接口 `checkState`。

### **6. 游戏不支持 aar 方式接入怎么办？**

游戏可以将 aar 后缀改为 zip ，然后将对应文件合并到 android 项目制定目录，其中 androidManifest.xml 内容需要手动合并。

### **7. 要求**  
请确保付费下载游戏包名带有 TapTap 或 taptap 后缀，以免出现验证失败问题。  
