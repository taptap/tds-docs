---
id: tap-fun-friends
title: 好友
sidebar_label: 好友
---

import MultiLang from '@theme/MultiLang';

该功能暂未对外开放

## 1 添加好友

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

## 2 删除好友

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

## 3 拉黑好友

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



## 4 取消拉黑

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

## 5 获取关注列表
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

## 6 获取粉丝列表

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



## 7 获取黑名单

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