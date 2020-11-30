---
id: tap-unity
title: Unity工程
sidebar_label: Unity
---

## 导包
1. 打开/xd-sdk-4/sdk/unity/vx.x.x，拖拽unitypackage到Plugins目录
2. 全部选择，点击import
3. 导入后，将 Plugins/script 下面的 XDSDKListener.cs 脚本文件拖动到长生命周期的对象中进行脚本挂接

**您可以参考[快速开始demo](#)**

![unitypackage import](http://qnblog.ijemy.com/WX20201125-093759.png)
**至此，已经将XDSDk导入自己的工程**
![import down](http://qnblog.ijemy.com/xd_importdown.png)

## 简单实现TapTap登陆功能
### 实现步骤

- 平台判断，可自行用unity平台工具判断，也可以导入[Common](#)
- 初始化 [XDSDK.InitSDK](./tap-api.md#initsdk)
- 设置回调监听 [XDSDK.SetCallback](./tap-api.md#setcallback-xdcallback)
- 登录 [XDSDK.Login](./tap-api.md#login)

```
public class LoginMain : MonoBehaviour
{
void Start()
{
        Debug.Log("start init");
        //平台判断 并 初始化
        if (Platform.isAndroid()) {
                XDSDK.InitSDK("xxxx", 1, "", "", false);//初始化
        } else if (Platform.isIOS()) {
                XDSDK.InitSDK("xxxx", 1, "", "", false);
        }
        //设置回调监听
        XDSDK.SetCallback(new MYXDCallback());
}

void OnMouseUp() {
	//登陆
        XDSDK.Login();
}

//自定义MYXDCallback继承XDCallback，实现监听方法
public class MYXDCallback : XDCallback
{
public override void OnLoginSucceed(string token)
{
        Debug.Log("OnLoginSucceed");
        TDSAchievement.TDSAchievement.initWithXD("202812", token);
        SceneManager.LoadScene("StartScene");
}
public override void OnLoginCanceled()
{
        Debug.Log("OnLoginCanceled");
}
public override void OnLoginFailed(string msg)
{
        Debug.Log("OnLoginFailed");
}
...
}
}
```
## 注意事项

- XDCallback方法需要全部实现，建议copy demo，否则会报错
- InitSDK的appid确认是从开发者后台正确获取
- 注意XDSDKListener.cs的挂载
