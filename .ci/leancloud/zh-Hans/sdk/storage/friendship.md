---
title: 好友关系开发指南
sidebar_label: 好友关系
slug: /sdk/storage/guide/friendship/
sidebar_position: 17
---

import MultiLang from "/src/docComponents/MultiLang";

阅读此文档前请先阅读[数据存储开发指南](/sdk/storage/guide/js/)，了解数据存储的基础。

LeanCloud 将好友关系分为两种。一种是单向关注，例如微博里面被关注者及粉丝，这种方式不需要好友申请，每一个人都可以随时关注另一个人。另一种是互为好友，例如微信好友，需要双方互相认为对方是自己的朋友后才能确立好友关系，在这种方式下 A 需要向 B 申请成为好友，B 同意后双方互为好友。

不管是哪一种好友关系，数据都会被存储在 `_Followee` 表或 `_Follower` 表中。

## 单向关注

在这种关系模式中，我们分为了 `Follower` 和 `Followee` 两种类型，分别表示用户的粉丝和用户的关注，在控制台中对应着两张表 `_Follower` 和 `_Followee`。当用户 A 成功关注用户 B 后，我们可以发现在 `_Follower` 和 `_Followee` 表中各自新增了一条数据。

### 权限管理

好友关系接口向 `_Follower` 及 `_Followee` 表存储数据时默认使用 `friendshipACL`，更改其中一个表的 `friendshipACL`，另一张表的 `friendshipACL` 也会随之更改。在应用控制台 -「存储」-「结构化数据」-「_Followee 或_Follower 表」- 「权限」中可以看到默认的 `friendshipACL` 设置。其中包含三个选项：

* 共享权限：请求中的 User 和目标 Friend。**默认选项**，只有发起请求的用户以及自己关注的人，可以查看或修改自己的数据。如果需要所有人都能互相看到粉丝，可以将 read 权限修改为「所有用户」。
* 公开权限：所有用户。所有用户都可以查询或修改当前用户的关注及其粉丝。
* 私有权限：请求中的 User。只有发起请求的用户可以查看或修改自己的数据，其他所有用户均不可对数据进行操作。

### SDK

#### 关注某个用户

<MultiLang kind="fulltext">

```cs
// 关注
try {
  await currentUser.Follow("user_object_id");
  // 关注成功
} catch (Exception e) {
  // 关注失败
}
```

```java
//关注
AVUser.getCurrentUser().followInBackground(userObjectId).subscribe(new Observer<JSONObject>() {
  @Override
  public void onSubscribe(Disposable disposable) {
  }

  @Override
  public void onNext(JSONObject object) {
    System.out.println("succeed follow. " + object.toString());
  }

  @Override
  public void onError(Throwable throwable) {
    throwable.printStackTrace();
  }

  @Override
  public void onComplete() {
  }
});
```

```objc
NSString *userObjectId = @"XXXXXX";
//关注
[[LCUser currentUser] follow:userObjectId andCallback:^(BOOL succeeded, NSError *error) {
}];
```

```dart
// 关注
try {
  await currentUser.follow('user_object_id');
  // 关注成功
} on Exception catch (e) {
  // 关注失败
}
```

```javascript
AV.User.current().follow('user_object_id').then(function(){
  //关注成功
}, function(err){
  //关注失败
  console.dir(err);
});
```

</MultiLang>

我们允许在 follow 的时候同时传入一个 attributes 字典，用于设置关系的属性，这些属性都将在 `_Follower` 和 `_Followee` 表同时存在：

<MultiLang kind="fulltext">

```cs
// 关注
try {
  Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "score", 100 }
  };
  await currentUser.Follow("user_object_id", attrs);
  // 关注成功
} catch (Exception e) {
  // 关注失败
}
```

```java
Map<String, Object> attributes = ......
AVUser.getCurrentUser().followInBackground(userObjectId, attributes).subscribe(new Observer<JSONObject>() {
  @Override
  public void onSubscribe(Disposable disposable) {

  }

  @Override
  public void onNext(JSONObject object) {
    System.out.println("succeed follow. " + object.toString());
  }

  @Override
  public void onError(Throwable throwable) {
    throwable.printStackTrace();
  }

  @Override
  public void onComplete() {
  }
});
```

```objc
   NSDictionary * attrs = ……
   [[LCUser currentUser] follow:userObjectId userDictionary:attrs andCallback:^(BOOL succeeded, NSError *error) {
     //处理结果
    }];
```

```dart
// 关注
try {
  Map<String, dynamic> attrs = {'score': 100};
  await currentUser.follow('user_object_id', attrs: attrs);
  // 关注成功
} on Exception catch (e) {
  // 关注失败
}
```

```javascript
AV.User.current().follow({
  user: 'user_object_id',
  attributes: {
    group: ['music'],
  },
});
```

</MultiLang>

#### 取消关注某个用户

<MultiLang kind="fulltext">

```cs
try {
  await currentUser.Unfollow("user_object_id");
  // 取关成功
} catch (Exception e) {
  // 取关失败
}
```

```java
//取消关注
AVUser.getCurrentUser().unfollowInBackground(userObjectId).subscribe(new Observer<JSONObject>() {
  @Override
  public void onSubscribe(Disposable disposable) {
  }

  @Override
  public void onNext(JSONObject object) {
    System.out.println("succeed unfollow. " + object.toString());
  }

  @Override
  public void onError(Throwable throwable) {
    throwable.printStackTrace();
  }

  @Override
  public void onComplete() {
  }
});
```

```objc
NSString *userObjectId = @"XXXXXX";
//取消关注
[[LCUser currentUser] unfollow:userObjectId andCallback:^(BOOL succeeded, NSError *error) {
}];
```

```dart
try {
  await currentUser.unfollow('user_object_id');
  // 取关成功
} on Exception catch (e) {
  // 取关失败
}
```

```javascript
AV.User.current().unfollow('user_object_id').then(function(){
  //取消关注成功
}, function(err){
  //取消关注失败
  console.dir(err);
});
```

</MultiLang>

#### 查询我关注的人

我们使用 `FollowerQuery` 和 `FolloweeQuery` 对关注关系进行查询。`FollowerQuery` 和 `FolloweeQuery` 返回的 `Query` 对象可以像普通的 `Query` 对象那样使用，它们本质上都是查询数据管理平台中的 `_Follower` 和 `_Followee`表，你可以添加 order、skip、limit 以及其他 where 条件等信息。

<MultiLang kind="fulltext">

```cs
LCQuery<LCObject> query = currentUser.FolloweeQuery();
ReadOnlyCollection<LCObject> followees = await query.Find();
```

```java
// 查询关注者
AVQuery<AVObject> followeeQuery = userA.followeeQuery();
followeeQuery.findInBackground().subscribe(new Observer<List<AVObject>>() {
  @Override
  public void onSubscribe(Disposable disposable) {
  }

  @Override
  public void onNext(List<AVObject> avObjects) {
    // avObjects 包含了 userA 的关注列表。
    // 遍历数组，对每一个 object 获取`followee` 属性值即为 User 实例。
    for (AVObject tmp: avObjects) {
      System.out.println("result User:" + tmp.getAVObject("followee"));
    }
  }

  @Override
  public void onError(Throwable throwable) {
    throwable.printStackTrace();
  }

  @Override
  public void onComplete() {

  }
});
```

```objc
LCQuery *query= [LCUser followeeQuery:@"USER_OBJECT_ID"];
// 通过 `include` 将 followee 的所有信息查询包括进来
[query includeKey:@"followee"];
```

```dart
LCQuery<LCObject> query = currentUser.followeeQuery();
List<LCObject> followees = await query.find();
```

```javascript
var query = AV.User.current().followeeQuery();
// 通过 `include` 将 followee 的所有信息查询包括进来
query.include('followee');
query.find().then(function(followees){
  //关注的用户列表 followees
});
```

</MultiLang>

#### 查询我的粉丝

他人关注了我，他人就是我的粉丝，查询粉丝的方法如下：

<MultiLang kind="fulltext">

<>

```cs
LCQuery<LCObject> query = currentUser.FollowerQuery();
ReadOnlyCollection<LCObject> followers = await query.Find();
```

</>

<>

```java
// 其中 userA 是 AVUser 对象，你也可以使用 AVUser 的子类化对象进行查询
// 查询粉丝
AVQuery<AVObject> followerQuery = userA.followerQuery();
followerQuery.findInBackground().subscribe(new Observer<List<AVObject>>() {
  @Override
  public void onSubscribe(Disposable disposable) {
  }

  @Override
  public void onNext(List<AVObject> avObjects) {
    // avObjects 包含了 userA 的粉丝列表。
    // 遍历数组，对每一个 object 获取`follower` 属性值即为 User 实例。
    for (AVObject tmp: avObjects) {
      System.out.println("result user:" + tmp.getAVObject("follower"));
    }
  }

  @Override
  public void onError(Throwable throwable) {
    throwable.printStackTrace();
  }

  @Override
  public void onComplete() {

  }
});
```

通过 AVQuery，你也可以增加 `skip` 或者 `limit` 操作来分页查询，比如：

```java
AVQuery<AVObject> followerSkipQuery = userA.followerQuery();
followerSkipQuery.setLimit(50);
followerSkipQuery.skip(100);
followerSkipQuery.findInBackground().subscribe(new Observer<List<AVObject>>() {
  @Override
  public void onSubscribe(Disposable disposable) {
  }

  @Override
  public void onNext(List<AVObject> avObjects) {
    // avObjects 包含了 userA 的粉丝列表。
    // 遍历数组，对每一个 object 获取`follower` 属性值即为 User 实例。
    for (AVObject tmp: avObjects) {
      System.out.println("result User:" + tmp.getAVObject("follower"));
    }
  }

  @Override
  public void onError(Throwable throwable) {
    throwable.printStackTrace();
  }

  @Override
  public void onComplete() {
  }
});
```

你也可以查找某个特定的粉丝，比如：

```java
AVQuery<AVObject> followerNameQuery = userA.followerQuery();
followerNameQuery.whereEqualTo("follower", userC);
followerNameQuery.findInBackground(new FindCallback<AVUser>() {
    @Override
    public void done(List<AVUser> avObjects, AVException avException) {
        // avObjects 中应当只包含 userC
    }
});
```

总之 `followerQuery` 和 `followeeQuery` 返回的 AVQuery 可以增加其他查询条件，只要在 `_Followee` 和 `_Follower` 表里存在的属性都可以作为查询或者排序条件。

</>
<>

```objc
LCQuery *query= [LCUser followerQuery:@"USER_OBJECT_ID"];
[query includeKey:@"follower"];
```

</>
<>

```dart
LCQuery<LCObject> query = currentUser.followerQuery();
List<LCObject> followers = await query.find();
```

</>
<>

```javascript
var query = AV.User.current().followerQuery();
query.include('follower');
query.find().then(function(followers){
  //粉丝列表 followers
});
```

</>

</MultiLang>

#### 一次性获取粉丝和关注列表

下面的方法实现了一次获取粉丝和关注用户列表的功能，当然，你也可以用上面的方法通过两次调用来获取这些数据，特别是用户列表很长需要翻页的时候，下面的方法就失效了。

<MultiLang kind="fulltext">

```cs
LCFollowersAndFollowees followersAndFollowees = await currentUser.GetFollowersAndFollowees();
```

```java
AVUser.currentUser().getFollowersAndFolloweesInBackground(new FollowersAndFolloweesCallback() {
  @Override
  public void done(Map avObjects, AVException avException) {
    if (null == avObjects || null != avException) {
      return;
    }
    try {
      List<AVUser> followerArray = (List<AVUser>)avObjects.get("follower");
      List<AVUser> followeeArray = (List<AVUser>)avObjects.get("followee");
    
      System.out.println("followers=" + followerArray);
      System.out.println("followees=" + followeeArray);
    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }

  @Override
  protected void internalDone0(Object o, AVException avException) {

  }
});
```

```objc
[[LCUser currentUser] getFollowersAndFollowees:^(NSDictionary *dict, NSError *error) {
    NSArray *followers=dict[@"followers"];
    NSArray *followees=dict[@"followees"];
}];
```

```dart
LCFollowersAndFollowees followersAndFollowees = await currentUser.getFollowersAndFollowees();
```

```javascript
user.getFollowersAndFollowees().then(function(followers, followees) {
  // 粉丝列表 followers
  // 关注列表 followees
}).catch(console.error);
```

</MultiLang>

#### 向粉丝展示动态

如果希望像微博那样向自己的粉丝发布状态，请继续阅读[社交信息流组件](/sdk/other/openview/status_system/)。

### REST API

使用这里的 API 来建立用户关系，你可以关注、取消关注某个用户。

* 这里的三个查询 API 都遵循我们的 REST API 规范，支持 `where`、`order`、`skip`、`limit`、`count`、`include` 等。如果没有特殊说明，返回的结果都是 `{results: [数组结果]}`，跟其他查询 API 保持一致。
* 用户在 `_Follower` 和 `_Followee` 表中都存储为 Pointer 类型，因此如果要查询出用户信息，应该加上 include 指定字段。

#### 关注和取消关注用户 API

通过操作 `/users/:user_id/friendship/:target_id` 资源可以关注或者取消关注某个用户，其中：

* `:user_id` 表示发起关注动作的用户的 objectId。如果设置了 `X-LC-Session` 头，则 `self` 表示当前登录用户。
* `:target_id` 表示想要关注的目标用户的 objectId。

例如，让当前用户 `51fa6886e4b0cc0b5a3792e9` 关注目标用户 `51e3a334e4b0b3eb44adbe1a`：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/friendship/51e3a334e4b0b3eb44adbe1a
```

关注后，`_Follower` 和 `_Followee` 都会多出一条记录，如果在 **控制台 &gt; 数据存储 &gt; 服务设置 &gt; 其他设置** 勾选了 **应用内社交模块，关注用户时自动反向关注**，会各多出两条记录。

取消关注通过：

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/friendship/51e3a334e4b0b3eb44adbe1a
```

关注还可以增加一些属性：

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -d '{"score": 100}' \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/friendship/51e3a334e4b0b3eb44adbe1a
```

那么 `score` 字段将同时出现在 `_Follower` 和 `_Followee` 表，可以作为查询或者排序条件。

修改当前关系的属性：

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -d '{"score": 200}' \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/friendship/51e3a334e4b0b3eb44adbe1a
```

#### 查询粉丝或者关注者列表 API

查询粉丝列表（也就是关注我的人），可以通过：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/followers
```

返回的用户列表是 Pointer 类型，如果想要将用户信息也返回，需要 include:

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'include=follower' \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/followers
```

查询关注的用户列表：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'include=followee' \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/followees
```

同时查询粉丝和关注的人：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'include=followee' \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/followersAndFollowees
```

结果返回：

```json
{followers: [粉丝列表], followees: [关注用户列表]}
```

如果指定 count=1，则返回结果里加上 followers_count 和 followees_count 表示粉丝数目和关注者数目：

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'include=followee' \
  --data-urlencode 'count=1' \
  https://API_BASE_URL/1.1/users/51fa6886e4b0cc0b5a3792e9/followersAndFollowees
```

获取互相关注的用户列表

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'include=followee' \
  --data-urlencode 'keys=followee.nickname,followee.shortId' \
  --data-urlencode 'limit=10' \
  --data-urlencode 'skip=5' \
  --data-urlencode 'where={"group": "whatever"}' \
  https://<API_BASE_URL>/1.1/users/<uid>/mutualFollowees
```

| 参数        | 约束   | 说明                                   |
| --------- | ---- | ---------------------------------------- |
| include | 可选   | `_Followee` 表中的一列，如果是 followee 列，则会返回该 followee 在 `_User` 表的详细信息，例如 nickname, shortId, avatar 等。 |
| keys | 可选   | 指定 `_Followee` 表中返回的列，如果是 Pointer 对象，支持用 `.` 来限定 Pointer 对象中的列。|
| where | 可选   |  附加 `_Followee` 表的 where 查询条件。不支持指定针对 user 和 followee 字段的查询条件。|

结果返回：

```json
{
  "results": [
    {
      "group": "大佬",
      "followee": {
        "updatedAt": "2021-12-22T04:13:49.231Z",
        "objectId": "61c2a5fdf6f24e75ba1bea20",
        "username": "大熊",
        "shortId": "nqxdibi",
        "createdAt": "2021-12-22T04:13:49.231Z",
        "className": "_User",
        "__type": "Pointer"
      },
      "createdAt": "2021-12-22T04:13:49.738Z",
      "updatedAt": "2021-12-22T04:13:49.738Z", 
      "objectId": "61c2a5fdf6f24e75ba1bea28"  
    },
   {
      "followee": {
        "updatedAt": "2021-12-22T04:13:49.231Z",
        "objectId": "61c2a5fdf6f24e75ba1bea20",
        "username": "二熊",
        "shortId": "nqxdibi",
        "createdAt": "2021-12-22T04:13:49.231Z",
        "className": "_User",
        "__type": "Pointer"
      },
      "createdAt": "2021-12-22T04:13:49.738Z",
      "updatedAt": "2021-12-22T04:13:49.738Z",
      "objectId": "61c2a5fdf6f24e75ba1bea28"
    }
  ]
}
```

## 互为好友

除了单向关注外，我们还经常见到的一个场景为， 用户 A 申请加用户 B 为好友，在 B 同意后两人加为好友。我们使用 `_FriendshipRequest` 表及 `_Followee` 表来实现这种场景。`_FriendshipRequest` 表用来存储所有申请，`_Followee` 表用来存储好友数据。

### 权限管理

好友关系接口向 `_Followee` 表存储数据时默认使用 `friendshipACL`。在「应用控制台 > 数据存储 > 结构化数据 > `_Followee` 表 > 权限」中可以看到默认的 `friendshipACL` 设置。其中包含三个选项：

* 共享权限：请求中的 User 和目标 Friend。**默认选项**，只有发起请求的用户以及自己关注的人，可以查看或修改自己的数据。
* 公开权限：所有用户。所有用户都可以查询或修改当前用户的关注及其粉丝，相当于没有任何权限。
* 私有权限：请求中的 User。只有发起请求的用户可以查看或修改自己的数据，其他所有用户均不可对数据进行操作。**在互为好友关系中，建议将 write 权限设置为此权限**。

### SDK

#### 申请加为好友

申请加某人为好友之前，需要当前用户先登录。登录后申请好友的代码如下：

<MultiLang kind="fulltext">

```cs
try {
  await LCFriendship.Request("user_object_id");
  // 好友请求发送成功
} catch (Exception e) {
  // 好友请求发送失败
}
```

```java
AVUser friend = AVUser.createWithoutData(AVUser.class, testUserObjectId);
user.applyFriendshipInBackground(friend, null).subscribe(new Observer<AVFriendshipRequest>() {
  @Override
  public void onSubscribe(Disposable disposable) {
  }

  @Override
  public void onNext(final AVFriendshipRequest friendshipRequest) {
  }

  public void onError(Throwable throwable) {
  }

  public void onComplete() {
  }
});
```

```objc
[LCFriendship requestWithUserId:@"user_object_id" callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // 好友请求发送成功
    } else {
        // 好友请求发送失败
        NSLog(@"%@", error);
    }
}];
```

```dart
try {
  await LCFriendship.request('user_object_id');
  // 好友请求发送成功
} on Exception catch (e) {
  // 好友请求发送失败
}
```

```javascript
AV.Friendship.request('user_object_id')
  .then(() => {
    console.log('好友请求发送成功');
  })
  .catch((error) => {
    console.error('好友请求发送失败', error);
  });
```

</MultiLang>

发送申请成功后，我们可以发现 `_FriendshipRequest` 新增了一条数据，并且其 `status` 字段的值为 `pending`，表示这是一个正在进行中的好友申请。

在发起好友请求时，可以提前为朋友设置一些属性。属性字段可以任意指定自己需要的 key 和 value，例如分组为「sport」：

<MultiLang kind="fulltext">

```cs
Dictionary<string, object> attrs = new Dictionary<string, object> {
  { "group", "sport" }
};
await LCFriendship.Request("user_object_id", attrs);
```

```java
AVUser friend = AVUser.createWithoutData(AVUser.class, testUserObjectId);
Map<String, Object> attributes = new HashMap<>();
attributes.put("group", "sport");
user.applyFriendshipInBackground(friend, attributes).subscribe(new Observer<AVFriendshipRequest>() {
  @Override
  public void onSubscribe(Disposable disposable) {
  }

  @Override
  public void onNext(final AVFriendshipRequest friendshipRequest) {
  }

  public void onError(Throwable throwable) {
  }

  public void onComplete() {
  }
});
```

```objc
NSDictionary *attributes = @{
    @"group" : @"sport",
};
[LCFriendship requestWithUserId:@"user_object_id" attributes:attributes callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // 好友请求发送成功
    } else {
        // 好友请求发送失败
        NSLog(@"%@", error);
    }
}];
```

```dart
Map<String, dynamic> attrs = {'group': 'sport'};
await LCFriendship.request('user_object_id', attributes: attrs);
```

```javascript
AV.Friendship.request({
  friend: 'user_object_id',
  attributes: {
    group: 'sport',
  },
});
```

</MultiLang>

如果在申请好友时增加了属性，在申请发送成功后，`_Followee` 表中也会增加一条数据，代表着发起申请的 A 的好友为 B，其 `user` 列为用户 A，`followee` 列为用户 B， `friendStatus` 列的值为 `false`，代表着 B 没有接受过 A 的好友申请。属性值会被存储到相应的列中，例如上方的代码会在 `_Followee` 表中新增 `group` 列，其值为 `sport`。

#### 查询好友申请

用户上线登录后，可以立刻查询有谁向自己发起了好友申请：

<MultiLang kind="fulltext">

```cs
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>("_FriendshipRequest")
  .WhereEqualTo("friend", currentUser)
  .WhereEqualTo("status", "pending");
ReadOnlyCollection<LCFriendshipRequest> requests = await query.Find();
```

```java
// first `true` means that results will contain entire user info.
// second `true` indicates that all requests are sent to current user.
// you can look at the method signature for more details.
currentUser.friendshipRequestQuery(AVFriendshipRequest.STATUS_PENDING, true, true).findInBackground().subscribe(new Observer<List<AVFriendshipRequest>>() {
    @Override
    public void onSubscribe(@NotNull Disposable disposable) {
    }

    @Override
    public void onNext(@NotNull List<AVFriendshipRequest> avFriendshipRequests) {
    }

    public void onError(Throwable throwable) {
    }

    public void onComplete() {
    }
  });
```

```objc
LCQuery *query = [LCFriendshipRequest query];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    // handle result
}];
```

```dart
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>('_FriendshipRequest')
  .WhereEqualTo('friend', currentUser)
  .WhereEqualTo('status, 'pending');
List<LCFriendshipRequest> requests = await query.find();
```

```javascript
const query = new AV.Query('_FriendshipRequest');
query.equalTo('friend', AV.User.current());
// 未处理的申请，其在 _FriendshipRequest 表的 status 的值为 pending
query.equalTo('status', 'pending');
query.find().then((requests) => {
  // requests 是所有申请添加当前用户为好友的请求
});
```

</MultiLang>

#### 接受好友申请

用户 A 向用户 B 发起好友请求，用户 B 接受用户 A 的好友请求后：

* `_FriendshipRequest` 表中该条申请数据的 `status` 的值会被更新为 `accepted`。
* `_Followee` 表中已有的 `user` 为用户 A 及 `followee` 为用户 B 的数据，其 `friendStatus` 的值会被更新为 `true`，代表着 B 是 A 的好友。
* `_Followee` 表中新增 `user` 为用户 B 的数据，其 `followee` 值为用户 A，`friendStatus` 的值为 `true`，代表着 A 是 B 的好友。

<MultiLang kind="fulltext">

```cs
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>("_FriendshipRequest")
  .WhereEqualTo("friend", currentUser)
  .WhereEqualTo("status", "pending");
ReadOnlyCollection<LCFriendshipRequest> requests = await query.Find();
foreach (LCFriendshipRequest request in requests) {
  // 接受
  await LCFriendship.AcceptRequest(request);
}
```

```java
currentUser.friendshipRequestQuery(AVFriendshipRequest.STATUS_PENDING, false, true).findInBackground().subscribe(new Observer<List<AVFriendshipRequest>>() {
      @Override
      public void onSubscribe(@NotNull Disposable disposable) {
      }

      @Override
      public void onNext(@NotNull List<AVFriendshipRequest> avFriendshipRequests) {
        for (AVFriendshipRequest req: avFriendshipRequests) {
          currentUser.acceptFriendshipRequest(req, null).subscribe(new Observer<AVFriendshipRequest>() {
              @Override
              public void onSubscribe(Disposable disposable) {}
              @Override
              public void onNext(AVFriendshipRequest avFriendshipRequest) {}
              public void onError(Throwable throwable) {}
              public void onComplete() {}
            }
          );
          // you can also call #accept on FriendshipRequest instance as following:
          // req.accept(null).subscribe(...);
        }
      }

      public void onError(Throwable throwable) {
      }

      public void onComplete() {
      }
  });
```

```objc
LCQuery *query = [LCFriendshipRequest query];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    if (!error) {
        for (LCFriendshipRequest *request in objects) {
            // 接受
            [LCFriendship acceptRequest:request callback:^(BOOL succeeded, NSError * _Nullable error) {
                // handle result
            }];
        }
    }
}];
```

```dart
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>('_FriendshipRequest')
  .WhereEqualTo('friend', currentUser)
  .WhereEqualTo('status', 'pending');
List<LCFriendshipRequest> requests = await query.find();
for (LCFriendshipRequest request in requests) {
  // 接受
  await LCFriendship.acceptRequest(request);
}
```

```javascript
const query = new AV.Query('_FriendshipRequest');
query.equalTo('friend', AV.User.current());
query.equalTo('status', 'pending');
query.find().then((requests) => {
  requests.forEach(request => {
    AV.Friendship.acceptRequest(request).then(() => console.log("接受好友请求成功"));
  });
});
```

</MultiLang>

B 在接受 A 的好友请求时，同样可以添加属性，这些属性会被存储到 `_Followee` 表的相应的列中，例如下方的代码会向 B 的数据中的 `group` 列中存入值 `music`。

<MultiLang kind="fulltext">

```cs
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>("_FriendshipRequest")
  .WhereEqualTo("friend", currentUser)
  .WhereEqualTo("status", "pending");
ReadOnlyCollection<LCFriendshipRequest> requests = await query.Find();
foreach (LCFriendshipRequest request in requests) {
  // 接受
  Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "group", "sport" }
  };
  await LCFriendship.AcceptRequest(request, attrs);
}
```

```java
currentUser.friendshipRequestQuery(AVFriendshipRequest.STATUS_PENDING, false, true).findInBackground().subscribe(new Observer<List<AVFriendshipRequest>>() {
      @Override
      public void onSubscribe(@NotNull Disposable disposable) {
      }

      @Override
      public void onNext(@NotNull List<AVFriendshipRequest> avFriendshipRequests) {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("group", "fans");
        for (AVFriendshipRequest req: avFriendshipRequests) {
          currentUser.acceptFriendshipRequest(req, attributes).subscribe(new Observer<AVFriendshipRequest>() {
              @Override
              public void onSubscribe(Disposable disposable) {}
              @Override
              public void onNext(AVFriendshipRequest avFriendshipRequest) {}
              public void onError(Throwable throwable) {}
              public void onComplete() {}
            });
        }
      }

      public void onError(Throwable throwable) {
      }

      public void onComplete() {
      }
  });
```

```objc
LCQuery *query = [LCFriendshipRequest query];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    if (!error) {
        for (LCFriendshipRequest *request in objects) {
            // 接受
            NSDictionary *attributes = @{
                @"group" : @"sport",
            };
            [LCFriendship acceptRequest:request attributes:attributes callback:^(BOOL succeeded, NSError * _Nullable error) {
                // handle result
            }];
        }
    }
}];
```

```dart
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>('_FriendshipRequest')
  .WhereEqualTo('friend', currentUser)
  .WhereEqualTo('status', 'pending');
List<LCFriendshipRequest> requests = await query.find();
for (LCFriendshipRequest request in requests) {
  // 接受
  Map<String, dynamic> attrs = {'group': 'sport'};
  await LCFriendship.acceptRequest(request, attributes: attrs);
}
```

```javascript
const query = new AV.Query('_FriendshipRequest');
query.equalTo('friend', AV.User.current());
query.equalTo('status', 'pending');
query.find().then((requests) => {
  requests.forEach(request => {
    AV.Friendship.acceptRequest({
      request,
      attributes: {
        group: 'music',
      },
    }).then(() => console.log("接受好友请求成功"));;
  });
});
```

</MultiLang>

#### 拒绝好友申请

拒绝好友请求后，`_FriendshipRequest` 表中该条申请数据的 `status` 的值会被更新为 `declined`。

<MultiLang kind="fulltext">

```cs
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>("_FriendshipRequest")
  .WhereEqualTo("friend", currentUser)
  .WhereEqualTo("status", "pending");
ReadOnlyCollection<LCFriendshipRequest> requests = await query.Find();
foreach (LCFriendshipRequest request in requests) {
  // 拒绝
  await LCFriendship.DeclineRequest(request);
}
```

```java
currentUser.friendshipRequestQuery(AVFriendshipRequest.STATUS_PENDING, false, true).findInBackground().subscribe(new Observer<List<AVFriendshipRequest>>() {
      @Override
      public void onSubscribe(@NotNull Disposable disposable) {
      }

      @Override
      public void onNext(@NotNull List<AVFriendshipRequest> avFriendshipRequests) {
        for (AVFriendshipRequest req: avFriendshipRequests) {
          currentUser.declineFriendshipRequest(req).subscribe(new Observer<AVFriendshipRequest>() {
              @Override
              public void onSubscribe(Disposable disposable) {}
              @Override
              public void onNext(AVFriendshipRequest avFriendshipRequest) {}
              public void onError(Throwable throwable) {}
              public void onComplete() {}
          });
          // you can also call #decline on FriendshipRequest instance as following:
          // req.decline().subscribe(...);
        }
      }

      public void onError(Throwable throwable) {
      }

      public void onComplete() {
      }
  });
```

```objc
LCQuery *query = [LCFriendshipRequest query];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    if (!error) {
        for (LCFriendshipRequest *request in objects) {
            // 拒绝
            [LCFriendship declineRequest:request callback:^(BOOL succeeded, NSError * _Nullable error) {
                // handle result
            }];
        }
    }
}];
```

```dart
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>('_FriendshipRequest')
  .WhereEqualTo('friend', currentUser)
  .WhereEqualTo('status', 'pending');
List<LCFriendshipRequest> requests = await query.find();
for (LCFriendshipRequest request in requests) {
  // 拒绝
  await LCFriendship.declineRequest(request);
}
```

```javascript
const query = new AV.Query('_FriendshipRequest');
query.equalTo('friend', AV.User.current());
query.equalTo('status', 'pending');
query.find().then((requests) => {
  requests.forEach(request => {
    AV.Friendship.declineRequest(request).then(() => console.log('拒绝好友请求成功'));
  });
});
```

</MultiLang>

注意，当用户 B 拒绝 A 的好友申请后，**用户 A 无法再次发起好友申请**。如果两人重新希望成为好友，用户 B 需要找到之前被拒绝的好友申请，改为接受：

<MultiLang kind="fulltext">

```cs
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>("_FriendshipRequest")
  .WhereEqualTo("friend", currentUser)
  .WhereEqualTo("status", "declined");
ReadOnlyCollection<LCFriendshipRequest> requests = await query.Find();
foreach (LCFriendshipRequest request in requests) {
  // 接受
  await LCFriendship.AcceptRequest(request);
}
```

```java
currentUser.friendshipRequestQuery(AVFriendshipRequest.STATUS_DECLINED, true, true).findInBackground().subscribe(new Observer<List<AVFriendshipRequest>>() {
      @Override
      public void onSubscribe(@NotNull Disposable disposable) {
      }

      @Override
      public void onNext(@NotNull List<AVFriendshipRequest> avFriendshipRequests) {
        for (AVFriendshipRequest req: avFriendshipRequests) {
          currentUser.acceptFriendshipRequest(req, null).subscribe(new Observer<AVFriendshipRequest>() {
              @Override
              public void onSubscribe(Disposable disposable) {}
              @Override
              public void onNext(AVFriendshipRequest avFriendshipRequest) {}
              public void onError(Throwable throwable) {}
              public void onComplete() {}
          });
        }
      }

      public void onError(Throwable throwable) {
      }

      public void onComplete() {
      }
  });
```

```objc
LCQuery *query = [LCFriendshipRequest query];
[query whereKey:@"status" equalTo:@"declined"];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    if (!error) {
        for (LCFriendshipRequest *request in objects) {
            // 接受
            [LCFriendship acceptRequest:request callback:^(BOOL succeeded, NSError * _Nullable error) {
                // handle result
            }];
        }
    }
}];
```

```dart
LCQuery<LCFriendshipRequest> query = new LCQuery<LCFriendshipRequest>('_FriendshipRequest')
  .WhereEqualTo('friend', currentUser)
  .WhereEqualTo('status', 'declined');
List<LCFriendshipRequest> requests = await query.find();
for (LCFriendshipRequest request in requests) {
  // 接受
  await LCFriendship.acceptRequest(request);
}
```

```javascript
const query = new AV.Query('_FriendshipRequest');
query.equalTo('friend', AV.User.current());
query.equalTo('status', 'declined');
query.find().then((requests) => {
  requests.forEach(request => {
    AV.Friendship.acceptRequest(request).then(() => console.log("接受好友请求成功"));
  });
});
```

</MultiLang>

#### 查询好友列表

直接使用 `Query` 查询好友列表，设定 `friendStatus=true` 即可以查询双向好友。同时还可以使用 skip、limit、include 等，非常方便。

<MultiLang kind="fulltext">

```cs
LCQuery<LCObject> query = currentUser.FolloweeQuery()
  .WhereEqualTo("friendStatus", true);
ReadOnlyCollection<LCObject> friends = await query.Find();
```

```java
// parameter `isFollowerDirection` indicates following direction:
// true - query follower of current user, in other words users which followed current user.
// false - query followee of current user, in other words users which current user followed.
AVQuery<AVFriendship> query = currentUser.friendshipQuery(false);
query.whereEqualTo(AVFriendship.ATTR_FRIEND_STATUS, true);
query.addDescendingOrder(AVObject.KEY_UPDATED_AT); // you can add more ordering attrubite.
query.findInBackground().subscribe(new Observer<List<AVFriendship>>() {
  @Override
  public void onSubscribe(Disposable disposable) {}
  @Override
  public void onNext(List<AVFriendship> avFriendships) {}
  public void onError(Throwable throwable) {}
  public void onComplete() {}
});
```

```objc
LCQuery *query = [[LCUser currentUser] followeeObjectsQuery];
[query whereKey:@"friendStatus" equalTo:@YES];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    // handle result
}];
```

```dart
LCQuery<LCObject> query = currentUser.followeeQuery()
  .WhereEqualTo('friendStatus', true);
List<LCObject> friends = await query.find();
```

```javascript
const query = new AV.Query('_Followee');
query.equalTo('user', AV.User.current());
query.equalTo('friendStatus', true);
query.find().then((results) => {
  const friends = results.map(result => result.get('followee'));
});
```

</MultiLang>

#### 修改好友属性

在申请好友的过程中，可以随时修改好友属性：

<MultiLang kind="fulltext">

```cs
LCObject followee = LCObject.CreateWithoutData("_Followee", "followee objectId");
// 添加新属性
followee["remark"] = "丐帮帮主";
// 更新已有属性
followee["group"] = "friend";
// 删除已有属性
followee.Unset("nickname");
await followee.Save();
```

```java
AVFriendship friendship = null;  // get friendship by query.
friendship.put("remark", "丐帮帮主");
friendship.put("group", "friend");
friendship.remove("nickname");
currentUser.updateFriendship(friendship).subscribe(new Observer<AVFriendship>() {
  @Override
  public void onSubscribe(Disposable disposable) {}
  @Override
  public void onNext(AVFriendship> avFriendship) {}
  public void onError(Throwable throwable) {}
  public void onComplete() {}
});
```

```objc
LCObject *followee = [LCObject objectWithClassName:@"_Followee" objectId:@"followee objectId"];
// 添加新属性
followee[@"remark"] = @"丐帮帮主";
// 更新已有属性
followee[@"group"] = @"friend";
// 删除已有属性
[followee removeObjectForKey:@"nickname"];
[followee saveInBackgroundWithBlock:^(BOOL succeeded, NSError * _Nullable error) {
    // handle result
}];
```

```dart
LCObject followee = LCObject.createWithoutData('_Followee', 'followee objectId');
// 添加新属性
followee['remark'] = '丐帮帮主';
// 更新已有属性
followee['group'] = 'friend';
// 删除已有属性
followee.unset('nickname');
await followee.save();
```

```javascript
const followee = AV.Object.createWithoutData('_Followee', 'followee objectId');
// 添加新属性
followee.set('remark', '丐帮帮主');
// 更新已有属性
followee.set('group', 'friend');
// 删除已有属性
followee.unset('nickname');
followee.save().then((followee) => {
  console.log("更新属性成功")
})
```

</MultiLang>

#### 删除好友

当 A 不再希望和 B 是朋友，可以删除好友。注意：删除好友只会删掉 `_Followee` 表中用户 A 的好友数据，而用户 B 的好友数据依然保留。也就是说 A 不再视 B 为好友，而在 B 的好友列表中依然有 A。

<MultiLang kind="fulltext">

```cs
await currentUser.Unfollow("Tom's objectId");
```

```java
String targetUserObjectId = "Tom's objectId";
currentUser.unfollowInBackground(targetUserObjectId).subscribe(new Observer<JSONObject>() {
  @Override
  public void onSubscribe(Disposable disposable) {}
  @Override
  public void onNext(JSONObject> result) {}
  public void onError(Throwable throwable) {}
  public void onComplete() {}
});
```

```objc
[[LCUser currentUser] unfollow:@"Tom's objectId" andCallback:^(BOOL succeeded, NSError * _Nullable error) {
    // handle result
}];
```

```dart
await currentUser.unfollow("Tom's objectId");
```

```javascript
AV.User.current().unfollow("Tom's objectId").then(() => {
  console.log('删除好友成功');
});;
```

</MultiLang>

### REST API

#### 申请加为好友

```sh
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  # 参数中 user 的 sessionToken
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "user": {"__type": "Pointer", "className": "_User", "objectId": "5c76107144d90400536fc88b"},
    "friend": {"__type": "Pointer", "className": "_User", "objectId": "55e673de60b21fbf6547d672"},
    "friendship": {"group" : "boyfriend"}}' \
  https://API_BASE_URL/1.1/users/friendshipRequests
```

| 参数        | 约束   | 说明                                   |
| --------- | ---- | ---------------------------------------- |
| user      | 必须   | 发起好友请求的用户，Pointer 对象，需要和当前登录用户相同。|
| friend | 必须   | 目标好友用户，Pointer 对象。|
| friendship | 可选   | json 对象，用来在 _Followee 表存储自定义属性，json 中的每一个 key 都是新的一列 |

返回为包含 _FriendshipRequest 表 objectId 的 JSON 数据：

```json
{"objectId":"5fbcd10e2623ab370bb5f8a7","createdAt":"2020-11-24T09:23:26.001Z"}
```

#### 查询好友申请

查询好友申请和普通表的查询相同，详细请参考[查询约束](/sdk/storage/guide/rest/#查询约束)。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -G \
  --data-urlencode 'where={"status": "pending", "friend":{"__type": "Pointer", "className": "_User", "objectId": "55e673de60b21fbf6547d672"}}' \
  https://API_BASE_URL/1.1/classes/_FriendshipRequest
```

#### 接受好友申请

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -H "Content-Type: application/json" \
  -d '{"friendship": {"group" : "music"}}' \
  https://API_BASE_URL/1.1/users/friendshipRequests/<request-object-id>/accept
```

请求 URL 中的 `request-object-id` 指的是申请好友时返回的 `objectId`，也是 `_FriendshipRequest` 表的 `objectId`。

| 参数        | 约束   | 说明                                   |
| --------- | ---- | ---------------------------------------- |
| friendship | 可选   | json 对象，用来在 _Followee 表存储自定义属性，json 中的每一个 key 都是新的一列 |

返回为包含 _FriendshipRequest 表 objectId 的 JSON 数据：

```json
{"updatedAt":"2020-11-24T09:24:19.029Z","objectId":"5fbcd10e2623ab370bb5f8a7"}
```

#### 拒绝好友申请

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  https://API_BASE_URL/1.1/users/friendshipRequests/<request-object-id>/decline
```

请求 URL 中的 `request-object-id` 指的是申请好友时返回的 `objectId`，也是 `_FriendshipRequest` 表的 `objectId`。

返回为包含 _FriendshipRequest 表 objectId 的 JSON 数据：

```json
{"updatedAt":"2020-11-24T09:24:19.029Z","objectId":"5fbcd10e2623ab370bb5f8a7"}
```

#### 删除好友申请

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  https://API_BASE_URL/1.1/classes/_FriendshipRequest/<objectId>/
```

`objectId` 在申请好友时会返回。

删除成功：

```json
{}
```

#### 查询好友列表

好友列表存于 `_Followee` 表，查询方式和普通表的查询相同，详细请参考[查询约束](/sdk/storage/guide/rest/#查询约束)。

```sh
curl -X GET \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -G \
  --data-urlencode 'where={"friendStatus": true}' \
  https://API_BASE_URL/1.1/users/<user_id>/followees
```

#### 修改好友属性

```sh
curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: <sessionToken>" \
  -d '{"friendship": {"group" : "sport"}}' \
  https://API_BASE_URL/1.1/users/<user_id>/friendship/<friend_id>
```

#### 删除好友

```sh
curl -X DELETE \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  https://API_BASE_URL/1.1/users/<user_id>/friendship/<target_id>
```

其中：

* `user_id` 表示发起删除动作的用户的 objectId。如果设置了 `X-LC-Session` 头，则 `self` 表示当前登录用户。
* `target_id` 表示要删除的朋友的 objectId。

## 订阅好友通知

如果有需求，可以通过 LiveQuery 来订阅 `_Followee` 表和 `_FriendshipRequest` 表的数据变动。订阅数据下发的事件通知尊重数据的 ACL。这里仅给出简单的示例代码，详细内容请阅读 [LiveQuery 开发指南](/sdk/storage/guide/js/#livequery)

例如当用户在线时，希望能立刻受到好友申请的通知：

```javascript
const query = new AV.Query('_FriendshipRequest');
query.equalTo('friend', AV.User.current());
query.equalTo('status', 'pending');
query.subscribe().then((subscription) => {
  subscription.on('create', (request) => {
    console.log(`${request.get('user').id} 申请添加我为好友`);
  });
});
```

例如当其他人通过/拒绝我的好友申请时，收取通知：

```javascript
const query = new AV.Query('_FriendshipRequest');
query.equalTo('user', AV.User.current());
query.subscribe().then((subscription) => {
  subscription.on('update', (request) => {
    const status = request.get('status');
    if (status === 'accepted') {
      console.log(`${request.get('friend').id} 通过了我的好友申请`);
    }
    if (status === 'declined') {
      console.log(`${request.get('friend').id} 拒绝了我的好友申请`);
    }
  });
});
```
