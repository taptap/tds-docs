---
id: tap-fun-dlc
title: DLC 接入文档
sidebar_label: DLC 接入文档
---

## 一、准备工作
  1. 首先通过TapTap开发者中心—SDK控制台模块，申请SDK并通过审核
  2. SDK审核通过后，点击“配置”按钮可进行SDK配置，开发者需提交测试使用的TapTap账号ID，以便进行自测
  3. 最后在本页面仔细阅读 DLC 查询与支付 SDK  的接入流程

## 二、修改AndroidManifest.xml

**添加如下权限**

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.REORDER_TASKS"/>
</manifest>

```

## 三、检测授权

### Unity平台

1. [下载 package](https://doc-files.tapimg.com/dev/TapLicense_v2.6.3_b3.unitypackage) 并导入该 package
2. 接入代码

    **游戏启动时执行如下代码**
    ```
    TapLicense.INSTANCE.checkLicense();
    ```

   **继承 UnityPlayerActivity 并拦截 UnityActivity 的 onActivityResult 方法**
   ```java
      @Override
      protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        TapTapLicense.onActivityResult(requestCode, resultCode, data);
      }
   ```
   如果没有额外自定义主 Activity 的需求，请参照如下代码， 即可使用 SDK 中预留的 TapTapUnityActivity，此时不需要拦截 onActivityResult 方法。
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


### 其他平台
1. [下载sdk](https://doc-files.tapimg.com/dev/TapTap_license_v2.6.3_b3.aar)

2. 接入代码

    **游戏Activity创建的时候调用如下代码**
    ```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      TapTapLicense.check(this);
    }
    ```

   **拦截 Activity 的 onActivityResult**
   ```java
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      TapTapLicense.onActivityResult(requestCode, resultCode, data);
    }
   ```

## 四、DLC 查询和支付

### Unity平台
1. 接入代码

    **游戏启动时执行如下代码**
    ```

    TapLicense.INSTANCE.initDLCManager(this);//this 为下一步里的 callback，此方法内 checkOnce 为 false 即不读取缓存状态
    // 注：调用initDLCManager() 前必须先调用 checkLicense()
    // 可选多参数方法，其中 this 为下一步里的 callback，第二个 bool 参数表示 dlc 检查结果是否缓存（true 表示查询结果会本地缓存5天，该缓存结果和时间会被成功购买或缓存到期后查询的时间覆盖并重新计算，false 表示每次查询都不读取缓存状态，一般建议使用 false，并按需求自己处理缓存状态），第三个 String 参数是自定义的 publicKey，可为 null
    // TapLicense.INSTANCE.initDLCManager(this, false, null);
    ```

    如demo所示在你的场景下继承接口 `DLCCallBack`
    ```
    public class Demo : MonoBehaviour, DLCCallBack{

    public void onDLCQuerySuccess(List<DLCResult> resultList)
    {
        foreach (DLCResult result in resultList)
        {
            switch (result.code)
            {
                case 0:
                    //  未购买
                    Debug.Log("未购买 " + result.sku);
                    dlcstaus = 0;
                    break;
                case 1:
                    //  已经购买
                    Debug.Log("已经购买 " + result.sku);
                    dlcstaus = 1;
                    break;
                case -1:
                    //  查询失败
                    Debug.Log("查询失败" + result.sku);
                    break;
                default:
                    break;
            }
        }
    }

    public void onDLCQueryError()
    {
        //查询失败
        Debug.Log("查询失败，请重试");
    }

    public void onDLCOrder(DLCResult result)
    {
        switch (result.code)
        {
            case 0:
                //  未购买
                Debug.Log("未购买 " + result.sku);
                dlcstaus = 0;
                break;
            case 1:
                //  已经购买
                Debug.Log("已经购买 " + result.sku);
                dlcstaus = 1;
                break;
            case -1:
                //  购买取消或结果返回失败，请重新query状态
                Debug.Log("购买取消或结果返回失败，请重新query状态" + result.sku);
                break;
            default:
                break;
        }
    }
    }
    ```


   **继承 UnityPlayerActivity 并拦截 UnityActivity 的 onActivityResult 方法**
   ```java
      @Override
      protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        TapTapLicense.onActivityResult(requestCode, resultCode, data);
      }
   ```
   如果没有额外自定义主 Activity 的需求，可直接拷贝 [AndroidManifest.xml](https://doc-files.tapimg.com/dev/AndroidManifest.xml) 并放在 Assets/Plugins/Android/ 文件夹下， 即可使用 SDK 中预留的 TapTapUnityActivity。

2. 查询 DLC 购买情况（支持单个和多个查询）

    ```
    // 单个内购查询
    TapLicense.INSTANCE.queryDLC("28");
    // 多个内购查询
    TapLicense.INSTANCE.queryMultiDLC(String[]);
    ```

3. 购买 DLC

    ```
    TapLicense.INSTANCE.purchaseDLC(“18”);
    ```


### 其他平台
1. 初始化 DLC Manager

  ```java
  // 第二个 bool 参数表示 dlc 检查结果是否缓存（默认为 false），第三个 String 参数是自定义的 publicKey
  // 也可直接使用 TapTapLicense.getInstance().initDLCManager(this, callback);
    TapTapLicense.getInstance().initDLCManager(this, false, null, new OnInventoryCallback() {

      @Override
      public boolean onQueryCallBack(int code, HashMap<String, Integer> queryList) {
        switch (code) {
          case DLCManager.QUERY_RESULT_OK:
            //查询成功
            textView.setText(queryList.toString());
            break;
          case DLCManager.QUERY_RESULT_ERR:
            //查询失败
            textView.setText("查询失败");
            break;
          case DLCManager.QUERY_RESULT_NOT_INSTALL_TAPTAP:
            //sdk有相应处理，正常不需要开发者做处理
            break;
        }
        return false;
      }

      @Override
      public boolean onOrderCallBack(String sku, int status) {
        // status -1 支付出现问题，0 支付失败， 1支付成功
        textView.setText("支付结果: sku = " + sku + "result = " + status);

        return false;
      }
    });
  ```

2. 拦截 游戏activity 的 onActivityResult
  ```java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    TapTapLicense.onActivityResult(requestCode, resultCode, data);
  }
  ```

3. 查询 DLC 购买状态(支持单个和多个查询)
  ```java
  TapTapLicense.getInstance().queryPurchaseBySKU("18","19");
  ```

4. 购买 DLC
  ```java
  TapTapLicense.getInstance().purchase("18");
  ```  
## 五、常见问题

### **1.关于Android 11 无法拉起TapTap 客户端的解决方案** ###

Android 11 加强了隐私保护策略，引入了大量变更和限制，其中一个重要变更 —— [软件包可见性](https://developer.android.com/about/versions/11/privacy/package-visibility) ，将会导致第三方应用无法拉起 TapTap 客户端，从而影响TapTap 相关功能的正常使用 ，包括但不限于更新唤起 TapTap 、购买验证等功能。
特别需要注意的是，Android 11 的该变更只会影响到升级` targetSdkVersion=30 `的应用，未升级的应用暂不受影响。

**方案一：**

编译时将` targetSdkVersion` 改为29（目前=30会触发该问题）

**方案二：**

1. 将gradle build tools 改为4.1.0+
```java
classpath 'com.android.tools.build:gradle:4.1.0'
```

2. 在AndroidManifest.xml 里添加如下内容
```xml
<queries>
    <package android:name="com.taptap" />
    <package android:name="com.taptap.pad" />
    <package android:name="com.taptap.global" />
  </queries>
```
