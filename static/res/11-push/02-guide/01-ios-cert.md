---
id: ios-cert
title: iOS 推送设置指南
sidebar_label: iOS 推送设置
---


# iOS 推送设置指南

## 注册 App ID

首先注册 `App ID`。如果你已经注册过带有推送通知 `App ID`，可以跳过以下步骤：

1. 登录 [Apple Developer Center](https://developer.apple.com/account/)

2. 点击 **Certificates, Identifiers & Profiles**

3. 选择 **Identifiers** 下的 **App IDs**

4. 点击右上方的加号按钮

5. 填写 `App ID` 的基本信息

    ![Create App ID](/img/ios_cert_v2/create_app_id.png)

6. 选择创建 Explicit App ID，填入 App 的 **Bundle ID**。注意，**Explicit App ID 不能包含星号（`*`）**。

    ![Enter Explicit bundle ID](/img/ios_cert_v2/enter_explicit_app_id.png)

7. 选择 `App ID` 需要开启的服务，此处要勾选 **Push Notifications**。
   
    ![Select push notification](/img/ios_cert_v2/select_push_notification.png)

8. 点击 **Continue**

9.  确认注册信息，然后点击 **Register**。

10. 点击 **Done**

## 开启推送通知

为已有的 `App ID` 开启推送通知的步骤如下：

1. 选择要开启推送通知的 `App ID`

2. 勾选 **Push Notifications** 复选框
   
    ![Edit push notification](/img/ios_cert_v2/edit_push_notification.png)

3. 如果弹出警告对话框，点击 **OK**。

4. 点击 **Done**

## 创建 Token Authentication

**Token Authentication** 是 APNs 新推出的推送鉴权方式。它相对老的证书鉴权方式有如下优势：

* 同一个账户下所有 App 无论是测试 App 还是正式版 App，都能使用同一个 key 来发推送消息和 voice-over-Internet Protocol (VoIP) 消息，不再需要为每个 App 生成一个证书。
* 生成的 Auth Key 不再有过期时间，无需像证书那样每年需要重新生成一次。
* 生成过程简单，不需要繁琐、易错的证书导出操作。

想进一步了解其相关内容请参看 [APNs 文档](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html#//apple_ref/doc/uid/TP40008194-CH8-SW1)。

**我们推荐所有用户都使用这种新的鉴权方式来发推送消息。**


### 获取 Team ID

1. 前往 [Apple Developer Center](https://developer.apple.com)

2. 点击 **Membership**

  ![Membership](/img/ios_cert_v2/find_team_id.png)
 
   找到 Team ID 一栏，将其记下来以备后用。

### 创建 Token Authentication Key

1. 前往 [Apple Developer Center](https://developer.apple.com)

2. 点击 **Certificates, Identifiers & Profiles**

    ![enter Certificates, Identifiers & Profiles](/img/ios_cert_v2/enter_certificates_identifiers_profiles.png)

3. 选择在 **Keys** 栏下的 **All**

4. 点击下图中红色边框内的加号按钮

    ![Create Auth Keys](/img/ios_cert_v2/create_auth_keys.png)

5. 根据您的需要自行填写 **Key Description** 并勾选 **APNs** 后点击最下面的 Continue 按钮。
  
    ![Create New Key](/img/ios_cert_v2/create_new_key.png)

6. 点击 Confirm 按钮继续下一步。

    ![Confirm Key](/img/ios_cert_v2/confirm_new_key.png)

7. 点击 Download 将生成好的 Auth Key 下载到本地，并记录 Key ID 备用。
 
    ![Download Key ID](/img/ios_cert_v2/download_key_id.png)

### 上传 Token Authentication Key

1. 在 **云服务控制台 > 推送 > 设置 > iOS 推送 Token Authentication** 点击 **新增 Token Authentication** 按钮。

2. 后弹出对话框：

   在弹出的对话框内填入 Team ID、Key ID、Topics，并将上一步下载到本地的 Auth Key 文件上传。

   - Topics 是 App 的 Bundle ID，有几个要用该 Token Authentication Key 发消息的 App 就可以在 Topics 下填写几个 Bundle ID，每个 Bundle ID 用**英文半角逗号**分隔。
   - 需要注意填写的 App Bundle ID 必须从属于同一个 Team ID 之下。如果有多个 Team ID 或多个 Token Authentication Key，请再点击 **新增 Token Authentication** 按钮以配置多个 Token Authentication Key。

   点击 **创建** 之后就完成了上传 Token Authentication Key 的工作。

4. 可以通过 **云服务控制台 > 推送 > 在线发送** 测试推送功能。

注意，Token Authentication 鉴权方式和老的证书鉴权方式是互斥的，一旦配置了 Token Authentication 则应用下所有推送均会使用 Token Authentication 方式进行，所以请确保为所有需要发推送的 App 都添加了 Token Authentication 配置。

如果目标推送设备中有使用版本低于 v4.2.0 的 iOS SDK，请在调用推送接口发推送时主动带上 topic 参数。
用法请参考[推送 REST API 使用指南](/sdk/push/guide/rest)的《推送消息》一节。

## 创建推送证书（不推荐使用）

每个 `App ID` 都需要单独的客户端 SSL 证书来和 APNs 通信。从 2015 年 12 月 17 日起，APNs 服务全面支持 HTTP/2 协议，推送证书也进行了相应的调整，即推出了 Universal Push Notification Client SSL 证书，以下简称 **Universal 推送证书**。通过下图中红框标注的 **Apple Push Notification service SSL (Sandbox & Production)** 这种方式创建的推送证书就是「Universal 推送证书」。

我们推荐使用「Universal 推送证书」来进行推送服务。

   ![what is Universal Push Notification Client SSL Certificate](/img/ios_cert_v2/what_is_universal_push_notification_client_ssl_certificate.png)
  
  图中其他方式就叫做「非 Universal 方式」，以下简称 **非 Universal 推送证书**：
  
  ![what is not Universal Push Notification Client SSL Certificate](/img/ios_cert_v2/what_is_not_universal_push_notification_client_ssl_certificate.png)

注意，要使用 Universal 推送证书，iOS SDK 需要更新到 v3.2.8 以上的版本，以获得更快速的推送效果。

### 创建 Universal 推送证书

请按以下步骤创建「Universal 推送证书」：

1. 前往 [Apple Developer Center](https://developer.apple.com)

2. 点击 **Certificates, Identifiers & Profiles**

    ![enter Certificates, Identifiers & Profiles](/img/ios_cert_v2/enter_certificates_identifiers_profiles.png)

3. 选择在 **Certificates** 栏下的 **All**

4. 点击下图中红色边框内的加号按钮

    ![Create SSL certificate](/img/ios_cert_v2/create_ssl_certificate.png)

5. 勾选 **Production** 栏下的 **Apple Push Notification service SSL (Sandbox & Production)**，点击下一步。
  
    ![Select push certificate](/img/ios_cert_v2/what_is_universal_push_notification_client_ssl_certificate.png)

6. 从 `App ID` 下拉菜单中选择相应的 `App ID`，点击下一步。

    ![select `App ID`](/img/ios_cert_v2/select_app_id.png)

7. 这时会出现 **About Creating a Certificate Signing Request (CSR)**。

    ![guide to create a CSR](/img/ios_cert_v2/guide_to_create_a_csr.png)

    根据它的说明创建 **Certificate Signing Request**。

    ![how to create a CSR](/img/ios_cert_v2/how_to_create_a_csr.png)

8. 点击下图中的 **Choose File** 按钮

    ![upload CSR File](/img/ios_cert_v2/upload_csr_file.png)

9. 上传刚刚生成的 `.certSigningRequest` 文件，生成 APNs Push Certificate。

10. 下载证书

11. 双击打开证书，证书打开时会启动 **Keychain Access / 钥匙串访问** 工具。在钥匙串访问工具中，你的证书会显示在 **证书** 中。注意选择左下角的 **证书** 和左上角的 **登录**。

    ![confirm create cer success](/img/ios_cert_v2/confirm_create_cer_success.png)

「非 Universal 推送证书」的申请步骤与以上类似。

### 导出证书

1. 打开 **Keychain Access**，找到要导出的证书（证书名有前缀 **Apple Push Services**）。

2. 右键点击证书，这里请注意确认右键点击的是**证书**，**不要** 展开证书后右键点击证书的专用密钥。
  
    选择 **导出 / Export**，选择保存格式为 `.p12`。这时程序会提示你输入密码来保护导出的证书，**请不要输入密码**，让两个输入框为空，点击  **OK**。

    接着又会弹出一个对话框，要求输入 macOS 账户的密码来允许从 Keychain Access 中导出，请填写密码并点击 **允许 / Allow**。

3. 在 Xcode 工程中开启推送权限：
  
    ![open_push_auth](/img/ios_cert_v2/open_push_auth.png)

### 上传证书


1. 在 **云服务控制台 > 推送 > 设置 > iOS 推送证书 > 生产环境** 上传「Universal 推送证书」。
  
    **根据你的证书类别进行上传。这里请注意区分证书的类别，测试环境证书和生产环境证书请勿混淆。**

2. 类似地，上传测试证书。最简单的方式就是将刚才生成的「Universal 推送证书」直接上传。当然也可以自己生成一个测试证书。

  上传测试证书后，那么就可以在控制台看到生产证书和测试证书都上传完成：

3. 可以通过 **云服务控制台 > 推送 > 在线发送** 测试推送功能。
 
### 上传证书失败

如果无法上传推送证书，通常是因为证书有问题，一般由下列原因导致：

1. 证书不是推送证书
2. 证书导出格式有误

验证导出的证书是不是推送证书有两种方法：

1. 通过证书的名字来判断，推送证书的名字中会包含「Push Service」或者「Pass Type ID」。
2. 配合真实设备来测试导出的证书是否有效。可以利用 [NWPusher](https://github.com/noodlewerk/NWPusher) 等第三方工具来快速测试。

目前 LeanCloud 只接受 `p12` 格式的证书。因此在导出证书时，必须选择 `p12` 作为导出格式。

上传证书时，LeanCloud 会进一步校验证书，帮助开发者发现错误。上传程序会检查证书的名字是否包含以下前缀：

* `Apple Push Services`
* `Apple Development IOS Push Services`
* `Apple Production IOS Push Services`
* `Pass Type ID`

如果程序发现证书的名字中不包含以上前缀，则校验失败，证书将无法上传。

Apple 未来可能会修改推送证书的名字前缀，我们会及时更新前缀列表，同时也欢迎大家来反馈。

### 证书过期

开发者如果使用过期证书进行推送，会遇到「The iOS certificate file is expired or disabled」的错误提示。

LeanCloud 后端在收到推送请求时都会去检查 `prod` 参数指明的证书是否过期，没有 `prod` 则默认检查正式环境证书，如果发现过期并且 query 条件查出的目标设备可能存在 iOS 设备，就直接拒绝本次推送。

一种解决方法是替换过期的证书，另一种方法是在 query 条件中通过 `deviceType` 字段明确指定 `_Installation` 表中设备类型为非 iOS 设备来推送，方法参见[推送 REST API 使用指南](/sdk/push/guide/rest)的《通过查询条件发推送》一节。

## 验证推送服务状态

按以下步骤来验证 `App ID` 的推送服务是否打开：

1. 点击 **Identifiers** 下的 **App IDs**

2. 选择与应用 Bundle ID 匹配的 `App ID`

3. 如果下图中红色方框中显示 **Enabled**，表示 `App ID` 的推送证书已配置好。

    ![Verify push notification](/img/ios_cert_v2/verify_push_notification.png)
