---
id: tap-android
title: TapSDK Android快速开始
sidebar_label: Android快速开始
---
`本文主要介绍Android如何将TapSDK快速接入并实现登录功能。TapSDK同时还包含用户数据收集和动态发布功能，详情可以参考`[数据收集](./tap-fun-db)、[动态](./tap-fun-moment)`文档介绍`
## API实现步骤
建议在Activity的onCreate调用:    
1. 初始化[initSDK()](#3-初始化)
2. 注册回调[registerLoginCallback()](#4-注册回调)
3. 登录[login()](#5-登录)

## 1. 环境配置
- gradle需要添加26.0.2以上appcompat-v7的support依赖  
- 最低支持Android level 14+。如果需要开启[OAID功能](#)，最低支持Android level 21+  

## 2. 工程导入
1. 将[下载](#)的SDK包，导入到'/project/app/libs/'下  
2. 添加gradle配置如下  
```  
repositories{  
    flatDir {  
        dirs 'libs'  
    }  
}  
dependencies {  
...  
    implementation 'com.android.support:appcompat-v7:26.0.2'
    implementation (name:'TapSDK_1.0', ext:'aar')  
}  
```  

## 3. 初始化
TapSDK初始化  
**API**    [TdsInitializer.init()](./tap-api.md#init)  

**示例代码**  
```
private void initSDK() {
    TdsConfig tdsConfig = new TdsConfig.Builder()
                    .appContext(MainActivity.this)
                    .clientId(Config.CID)//开发者中心获取到的client Id
                    .build();
    TdsInitializer.init(tdsConfig);  
}            
```

## 4. 注册回调
监听登录的结果  
**API**  [registerCallback()](./tap-api.md#registercallback)

**示例代码**
```
private CallBackManager callbackManager;
private void registerLoginCallback() {
CallBackManager callbackManager = CallBackManager.Factory.create();
LoginManager.getInstance().registerCallback(callbackManager, new TapTapLoginCallback<LoginResponse>() {
    @Override
    public void onSuccess(LoginResponse loginResponse) {
        Log.e(Tag, "Login-onSuccess");
        startGame();
    }

    @Override
    public void onCancel() {
        Log.e(Tag, "Login-onCancel");
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e(Tag, "Login-onError: " + throwable.getMessage());
    }
});
}
```

## 5. 登录
TapTap登录，当没有安装TapTap app时，会打开内置webview进行TapTap验证登录  
**API** [logInWithReadPermissions()](./tap-api.md#loginwitheadpermissions)

**示例代码**  
可以用下面代码直接登录：
```
private void login() {
  LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
}
```

也可以先校验该用户是否登录过，对未登录的用户调用login()
```
private void checkLogin() {
//未登录用户会回调onError，已经登录用户实时回调onSuccess
Profile.fetchProfileForCurrentAccessToken(new Api.ApiCallback<Profile>() {
    @Override
    public void onSuccess(Profile data) {
        Log.e(Tag, "checkLogin-onSuccess");
        startGame();
    }

    @Override
    public void onError(Throwable error) {
        Log.e(Tag, "checkLogin-onError");
        login();
    }
});
}
```


## 6. simple code
从[这里](#)可以下载到快速开始Demo  

```
private CallBackManager callbackManager;
private String Tag = "TapTapTest";

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    //初始化SDK
    initSDK();
    //注册登录回调
    registerLoginCallback();
    //检查是否登录过
    checkLogin();
}

private void checkLogin() {
    //未登录用户会回调onError，已经登录用户实时回调onSuccess
    Profile.fetchProfileForCurrentAccessToken(new Api.ApiCallback<Profile>() {
        @Override
        public void onSuccess(Profile data) {
            Log.e(Tag, "checkLogin-onSuccess");
            startGame();
        }

        @Override
        public void onError(Throwable error) {
            Log.e(Tag, "checkLogin-onError");
            login();
        }
    });
}

private void initSDK() {
    TdsConfig tdsConfig = new TdsConfig.Builder()
            .appContext(MainActivity.this)
            .clientId(Config.CID)//开发者中心获取到的client Id
            .build();


    TdsInitializer.init(tdsConfig);

    TapTapSdk.LoginSdkConfig loginSdkConfig = new TapTapSdk.LoginSdkConfig();
    loginSdkConfig.roundCorner = false;//false：登录页面是直角，true：登录页面是圆角
    loginSdkConfig.regionType = RegionType.IO;//标识为国际版，从2.5版本才开始支持
    TapTapSdk.changeTapLoginConfig(loginSdkConfig);
}

private void registerLoginCallback() {
    callbackManager = CallBackManager.Factory.create();
    LoginManager.getInstance().registerCallback(callbackManager, new TapTapLoginCallback<LoginResponse>() {
        @Override
        public void onSuccess(LoginResponse loginResponse) {
            Log.e(Tag, "Login-onSuccess");
            startGame();
        }

        @Override
        public void onCancel() {
            Log.e(Tag, "Login-onCancel");
        }

        @Override
        public void onError(Throwable throwable) {
            Log.e(Tag, "Login-onError: " + throwable.getMessage());
        }
    });
}

private void login() {
    LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, TapTapSdk.SCOPE_PUIBLIC_PROFILE);
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (callbackManager != null) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
        Log.e(Tag, "Login-onActivityResult");
        //TODO
    }
}

@Override
public void onClick(View v) {
    int viewId = v.getId();
    if (viewId == R.id.btnGame) {
        checkLogin();
    }
}

public void startGame() {
    Intent intent = new Intent(MainActivity.this, GameActivity.class);
    startActivity(intent);
}
```
