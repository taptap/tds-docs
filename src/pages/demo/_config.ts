import { translate } from "@docusaurus/Translate";
import { type } from "os";

/* 内部地址 */
type ActionCellLinkInternal = {
  label: string;
  to: string;
};

/* 外跳地址 */
type ActionCellLinkExternal = {
  label: string;
  href: string;
};

type Entry = {
  title: string;
  description?: string;
  type1?:string;
  links: (ActionCellLinkInternal | ActionCellLinkExternal)[];
};

type TypeButton={
  title :String,
  value:String
}

const demos = {
  'ios': [{
    name: 'Chat',
    desc: '一个用 Swift 搭建的聊天应用。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/swift-sdk-demo',
    type: 'ios',
    qcloudShow: true
  },{
    name: '数据存储入门',
    desc: '本教程模拟商品发布的场景，讲解 LeanCloud 数据存储的核心用法。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/StorageStarted',
    type: 'ios',
    qcloudShow: true
  },{
    name: 'LeanStorage Demo',
    desc: '展示了 LeanCloud 数据存储 SDK 的各种基础和高级用法，帮助开发者尽快上手 SDK。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/ios-simple-demo',
    type: 'ios',
    qcloudShow: true
  },{
    name: 'SNS 第三方登录',
    desc: 'iOS 第三方登录示例 Demo',
    downPath: '',
    mdPath: 'https://github.com/leancloud/LeanCloudSNSDemo-iOS',
    type: 'ios',
    qcloudShow: true
  },{
    name: 'LeanCloud 短信',
    desc: 'LeanCloud 开源的短信演示程序，功能包括发送简单的文本验证码、按照自定义模版发送复杂的文本短信、发送语音验证码、使用手机号进行账号注册登录和重置密码等。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/leancloud-smsdemo-ios',
    type: 'ios',
    qcloudShow: true
  }],
  'android': [{
    name: '数据存储入门',
    desc: '本教程模拟商品发布的场景，讲解 LeanCloud 数据存储的核心用法。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/StorageStarted',
    type: 'android',
    qcloudShow: true
  },{
    name: 'LeanStorage Demo',
    desc: '展示了 LeanCloud 数据存储 SDK 的各种基础和高级用法，包括用户系统、文件上传下载、子类化、对象复杂查询等。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/android-simple-demo',
    type: 'android',
    qcloudShow: true
  },{
    name: 'ChatKit 聊天 UI 组件',
    desc: '一个免费开源的 Android UI 聊天组件，基于 LeanCloud 实时通信 IM 服务。它将聊天的常用功能和 UI 一起提供给开发者进行二次开发。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/LeanCloudChatKit-Android',
    type: 'android',
    qcloudShow: true
  },{
    name: 'LeanPush Demo',
    desc: '一个使用了 LeanCloud 推送消息服务的简单 Demo，直接在客户端推送消息，并自己接收。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/android-push-demo',
    type: 'android',
    qcloudShow: true
  },{
    name: 'Android MixPush Demo',
    desc: '使用 Android 混合推送服务的简单 Demo。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/mixpush-demos',
    type: 'android',
    qcloudShow: true
  },{
    name: 'SNS 第三方登录',
    desc: 'Android 第三方登录示例 Demo。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/LeanCloudSNSDemo-Android',
    type: 'android',
    qcloudShow: true
  },{
    name: '短信验证码',
    desc: '使用 LeanCloud 发送和验证短信验证码。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/android-sms-demo',
    type: 'android',
    qcloudShow: true
  },{
    name: 'Funny Feed',
    desc: 'Android 信息流 Demo 应用。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/funny-feed/',
    type: 'android',
    qcloudShow: true
  }],
  'python': [{
    name: 'Flask Todo Demo',
    desc: 'Flask Todo Demo 是一个云引擎的示例项目。它运行在 Python 3 上，依赖 flask 和 LeanCloud Python SDK。点击详情来查看在线 Demo。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/flask-todo-demo',
    type: 'python',
    qcloudShow: true
  }],
  'web': [{
    name: '数据存储入门',
    desc: '本教程模拟商品发布的场景，讲解 LeanCloud 数据存储的核心用法。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/StorageStarted',
    type: 'web',
    qcloudShow: true
  }, {
    name: 'LeanTodo (Vue)',
    desc: '使用 JavaScript 存储 SDK 与 Vue.js 实现的 LeanTodo 应用。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/leantodo-vue/',
    type: 'web',
    qcloudShow: true
  }, {
    name: 'LeanTodo (React Hooks)',
    desc: '使用 JavaScript 存储 SDK 与 React Hooks 实现的 LeanTodo 应用。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/react-hook-demo',
    type: 'web',
    qcloudShow: true
  }, {
    name: 'FileUp (Svelte)',
    desc: '使用 JavaScript 存储 SDK 与 Svelte 实现的文件上传小工具。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/fileup/',
    type: 'web',
    qcloudShow: true
  }, {
    name: 'LeanMessage',
    desc: '使用 JavaScript 即时通讯 SDK 与 Angular 实现的完整功能的聊天 WebApp',
    downPath: '',
    mdPath: 'https://github.com/leancloud/LeanMessage-Demo',
    type: 'web',
    qcloudShow: true
  }],
  'php': [{
    name: '云引擎 Todo',
    desc: '使用了 Slim PHP 框架搭建的 Todo 程序。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/slim-todo-demo',
    type: 'php',
    qcloudShow: true
  }],
  'weapp': [{
    name: 'LeanTodo',
    desc: '使用 JavaScript 存储 SDK 在微信小程序平台上实现的 LeanTodo 应用。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/leantodo-weapp',
    type: 'weapp',
    qcloudShow: true
  }],
  'reactnative': [{
    name: 'LeanTodo',
    desc: '使用 JavaScript 存储 SDK 与 React Native 实现的 LeanTodo 应用。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/leantodo-react-native',
    type: 'reactnative',
    qcloudShow: true
  },{
    name: '图片上传',
    desc: 'React Native 搭配 LeanCloud 文件存储服务，实现在 iOS 和 Android 客户端上传图片。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/react-native-image-upload-demo',
    type: 'reactnative',
    qcloudShow: true
  },{
    name: '消息推送',
    desc: '演示了如何在 React Native for iOS 中使用 LeanCloud 推送服务。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/react-native-installation-demo',
    type: 'reactnative',
    qcloudShow: true
  }],
  'flutter': [{
    name: 'LeanCN',
    desc: '使用 Flutter 数据存储 SDK 开发周报请假应用',
    downPath: 'https://apps.apple.com/us/app/id1518553843',
    mdPath: 'https://github.com/leancloud/FlutterLeaveDemo',
    type: 'flutter',
    qcloudShow: true
  }],
  'node': [{
    name: '云引擎 Node.js Demo 汇总',
    desc: '该项目包括了推荐的最佳实践和常用的代码片段，每个文件中都有较为详细的注释，适合云引擎的开发者来阅读和参考，所涉及的代码片段也可以直接复制到项目中使用。',
    downPath: '',
    mdPath: 'https://github.com/leancloud/leanengine-nodejs-demos',
    type: 'node',
    qcloudShow: true
  },{
    name: '球球大作战',
    desc: '使用 LeanCloud 实时对战服务 + Cocos Creator 开发的模拟《球球大作战》demo',
    downPath: '',
    mdPath: 'https://github.com/leancloud/BallBattle-Cocos',
    type: 'node',
    qcloudShow: true
  }],
  'typescript': [{
    name: '回合制在线对战',
    desc: '用 LeanCloud 实时对战和 Client Engine 实现的一款回合制对战游戏',
    downPath: '',
    mdPath: 'https://github.com/leancloud/multiplayer-turn-based-game-demo',
    type: 'typescript',
    qcloudShow: true
  },{
    name: '猜拳游戏',
    desc: 'LeanCloud Client Engine 服务端（Node.js）示例',
    downPath: '',
    mdPath: 'https://github.com/leancloud/client-engine-nodejs-getting-started',
    type: 'typescript',
    qcloudShow: true
  }]
};


export const typeButton: TypeButton[]=[
  {
    title: '所有',
    value: '所有'
  },
  {
    title: 'iOS',
    value: 'ios'
  },
  {
    title: 'Android',
    value: 'android'
  },
  {
    title: 'Unity',
    value: 'unity'
  },
  {
    title: 'Python',
    value: 'python'
  },
  {
    title: 'Web',
    value: 'web'
  },
  {
    title: 'Node.js',
    value: 'node'
  },
  {
    title: 'PHP',
    value: 'php'
  },
  {
    title: '微信小程序',
    value: 'weapp'
  },
  {
    title: 'React Native',
    value: 'reactnative'
  },
  {
    title: 'Flutter',
    value: 'flutter'
  },
  {
    title: 'TypeScript',
    value: 'typescript'
  }
];



export const getEntries = (brand: string, region: string,buttonType:String): Entry[] => {

  var ENTRIES_LEANCLOUD: Entry[]=[];
  if ( buttonType == "所有") {
   ENTRIES_LEANCLOUD = Object.values(demos).flatMap((arr) =>
    arr.map(({ name, desc, mdPath ,type}) => ({
      title: name,
      description: desc,
      type1: type,
      links: [
        {
          label: "详细",
          href: mdPath,
        },
      ],
    }))
    );
  }else{
    ENTRIES_LEANCLOUD  = Object.values(demos).flatMap((arr) =>
    arr.map(({ name, desc, mdPath ,type}) => ({
      title: name,
      description: desc,
      type1: type,
      links: [
        {
          label: "详细",
          href: mdPath,
        },
      ],
    }))
  ) .filter((entry) => entry.type1 === buttonType);
  }
  console.log(ENTRIES_LEANCLOUD)

 
  const entries =  ENTRIES_LEANCLOUD ;
  
 

  const back = entries.map((entry) => ({
    title: translate({
      message: entry.title,
      id: `tds-home-${entry.title}`,
    }),
    ...(entry.description
      ? {
          description: translate({
            message: entry.description,
            id: `tds-home-${entry.description}`,
          }),
        }
      : {}),
    type1:entry.type1,
    links: entry.links.map((link) => ({
      ...link,
      label: translate({
        message: link.label,
        id: `tds-home-link-${link.label}`,
      }),
    })),
  }));
  console.log("dsadsa")
  console.log(back)
  return back;
};
