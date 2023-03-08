# 你的第一个 Client Engine 小游戏 · Node.js

该文档帮助您快速上手，通过 Client Engine 实现一个剪刀石头布的猜拳小游戏。完成本文档教程后，您会对 Client Engine 的基础使用流程有初步的理解。

## 准备初始项目

这个小游戏分为服务端和客户端两部分，其中服务端使用 Client Engine 来实现，客户端则是一个简单的 Web 页面。在这个教程中我们着重教您一步一步写 Client Engine 中的代码，客户端的代码请您查看示例项目。

### Client Engine 项目
请先阅读 [Client Engine 快速入门：运行及部署项目](client-engine-quick-start-node.html) 获得初始项目，了解如何本地运行及部署项目。

`./src` 中主要源文件及用途如下：

```
├── configs.ts        // 配置文件
├── index.ts          // 项目入口
├── reception.ts      // Reception 类实现文件，GameManager 的子类，负责管理 Game，在这个文件中撰写了创建 Game 的自定义方法
└── rps-game.ts       // RPSGame 类实现文件，Game 的子类，在这个文件中撰写了具体猜拳游戏的逻辑
```

该项目中的 `Game` 及 `GameManager` 使用的是 Client Engine SDK 的功能，关于 SDK 的详细用法请参考 [Client Engine 开发指南](client-engine-guide-node.html)。

您可以从 `index.ts` 文件入手来了解整个项目，该文件是项目启动的入口，它通过 express 框架定义了名为 `/reservation` 的 Web API，供客户端快速开始时为客户端下发新的房间名称。

`reception.ts` 及 `rps-game.ts` 里面有本教程的全部代码。您可以选择备份这两个文件，清空这两个文件后根据本文档撰写自己的代码，同时也可以查看已经写好的代码以做对比。

### 客户端项目
[点击下载客户端项目](https://github.com/leancloud/client-engine-demo-webapp)。**打开 `./src` 中的 `config.ts`，将 appId 和 appKey 修改为自己应用的信息**，按照 README 启动项目后观察界面的变化。游戏相关的逻辑位于 `./src/components` 下的文件中，在有需要的时候您可以打开这里的文件查看代码。

## 核心流程
在多人对战服务中，房间的创建者为 MasterClient，因此在这个小游戏中，每一个房间都是由 Client Engine 管理的 MasterClient 调用在线对战服务相关的接口来创建的。Client Engine 中会有多个 MasterClient，每一个 MasterClient 管理着自己房间内的游戏逻辑。

这个小游戏的核心逻辑为：**Client Engine 中的 MasterClient 及客户端玩家 Client 加入到同一个房间，在通信过程中由 MasterClient 控制游戏内的逻辑。**具体拆解步骤如下：

1. 玩家客户端连接[多人在线对战服务](multiplayer.html)，向 Client Engine 提供的 `/reservation` 接口请求快速开始游戏。
2. Client Engine 每次收到请求后会检查是否有可用的房间，如果有则返回已有的 roomName 给客户端；如果没有则创建新的 MasterClient 并创建一个新的房间，返回 roomName 给客户端。
3. 客户端通过 Client Engine 返回的 roomName 加入房间。
4. MasterClient 和客户端在同一房间内，每次客户端出拳时会将消息发送给 MasterClient，MasterClient 将消息转发给其他客户端，并最终判定游戏结果。
5. MasterClient 判定游戏结束，客户端离开房间，Client Engine 销毁游戏。

## 代码开发

### 自定义 Game
我们的目标是让 MasterClient 和客户端 Client 进入同一个房间，第一步在 Client Engine 中我们先准备好房间。在 Client Engine SDK 中，每一个房间都对应一个 `Game` 对象，每一个 `Game` 对象都对应一个自己的 MasterClient。接下来我们创建一个继承 `Game` 的子类 `RPSGame` ，在 `RPSGame` 中撰写猜拳小游戏的房间内逻辑。

在 `rpg-game.ts` 文件中初始化自定义的 `RPSGame`：

```js
import { Game } from "@leancloud/client-engine";
import { Event, Play, Room } from "@leancloud/play";
export default class RPSGame extends Game {
  constructor(room: Room, masterClient: Play) {
    super(room, masterClient);
  }
}
```

### 管理 Game
Client Engine SDK 中，`GameManger` 负责 `Game` 的创建及销毁，具体的原理及结构介绍请参考 [Client Engine 开发指南](client-engine-guide-node.html)。在这篇文档中，我们通过简单的配置就可以使用 `GameMnager` 的管理功能。

#### 自定义 GameManager
首先创建一个子类 `Reception` 继承自 `GameManager`，在这个子类中我们就可以使用 `GameManager` 提供的方法来帮我们撰写自己的逻辑。

在 `reception.ts` 文件中初始化自定义的 `Reception`：

```js
import { Game, GameManager, ICreateGameOptions } from "@leancloud/client-engine";
export default class Reception<T extends Game> extends GameManager<T> {

}
```
这个自定义的类`Reception` 用于管理 T 类型的 `Game` 对象，在实际游戏中会是您自定义的 `Game` 类型的实例。接下来，我们在 `reception` 中使用 `GameManager` 的方法来实现自己的自定义逻辑：快速开始。

#### 实现逻辑：「快速开始」

这里我们要实现的快速开始的逻辑是：随便找一个有空位的房间返回给客户端，如果当前的 Client Engine 实例没有可用的房间，那么就创建一个房间返回给客户端。我们在 `Reception` 类中撰写名为 `makeReservation()` 的自定义方法来实现这个逻辑并供[入口 API ](#入口 API：快速开始)调用。

```js
import { Game, GameManager, ICreateGameOptions } from "@leancloud/client-engine";
export default class Reception<T extends Game> extends GameManager<T> {

  /**
   * 为指定玩家预约游戏，如果没有可用的游戏会创建一个新的游戏。
   * @param playerId 预约的玩家 ID
   * @return 预约成功的游戏的房间 name
   */
  public async makeReservation(playerId: string) {
    let game: T;
    const availableGames = this.getAvailableGames();
    if (availableGames.length > 0) {
      game = availableGames[0];
      this.reserveSeats(game, playerId);
    } else {
      game = await this.createGame(playerId);
    }
    return game.room.name;
  }

}
```

在这段代码中，我们调用了 `GameManager` 的 `getAvailableGames()` 来获得当前 Client Engine 实例管理的 `Game`：

* 如果有房间内还有空位的 `Game`，使用 `GameManager` 的 `reserveSeats()` 方法为玩家占位并返回 roomName。
* 如果所有 `Game` 房间都已经满员了，使用 `GameManager` 的 `createGame()` 方法创建一个新的房间并返回 roomName。

#### 实现逻辑：「创建新游戏」
如果您希望自己先创建房间，再邀请朋友加入该房间，可以在 `reception` 中写一个创建新游戏的方法供供[入口 API ](#入口 API：创建新游戏)调用。同样我们自定义的 `createGameAndGetName()` 方法内用到的 `createGame()` 是由 SDK 中的 `GameManager` 提供的。

```js
export default class Reception<T extends Game> extends GameManager<T> {

  public async makeReservation(playerId: string) {
    ......
  }

  /**
   * 创建一个新的游戏。
   * @param playerId 预约的玩家 ID
   * @param options 创建新游戏时可以指定的一些配置项
   * @return 创建的游戏的房间 name
   */
  public async createGameAndGetName(playerId: string, options?: ICreateGameOptions) {
    const game = await this.createGame(playerId, options);
    return game.room.name;
  }

}
```

#### 绑定 GameManager 及 Game
当 `GameManager` 的子类 `Reception` 及 `Game` 的子类 `RPSGame` 都准备好后，我们要在整个项目入口把 `RPSGame` 给到 `Reception`，由 `Reception` 来管理 `RPSGame`。

在 `index.ts` 文件创建 `Reception` 对象的方法中可以看到，第一个参数已经传入了 `RPSGame`，如果您的自定义 `Game` 使用的是其他的名字，可以将 `RPSGame` 换成您自定义的 `Game` 类。

```js
import PRSGame from "./rps-game";
const reception = new Reception(
  PRSGame,
  APP_ID,
  APP_KEY,
  {
    concurrency: 2,
  },
);
```

在这里配置完成后，`reception` 会在合适的时机创建并管理 `PRSGame` 和对应的 MasterClient。

#### 配置负载均衡
由于 `GameManager` 中的逻辑会直接被外部请求所调用，因此需要为在入口处为 `GameManager` 配置负载均衡。关于负载均衡详细的介绍可以参考[Client Engine 开发指南](client-engine-guide-node.html#负载均衡)，在这里我们先简单的查看 `index.ts` 文件中的这些代码，了解如何配置即可：

```js
import { ICreateGameOptions,LoadBalancerFactory } from "@leancloud/client-engine";

// 创建负责负载均衡的对象，此处代码不需要改动，只需要复制粘贴即可
const loadBalancerFactory = new LoadBalancerFactory({
  poolId: `${APP_ID.slice(0, 5)}-${process.env.LEANCLOUD_APP_ENV || "development"}`,
  redisUrl: process.env.REDIS_URL__CLIENT_ENGINE,
});

// 将 reception 及我们自定义的方法 makeReservation 配置负载均衡。
loadBalancerFactory.bind(reception, ["makeReservation", "createGameAndGetName"]) 
```

到这里，管理 `RPSGame` 的 `reception` 我们已经准备完成，接下来开始撰写具体的房间内游戏逻辑。

### 设定房间内玩家数量
在这个猜拳小游戏中，我们设定只允许两个玩家玩，满两个玩家后就不允许新的玩家再进入房间，可以这样设置 `Game` 的静态属性 `defaultSeatCount`：

```js
export default class RPSGame extends Game {
  public static defaultSeatCount = 2;
}
```
在这里配置完成后，Client Engine 初始项目每次请求多人对战服务创建房间时，都会根据这里的值限定房间内的玩家数量。

对设置房间内玩家数量的详细讲解请参考 [Client Engine 开发指南](client-engine-guide-node.html#设置房间内玩家数量)。

### MasterClient 及客户端进入同一房间
在完成 Game 的基础配置之后，MasterClient 和客户端就可以准备加入同一个房间了。

#### 入口 API：快速开始
`index.ts` 文件的入口 API `/reservation` ，当客户端调用这个接口时，该接口会调用 `Reception` 自定义的 `makeReservation()` 方法来帮助客户端快速开始游戏。

```js
app.post("/reservation", async (req, res, next) => {
  try {
    const {
      playerId,
    } = req.body as {
      playerId: any
    };
    if (typeof playerId !== "string") {
      throw new Error("Missing playerId");
    }
    debug(`Making reservation for player[${playerId}]`);
    // 调用我们在 Reception 类中准备好的 makeReservation() 方法
    const roomName = await reception.makeReservation(playerId);
    debug(`Seat reserved, room: ${roomName}`);
    return res.json({
      roomName,
    });
  } catch (error) {
    next(error);
  }
});
```

客户端可以调用这个 API 来快速开始，用该接口的示例代码如下 **（非 Client Engine 代码）**：

```js
// 这里在客户端通过 HTTP 调用在 Client Engine 中实现的 `/reservation` 接口
const { roomName } = await (await fetch(
  `${CLIENT_ENGINE_SERVER}/reservation`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      playerId: play.userId,
    })
  }
)).json();
// 加入房间
return play.joinRoom(roomName);
```

当客户端调用 `/reservation` 并加入房间成功后，意味着客户端 Client 及 MasterClient 进入了同一个房间内，当房间人数足够时，就可以开始游戏了。

客户端项目中已经帮您写好了调用 `/reservation` 的代码，无需您自己再写代码，您可以在 `/src/components/Lobby.vue` 中查看相关代码。

#### 入口 API：创建新游戏
该入口 API 撰写方式与「快速开始」相同，不再重复说明，可以参考 index.ts 文件中的 `/game` 方法。

### 宣布游戏开始

在这个小游戏中，人满后我们就可以开始游戏了。我们可以在 Game 的人满事件中宣布游戏开始：

```js
import { AutomaticGameEvent, Game, watchRoomFull } from "@leancloud/client-engine";
import { Play, Room } from "@leancloud/play";

enum Event {
  Start = 10,
};

@watchRoomFull()
export default class RPSGame extends Game {
  public static defaultSeatCount = 2;
  constructor(room: Room, masterClient: Play) {
    super(room, masterClient);
    // 监听 ROOM_FULL 事件，收到此事件后调用 `start() 方法`
    this.once(AutomaticGameEvent.ROOM_FULL, this.start);
  }

  protected start = async () => {
    // 标记房间不再可加入
    this.masterClient.setRoomOpened(false);
    // 向客户端广播游戏开始事件
    this.broadcast(Event.Start);
  }
}
```

在这段代码中，`watchRoomFull` 装饰器在人满时会使 `Game` 抛出 `AutomaticGameEvent.ROOM_FULL` 事件，在这个事件中我们选择调用自定义的 `start` 方法。在 `start` 方法中我们将房间打开，然后向所有客户端广播游戏开始。

到了这一步，您可以启动当前 Client Engine 项目，启动客户端并开启两个客户端 Web 页面，在界面上点击「快速开始」，可以观察到第一个点击「快速开始」的界面显示出了日志：`xxxx 加入了房间`。

### 猜拳逻辑

接下来我们开始开发具体的游戏中逻辑。具体步骤分为以下几步：

1. 玩家 A 选择手势，发送出拳事件给 MasterClient。
2. MasterClient 收到事件，转发事件给玩家 B。
3. 玩家 B 收到 MasterClient 转发来的事件，界面展示：对方已选择。
4. 玩家 B 选择手势，发送出拳事件给 MasterClient。
5. MasterClient 收到事件，转发事件给玩家 A。
6. 玩家 A 收到 MasterClient 转发来的事件，界面展示：对方已选择。
7. MasterClient 发现双方都已经出拳，判断结果，公布答案并宣布游戏结束。

这三者之间的交互可以用这张图来表示：

![image](images/rps-game-flow.png)

接下来我们对每一步进行拆解并撰写代码：


#### 玩家 A 选择手势，发送出拳事件给 MasterClient
这一部分代码是客户端的，**不需要您写在 Client Engine 中**，您可以在客户端项目中 `./src/components/Game.vue` 找到相关代码。

```js
enum Event {
  Start = 10,
  Play = 11,
};
choices = ["✊", "✌️", "✋"];

// 当用户选择时，我们把对应选项的 index 发送给服务端
play.sendEvent(Event.Play, {index}, {receiverGroup: ReceiverGroup.MasterClient});
```

#### MasterClient 收到事件，转发事件给玩家 B

这部分代码写在 Client Engine 中，您可以根据下方的示例代码写在自己的 `RPSGame` 中。我们在 `start` 方法中注册自定义事件，并在收到 `play` 事件后，将玩家 A 的动作内容抹去，转发给玩家 B。

```js
protected start = async () => {
  ......
  // 接收自定义事件
  this.masterClient.on(PlayEvent.CUSTOM_EVENT, ({ eventId, eventData, senderId }) => {
    if (eventId === Event.Play) {
      // 收到其他玩家的事件，转发事件
      this.forwardToTheRests({ eventId, eventData, senderId }, (eventData) => {
        return {}
      })
    }
  });
}
```

在这段代码中，Game 中的 MasterClient 对象注册了多人对战的自定义事件，当玩家 A 发送 `play` 事件给 MasterClient 时，这个事件会被触发。我们在这个事件中使用了 `Game` 的转发事件方法 `forwardToTheRests()`，这个方法第一个参数是原始的事件，第二个参数是原始事件的 eventData 数据处理，我们将原始的 eventData 数据，也就是玩家 A 发来的 `{index}`，修改为空数据 `{}`，这样当玩家 B 收到事件后无法获知玩家 A 的详细动作。

#### 玩家 B 收到 MasterClient 转发来的事件，界面展示：对方已选择

这部分代码是客户端的，**不需要您写在 Client Engine 中**，您可以在客户端项目中 `./src/components/Game.vue` 找到相关代码。

```js
play.on(PlayEvent.CUSTOM_EVENT, ({ eventId, eventData, senderId }) => {
  ......
  switch (eventId) {
    ......
    case Event.Play:
      this.log(`对手已选择`);
      break;
    .....
  }
});
```

#### 玩家 B 选择手势，发送出拳事件给 MasterClient
这部分逻辑和上文「玩家 A 选择手势，发送出拳事件给 MasterClient」相同，使用的也是相同部分的代码，您可以在客户端项目中 `./src/components/Game.vue` 找到相关代码。

#### MasterClient 收到事件，转发事件给玩家 A
这部分逻辑和上文「MasterClient 收到事件，转发事件给玩家 B」相同，使用的也是相同部分的代码，不需要再额外在 Client Engine 中写代码。

#### 玩家 A 收到 MasterClient 转发来的事件，界面展示：对方已选择
这部分逻辑和上文「玩家 A 收到 MasterClient 转发来的事件，界面展示：对方已选择」相同，使用的也是相同部分的代码，您可以在客户端项目中 `./src/components/Game.vue` 找到相关代码。

到这一步时，您可以运行项目，打开两个界面猜拳，观察双方的动作同步到各自的界面中，但各自分别不知道对方选了什么。

#### MasterClient 发现双方都已经出拳，判断结果，公布答案并宣布游戏结束

每次 MasterClient 收到玩家选择事件时，我们要把玩家的选择存起来，并判断两位玩家是不是都已经做出选择了：

```js
protected start = async () => {
  ......
  // [this.player[0] 的选择, this.player[1] 的选择]。当两个玩家都没有选择时，假定双方的选择都为 -1
  const choices = [-1, -1];

  this.masterClient.on(PlayEvent.CUSTOM_EVENT, ({ eventId, eventData, senderId }) => {
    if (eventId === Event.Play) {
      // 收到其他玩家的事件，转发事件
      ......
      // 存储当前玩家的选择
      if (this.players[0].actorId === senderId) {
        // 如果是 player[0] 就存储到 choices[0]中
        choices[0] = eventData.index;
      } else {
        // 如果是 player[1] 就存储到 choices[1]中
        choices[1] = eventData.index;
      }
    }
  });
}
```

在上面这段代码中，我们构造了一个 Array 类型的 choice 来存储玩家的选择，当收到出拳事件时会将用户的选择存储起来，接下来我们判断两个玩家是不是都做出选择了，如果做出选择了则广播游戏结果，并广播游戏结束：

```js
enum Event {
  Start = 10,
  Play = 11,
  Over = 20,
};
......
protected start = async () => {
  ......
  // [this.player[0] 的选择, this.player[1] 的选择]。当两个玩家都没有选择时，假定双方的选择都为 -1
  const choices = [-1, -1];

  this.masterClient.on(PlayEvent.CUSTOM_EVENT, ({ eventId, eventData, senderId }) => {
    if (eventId === Event.Play) {
      // 收到其他玩家的事件，转发事件
      ......
      // 存储当前玩家的选择
      ......
      // 检查两个玩家是不是都已经做出选择了
      if (choices.every((choice) => choice > 0)) {
        // 两个玩家都已经做出选择，游戏结束,向客户端广播游戏结果
        const winner = this.getWinner(choices);
        this.broadcast(Event.Over, {
          choices,
          winnerId: winner ? winner.userId : null,
        });
      } 
    }
  });
}

```

在上面的代码中，使用了 `getWinner()` 方法来获取游戏结果，这个是我们自定义的判断胜负的方法，您可以直接复制粘贴下方的代码到自己的 `RPSGame` 文件中：

```js
// 客户端的出拳数组为：[✊, ✌️, ✋]，
// 出 ✊ (index 为 0 )时，赢 ✌️（index 为 1），因此 wins[0] = 1，以此类推
const wins = [1, 2, 0];

@watchRoomFull()
export default class RPSGame extends Game {
  ......

  /**
   * 根据玩家的选择计算赢家
   * @return 返回胜利的 Player，或者 null 表示平局
   */
  private getWinner([player1Choice, player2Choice]: number[]) {
    if (player1Choice === player2Choice) { return null; }
    if (wins[player1Choice] === player2Choice) { return this.players[0]; }
    return this.players[1];
  }
}
```

客户端在收到 MasterClient 广播结束事件后在界面上做相应的结果展示。到这里基础逻辑都已经开发完成，您可以运行项目，打开两个页面，愉快的开始自己和自己的对战了。

### 离开房间
当所有客户端离开房间后，`GameManager` 会帮助我们把空房间销毁，因此在我们这个小游戏的代码中不需要再额外写这部分的代码。

### RxJS
当您查看示例 Demo 时，会发现代码和本文档中的代码相比更精简一些，原因是示例 Demo 中使用了 RxJS。如果您感兴趣，可以自行研究 [RxJS](https://rxjs-dev.firebaseapp.com/) 及相关接口的 [API 文档](https://leancloud.github.io/client-engine-nodejs-sdk/classes/game.html#takefirst)。

## 开发指南
当您按照本文档的说明一步一步开发出猜拳小游戏后，对 Client Engine SDK 和初始项目一定有了初步的感受，接下来您可以参考 [Client Engine 开发指南](client-engine-guide-node.html)更深入的了解整体结构及用法。
