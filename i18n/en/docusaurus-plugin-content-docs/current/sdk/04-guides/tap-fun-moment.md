---
id: tap-fun-moment
title: Embedded Moments
sidebar_label: Embedded Moments
---


import MultiLang from'@theme/MultiLang';

This guide describes how to integrate [TapTap Embedded Moments](/sdk/features/pro-moment) to your game.

## Set up Callback

Set up callbacks to receive state changes of Embedded Moments.

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

The code parameter in the callback method represents the event type. The following callback types are supported:

 Callback         | Callback Value | Description       |
 ----------- | --- | -------- |
 CALLBACK\_CODE\_PUBLISH\_SUCCESS       | 10000   | Moment published successfully.    |
 CALLBACK\_CODE\_PUBLISH\_FAIL     | 10100   | Failed to publish the moment.     |
 CALLBACK\_CODE\_PUBLISH\_CANCEL       | 10200   | The Moment editor is closed.     |
 CALLBACK\_CODE\_GET\_NOTICE\_SUCCESS | 20000   | New messages retrieved successfully. |
 CALLBACK\_CODE\_GET\_NOTICE\_FAIL | 20100   | Failed to retrieve new messages. |
 CALLBACK\_CODE\_MOMENT\_APPEAR | 30000   | The moment view is opened. |
 CALLBACK\_CODE\_MOMENT\_DISAPPEAR | 30100   | The moment view is closed. |
 CALLBACK\_CODE\_ClOSE\_CANCEL | 50000   | Cancel closing moment view. (The cancel button in the pop-up is clicked.)
 CALLBACK\_CODE\_ClOSE\_CONFIRM | 50100   | Confirm closing the moment view. (The confirm button in the pop-up is clicked.) |
 CALLBACK\_CODE\_LOGIN\_SUCCESS | 60000   | Successfully logging in on the Moment view. |

## Fetch Notifications

Invoke the fetching notifications method regularly so that when new messages arrives, a small red dot can be displayed on the TapTap Moment portal, reminding the user to check for new messages.

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

The result will be returned in the callback specified at the beginning of this guide. If the `code value` is `CALLBACK_CODE_GET_NOTICE_SUCCESS` ( `20000` ), then the messages are successfully retrieved. If the value is `CALLBACK_CODE_GET_NOTICE_FAIL` ( `20100` ), then the messages failed to be retrieved.
When the messages are fetched successfully, `msg` will be the number of new messages, while `0` means that there are no new messages.

:::tip
In order to make it easier for players to check for their friends' Moments and other messages, we recommend to place the TapTap Moment portal in a noticeable location. We also recommend you to invoke the fetching notifications method **once every minute**.

When fetching the message notifications, if there is no new message ( `msg` is `0` ), you will need to clear the small red dot on the user interface.
Similarly, after the player opened TapTap Moments, you will also need to clear the red dot.
:::
## Display TapTap Moments

Embed the TapTap Moments in your game so  players can view and post Moments without leaving.

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
When opening the TapTap Moments, mute the game's own sound first to avoid interfering the sound of videos in Moments.

If you want the Moments view to auto-rotate following the screen of the device, the game itself needs to support both landscape and portrait modes.

As mentioned above, do not forget to clear the red dot at the Moments portal after the user opens the Moments.
:::

The background image of the moment view is configurable. [Click here to see the details](/img/tap_moment_bg.png).
The background image will only be effective after passing the review. Make sure to leave sufficient time for manual review in your plan.

## Close TapTap Moments

Players can exit the TapTap Moments.
However, under certain scenarios, the game itself may also need to close the Moments.

For example, when the player is ready to start the battle, the game may remind the player to close the Moments, which will be closed after player confirms.

<MultiLang>

```cs
TapMoment.Close("Prompt", "Prepare yourself for the battle.");
```

```java
TapMoment.closeWithConfirmWindow("Prompt", "Prepare yourself for battle.");
```

```objectivec
[TapMoment closeWithTitle:@"Prompt" content:@"Prepare yourself for battle." showConfirm:YES];
```

</MultiLang>

The user's choice will be returned via callback:

- `CALLBACK_CODE_ClOSE_CANCEL` (50000) means that the player has clicked "Cancel" and chose to not close the Moments.
- `CALLBACK_CODE_ClOSE_CONFIRM` (50100) means that the player clicked "Confirm" and chose to close the Moments.

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
This is optional. You need to decide whether to integrate it based on your own needs.
:::

We recommend to let players post new Moment directly in the Embedded Moments.
However, the SDK also provides an API for publish a new Moment. This will support the “one-click publish” feature required by some games.
This type of Moment can include single or multiple images and the corresponding text.

<MultiLang>

```cs
string content = "description";
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
Players can post images and videos on the Moments.
However, "One-click publish" only supports images.
:::
