---
id: pro-login 
title: Login 
sidebar_label: Login
---
import {Red, Blue, Black, Gray} from '../component';

## I. TapTap Login
TapTap Login is an authorized login system built on the OAuth2.0 protocol. Developers need to register a developer account in the TapTap Developer Center and have an approved mobile application before they can implement TapTap Login.

### 1\. Login Flows
![](/img/tap_login.png)

### 2\. Access the Server
For single-player games, developers can access only the client login (it is recommended to store the data to its own server). For multiplayer games, developers need to access the server to save user data. See [Server Documents](/api/service) for details.

### 3\. Implement Login
See [Quick Start](/sdk/) on how to implement TapTap Login.  

### 4\. Example
![](/img/tap_taploginview.png)

<!-- ## 二、数据收集
如需开通，请联系我们的技术支持 QQ：3171097571 邮件：support@tapdb.com -->

## II. Best Practices

### An easier login for better user experience.

1.  The most recommended order for players login is: select login with TapTap → select the server → select the role → enter the game.
    - Before implementing TapTap Login, please make sure you have applied to enable the login feature and have obtained the Client ID.
    - Add a [TapTap Login button](/res/TapTapLoginButton.zip) on the login page, which is highly recommended to be displayed  <Red>according to the provided UI specifications, showing the full title and logo of TapTap.</Red>

2. To avoid losing user accounts data, developers should store in the server the matching details between the Tap ID and the game ID, as well as the game ID and the game’s sever. This way, after clearing the local game data, users will still be able to load their previous progress by logging into the game with the same TapTap account.

3. Add account linking feature to the game to provide players with multiple login methods.

4. Make sure to call the logout interface when users switch accounts to ensure that the login account is consistent with the account for other game services (Moments).
