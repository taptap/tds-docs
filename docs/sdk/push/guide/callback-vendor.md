---
title: 推送消息回调厂商通道配置指南
sidebar_label: 回调服务厂商配置
sidebar_position: 7
---

## 概述

小米、OPPO、vivo 等厂商由于不需要额外配置，推送消息送达统计默认就是开启的。

华为、魅族等厂商通道的推送消息送达统计，需要在其相应控制台配置回调地址后才会生效，否则不会有统计结果，但对消息推送不会有影响。

请注意不同厂商需要配置的回调地址略有不同，具体配置方法，请继续阅读本章后面的内容。

## 华为

1.  登录华为终端开发者控制台：<https://developer.huawei.com/consumer/cn/console，进入> PUSH 服务模块后选择要配置的项目。

    <p align="center" width="50%"><img src="/img/push/hms1.png" /></p>

2.  在左侧导航栏选择 [增长-推送服务]，在右侧 顶部导航栏选择 [配置] ，进入配置页面。

    <p align="center" width="50%"><img src="/img/push/hms2.png" /></p>

3.  在配置页面选择正确的应用后，在 [应用回执状态] 右侧点击开通按钮，开通应用回执状态功能。

    <p align="center" width="50%"><img src="/img/push/hms3.png" /></p>

    点击开通按钮后，需要选择或新建回执。如需新建回执，则点击新建回执按钮，按照如下说明填写参数，并点击确定按钮即可。

    <p align="center" width="50%"><img src="/img/push/hms4.png" /></p>

    -   回执名称：请输入一个自定义回执名称
    -   回调地址：请输入 <https://callback.tds1.tapapis.cn/push/v1/callback/hms>
    -   HTTPS 证书：通过命令 `openssl s_client -connect callback.tds1.tapapis.cn:443` 获取。以 Linux 平台命令为例，运行命令：

        openssl s_client -connect callback.tds1.tapapis.cn:443 -showcerts </dev/null | sed -n -e '/-.BEGIN/,/-.END/ p' > certifs.pem

    certifs.pem 文件就是你要的内容，将其内容贴到 HTTPS 证书文本输入框中即可。

    <p align="center" width="50%"><img src="/img/push/hms5.png" /></p>

4.  开通应用回执状态完成后，将相应的回执配置 ID 填入推送控制台相应 profile 配置中。

    <p align="center" width="50%"><img src="/img/push/hms6.png" /></p>

    如果你配置过多个回执地址，请注意选择新配置的这个正确回执 ID。如果不小心填入了错误的 ID，会导致不能接收送达统计数据，甚至还会推送失败。你可以通过我们的控制台检查推送是否成功，并检查送达统计数据上报情况。
    如果你将配置过的回执 ID 删除，那么送达统计功能会重新禁用，推送结果不受影响。

## 魅族

1.  登录魅族推送平台控制台：<http://push.meizu.com/> ，选择正确的应用点击 [打开应用] 进入应用配置界面。

    <p align="center" width="50%"><img src="/img/push/mz1.png" /></p>

2.  在应用配置界面上，依次点击 [配置管理 -> 回执管理] 进入回执配置界面，在 [回执地址] 文本框中输入回调地址 <https://callback.tds1.tapapis.cn/push/v1/callback/mz> ，点击 [新增] 按钮完成配置。

    <p align="center" width="50%"><img src="/img/push/mz2.png" /></p>

3.  回执地址配置完毕后，将相应的 token 填入推送控制台相应 profile 配置中。
    配置完成后，在给魅族设备发送推送时就会启用回调统计功能，你可以查询回调统计数据来观察推送情况。如果你不小心将地址配置错了，那么发送推送时魅族平台会返回「回执地址不存在，请在推送平台配置」的错误，你通过我们的控制台看到这个错误，以便及时发现并修改。
    如果你将配置过的回执 token 删除，那么送达统计功能会重新禁用，推送结果不受影响。
