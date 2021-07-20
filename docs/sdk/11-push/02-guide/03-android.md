---
id: android
title: Android 推送指南
sidebar_label: Android 推送
---


请先阅读[推送通知总览](/sdk/push/guide/overview)了解相关概念。

Android 消息推送有专门的 Demo，请见 [Android-Push-Demo](https://github.com/leancloud/android-push-demo) 项目。

## 推送流程简介

Android 的推送主要依赖客户端的 PushService 服务。PushService 是一个独立于应用程序的进程，在应用程序第一次启动时顺带创建，其后则（尽量）一直存活于后台，它主要负责维持与云推送服务器的 WebSocket 长链接。
所以，只要 PushService 存活，那么推送服务器上有任何需要下发到当前设备的消息，都会立刻推送下来；如果 PushService 被杀死，那推送通道中断，Android 设备就收不到任何推送消息（混合推送除外，后述会有说明）。PushService 第一次启动，建立起与推送服务器的 WebSocket 长链接之后，也会一次性收到多条服务端缓存的未成功下发的历史消息。

## 接入推送服务

要接入推送服务，需要依赖 realtime-android library。首先打开 `app` 目录下的 `build.gradle` 进行如下配置：

```groovy
dependencies {

implementation 'cn.leancloud:realtime-android:8.0.1'
implementation 'io.reactivex.rxjava2:rxandroid:2.1.0'

}
```

然后新建一个 Java Class ，名字叫做 **MyLeanCloudApp**，让它继承自 **Application** 类，实例代码如下:

```java
public class MyLeanCloudApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // 初始化参数依次为 this, AppId, AppKey
        LeanCloud.initialize(this, "{{appid}}", "{{appkey}}", "https://please-replace-with-your-customized.domain.com");
    }
}
```

### 配置 AndroidManifest

请确保你的 `AndroidManifest.xml` 的 `<application>` 中包含如下内容：

```xml
<service android:name="cn.leancloud.push.PushService" />
```

同时设置了必要的权限：

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

为了让应用能在关闭的情况下也可以收到推送，你需要在 `<application>` 中加入：

```xml
<receiver android:name="cn.leancloud.push.LCBroadcastReceiver">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
        <action android:name="android.intent.action.USER_PRESENT" />
        <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
    </intent-filter>
</receiver>
```

#### 推送唤醒

如果希望支持应用间的推送唤醒机制，即在同一设备上有两个使用了云推送的应用，应用 A 被杀掉后，当应用 B 被唤醒时可以同时唤醒应用 A 的推送，可以这样配置：

```xml
<service android:name="cn.leancloud.push.PushService" android:exported="true"/>
```

#### 完整的 `AndroidManifest.xml`

完整的 `AndroidManifest.xml` 文件配置示意如下：

```xml
<!-- 基本模块（必须）START -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!-- 基本模块 END -->

<application
  android:icon="@drawable/notification"
  android:theme="@android:style/Theme.Holo.Light"
  android:label="@string/app_name"
  android:name=".MyLeanCloudApp" >

  <!-- 即时通讯和推送 START -->
  <!-- 即时通讯和推送都需要 PushService -->
  <service android:name="cn.leancloud.push.PushService"/>
  <receiver android:name="cn.leancloud.push.LCBroadcastReceiver">
    <intent-filter>
      <action android:name="android.intent.action.BOOT_COMPLETED"/>
      <action android:name="android.intent.action.USER_PRESENT"/>
      <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
    </intent-filter>
  </receiver>
  <!-- 即时通讯和推送 END -->

  <!-- 用户反馈 START -->
  <activity
     android:name="cn.leancloud.feedback.ThreadActivity" >
  </activity>
  <!-- 用户反馈 END -->
```


### 保存 Installation

当应用在用户设备上安装好以后，如果要使用推送功能，SDK 会自动生成一个 Installation 对象。该对象本质上是应用在设备上生成的安装信息，需要首先将它保存到云端设备才能收到推送：

```java
LCInstallation.getCurrentInstallation().saveInBackground();
```

**这段代码应该在应用启动的时候调用一次**，保证设备注册到云端。你可以监听调用回调，获取 installationId 做数据关联。

```java
LCInstallation.getCurrentInstallation().saveInBackground().subscribe(new Observer<LCObject>() {
    @Override
    public void onSubscribe(Disposable d) {
    }
    @Override
    public void onNext(LCObject avObject) {
        // 关联 installationId 到用户表等操作。
        String installationId = LCInstallation.getCurrentInstallation().getInstallationId();
        System.out.println("保存成功：" + installationId );
    }
    @Override
    public void onError(Throwable e) {
        System.out.println("保存失败，错误信息：" + e.getMessage());
    }
    @Override
    public void onComplete() {
    }
});
```

### 启动推送服务

通过调用以下代码启动推送服务，同时设置默认打开的 Activity。

```java
// 设置默认打开的 Activity
PushService.setDefaultPushCallback(this, PushDemo.class);
```

### 订阅频道

你的应用可以订阅某个频道（channel）的消息，只要在保存 Installation 之前调用 `PushService.subscribe` 方法：

```java
// 订阅频道，当该频道消息到来的时候，打开对应的 Activity
// 参数依次为：当前的 context、频道名称、回调对象的类
PushService.subscribe(this, "public", PushDemo.class);
PushService.subscribe(this, "private", Callback1.class);
PushService.subscribe(this, "protected", Callback2.class);
```

注意：

- **频道名称只能包含大小写英文字母、数字、下划线（`_`）、连字符（`-`）、等号（`=`）、汉字（中日韩统一表意文字）。**
- 回调对象指用户点击通知栏的通知进入的 Activity 页面。

退订频道也很简单：

```java
PushService.unsubscribe(context, "protected");
//退订之后需要重新保存 Installation
LCInstallation.getCurrentInstallation().saveInBackground();
```

### Android 8.0 推送适配

在调用 `LeanCloud.initialize` 之后，需要调用 `PushService.setDefaultChannelId(context, channelid)` 设置通知展示的默认 `channel`，否则消息无法展示。Channel ID 的解释请阅读 Google 官方文档 [Creating a notification](https://developer.android.com/training/notify-user/channels.html)。

另外，我们的推送服务也支持多个推送 Channel。在客户端，开发者可以通过调用 `PushService` 的如下方法创建新的通知 Channel（也可以自己调用底层 API 创建）：

```java
public static void createNotificationChannel(Context context, String channelId, String channelName,
                                            String description, int importance,
                                            boolean enableLights, int lightColor,
                                            boolean enableVibration, long[] vibrationPattern)
```

记下这里的 `channelId`，因为之后发送推送通知的时候，我们还需要用到它。在发送推送请求的时候，通过 `_notificationChannel` 这个自定义的关键字可以选择不同的 channel 进行消息展示。

例如如下的请求会在客户端通知 id 为 “1” 的通道进行显示：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{appkey}}"        \
  -H "Content-Type: application/json" \
  -d '{
        "where": {"key" : "value"}
        "data": {
          "alert": "消息内容",
          "title": "显示在通知栏的标题",
          "_notificationChannel": "1"
        }
     }' \
  https://{{host}}/1.1/push
```

## 推送消息

**云服务控制台 > 推送 > 设置** 中默认选中了 **禁止从客户端进行消息推送**，从而避免了客户端可以不经限制的给应用内任意目标设备推送消息的可能。我们建议用户都将此限制启用。如果有需求要从客户端发推送，需要先打开这个限制。
 
### 推送给所有的设备

```java
LCPush push = new LCPush();
Map<String, Object> pushData = new HashMap<String, Object>();
pushData.put("alert","push message to android device directly");
push.setPushToAndroid(true);
push.setData(pushData);
push.sendInBackground().subscribe(new Observer<JSONObject>() {
    @Override
    public void onSubscribe(Disposable d) {
    }
    @Override
    public void onNext(JSONObject jsonObject) {
        System.out.println("推送成功" + jsonObject);
    }
    @Override
    public void onError(Throwable e) {
        System.out.println("推送失败，错误信息：" + e.getMessage());
    }
    @Override
    public void onComplete() {
    }
});
```

### 发送给特定的用户

发送给「public」频道的用户：

```java
LCQuery pushQuery = LCInstallation.getQuery();
pushQuery.whereEqualTo("channels", "public");
LCPush push = new LCPush();
push.setQuery(pushQuery);
push.setMessage("Push to channel.");
push.setPushToAndroid(true);
push.sendInBackground().subscribe(new Observer<JSONObject>() {
    @Override
    public void onSubscribe(Disposable d) {
    }
    @Override
    public void onNext(JSONObject jsonObject) {
        System.out.println("推送成功" + jsonObject);
    }
    @Override
    public void onError(Throwable e) {
        System.out.println("推送失败，错误信息：" + e.getMessage());
    }
    @Override
    public void onComplete() {
    }
});
```

发送给某个 Installation id 的用户，通常来说，你会将 LCInstallation 关联到设备的登录用户 LCUser 上作为一个属性，然后就可以通过下列代码查询 InstallationId 的方式来发送消息给特定用户，实现类似私信的功能：

```java
LCQuery pushQuery = LCInstallation.getQuery();
// 假设 THE_INSTALLATION_ID 是保存在用户表里的 installationId，
// 可以在应用启动的时候获取并保存到用户表
pushQuery.whereEqualTo("installationId", THE_INSTALLATION_ID);
LCPush.sendMessageInBackground("installationId1112",pushQuery).subscribe(new Observer() {
    @Override
    public void onSubscribe(Disposable d) {
    }
    @Override
    public void onNext(Object object) {
        System.out.println("推送成功" + object);
    }
    @Override
    public void onError(Throwable e) {
        System.out.println("推送失败，错误信息：" + e.getMessage());
    }
    @Override
    public void onComplete() {
    }
});
```

## 深入阅读：如何响应推送消息

注意，以下内容不适用于混合推送。
混合推送中，需要使用各厂商提供的机制指定特定的 activity 来响应推送消息，详见[Android 混合推送指南](/sdk/push/guide/android-mixpush)。

### 消息格式

具体的消息格式，可参考[推送 REST API 使用指南](/sdk/push/guide/rest)的《推送消息》一节。
对于 Android 设备，默认的消息内容参数支持下列属性：

```json
{
  "alert":      "消息内容",
  "title":      "显示在通知栏的标题",
  "custom-key": "由用户添加的自定义属性，custom-key 仅是举例，可随意替换",
  "silent":     false,                  // 用于控制是否关闭推送通知栏提醒，默认为 false，即不关闭通知栏提醒
  "action":     "com.your_company.push" // 在使用自定义 receiver 时必须提供
}
```
上面 silent 属性，是透传消息与通知栏消息的标志。silent 为 true，表示消息不展示在通知栏；silent 为 false，表示消息会展示在通知栏。

前面讲过，在 PushService 里面接收到推送消息之后，在转发消息之前，会判断消息是否过期，以及是否收到了重复的消息，只有非过期、非重复的消息，才会会通过发送本地通知或者广播，将事件告知应用程序。

### 通知栏消息如何响应用户点击事件

PushService 在发出通知栏消息的时候，会根据开发者调用 `PushService.setDefaultPushCallback(context, clazz)` 或者 `PushService.subscribe(context, "channel", clazz)` 设置的回调类，设置通知栏的响应类。

在回调类的 onCreate 函数中开发者则可以通过如下代码获取推送消息的具体数据：

```java
public class CallbackActivity extends Activity {
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.callback2);

        // 获取推送消息数据
        String message = this.getIntent().getStringExtra("com.avoscloud.Data");
        String channel = this.getIntent().getStringExtra("com.avoscloud.Channel");
        System.out.println("message=" + message + ", channel=" + channel);
    }
}
```

### 自定义 Receiver

如果你想推送消息，但不显示在 Android 系统的通知栏中，而是执行应用程序预定义的逻辑，你需要在你的 Android 项目中的 `AndroidManifest.xml` 中声明你自己的 Receiver：

```xml
<receiver android:name="com.avos.avoscloud.PushDemo.MyCustomReceiver" android:exported="false">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
        <action android:name="android.intent.action.USER_PRESENT" />
        <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
        <action android:name="com.avos.UPDATE_STATUS" />
    </intent-filter>
</receiver>
```

其中 `com.avos.avoscloud.PushDemo.MyCustomReceiver` 是你的 Android 的 Receiver 类。而 `<action android:name="com.avos.UPDATE_STATUS" />` 需要与 push 的 data 中指定的 `action` 相对应。

你的 Receiver 可以按照如下方式实现：

```java
public class MyCustomReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        // 获取推送消息数据
        String message = intent.getStringExtra("com.avoscloud.Data");
        String channel = intent.getStringExtra("com.avoscloud.Channel");
        System.out.println("message=" + message + ", channel=" + channel);
    }
}
```

同时，要求发送推送的请求也做相应更改，例如：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}"          \
  -H "X-LC-Key: {{appkey}}"        \
  -H "Content-Type: application/json" \
  -d '{
        "channels":[ "public"],
        "data": {
          "action": "com.avos.UPDATE_STATUS",
          "name": "LeanCloud."
        }
      }' \
  https://{{host}}/1.1/push
```

注意，如果你使用自定义的 Receiver，发送的消息必须带 action，并且其值在自定义的 Receiver 配置的 `<intent-filter>` 列表里存在，比如这里的 `'com.avos.UPDATE_STATUS'`，请使用自己的 action，尽量不要跟其他应用混淆，推荐采用域名来定义。


## 混合推送

自 Android 8.0 之后，系统权限控制越来越严，第三方推送通道的生命周期受到较大限制，同时国内主流厂商也开始推出自己独立的推送服务。因此我们提供「混合推送」的方案来提升推送到达率，具体请参考[Android 混合推送指南](/sdk/push/guide/android-mixpush)。

### 让 PushService 前台运行

对于高版本的 Android OS 系统来说，后台 Service 受到越来越严格的限制，为了尽量保证 PushService 的生命周期，让 PushSevice 成为前台 Service（foreground Service）来运行也是一个可以考虑的选择。

为了支持这一选项，从 6.4.0 版本开始，我们在 `realtime-android` library 中，给 PushService 增加了一个新的配置项，以便开发者自己选择是否让 PushService 在前台运行：

```java
/**
* 设置 PushService 以前台进程的方式运行（默认是 background service）。
* Android 前台 Service 必须要显示一个 Notification 在通知栏，详见说明：
* https://developer.android.com/guide/components/services
*
* @param enableForeground enable PushService run on foreground or not.
* @param identifier The identifier for this notification as per
* {@link NotificationManager#notify(int, Notification)
* NotificationManager.notify(int, Notification)}; must not be 0.
* @param notification The Notification to be displayed.
*/
public static void setForegroundMode(boolean enableForeground, int identifier, Notification notification);
```

PushService 默认是始终在后台运行的，如果切换到前台运行，从我们测试的结果来看，PushService 可以保持长时间不被系统杀死。设置前台运行的示例代码如下：

```java
String channelId = "cn.leancloud.simpleapp";
PushService.setDefaultChannelId(this, channelId);

NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, channelId);
Notification notification = notificationBuilder.setOngoing(true)
    .setSmallIcon(R.mipmap.ic_launcher)
    .setContentTitle("App is running in background")
    .setPriority(NotificationManager.IMPORTANCE_MIN)
    .setCategory(Notification.CATEGORY_SERVICE)
    .build();
PushService.setForegroundMode(true, 101, notification);
```
