---
id: pro-in 
title: Prerequisites 
sidebar_label: Prerequisites
---
import {Highlight} from '../component';

## I. Enable TapTap Login

1. In Developer Center, go to the approved application and find ‘TapTap Login’ on the menu.
2. Select the Applicable Region.
3. Click to turn on and obtain the corresponding Client ID. Now you are ready to go.

![](/img/tap_taplogin_en.png)

## II. Configure Platform Information
After turning on, you will need to configure the platform information which should be consistent with the application’s package. For one platform you may configure multiple sets of information for different scenarios. TapTap login feature will not function properly if the information configured in the Developer Center does not match the actual information of the application.  The configuration steps are as follows.

![](/img/tap_tapconfig_en.png)

## III. Integrate SDK into your application

Download TapTap SDK and integrate it into your application. Then refer to the documents to call the API to implement the TapTap login function.

TapTap SDK supports TapTap authorized login in your native application. For users who have not installed TapTap yet, they may log in on an inline Webview authorization page.  
See [Quick Start](/sdk/tap-unity) for SDK integration steps.

<!-- ## 四、开始测试
如需要测试SDK功能，可以[点击下载](/res/TapSDK测试用例.xlsx)测试用例 -->
