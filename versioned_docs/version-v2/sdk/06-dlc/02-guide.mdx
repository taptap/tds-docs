---
id: guide
title: 开发指南
sidebar_label: 开发指南
---

import MultiLang from '/src/docComponents/MultiLang';

import {Gray,Blue, Red, Black} from '/src/docComponents/doc';

## DLC 查询和购买

在项目的 `Packages/manifest.json` 文件中添加以下依赖：

```json
"dependencies":{
// 公共库
"com.taptap.tds.common":"https://github.com/TapTap/TapCommon-Unity.git#{version}",
// 付费购买
"com.taptap.tds.dlc": "https://github.com/TapTap/TapLicense-Unity.git#{version}",
}
```
## DLC 查询和购买

### DLC 回调设置

<MultiLang>

```cs
public class MyTapDLCCallback:ITapDlcCallback
{
    public void OnQueryCallBack(TapLicenseQueryCode code, Dictionary<string, object> queryList)
    {
        
    }

    public void OnOrderCallBack(string sku, TapLicensePurchasedCode status)
    {
        
    }
}

TapLicense.SetDLCCallback(new MyTapDLCCallback());
```

```java
TapLicenseHelper.setDLCCallback(new DLCManager.InventoryCallback() {
    @Override
    public boolean onQueryCallBack(int i, HashMap<String, Integer> hashMap) {
        return false;
    }

    @Override
    public void onOrderCallBack(String s, int i) {

    }
});
```
</MultiLang>


### DLC 查询

<MultiLang>

```cs
TapLicense.QueryDLC(string[] skuIds);
```

```java
TapLicenseHelper.queryDLC(Activity activity, String[] skuIds);
```
</MultiLang>

### DLC 购买

<MultiLang>

```cs
TapLicense.PurchaseDLC(string skuId);
```

```java
TapLicenseHelper.queryDLC(Activity activity, String skuIds);
```
</MultiLang>

### 参数说明
#### TapLicenseQueryCode
回调          | 回调值 | 说明       |
----------- | --- | -------- |
QUERY_RESULT_OK       | 0   | 查询成功     |
QUERY_RESULT_NOT_INSTALL_TAPTAP       | 1   | 检查测试机未安装 TapTap 客户端     |
QUERY_RESULT_ERR       | 2   | 查询失败     |
ERROR_CODE_UNDEFINED       | 80000   | 未知错误     |


#### skuId:
内购商品 id，需要联系 TapTap 运营同学进行配置；


## 测试

为了保证上线后，游戏对于用户是否购买的判断能够正常生效，**请务必按照以下说明完成自测。**

### 上传 APK

上传需要测试的 APK 至开发者中心，并通过审核。

### 配置 SDK

前往开发者中心   >>   选择<Blue>SDK 控制台 </Blue>   >>   选择<Blue>购买激活 SDK</Blue>   >>   选择相应的游戏的<Blue>配置</Blue>   >>   填写测试用户的 TapTap ID 。

或者，前往开发者中心   >>   选择已经开放售卖的游戏 >>   选择<Blue>购买激活 SDK 设置</Blue>   >>   填写测试用户的 TapTap ID 。

### 开始测试

在 TapTap 客户端使用已填写的测试用户账号登录。

## 正式开始售卖

### 完善应用信息

前往开发者中心，按照[物料要求](/store/store-material)填写应用信息，并审核通过。

### 设置售卖价格

前往开发者中心 >> <Blue>售卖设置</Blue> ，开启售卖开关，设置游戏售卖金额，提交审核，并同步对接的 TapTap 运营相关信息。

### 正式上线

所有流程都确保顺利后，游戏可[正式上线](/store/store-release)。
![用来空行的小白条](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)

---