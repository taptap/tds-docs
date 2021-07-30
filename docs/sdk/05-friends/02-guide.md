---
id: guide
title: 好友指南
sidebar_label: 开发指南
---

import MultiLang from '@theme/MultiLang';

游戏好友模块基于 TDS 内建账户系统，下文中的用户均指 `TDSUser`。

## 申请成为好友

假设 tom 想加 jerry 为好友，tom 需要发送一个好友申请：

<MultiLang>

```cs
await tom.ApplyFriendship(jerry);
```

```java
// 假设 tom 是当前玩家，而 jerry 是另外一位玩家， tom 想加 jerry 为好友，tom 需要发送一个好友申请
TDSUser tom = TDSUser.currentUser(); // currentUser 为 tom
TDSUser jerry = LCObject.createWithoutData(TDSUser.class, jerryObjectId);  // 通过玩家授权后返回的 ObjectId 得到 TDSUser 类型玩家实例
tom.applyFriendshipInBackground(jerry, null).subscribe(new Observer<LCFriendshipRequest>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {}

    @Override
    public void onNext(@NonNull LCFriendshipRequest lcFriendshipRequest) {
        System.out.println("succeed to apply friend request to jerry.");
    }

    @Override
    public void onError(@NonNull Throwable e) {
        System.out.println("failed to apply friend request to jerry.");
    }

    @Override
    public void onComplete() {}
});
```

```objc
[TDSUser applyFriendshipWithUserId:@"user_object_id" attributes:nil callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // succeed to apply friend request
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>

申请成功的回调中，我们会得到一个 `LCFriendshipRequest` 的实例，这个实例中包含了两个用户：

- `sourceUser`，请求的发起方，上面的例子中是 `tom`。
- `friend`，请求的目的方，上面的例子中就是 `jerry`。

tom 也可以在申请好友的时候，添加更多的属性，例如 tom 希望加 jerry 为好友的时候，把 jerry 分到 `mouse` 组：

<MultiLang>

```cs
Dictionary<string, object> attrs = new Dictionary<string, object> {
    { "group", "mouse" }
};
await tom.ApplyFriendship(jerry, attrs);
```

```java
Map<String, Object> attr1 = new HashMap<String, Object>();
attr1.put("group", "mouse");
tom.applyFriendshipInBackground(jerry, attr1).subscribe(new Observer<LCFriendshipRequest>() {
    // 略（参见上面的例子）
});
```

```objc
NSDictionary *attributes = @{
    @"group" : @"mouse",
};
[TDSUser applyFriendshipWithUserId:@"user_object_id" attributes:attributes callback:^(BOOL succeeded, NSError * _Nullable error) {
    // 略（参见上面的例子）
}];
```

</MultiLang>

## 获取好友申请列表

好友申请有三种状态：

- `pending`，对方没有回应，还处于等待中。
- `accepted`，对方已经接受，现在双方成为好友。
- `declined`，对方已经拒绝。

好友请求创建之后默认是 `pending` 状态。

jerry 可以通过 `friendshipRequestQuery` 来查找不同状态的请求。
假设 jerry 想看看新的好友请求，可以这样操作：

<MultiLang>

```cs
LCQuery<LCFriendshipRequest> query = jerry.GetFriendshipRequestQuery(LCFriendshipRequest.STATUS_PENDING, false, true);
ReadOnlyCollection<LCFriendshipRequest> reqs = await query.Find();
foreach (LCFriendshipRequest req in reqs) {
    Console.WriteLine(req);
}
```

```java
jerry.friendshipRequestQuery(LCFriendshipRequest.STATUS_PENDING, false, true)
     .findInBackground()
     .subscribe(new Observer<List<LCFriendshipRequest>>() {
        @Override
        public void onSubscribe(@NonNull Disposable d) {}

        @Override
        public void onNext(List<LCFriendshipRequest> lcFriendshipRequests) {
            System.out.println("friendship requests number to jerry is: " +lcFriendshipRequests.size());
            for(LCFriendshipRequest request: lcFriendshipRequests) {
                System.out.println(request);
            }
        }

        @Override
        public void onError(@NonNull Throwable e) {
            System.out.println("failed to query friendship request of jerry. cause: " + e.getMessage());
        }

        @Override
        public void onComplete() {}
});
```

```objc
LCQuery *query = [TDSUser friendshipRequestQueryWithStatus:TDSUserFriendshipRequestStatusPending includeSourceUser:true];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    for (LCFriendshipRequest *request in objects) {
        // sourceUser 指请求的发起方
        TDSUser *sourceUser = request[@"user"];
    }
}];
```

</MultiLang>

## 处理好友申请

jerry 对于新的好友请求，可以同意或者拒绝，也可以什么都不做，无视这些请求，甚至直接删除。这些操作我们都是支持的，请看下面的示例：

<MultiLang>

```cs
await jerry.AcceptFriendshipRequest(tomRequest);
await jerry.DeclineFriendshipRequest(tuffyRequest);
await jerry.DeleteFriendshipRequest(otherRequest);
```

```java
// jerry 拒绝了来自 tom 的好友请求
jerry.declineFriendshipRequest(tomRequest).subscribe(new Observer<LCFriendshipRequest>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {}

    @Override
    public void onNext(LCFriendshipRequest result) {}

    @Override
    public void onError(@NonNull Throwable e) {
        System.out.println("failed to decline friendship request of jerry. cause: " + e.getMessage());
    }

    @Override
    public void onComplete() {}
});

// jerry 同意了来自 tuffy 的好友请求
jerry.acceptFriendshipRequest(tuffyRequest, null).subscribe(new Observer<LCFriendshipRequest>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {}

    @Override
    public void onNext(LCFriendshipRequest result) {}

    @Override
    public void onError(@NonNull Throwable e) {
        System.out.println("failed to accept friendship request of jerry. cause: " + e.getMessage());
    }

    @Override
    public void onComplete() {}
});

// jerry 直接删除了陌生人的请求
jerry.deleteFriendshipRequest(otherRequest).subscribe(new Observer<Boolean>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {}

    @Override
    public void onNext(Boolean result) {}

    @Override
    public void onError(@NonNull Throwable e) {
        System.out.println("failed to delete friendship request of jerry. cause: " + e.getMessage());
    }

    @Override
    public void onComplete() {}
});
```

```objc
// 拒绝了来自 tom 的好友请求
[TDSUser declineFriendshipRequest:tomRequest callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // decline friendship request of tom.
    } else {
        NSLog(@"%@", error);
    }
}];
​
// 同意了来自 tuffy 的好友请求
[TDSUser acceptFriendshipRequest:tuffyRequest attributes:nil callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // accept friendship request of tuffy.
    } else {
        NSLog(@"%@", error);
    }
}];
​
// 直接删除了陌生人的请求
[otherRequest deleteInBackgroundWithBlock:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // delete friendship request of other.
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>

注意：

1. 在 jerry 拒绝了 tom 的好友请求之后，如果 tom 再次请求成为 jerry 的好友，tom 在执行 applyFriendshipInBackground 时会直接得到错误的应答，表明 jerry 不想和 ta 成为好友。
2. jerry 同意了 tom 的好友请求之后，它们就成为了好友，之后两个人中任何一人再次调用 applyFriendshipInBackground 申请成为好友时，也会直接得到错误的应答，表明它们已经是好友无需再次申请。
3. jerry 删除陌生人的好友请求后，对方还可以再次发起请求。

## 响应好友变化通知

好友模块支持客户端监听好友状态变化，在游戏中实时给玩家提示。好友状态变化的接口包括

<MultiLang>

```cs
public class FriendshipNotification {
    public Action<LCFriendshipRequest> OnNewRequestComing { get; set; }
    public Action<LCFriendshipRequest> OnRequestAccepted { get; set; }
    public Action<LCFriendshipRequest> OnRequestDeclined { get; set; }
}
```

```java
public interface FriendshipNotification {
    // new request is coming.
    void onNewRequestComing(LCFriendshipRequest request);
    // the request sent from current user is accepted by other.
    void onRequestAccepted(LCFriendshipRequest request);
    // the request sent from current user is declined by other.
    void onRequestDeclined(LCFriendshipRequest request);
}
```

```objc
@protocol TDSFriendshipNotificationDelegate <NSObject>
​
@optional
​
/// New request is coming.
/// @param request The friendship request.
- (void)onNewRequestComing:(LCFriendshipRequest *)request;
​
/// The request sent from current user is accepted by other.
/// @param request The friendship request.
- (void)onRequestAccepted:(LCFriendshipRequest *)request;
​
/// The request sent from current user is declined by other.
/// @param request The friendship request.
- (void)onRequestDeclined:(LCFriendshipRequest *)request;
​
@end
```

</MultiLang>

其中：

- `onNewRequestComing` 表示有其他人申请成为当前用户的好友，通过调用 `LCFriendshipRequest#getSourceUser()` 方法可以获得发起方用户信息。
- `onRequestAccepted` 表示当前用户的好友申请被对方通过，通过调用 `LCFriendshipRequest#getFriend()` 方法可以获得对方用户信息。
- `onRequestDeclined` 表示当前用户的好友申请被对方拒绝，通过调用 `LCFriendshipRequest#getFriend()` 方法可以获得对方用户信息。

开发者可以通过调用 `TDSUser#registerFriendshipNotification` 来注册通知接收器，通过调用 `TDSUser#unregisterFriendshipNotification` 来取消通知接收器。例如：

<MultiLang>

```cs
await tom.RegisterFriendshipNotification(new TDSUser.FriendshipNotification {
    OnNewRequestComing = req => {
        Console.WriteLine($"{req.User.ObjectId} requested you for friend.");
    },
    OnRequestAccepted = req => {
        Console.WriteLine($"{req.Friend.ObjectId} accepted your request.");
    },
    OnRequestDeclined = req => {
        Console.WriteLine($"{req.Friend.ObjectId} declined your request.");
    }    
});

await tom.UnregisterFriendshipNotification();
```

```java
TDSUser.FriendshipNotification friendshipNotification = new TDSUser.FriendshipNotification() {
    @Override
    public void onNewRequestComing(LCFriendshipRequest request) {

    }

    @Override
    public void onRequestAccepted(LCFriendshipRequest request) {

    }

    @Override
    public void onRequestDeclined(LCFriendshipRequest request) {

    }
};

tom.registerFriendshipNotification(friendshipNotification);

tom.unregisterFriendshipNotification();
```

```objc
[TDSUser registerFriendshipNotificationDelegate:delegate callback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // succeeded
    } else {
        NSLog(@"%@", error);
    }
}];

[TDSUser unregisterFriendshipNotificationDelegateWithCallback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // succeeded
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>

## 获取好友列表

调用 `TDSUser#friendshipQuery()` 可以得到查询好友的 `LCQuery` 实例，之后调用 `LCQuery#findInBackground()` 方法就可以得到好友列表。示例如下：

<MultiLang>

```cs
LCQuery<LCObject> query = jerry.GetFirendshipQuery();
```

```java

LCQuery<LCFriendship> query = jerry.friendshipQuery();
query.findInBackground().subscribe(new Observer<List<LCFriendship>>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {}

    @Override
    public void onNext(List<LCFriendship> lcFriendships) {
        if (null != lcFriendships) {
            // lcFriendships 即为好友关系
        }
    }

    @Override
    public void onError(@NonNull Throwable e) {
        System.out.println("failed to query friendship of jerry. cause: " + e.getMessage());
    }

    @Override
    public void onComplete() {}
});
```

```objc
LCQuery *query = [TDSUser friendshipQuery];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    for (LCObject *object in objects) {
        // 好友
        TDSUser *friend = object[@"followee"];
        // 自己
        TDSUser *selfUser = object[@"user"];
    }
}];
```

</MultiLang>

LCFriendship 里面会包含两个用户：

- `LCFriendship#getLCUser(LCFriendship.ATTR_USER)` 得到的是 jerry 自己；
- `LCFriendship#getLCUser(LCFriendship.ATTR_FOLLOWEE)` 得到的就是另一方的用户信息。

## 删除好友

成为好友关系的两个用户，之后也可以单方面删除好友。例如 jerry 不想再和 tom 成为好友，那只需要在自己的好友列表中删除包含 tom 的那条 LCFriendship 记录即可：

<MultiLang>

```cs
await friendship.Delete();
```

```java
friendship.deleteInBackground().subscribe(new Observer<LCNull>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {}

    @Override
    public void onNext(LCNull response) {
        // succeed to delete friendship.
    }

    @Override
    public void onError(@NonNull Throwable e) {
        System.out.println("failed to delete friendship of jerry. cause: " + e.getMessage());
    }

    @Override
    public void onComplete() {}
});
```

```objc
[[TDSUser currentUser] unfollow:@"tom_object_id" andCallback:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
        // 删除成功
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>


## 查询好友关系

我们使用 LCQuery 可以单独查询两个用户是否为好友关系。

<MultiLang>

```cs
LCQuery<LCObject> query = jerry.GetFirendshipQuery();
query.whereEqualTo("followee", tom);
int count = await query.Count();
if (count > 0) {
    // tom is a friend of jerry.
} else {
    // tom isn't a friend of jerry.
}
```

```java
String tomObjectId;
LCQuery<LCFriendship> query = jerry.friendshipQuery();
query.whereEqualTo(LCFriendship.ATTR_FOLLOWEE, TDSUser.createWithoutData(TDSUser.class, tomObjectId));
query.countInBackground().subscribe(new Observer<Integer>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {}

    @Override
    public void onNext(Integer result) {
        if (null != result && result > 0) {
            // tom is a friend of jerry.
        } else {
            // tom isn't a friend of jerry.
        }
    }

    @Override
    public void onError(@NonNull Throwable e) {
        System.out.println("failed to query friendship of jerry. cause: " + e.getMessage());
    }

    @Override
    public void onComplete() {}
});
```

```objc
LCQuery *query = [TDSUser friendshipQuery];
[query whereKey:@"followee" equalTo:[TDSUser objectWithObjectId:@"tom_object_id"]];
[query findObjectsInBackgroundWithBlock:^(NSArray * _Nullable objects, NSError * _Nullable error) {
    if (objects.firstObject) {
        // tom is a friend
    } else if (!error) {
        // tom isn't a friend
    } else {
        NSLog(@"%@", error);
    }
}];
```

</MultiLang>

这一查询是通过网络发送到服务端执行的，一般情况下，我们推荐开发者在游戏启动时拉取一次当前登录用户的好友列表，然后缓存在本地，以后需要检查另外玩家是否为当前用户的好友时，直接从缓存中查询即可。如果担心好友数据变化，缓存没有得到及时更新，可以调用前面「响应好友变化通知」的方法，对好友数据更新进行监听，这样在绝大部分时候数据同步都是可以保证的。