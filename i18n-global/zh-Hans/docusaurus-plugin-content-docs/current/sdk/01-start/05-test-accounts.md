---
id: test-accounts
title: 测试用户管理
sidebar_label: 测试用户管理
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import {Conditional} from '/src/docComponents/conditional';


测试用户管理功能是用于 TapTap 登录、正版验证等相关服务的测试用户名单管理，例如在商店通过审核上架前，测试用户可提前通过「TapTap 登录」进入游戏测试相关游戏服务。商店发布后，可修改「TapTap 登录 - 应用状态」对全部用户开放登录。

**注意事项：**

* **请确保操作人员的角色配置了「测试用户管理」的权限，默认包含该权限的角色有「主管理员」、「游戏管理员」、「发行」和「开发」。**
* **测试用户管理需要先开启应用配置，请确保应用配置先行开启后再添加用户。**

1. 登录 <Conditional region='cn'>[TapTap 开发者中心](https://developer.taptap.com/)</Conditional><Conditional region='global'>[TapTap 开发者中心](https://developer.taptap.io/)</Conditional>，在所属游戏页面点击「测试用户管理」。

2. 选择「测试用户管理」，进入页面，点击「添加用户」按钮。

    <Conditional region='cn'>
    <img src={useBaseUrl('/img/sdk-test-accounts-1.png')} alt="" />
    </Conditional>
    <Conditional region='global'>
    <img src={useBaseUrl('/img/io/sdk-test-accounts-1.png')} alt="" />
    </Conditional>

3. 填写用户 ID 或昵称搜索用户，选择用户并提交，成功将用户添加进名单。

    <Conditional region='cn'>
    <img src={useBaseUrl('/img/sdk-test-accounts-2.png')} alt="" />
    </Conditional>
    <Conditional region='global'>
    <img src={useBaseUrl('/img/io/sdk-test-accounts-2.png')} alt="" />
    </Conditional>

