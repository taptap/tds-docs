---
id: android-initializer
title: TdsInitializer
slug: /android-initializer
---
## method

TapSDK核心组建，负责SDK初始化和功能开启

### init

初始化SDK

#### API  

```java
init(TdsConfig config);
```

#### 示例代码

```java
TdsConfig tdsConfig = new TdsConfig.Builder()
                .appContext(MainActivity.this)
                .clientId(Config.CID)
                .build();
TdsInitializer.init(tdsConfig);
```

**TdsConfig参数说明**  

| 参数         | 可选  | 备注                |
| :--------- | :-- | :---------------- |
| clientId   | 否   | 开发者中心获取的client Id |
| appContext | 否   | 当前Activity        |

### enableTapDB

#### API  

```java
enableTapDB(Activity activity, String gameVersion, String gameChannel);
```

#### 示例代码

```java
TdsInitializer.enableTapDB(MainActivity.this, "1.0", "default");
```

**enableTapDB 参数说明：**   

| 字段          | 可选  | 说明                                                                    |
| ----------- | --- | --------------------------------------------------------------------- |
| channel     | 是   | 长度大于0并小于等于256。分包渠道。1.2.名词解释中有介绍                                       |
| gameVersion | 是   | 长度大于0并小于等于256。游戏版本。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName） |

### enableMoment

开启动态

#### API  

```java
public static void enableMoment(Activity activity);
```

#### 示例代码

```java
TdsInitializer.enableMoment(MainActivity.this);
```
