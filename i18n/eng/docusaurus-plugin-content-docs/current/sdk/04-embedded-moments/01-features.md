---
id: features
title: Embedded Moments Features
sidebar_label: Features
---

## Introduction

By adding Embedded Moments to your game, you can have players access TapTap's forum without leaving the game so they can easily browse walkthroughs, share their game highlights, and interact with other players and officials.

## Core Advantages

**For game developers:**

- Allow players to share their gameplay with just a single click.
- Display officially published content on players' feeds.
- View what players have posted and provide timely feedback to them.

**For game players:**

- Communicate and interact with other players on a delayed basis while gaming.
- Look up walkthroughs and top players' solutions when stuck on certain scenes in the game.

## Account System

For a player to make a post or interact with other posts using Embedded Moments, they have to log in to a TapTap account. Therefore, you need to enable **[TapTap Login](/sdk/taptap-login/features/)** for your game before you can use Embedded Moments.

![](/img/embedded-moments/taplogin-moment.png)

## Moments

### Game Forum

A player can access the TapTap forum directly from the "Games" module:

![](/img/embedded-moments/game.png)

The following modules are included in the "Games" module:

![](/img/embedded-moments/game-detail.png)

1. **Sub-groups**: Sub-groups can help users filter feeds by categories. The settings of sub-groups are shared between the TapTap forum and Embedded Moments. You can edit sub-groups in "Group Management Center > Sub-group" and the edits will be displayed to the players once they are approved.

2. **Banners**: Banners can help you convey important notifications and events to players. This is a module exclusive to Embedded Moments. You can edit banners in "Gaming Ecosystem > Embedded Moments > Banner Configuration" and the edits will be displayed to the players once they are approved.

3. **Recommendations**: The recommendations section can be used to hold shortcuts to posts, sub-groups, and index pages. The settings of recommendations are also shared between the TapTap forum and Embedded Moments. You can edit recommendations in "Group Management Center > Recommendation" and the edits will be displayed to the players once they are approved.

4. **Feeds**: Trending posts are displayed to the player when they first enter Embedded Moments. The player can choose to sort posts by the time of the last reply or the time the post is published.

The following functions are also available to you:

- **Posting moments**: Players can post moments containing pictures and videos to the forum.

![](/img/embedded-moments/post.png)

- **Interactions**: Players can **like, comment, and forward** other players' moments.

![](/img/embedded-moments/repost.png)

<!-- ### Walkthroughs

- **Walkthrough Labels**: The player can look for "labels" in the quick navigation bar on the right with each containing three pieces of walkthroughs:

![](/img/embedded-moments/tips.png)

The player can click on the "View all" button on the top to view all the walkthroughs under the current "label":

![](/img/embedded-moments/all-tips.png)

- **Walkthrough indexes**: You can set up indexes that are displayed under "All walkthroughs" according to the number and types of walkthroughs.

![](/img/embedded-moments/all.png)

- **Notes on walkthroughs**

#### Why can't I see the "Walkthroughs" module in my game's Embedded Moments? How do I enable it?

If you want to add a "Walkthroughs" module, please reach out to us by submitting a **ticket** in the TapTap Developer Center.

#### Can I set up walkthroughs in the TapTap Developer Center? How should I do it?

Unfortunately, you can't set up walkthroughs yourself at this time. Please submit a **ticket** to us and we will have our professional editor team help you figure things out.

#### Submitting Tickets

进入 TapTap 开发者中心后台，点击右上角「工单」，创建工单时请选择「TDS 游戏服务」-「内嵌动态」-「其他问题」，提交你的诉求，我们会尽快给你答复。 -->

### Feeds

Players who logged in to TapTap can view the moments posted by their friends and the officials. When there are new moments available, there will be a **badge** on the "Follow" section on the navigation bar. This ensures that players will never miss out on important updates.

![](/img/embedded-moments/follow.png)

### Profile Page

Players can find their past moments on the "Me" page. Here players can share their moments to other apps or delete their moments.

![](/img/embedded-moments/me.png)

Players can view notifications by tapping the "Alarm" icon on the top right corner. Interactions between players will trigger notifications, which encourages players to interact more with each other.

![](/img/embedded-moments/msg.png)

## SDK Features

### Scenario-Based Portals

You can make any of the objects in your game as a portal that opens up Embedded Moments. You can even specify landing pages for certain scenes in the [Developer Center](#scenario-based-portal-configuration). This could be helpful if you want to allow players to quickly get help from the community when they're stuck on certain scenes in the game.

:::tip

1. The styles of the portals shall be designed to match the scenes they're placed at. TDS doesn't provide any guidelines for such portals so that it's possible for your game to convey a feeling of unity to the players.
2. The landing page of a portal can be set up to be an article or a specific module according to your own needs.

:::

![](/img/embedded-moments/scenario-portal.png)

### Badges

You can place buttons that can display badges in your game so that the players can be attracted to open the Embedded Moments when they see the badges.

![](/img/embedded-moments/red-dot.png)

:::tip

1. Using badges can help you increase the rate for players to open the Embedded Moments. We encourage you to place buttons with badges on prominent places in your game.
2. The badges here share the same logic as the badges for the "Follow" module within the Embedded Moments. The new content posted by the users followed by the players will trigger a notification, and the interval of retrieving new notifications is one time per minute (here 1 minute is the minimum interval; you can change it to 3 minutes, 5 minutes, etc.).
3. After the player opens the Embedded Moments, the game needs to clear the badge and continue inquiring for the next display of the badge.

:::

### One-Tap Publishing

Players can take screenshots within the game and quickly share them to Embedded Moments. Only text and images can be shared through this method.

![](/img/embedded-moments/share.png)

### Pop-up for Dynamically Closing Embedded Moments

While the player is browsing Embedded Moments, if there are events that demand the player to immediately return to the game, a pop-up can be displayed to serve as a reminder and offer a shortcut for the player to close the Embedded Moments.

![](/img/embedded-moments/popup.png)

## Administration

### Theme Configuration

To have Embedded Moments better fit in the scenes in the game and not make players feel cut off, TDS allows you to customize the theme of the Embedded Moments. You can upload a background image and specify the colors of texts in "Game Services" > "Embedded Moments" > "Theme".

:::tip

1. You can use [Embedded Moments Design Specifications](/design/design-moment/) as a reference.
2. If the game only supports landscape _or_ portrait mode, you only need to provide one background image. Otherwise, you need to provide background images for both.
3. Images are subject to review, which usually takes 2 business days.

:::

![](/img/embedded-moments/tapmoment-theme-config.png)

### Banner Configuration

You can set up banners in Embedded Moments to help you broadcast your events to the players. To set up banners, go to "Game Services" > "Embedded Moments" > "Banner Configuration". **A title, background image, and link** is required for each banner.

:::tip

1. You can set up at most 5 banners that link to any website.
2. Banners are subject to review, which is usually done within the same day.

:::

![](/img/embedded-moments/banner-config.png)

### Scenario-Based Portal Configuration

You can set up scenario-based portals in "Game Services" > "Embedded Moments" > "Scenario-based Portal". Once you submit a **portal name, landing page type, and landing page**, you can use the generated portal ID in your game. This module doesn't require any reviews, and you are free to change the landing page of each portal.

![](/img/embedded-moments/scenario-based-portal-configuration.png)

## Group Management Center

![](/img/embedded-moments/forum-management.png)

### Group Data

To help you better assess the value of Embedded Moments and get feedback about the quality of content, you can view data associated with Embedded Moments through "Game Services" > "Embedded Moments" > "Group Management Center". Make sure you have the permission required to view such data.

### Recommendations

You can set up recommendations in "Group Management Center" > "Recommendation". **A title, image, and link** is required for each recommendation. Adding and editing recommendations are subject to review.

### Sub-groups

You can set up sub-groups in "Group Management Center" > "Sub-group". **A name (in multiple languages)** is required for each sub-group. Adding and editing sub-groups are subject to review.
