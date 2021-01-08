---
id: ios-initializer
title: TDSInitializer
---
## method

### initWithConfig

初始化SDK

#### API  

```objectivec
+ (void)initWithConfig:(TDSConfig *)config;
```

#### 示例代码

```objectivec
NSString *clientID = @"clientId";
TDSConfig *config = [[TDSConfig alloc]init];
config.clientId =clientID;
[TDSInitializer initWithConfig:config];
```

**TDSConfig参数说明**  

| 参数       | 可选  | 备注                |
| :------- | :-- | :---------------- |
| clientId | 否   | 开发者中心获取的client Id |

### enableTapDBWithChannel

#### API  

```objectivec
+ (void)enableTapDBWithChannel:(nullable NSString *)channel gameVersion:(nullable NSString *)gameVersion;
```

#### 示例代码

```objectivec
[TDSInitializer enableTapDBWithChannel:@"channel" gameVersion:@"v1.0.0"];
```

**enableTapDB 参数说明：**   

| 字段          | 可选  | 说明                                                                    |
| ----------- | --- | --------------------------------------------------------------------- |
| channel     | 是   | 长度大于0并小于等于256。分包渠道。1.2.名词解释中有介绍                                       |
| gameVersion | 是   | 长度大于0并小于等于256。游戏版本。为空时，自动获取游戏安装包的版本（AndroidManifest.xml中的versionName） |

### enableMoment

开启动态

#### API  

```objectivec
+ (void)enableMoment;
```

#### 示例代码

```objectivec
[TDSInitializer enableMoment];
```
