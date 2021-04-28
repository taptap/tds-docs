---
id: tap-fun-moment
title: Moment
sidebar_label: Moment
---


import MultiLang from'@theme/MultiLang';

This guide describes how to integrate [TapTap Moment](/pro/pro-moment) to your game.

## Set up Callback

Set up callbacks to receive Moment state changes.

<MultiLang>

```cs
TapMoment.SetCallback((code, msg) => {
  Debug.Log(code + "---" + msg);
});
```

```java
TapMoment.setCallback(new TapMoment.TapMomentCallback() {
    @Override
    public void onCallback(int code, String msg) {

    }
});
```

```objectivec
@interface ViewController ()<TapMomentDelegate>
@end

[TapMoment setDelegate:self];
-(void)onMomentCallbackWithCode:(NSInteger)code msg:(NSString *)msg
{
  NSLog (@"msg:%@, code:%i", msg, code);
}  
```

</MultiLang>

The code parameter in the callback method represents the event type. Currently, the following callback types are supported:

 Callback          | Callback Value | Description       |
 ----------- | --- | -------- |
 CALLBACK_CODE_PUBLISH_SUCCESS       | 10000   | Moment published successfully.     |
 CALLBACK_CODE_PUBLISH_FAIL     | 10100   | Failed to publish the moment.     |
 CALLBACK_CODE_PUBLISH_CANCEL       | 10200   | The moment publishing view is closed.     |
 CALLBACK_CODE_GET_NOTICE_SUCCESS | 20000   | Retrieve new messages successfully. |
 CALLBACK_CODE_GET_NOTICE_FAIL | 20100   | Failed to retrieve new messages. |
 CALLBACK_CODE_MOMENT_APPEAR | 30000   | The moment view is opened. |
 CALLBACK_CODE_MOMENT_DISAPPEAR | 30100   | The moment view is closed. |
 CALLBACK_CODE_ClOSE_CANCEL | 50000   | Canceling to close moment view. (The cancel button in the pop-up view is clicked.) |
 CALLBACK_CODE_ClOSE_CONFIRM | 50100   | Confirming to close moment view. (The confirm button in the pop-up view is clicked.) |
 CALLBACK_CODE_LOGIN_SUCCESS | 60000   | Successfully signed in in the moment view. |

## Fetching Notifications

Invoke the fetching notifications method periodically. When new messages arrive, a small red dot can be displayed on the TapTap Moment entry point, reminding the user to check for new messages.

<MultiLang>

```cs
TapMoment.FetchNotification();
```

```java
TapMoment.fetchNotification();
```

```objectivec
[TapMoment fetchNotification];
```

</MultiLang>

The result will be returned in the callback specified at the beginning of this guide. If the `code` value is `CALLBACK_CODE_GET_NOTICE_SUCCESS` ( `20000` ), then the retrieving succeeded. If the value is `CALLBACK_CODE_GET_NOTICE_FAIL` ( `20100` ), then the retrieving failed.
When successfully retrieving the notifications, `msg` will be the number of new messages, and `0` means that there are no new messages.

:::tip
In order to make it easier for players to check for their friends' moments, game announcements, etc., we recommend to place the TapTap Moment entry point in a conspicuous position, and to invoke the fetching notifications method **once every minute**.

When fetching the message notifications, if there is no new message ( `msg` is `0` ), then you need to clear the small red dot on the user interface.
Similarly, after the player opened the TapTap Moment view, you also need to clear the small red dot.
:::
## TapTap Moment View

Let’s see how to display the TapTap Moment view. In this view, players can view and post moments.

<MultiLang>

```cs
TapMoment.Open(TapSDK.Orientation.ORIENTATION_LANDSCAPE);
```

```java
TapMoment.open(TapMoment.ORIENTATION_PORTRAIT);
```

```objectivec
TapMomentConfig *mConfig = TapMomentConfig.new;
mConfig.orientation = TapMomentOrientationDefault;
[TapMoment open:mConfig];
```

</MultiLang>


:::note
When opening the TapTap Moment view, please mute the game's own sound first to avoid interfering the video sound of the moment.

If you want the moment view to auto rotate itself according to the orientation of the device, the game itself needs to support both landscape and portrait modes.

As mentioned above, do not forget to clear the red dot at the moment view entry point after opening the moment view.
:::

The background image of the moment view is configurable. [Click here to see the illustration](/img/tap_moment_bg.png). 
The background image will take effect after reviewed. Make sure to allow sufficient time for manual review.

## Close TapTap Moment View

Players can exit right in the TapTap Moment view.
However, under certain scenarios, the game itself may also need to close the moment view.

For example, when the player is ready to start the battle, the game can prompt the player to close the moment view. And the moment view will be closed upon the player’s confirmation.

<MultiLang>

```cs
TapMoment.Close("Prompt", "Prepare yourself for battle.");
```

```java
TapMoment.closeWithConfirmWindow("Prompt", "Prepare yourself for battle.");
```

```objectivec
[TapMoment closeWithTitle:@"Prompt" content:@"Prepare yourself for battle." showConfirm:YES];
```

</MultiLang>

The user's choice will be returned via callback:

- `CALLBACK_CODE_ClOSE_CANCEL` (50000) means that the player clicked "Cancel" and chose to not close the moment view.
- `CALLBACK_CODE_ClOSE_CONFIRM` (50100) means that the player clicked "Confirm" and chose to close the moment view.

If you need to close the moment view without confirmation:

<MultiLang>

```cs
TapMoment.Close();
```

```java
TapMoment.close();
```

```objectivec
[TapMoment close];
```

</MultiLang>

## One-Click Publish

:::info
This is optional. You need to decide whether your game needs this feature based on your design.
:::

We recommend to let players post new moments directly in the moment view.
However, the SDK also provides an API for publish a new moment. This allows for the “one-click publish” feature required by some games.
A moment includes single or multiple pictures and corresponding text content.

<MultiLang>

```cs
string content = "I am the description";
string[] images = {"imgpath01","imgpath02","imgpath03"};
TapMoment.Publish(Orientation.ORIENTATION_LANDSCAPE, images, content);
```

```java
int orientation = TapMoment.ORIENTATION_PORTRAIT;
String content = "description";
String[] imagePaths = new String[]{"content://hello.jpg", "/sdcard/world.jpg"};
TapMoment.publish(orientation, imagePaths, content);
```

```objectivec
TapMomentConfig * tconfig = TapMomentConfig.new;
tconfig.orientation = TapMomentOrientationDefault;

TapMomentImageData *postData = TapMomentImageData.new;
postData.images = @[@"file://..."];
postData.content = @"I am a picture description";
[TapMoment publish:tconfig content:(postData)];
```

</MultiLang>

:::info
Players can post both images and videos within the moment view.
"One-click publish" only supports images.
:::
