---
id: android-tapbootstrap
title: TapBootstrap
---
## method

TapSDK 核心组建，负责 SDK 初始化和功能开启

### init

初始化 SDK

#### API  

```java
public static void init(Activity activity, TapConfig tapConfig);
```

#### 示例代码

```java
TapConfig tapConfig = new TapConfig.Builder()
                .withAppContext(getApplicationContext())
                .withClientId("client Id")
                .build();
TapBootStrap.init(MainActivity.this, tapConfig);
```

**TapConfig 参数说明**  

| 参数         | 可选  | 备注                |
| :--------- | :-- | :---------------- |
| context   | 否   | 上下文 |
| clientId | 否   | 开发者中心获取的 client Id |
