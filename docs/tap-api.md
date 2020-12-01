---
id: tap-api
title: Tap-API
sidebar_label: Tap-API
---

## InitSDK
初始化SDK
**示例代码**  

```
XDSDK.InitSDK("xxxxxxxxx", 1, "", "", false);
```

**API接口**  

```
public static void InitSDK(string appid, int aOrientation, string channel, string version, bool enableTapDB)
```

**API参数说明**  

参数 | 必选 | 备注
:--- | :--- | :---
appid | Y | 心动AppID
aOrientation | Y | 屏幕方向，0表示横屏，1表示竖屏
channel | N | 渠道号
version | N | 版本号
enableTapDB | Y | 是否开启TapDB

## SetCallback XDCallback
设置XDSDK的所有回调监听  

**示例代码**  
```
    XDSDK.SetCallback (new XDSDKHandler ());
```

**API接口**  
```
    public class XDSDKHandler : XDCallback {

        //初始化成功回调
        public override void OnInitSucceed (){

        }

        //初始化失败回调
        public override void OnInitFailed (string msg){

        }

        //登录成功回调
        public override void OnLoginSucceed (string token){

        }

        //登录失败回调
        public override void OnLoginFailed (string msg){

        }

        //登录取消回调
        public override void OnLoginCanceled (){

        }

        //游客绑定成功回调
        public override void OnGuestBindSucceed (string token){

        }

        //游客绑定失败回调（可选）
        public override void OnGuestBindFailed(string msg){

        }

        //登出回调
        public override void OnLogoutSucceed (){

        }

        //支付完成回调
        public override void OnPayCompleted (){

        }

        //支付失败回调
        public override void OnPayFailed (string msg){

        }

        //支付取消回调
        public override void OnPayCanceled (){  

        }

        //Android 退出回调
        public override void OnExitConfirm (){

        }

        //Android 取消退出回调
        public override void OnExitCancel (){

        }

        //微信分享成功回调（可选）
        public override void OnWXShareSucceed (){

        }

        //微信分享失败回调（可选）
        public override void OnWXShareFailed (){

        }

        //实名认证成功
        public override void OnRealNameSucceed (){

        }

        //实名认证失败
        public override void OnRealNameFailed (string error_msg){

        }

        /// 有未完成的订单回调，比如：礼包码.注意：多个未完成订单会在一个数组中一起回调。（只会在登录状态下回调）
        /// @param resultList 订单信息List。
        /// 单个未完成订单信息包含：     TransactionIdentifier ：订单标识 ，恢复购买时需要回传
        ///                             		 Product_Id ：商品ID，
        ///                                        Quantity：商品数量
        public override void RestoredPayment(List<Dictionary<string,string>> resultList){}

        //用户同意所有协议
        public override void OnProtocolAgreed() {}

    	//打开协议成功
        public override void OnProtocolOpenSucceed() {}

    	//打开协议失败
        public override void OnProtocolOpenFailed(string msg) {}

    }
```  

## Login

**示例代码**   
```
XDSDK.Login();
```

**API接口**  

```
public static void Login()
```


**API说明**  

调用该接口会触发下列回调
获取、查看用户信息以及支付接口请在获取到登录成功回调之后调用。

类别 | 回调方法
--- | ---
登录成功 | void OnLoginSucceed(string token)
登录失败 | void OnLoginFailed(string msg)
登录取消 | void OnLoginCanceled()  
