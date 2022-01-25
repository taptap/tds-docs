---
id: faq
title: TapPlay FAQ
sidebar_label: FAQ
sidebar_position: 30
---

1. 目前 TapPlay 支持点击游戏桌面图标后通过 TapTap 启动游戏，但部分机型由于硬件限制 TapTap 无法帮助用户创建桌面图标，用户需启动 TapTap 后才可启动游戏
2. 32 位游戏 APK 包需用户安装 TapPlay 游戏助手才可玩游戏，而 64 位 APK可直接启动游戏，建议开发者提供 64 位安装包上架 TapPlay
3. 游戏基本可无障碍运行在 TapPlay 环境内，但部分游戏运行过程中可能存在黑屏、白屏、闪退等异常情况，建议开发者通过 [TapCanary](https://www.taptap.com/app/222711) 进行自测，如遇问题，可提交工单咨询
4. 游戏与部分第三方 SDK 可能存在冲突，建议开发者优先接入 TDS 提供的服务，并使用 [TapCanary](https://www.taptap.com/app/222711) 进行自测，如遇问题，可提交工单咨询
5. 请保证 TapTap 商店内为游戏的最新资源包，通过 Webview 的方式实现更新可能导致游戏更新文件安装到本地，与 TapPlay 环境内文件发生冲突
6. 目前暂不支持微信/QQ 登录，游戏如需登录，推荐开发者接入 [Tap 登录](/sdk/taptap-login/features/) 或使用手机验证码登录