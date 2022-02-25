---
title: 唤起更新开发指南
sidebar_label: 开发指南
---

import MultiLang from '/src/docComponents/MultiLang';
import CodeBlock from '@theme/CodeBlock';
import sdkVersions from '/src/docComponents/sdkVersions';
import {Conditional} from '/src/docComponents/conditional';
import AndroidFaq from '../_partials/android-package-visibility.mdx';

TapTap 开发者服务为游戏和玩家提供唤起 TapTap 客户端进行游戏更新的功能。当游戏发布了新版本，且需要玩家进行更新才能体验新版本时，在游戏内绘制一个界面告知玩家，需要进行新版本更新，并且提供一个更新的按钮。玩家点击后，会跳转到 TapTap 客户端内的游戏详情页面，进行更新。

## SDK 获取

在 [下载页](/tap-download) 获得 SDK，添加 `TapCommon` 模块：

<MultiLang>

<CodeBlock className="json">
{`"dependencies":{
  ...
  "com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#${sdkVersions.taptap.unity}",
}`}
</CodeBlock>

<CodeBlock className="groovy">
{`repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
    ... 
    implementation (name:'TapCommon_${sdkVersions.taptap.android}', ext:'aar')
}`}
</CodeBlock>

<CodeBlock className="objectivec">
{`TapCommonSDK.framework`}
</CodeBlock>

</MultiLang>

## 唤起 TapTap 检查更新

:::tip
自 TapSDK 3.3.0 版本开始，针对更新功能做了逻辑优化，唤起 TapTap 客户端更新游戏失败时可以跳转到自定义网页。TapSDK 3.3.0 版本对之前的版本向下兼容。
该版本一般情况下不需要在使用以下 API 前特别检查是否安装 TapTap 客户端，自 TapSDK 3.3.0 版本开始推荐使用新接口。
:::

<MultiLang>
<>

在 TapTap 客户端更新游戏，失败时通过浏览器打开 TapTap 网站对应的游戏页面：

<Conditional region='cn'>

```cs
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapTap(string appId);
```

</Conditional>

<Conditional region='global'>

```cs
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapGlobal(string appId);
```

</Conditional>

唤起 TapTap 客户端更新游戏失败，跳转到自定义网页：

<Conditional region='cn'>

```cs
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapTap(string appId, string webUrl);
```

</Conditional>

<Conditional region='global'>

```cs
bool isSuccess = await TapCommon.UpdateGameAndFailToWebInTapGlobal(string appId, string webUrl);
```

</Conditional>

</>
<>

在 TapTap 客户端更新游戏，失败时通过浏览器打开 TapTap 网站对应的游戏页面：

<Conditional region='cn'>

```java
TapGameUtil.updateGameAndFailToWebInTapTap(context, "your app id");
```

</Conditional>

<Conditional region='global'>

```java
TapGameUtil.updateGameAndFailToWebInTapGlobal(context, "your app id");
```

</Conditional>

唤起 TapTap 客户端更新游戏失败，跳转到自定义网页：

<Conditional region='cn'>

```java
TapGameUtil.updateGameAndFailToWebInTapTap(context, "your app id", "your website url");
```

</Conditional>

<Conditional region='global'>

```java
TapGameUtil.updateGameAndFailToWebInTapGlobal(context, "your app id", "your website url");
```

</Conditional>

</>
<>

```objc
// 受限于苹果政策，iOS 平台的 TapTap 客户端不提供游戏更新功能 
```

</>
</MultiLang>

<Conditional region='cn'>

<details>
<summary>点击展开 TapSDK 3.3.0 之前的相关接口</summary>

**TapSDK 3.3.0 及之后版本不必参考这一节**，推荐使用上面「唤起 TapTap 检查更新」的 API。

**检查 TapTap 客户端是否安装**：

<MultiLang>

<>

```cs
// 适用于中国大陆
TapCommon.IsTapTapInstalled(installed =>
{
    if (installed) {
        Debug.Log("TapTap 已经安装");
    }
});

// 适用于其他国家或地区
TapCommon.IsTapTapGlobalInstalled(installed =>
{
    if (installed) {
        Debug.Log("TapTap 已经安装");
    }
});
```

</>
<>

需要导入 `TapCommon.aar` 包，接口在 TapGameUtil 中。

```java
import com.tds.common.utils.TapGameUtil;

// 适用于中国大陆
if(TapGameUtil.isTapTapInstalled(this)){
    Log.d(TAG, "已经安装 TapTap 客户端");
}
// 适用于其他国家或地区
if(TapGameUtil.isTapGlobalInstalled(this)){
    Log.d(TAG, "已经安装 TapTap 客户端");
}
```

</>
<>

需要导入`TapCommon.framework` 库文件，在 info.plist 里配置 `LSApplicationQueriesSchemes` 增加 `tapsdk` 和 `tapiosdk`。

```objc
#import <TapCommonSDK/TapCommonSDK.h>
// 适用于中国大陆
BOOL isInstalled = [TapGameUtil isTapTapInstalled];
// 适用于其他国家或地区
BOOL isInstalled = [TapGameUtil isTapGlobalInstalled];
```

</>

</MultiLang>

**唤起 TapTap 更新游戏**：

<MultiLang>

```cs
TapCommon.UpdateGameInTapTap("appid", callSuccess =>
{
    if (callSuccess) {
        Debug.Log("TapTap 唤起成功");
    }
});
```

```java
if(TapGameUtil.updateGameInTapTap(this,"appid")){
    Log.d(TAG, "唤起 TapTap 客户端成功");
}
```

```objc
// 受限于苹果政策，iOS 平台的 TapTap 客户端不提供游戏更新功能 
```

</MultiLang>

</details>

</Conditional>

## 打开游戏评论区

<MultiLang>

<>

<Conditional region='cn'>

```cs
TapCommon.OpenReviewInTapTap(appId, openSuccess =>
{
    if (openSuccess) {
        Debug.Log("打开游戏评论区成功");
    }
});
```

</Conditional>

<Conditional region='global'>

```cs
TapCommon.OpenReviewInTapGlobal(appId, openSuccess =>
{
    if (openSuccess) {
        Debug.Log("打开游戏评论区成功");
    }
});
```

</Conditional>

</>

<>

<Conditional region='cn'>

```java
if(TapGameUtil.openReviewInTapTap(this,"appid")){
    Log.d(TAG, "打开评论区成功");
}
```

</Conditional>

<Conditional region='global'>

```java
if(TapGameUtil.openReviewInTapGlobal(this,"appid")){
    Log.d(TAG, "打开评论区成功");
}
```

</Conditional>

</>

<>

```objc
// 未支持
```

</>

</MultiLang>

appid: 游戏在 TapTap 商店的唯一身份标识。
例如：<Conditional region='cn'>`https://www.taptap.com/app/187168`</Conditional><Conditional region='global'>`https://www.taptap.io/app/187168`</Conditional>，其中 `187168` 是 `appid`.

## 常见问题

### Android 11 或更高版本无法拉起 TapTap 客户端

<AndroidFaq />

### 未接入 TapSDK，如何唤起 TapTap 客户端更新游戏

受限于苹果政策，iOS 平台的 TapTap 客户端不提供游戏更新功能，以下方案仅限于 Android 平台使用。

未接入 TapSDK、使用旧版 TapSDK 难以升级的游戏，可以通过以下方案进行手动唤起 TapTap 客户端更新游戏：

根据玩家设备是否安装 TapTap 客户端来对应打开 URL:
- 如果玩家设备安装 TapTap 客户端则直接唤起 TapTap 客户端到游戏详情页进行更新；
- 如果玩家设备没有安装 TapTap 客户端，则以 Web 形式打开游戏详情页，根据页面底部提示引导玩家下载 TapTap 客户端，安装成功后打开 TapTap 客户端，玩家根据提示选择在 TapTap 客户端里打开游戏详情页进行更新。

未安装 TapTap 客户端对应的 URL：<Conditional region='cn'>`https://l.taptap.com/5d1NGyET?subc1=AppID`</Conditional><Conditional region='global'>`https://l.taptap.io/GNYwFaZr?subc1=AppID`</Conditional>。

已安装 TapTap 客户端对应的 URL：<Conditional region='cn'>`taptap://taptap.com/app?app_id=AppID&source=outer|update`</Conditional><Conditional region='global'>`tapglobal://taptap.tw/app?app_id=游戏商店id&source=outer|update`</Conditional>。

注意替换其中的 `AppID`。`AppID` 是游戏在 TapTap 商店的唯一身份标识，例如：<Conditional region='cn'>`https://www.taptap.com/app/187168`</Conditional><Conditional region='global'>`https://www.taptap.io/app/187168`</Conditional>，其中 "187168" 是 AppID。

注意，除了打开 URL 外，还需要检测设备是否已经安装 TapTap 客户端，以及处理唤起失败的逻辑，这些代码都需要自行编写。

下面提供 TapSDK 唤起更新的代码供参考。

<details>
<summary>参考代码</summary>

<Conditional region='cn'>

```java
package com.tds.common.utils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;
import java.util.Locale;

public class TapGameUtil {

  private static final String TAG = TapGameUtil.class.getName();

  public static final String PACKAGE_NAME_TAPTAP = "com.taptap";

  public static final String CLIENT_URI_TAPTAP = "taptap://taptap.com";

  public static final String DEFAULT_CLIENT_DOWNLOAD_URL_TAPTAP = "https://l.taptap.com/5d1NGyET";

  // 这里更新的时候不检查 Tap 客户端，一是因为特定 schema 没被应用注册的话大概率是直接返回 error 的，在这里被 try catch 后返回 false 可以近似等于客户端不存在
  // 二是因为 Android 11 开始检查客户端需要游戏做特殊配置，这个配置无法在 SDK 内做好，因为和编译工具版本强绑定，无法做前后版本兼容。
  public static boolean updateGameAndFailToWebInTapTap(Activity activity, String appId) {
    return updateGameInTapTap(activity, appId) || openWebDownloadUrlOfTapTap(activity, appId);
  }

  public static boolean updateGameAndFailToWebInTapTap(Activity activity, String appId, String webUrl) {
    if (TextUtils.isEmpty(webUrl)) {
      return updateGameAndFailToWebInTapTap(activity, appId);
    }
    return updateGameInTapTap(activity, appId) || openWebDownloadUrl(activity, webUrl);
  }

  public static boolean isTapTapInstalled(Context context) {
    return isTapClientInstalled(context, PACKAGE_NAME_TAPTAP);
  }

  public static boolean isTapClientInstalled(Context context, String clientPackageName) {
    if (context != null && !TextUtils.isEmpty(clientPackageName)) {
      boolean TapTapInstalled = false;
      try {
        PackageInfo packageInfo = context.getPackageManager().getPackageInfo(clientPackageName, 0);
        if (null != packageInfo) {
          TapTapInstalled = true;
        }
      } catch (Exception e) {
        Log.e(TAG, clientPackageName + " isInstalled=false");
      }
      return TapTapInstalled;
    }
    return false;
  }

  public static boolean updateGameInTapTap(Activity activity, String appId) {
    return updateGameInTapClient(activity, appId, CLIENT_URI_TAPTAP);
  }

  public static boolean updateGameInTapClient(Activity activity, String appId, String clientUri) {
    if (activity != null && !TextUtils.isEmpty(appId) && !TextUtils.isEmpty(clientUri)) {
      try {
        Uri uri = Uri.parse(String.format(Locale.US,
            "%s/app?app_id=%s&source=outer|update", clientUri, appId));
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        activity.startActivity(intent);
      } catch (Exception e) {
        Log.e(TAG, clientUri + "updateGameInTapTap failed");
        return false;
      }
      return true;
    }
    Log.e(TAG, clientUri + "updateGameInTapTap failed");
    return false;
  }

  public static boolean openReviewInTapTap(Activity activity, String appId) {
    return openReviewInTapClient(activity, appId, CLIENT_URI_TAPTAP);
  }

  public static boolean openReviewInTapClient(Activity activity, String appId, String clientUri) {
    if (activity != null && !TextUtils.isEmpty(appId) && !TextUtils.isEmpty(clientUri)) {
      try {
        Uri uri = Uri.parse(String.format(Locale.US,
            "%s/app?tab_name=review&app_id=%s", clientUri, appId));
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        activity.startActivity(intent);
      } catch (Exception e) {
        Log.e(TAG, clientUri + "openTapTapReview failed");
        return false;
      }
      return true;
    }
    Log.e(TAG, clientUri + "openTapTapReview failed");
    return false;
  }

  public static boolean openWebDownloadUrlOfTapTap(Activity activity, String appId) {
    return openWebDownloadUrl(activity, String.format(Locale.US, DEFAULT_CLIENT_DOWNLOAD_URL_TAPTAP + "?subc1=%s", appId));
  }

  public static boolean openWebDownloadUrl(Activity activity, String url) {
    if (activity != null && !TextUtils.isEmpty(url)) {
      try {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.parse(url));
        activity.startActivity(intent);
      } catch (Exception e) {
        Log.e(TAG, "openWebUrl fail");
        return false;
      }
      return true;
    }
    return false;
  }

}
```

</Conditional>

<Conditional region='global'>

```java
package com.tds.common.utils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;
import java.util.Locale;

public class TapGameUtil {

  private static final String TAG = TapGameUtil.class.getName();

  public static final String PACKAGE_NAME_TAPTAP_GLOBAL = "com.taptap.global";

  public static final String CLIENT_URI_TAPTAP_GLOBAL = "tapglobal://taptap.tw";

  public static final String DEFAULT_CLIENT_DOWNLOAD_URL_TAPTAP_GLOBAL = "https://l.taptap.io/GNYwFaZr";

  // 这里更新的时候不检查 Tap 客户端，一是因为特定 schema 没被应用注册的话大概率是直接返回 error 的，在这里被 try catch 后返回 false 可以近似等于客户端不存在
  // 二是因为 Android 11 开始检查客户端需要游戏做特殊配置，这个配置无法在 SDK 内做好，因为和编译工具版本强绑定，无法做前后版本兼容。

  public static boolean updateGameAndFailToWebInTapGlobal(Activity activity, String appId) {
    return updateGameInTapGlobal(activity, appId) || openWebDownloadUrlOfTapGlobal(activity, appId);
  }

  public static boolean updateGameAndFailToWebInTapGlobal(Activity activity, String appId, String webUrl) {
    if (TextUtils.isEmpty(webUrl)) {
      return updateGameAndFailToWebInTapGlobal(activity, appId);
    }
    return updateGameInTapGlobal(activity, appId) || openWebDownloadUrl(activity, webUrl);
  }

  public static boolean isTapGlobalInstalled(Context context) {
    return isTapClientInstalled(context, PACKAGE_NAME_TAPTAP_GLOBAL);
  }

  public static boolean isTapClientInstalled(Context context, String clientPackageName) {
    if (context != null && !TextUtils.isEmpty(clientPackageName)) {
      boolean TapTapInstalled = false;
      try {
        PackageInfo packageInfo = context.getPackageManager().getPackageInfo(clientPackageName, 0);
        if (null != packageInfo) {
          TapTapInstalled = true;
        }
      } catch (Exception e) {
        Log.e(TAG, clientPackageName + " isInstalled=false");
      }
      return TapTapInstalled;
    }
    return false;
  }

  public static boolean updateGameInTapGlobal(Activity activity, String appId) {
    return updateGameInTapClient(activity, appId, CLIENT_URI_TAPTAP_GLOBAL);
  }

  public static boolean updateGameInTapClient(Activity activity, String appId, String clientUri) {
    if (activity != null && !TextUtils.isEmpty(appId) && !TextUtils.isEmpty(clientUri)) {
      try {
        Uri uri = Uri.parse(String.format(Locale.US,
            "%s/app?app_id=%s&source=outer|update", clientUri, appId));
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        activity.startActivity(intent);
      } catch (Exception e) {
        Log.e(TAG, clientUri + "updateGameInTapTap failed");
        return false;
      }
      return true;
    }
    Log.e(TAG, clientUri + "updateGameInTapTap failed");
    return false;
  }

  public static boolean openReviewInTapGlobal(Activity activity, String appId) {
    return openReviewInTapClient(activity, appId, CLIENT_URI_TAPTAP_GLOBAL);
  }

  public static boolean openReviewInTapClient(Activity activity, String appId, String clientUri) {
    if (activity != null && !TextUtils.isEmpty(appId) && !TextUtils.isEmpty(clientUri)) {
      try {
        Uri uri = Uri.parse(String.format(Locale.US,
            "%s/app?tab_name=review&app_id=%s", clientUri, appId));
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        activity.startActivity(intent);
      } catch (Exception e) {
        Log.e(TAG, clientUri + "openTapTapReview failed");
        return false;
      }
      return true;
    }
    Log.e(TAG, clientUri + "openTapTapReview failed");
    return false;
  }

  public static boolean openWebDownloadUrlOfTapGlobal(Activity activity, String appId) {
    return openWebDownloadUrl(activity, String.format(Locale.US, DEFAULT_CLIENT_DOWNLOAD_URL_TAPTAP_GLOBAL + "?subc1=%s", appId));
  }

  public static boolean openWebDownloadUrl(Activity activity, String url) {
    if (activity != null && !TextUtils.isEmpty(url)) {
      try {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.parse(url));
        activity.startActivity(intent);
      } catch (Exception e) {
        Log.e(TAG, "openWebUrl fail");
        return false;
      }
      return true;
    }
    return false;
  }

}
```

</Conditional>

</details>
