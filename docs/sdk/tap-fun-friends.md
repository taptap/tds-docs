---
id: tap-fun-friends
title: 好友
sidebar_label: 好友
---

import MultiLang from '@theme/MultiLang';

该功能暂未对外开放

## 1. 注册消息回调


<MultiLang>

```cs
//实现ITapMessageListener接口
 public void OnMessageWithCode(int code, Dictionary<string, object> extras)
{
    Debug.Log( "code: " + code + " extras: " + Json.Serialize(extras));
}

```

```java
TapFriends.registerMessageCallback(new ComponentMessageCallback() {
    @Override
    public void onMessage(int code, Map<String, String> map) {
                
    }
});
```


```objectivec
- (void)onMessageWithCode:(NSInteger)code extras:(NSDictionary *)extras
{
    NSLog(@"code %@, %@", code,extras);
}
```

</MultiLang>

## 2. 添加好友

<MultiLang>

```cs
TapFriends.AddFriend("tds id",(err)=> {
    if (err != null)
    {
        Debug.Log("添加好友成功");
    }
});
```

```java
TapFriends.addFriend("userID", new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        Log.d("TapTap", "添加好友成功");
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        Log.d("TapTap", "添加好友失败" + tapFriendError.detailMessage);
    }
});
```


```objectivec
[TapFriends addFriend:@"tds id" handler:^(NSError * _Nullable error) {
    if (error!=nil){
        NSLog (@"添加成功");
    }
}];
```

</MultiLang>

#### 参数说明
userId : tds id，登录成功后从服务端获取

## 3. 删除好友

<MultiLang>

```cs
TapFriends.DeleteFriend("tds id", (err) => {
    if (err != null)
    {
        Debug.Log("删除好友成功");
    }
});
```
```java
TapFriends.deleteFriend("userID", new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        Log.d("TapTap", "删除好友成功");
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        Log.d("TapTap", "删除好友失败" + tapFriendError.detailMessage);
    }
});
```


```objectivec
[TapFriends deleteFriend:@"tds id" handler:^(NSError * _Nullable error) {
    if (error!=nil){
        NSLog (@"删除成功");
    }
}];
```
</MultiLang>

## 4. 拉黑好友

<MultiLang>

```cs
TapFriends.BlockUser("tds id", (err) => {
    if (err != null)
    {
        Debug.Log("拉黑成功");
    }
});
```

```java
TapFriends.blockUser("userID", new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        Log.d("TapTap", "拉黑好友成功");
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        Log.d("TapTap", "拉黑好友失败" + tapFriendError.detailMessage);
    }
});
```


```objectivec
[TapFriends blockUser:@"tds id" handler:^(NSError * _Nullable error) {
    if (error!=nil){
        NSLog (@"拉黑成功");
    }
}];

```

</MultiLang>



## 5. 取消拉黑

<MultiLang>

```cs
TapFriends.UnblockUser("tds id", (err) => {
    if (err != null) {
        Debug.Log("取消拉黑成功");
    }
});
```

```java
TapFriends.unblockUser("userID", new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        Log.d("TapTap", "取消拉黑好友成功");
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        Log.d("TapTap", "取消拉黑好友失败" + tapFriendError.detailMessage);
    }
});
```


```objectivec
[TapFriends unblockUser:@"tds id" handler:^(NSError * _Nullable error) {
    if (error!=nil){
        NSLog (@"取消拉黑成功");
    }
}];
```

</MultiLang>

## 6. 获取关注列表
以下列表形式获取均为分页获取


<MultiLang>

```cs
//public static void GetFollowingList (int from, bool mutualAttention, int limit, Action<List<TapUserRelationShip>, TapError> action);

 TapFriends.GetFollowingList(0, true, 100, ( relationShip ,err) => {
    foreach (TapUserRelationShip fi in relationShip)
    {
        Debug.Log("tds id :" + fi.userId);
    }
});
```

```java
TapFriends.getFollowingList(0, true, 100, new ListCallback<TapUserRelationship>() {
    @Override
    public void onSuccess(List<TapUserRelationship> list) {
        for (TapUserRelationship i : list){
            System.out.println(i);
        }
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        Log.d("TapTap", "关注好友列表失败： " + tapFriendError.detailMessage);
    }
});
```


```objectivec
[TapFriends getFollowingList:0 mutualAttention:true limit:100 handler:^(NSArray<TapUserRelationShip *> * _Nullable userList, NSError * _Nullable error) {
    if (error!=nil){
        for (int i=0; userList.count; i++) {
            NSLog(@"%@", userList[0]);
        }
    }
}];

```

</MultiLang>


#### 参数说明
TapUserRelationShip  

参数  | 描述
| ------ | ------ |
userid | 用户id (tds id)
name  | 用户nick name
avatar  | 头像地址
gender | UNKNOWN = 0;<br/>MALE = 1;<br/> FEMALE = 2;
mutualAttention | 是否互相关注 <br/>false:不是互相关注 <br/>true: 互相关注

## 7. 获取粉丝列表

<MultiLang>

```cs
TapFriends.GetFollowerList(0, 100, (relationShip, err) => {
    foreach (TapUserRelationShip fi in relationShip)
    {
        Debug.Log("tds id :" + fi.userId);
    }
});
```


```java
TapFriends.getFollowerList(0, 100, new ListCallback<TapUserRelationship>() {
    @Override
    public void onSuccess(List<TapUserRelationship> list) {
        for (TapUserRelationship f : list){
            System.out.println(f);
        }
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        Log.d("TapTap", "关注粉丝列表失败： " + tapFriendError.detailMessage);
    }
});
```


```objectivec
[TapFriends getFollowerList:0 limit:100 handler:^(NSArray<TapUserRelationShip *> * _Nullable userList, NSError * _Nullable error) {
    if (error!=nil){
        for (int i=0; userList.count; i++) {
            NSLog(@"%@", userList[0]);
        }
    }
}];
```

</MultiLang>



## 8. 获取黑名单

<MultiLang>

```cs
TapFriends.GetBlockList(0, 100, (relationShip, err) => {
    foreach (TapUserRelationShip fi in relationShip) {
        Debug.Log("tds id :" + fi.userId);
    }
});
```


```java
TapFriends.getBlockList(0, 100, new ListCallback<TapUserRelationship>() {
    @Override
    public void onSuccess(List<TapUserRelationship> list) {
        for (TapUserRelationship b : list){
            System.out.println(b);
        }
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        Log.d("TapTap", "获取黑白单列表失败： " + tapFriendError.detailMessage);
    }
});
```


```objectivec
[TapFriends getBlockList:0 limit:100 handler:^(NSArray<TapUserRelationShip *> * _Nullable userList, NSError * _Nullable error) {
        if (error!=nil){
            for (int i=0; userList.count; i++) {
                NSLog(@"%@", userList[0]);
            }
        }
}];
```

</MultiLang>



## 9. 分享好友邀请链接

1. 生成链接并唤起系统分享控件
2. 选择分享应用，分享链接给对方
3. 对方点击链接，会打开下面图示
4. 如果对方已经安装该游戏，则直接打开游戏并添加关注；如果对方未安装该游戏，则选额跳转到TapTap进行安装

![friends](/img/friends-follow.jpg)

<MultiLang>

```cs
TapFriends.SendFriendInvitation((isInvitation, error) =>
{
    if (error != null)
    {
        label = $"Error:{error.code} Description:{error.errorDescription}";
    }
    else
    {
        label = "分享好友邀请: ";
        this.label = this.label + (isInvitation ? "成功" : "失败");
    }
});
```


```java
TapFriends.sendFriendInvitation(Activity activity, new Callback<Boolean>() {
    @Override
    public void onSuccess(Boolean aBoolean) {
        // 分享好友邀请成功
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        // 分享好友邀请失败
    }
});
```


```objectivec
[TapFriends sendFriendInvitationWithHandler:^(BOOL success, NSError *_Nullable error) {
    if (success) {
        NSLog(@"分享成功");
    } else {
        NSLog(@"分享失败 %@", error);
    }
}];

```

</MultiLang>

##  10. 获取好友邀请链接

获取到上图示「关注好友」的分享链接（「分享好友邀请链接」功能的简略版，省去了分享，只生成相关链接），游戏可以通过自己的方式将该链接分享出去

<MultiLang>

```cs
 TapFriends.GenerateFriendInvitation((invitationString, error) =>
{
    if (error != null)
    {
        label = $"Error:{error.code} Description:{error.errorDescription}";
    }
    else
    {
        label = "获取好友邀请链接成功: ";
        this.label = this.label + invitationString;
    }
});
```


```java
TapFriends.generateFriendInvitation(new Callback<String>() {
    @Override
    public void onSuccess(String s) {
        // 获取好友邀请链接成功
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        // 获取好友邀请链接失败
    }
});
```


```objectivec
[TapFriends generateFriendInvitationWithHandler:^(NSString *_Nullable invitationString, NSError *_Nullable error) {
    if (error) {
        NSLog(@"error:%@", error);
    } else {
        NSLog(@"url %@", invitationString);
    }
}];
```

</MultiLang>




## 11. 搜索用户

<MultiLang>

```cs

TapFriends.SearchUser(userId, (relationShip, error) =>
{
    if (error != null)
    {
        label = $"Error:{error.code} Description:{error.errorDescription}";
    }
    else
    {
        label = "搜索用户成功";
        this.label = this.label + "userId：" + relationShip.userId +
                        " name：" + relationShip.name +
                        " avatar：" + relationShip.avatar +
                        " gender：" + relationShip.gender +
                        " mutualAttention：" + relationShip.mutualAttention +
                        " relationship：" + relationShip.relationship + "\n";
    }
});
```


```java
TapFriends.searchUser("userID", new Callback<TapUserRelationship>() {
    @Override
    public void onSuccess(TapUserRelationship tapUserRelationship) {
        // 搜索好友成功
        tapUserRelationship.toJSON();
    }

    @Override
    public void onFail(TapFriendError tapFriendError) {
        // 搜索好友失败
    }
});
```


```objectivec
[TapFriends searchUserWithUserId:@"tds id" handler:^(TapUserRelationShip *_Nullable user, NSError *_Nullable error) {
    if (error) {
        NSLog(@"error:%@", error);
    } else {
        NSString *str = @"";

        str = [str stringByAppendingString:[self beanToString:user]];
        str = [str stringByAppendingString:@"\n\n"];

        NSLog(@"friend list %@ %@ %@ %@", str, user.isBlocked ? @"yes" : @"no", user.isFollowed ? @"yes" : @"no", user.isFollowing ? @"yes" : @"no");
    }
}];

```

</MultiLang>



