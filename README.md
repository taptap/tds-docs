# TapTap 开发者中心文档

## 本地预览

```sh
yarn
yarn start

# 预览英文文档
yarn start --locale en

### 国际版预览中文文档：
yarn start --locale zh-hans 

```

注意：`yarn start` 并不会检查坏链。如需检查坏链，需要运行 `yarn build`。坏链检查只会检查文档内部链接指向的页面是否存在，不会检查指向第三方网站的外部链接，也不会检查页内链接（hash link）。

## 贡献

我们欢迎所有 TapTap 用户以及公司同事修改文档或提交 issue 为我们贡献或者修正错误，TapTap 衷心感谢您的贡献。

**贡献方法及注意事项：**

* 搭建本地开发环境，需要 [Node.js](https://nodejs.org/en/download/package-manager) 18.0 或更高版本 （可以通过运行 `node -v` 命令来查看本地 Node.js 版本）。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 管理同一台计算机上安装的多个 Node 版本。
* Fork 这个项目。
* 切换到本地 master 分支，git fetch 拉取远端最新修改到本地，如果远端 master 分支有修改，则将本地 master 分支 rebase 到最新的 master 分支上。
* 在 master 上新建分支，在新分支修改文档。
* 修改文档。
  * 参考下文介绍的目录结构，在 docs（中文文档）目录下修改文档内容。
  * 注意要同时在 i18n/en/docusaurus-plugin-content-docs/current（英文文档）目录下同步修改英文文档。
  * 插入配图、图表和 PPT 等，可参考下文详细介绍。
* 预览文档。运行 `yarn` 命令安装所需要依赖，运行 `yarn start` 命令可以本地预览。
* 预览没问题后，提交修改并发起 Pull Request，并指定 Reviewer。
  * Reviewer 同意修改后，才可以合并 Pull Request。如果不知道该设置谁作为 Reviewer，可以指给技术支持同事（SXiaoXu、WatchMan-Wang、yuwenjian）。
  * Pull Request 合并后，会自动发布上线。文档每隔半小时自动检测是否有更新，如果有更新会自动部署。
  * Pull Request 合并后，可删除当前分支。
  * 可参考 [Git Commit 日志风格指南](https://open.leancloud.cn/git-commit-message/)
* 文档规范可参考 [中文文案风格指南](https://blog.taptap.dev/pages/chinese-copywriting-guide)。

## 目录结构

```
.
├── .ci                                      多品牌、多节点构建相关配置
├── docs                                     中文文档
│   ├── ddos.mdx                             隐藏文档
│   └── sdk                                  顶栏菜单项
│       └── start                            侧栏菜单项
│           └── overview.mdx                 文档内容
├── i18n
│   └── en                                   英文文档
│       ├── code.json                        UI 翻译（用于文档内容以外的地方，如文档搜索）
│       ├── docusaurus-plugin-content-docs
│       │   ├── current                      全部文档内容，需与 `docs`（中文文档）结构一致
│       │   └── current.json                 侧栏菜单项翻译
│       └── docusaurus-theme-classic
│           └── navbar.json                  顶栏菜单项翻译
├── img                                      文档配图
├── sidebars.js                              菜单配置
├── src
│   ├── docComponents                        自定义组件（用于文档内容，如多编程语言）
│   ├── pages                                文档以外的页面（目前只包含首页）
│   ├── styles                               一些共享样式
│   └── theme                                自定义组件（用于文档内容以外的地方，如文档搜索）
├── versioned_docs                           旧版文档内容
├── versioned_sidebars                       旧版文档菜单配置
└── versions.json                            历史版本配置
```

其中编辑人员常用的目录有：

- `docs`（中文文档）
- `i18n/en/docusaurus-plugin-content-docs/current`（英文文档）
- `img`（文档配图）

## 文档编写

### 名称风格

文件路径和文件名请注意和 URL 路径保持一致，比如 URL 路径为 `/docs/community/features/` 的页面，文件路径请使用 `/docs/community/features.mdx`。

### 文档前言（元信息 metadata）

位于文档头部可提供一些文档本身的信息，以 `---` 开头并以 `---` 结束。

> - `*` 为必填项，`[]` 为字段说明
> - 回退到 XXX：指如果没有设置该值则使用 XXX 作为替代
> - [完整文档](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-frontmatter)

```markdown
---
title: *[正文的标题，同时也会显示在浏览器标签处]
sidebar_label: [显示在左侧边栏的标题，回退到 title]
sidebar_position: [数字，决定左侧边栏的顺序，数字越小越靠前]
slug: [URL 路径，一般情况下无需指定，回退到文件路径]
---

> 之后是你的文档内容
```

### 侧边栏

仅「一级导航」有侧边栏，分别为「游戏商店」、「游戏服务」、「设计资源」，分别对应 `docs` 目录下的 `store`、`sdk`、`design` 文件夹。

如需添加「一级导航」，请提需求到*技术支持*。如需添加次级导航，则需要调整目录结构，项目将自动以目录结构生成对应侧边栏（二级导航/.../N 级导航）。

如果不想文档出现在侧边栏，则可以放在「一级导航」同级，其他文档可以通过[链接到其他文档](#链接到其他文档)进行跳转，但此时目标页将不会显示侧边栏。这些文档需要在 YAML header 指定 `slug`，以免未来移动位置后 URL 改变；还需要指定 `noindex`，这样文档不会被文档搜索系统收录。

例子：

```markdown
---
title: 客服系统
slug: /sdk/tap-support/guide/
---

<head>
  <meta name="robots" content="noindex" />
</head>
```

### 组件

可以在 `src/docComponents/doc.tsx` 中编写 React 组件并在 Markdown 文件（下称 md 文件）中引入。目前项目中已预设了部分组件可直接使用。

如需要其他预设，请提需求到*技术支持*。

```md
import { Gray, Blue, Red, Black, FaqLink } from '/src/docComponents/doc';

<Red>这些字将是红色</Red>
<Gray>这些字将是灰色</Gray>
[<FaqLink>1. 开发者注册流程</FaqLink>](/store/store-register/)
```

#### 多编程语言

多种编程语言的代码示例可以使用 `MultiLang` 组件：

````md
<MultiLang>

```cs
public static void GetAccessToken (Action<AccessToken, TapError> action);
```

```java
public static AccessToken getCurrentToken;
```

```objectivec
+ (AccessToken *)getCurrentToken;
```

</MultiLang>
````

注意：

- 如果文件开头没有引入 `MultiLang` 组件，那么需要引入一下：`import { MultiLang } from '/src/docComponents/doc';`
- `<MultiLang>` 后、`</MultiLang>` 前，以及不同语言的代码片段之间都要空一行，否则 MDX 语法无法正确解析。
- 语言的顺序为 C#、Java、Objective-C，不能乱。
- 有些地方多语言代码示例使用 `Tabs` 组件，它的效果和 `MultiLang` 是等效的（实际上 `MultiLang` 最终会生成 `Tabs` 组件）。因为 `MultiLang` 更简洁，所以新编写的多语言代码示例推荐使用 `MultiLang`。

实际上，`MultiLang` 里不仅可以放入代码片段，还可以放入其他各种组件，只需保证：1) 内容顺序为 C#、Java、Objective-C，2) 不同编程语言内容在组件层级上是同级的。下面是一个例子：

````md
<MultiLang>
<>

```cs
public static void Login (LoginType loginType, string[] permissions);
```

**LoginType 参数说明**

| 参数             | 描述        |
| ---------------- | ----------- |
| LoginType.TAPTAP | TapTap 登录 |

</>
<>

```java
/**
* @param type TapTap = 0
*/
public static void login(Activity activity, @LoginType.ThirdPartyType int type, String... permissions);
```

**LoginType 参数说明**

| 参数 | 描述        |
| ---- | ----------- |
| 0    | TapTap 登录 |

</>
<>

```objectivec
+ (void)login:(TapBootstrapLoginType)type permissions:(NSArray *_Nullable)permissions;
```

**LoginType 参数说明**

| 参数                        | 描述        |
| --------------------------- | ----------- |
| TapBootstrapLoginTypeTapTap | TapTap 登录 |

</>
</MultiLang>
````

上面的例子中，我们使用了空标签 `<>...</>`（React 的 `Fragment` 组件）将 C#、Java、Objective-C 的不同内容包成三组。
同样，空标签和 markdown 之间也需要留出空行。
另外，由于 Docusaurus 的 TOC 生成并不能正确处理这种情况下的小标题（仅会根据第一个标签的内容生成小标题，切换标签后 TOC 的内容不变），请不要在 `MultiLang` 标签中使用 `h1`、`h2`、`h3` 级别的标题。
最后，某些文档面向的平台并不是 Unity、iOS、Android，这种情况下可以用 `kind` 参数指定使用 `MultiLang` 的变体，比如云引擎文档使用 `<MultiLang kind="engine">`，顺序为 JavaScript、Python、PHP、Java、C#、Go。

#### 图表

支持 [Mermaid](https://mermaid-js.github.io/mermaid/#/)。

在文件开头引入 `Mermaid` 组件：

```js
import Mermaid from "/src/docComponents/Mermaid";
```

然后在 `Mermaid` 组件的 `diagram` 属性中写 Mermaid 语法：

```js
<Mermaid
  diagram={`
graph LR
A((delete))-->|beforeDelete|H{error?}
H-->Y(Yes)
Y-->Z((interrupted))
H-->N(No)
N-->B[delete object on the cloud]
B -->|afterDelete|C((done))
`}
/>
```

#### PowerPoint 幻灯片

在文件开头引入 `OfficeDoc` 组件：

```js
import { OfficeDoc } from "/src/docComponents/doc";
```

然后在正文中插入组件：

```js
<OfficeDoc fileUrl="https://icepro.oss-cn-shanghai.aliyuncs.com/file/sample.ppt" />
```

#### SDK 版本号

SDK 版本号统一维护在 `/src/docComponents/sdkVersions.ts`。当 SDK 版本有更新时，只需在这里更新对应 SDK 的版本号，文档中所有引用这个版本号的地方就会跟着更新。

如果一篇文档需要引用 SDK 版本号，需要先在开头引入前面提到的这个文件：

```js
import sdkVersions from "/src/docComponents/sdkVersions";
```

如果版本号会出现在代码块中，还需要额外引入 `CodeBlock`：

```js
import CodeBlock from "@theme/CodeBlock";
```

根据版本号出现的位置不同，引用的方法也略有不同。如果版本号出现在一般段落中（非代码块），需要先将这部分段落用 JSX 语法改写，然后在版本号出现的地方插值：

```diff
- - 华为（HMS) 'cn.leancloud:mixpush-hms:8.1.4'
- - 小米 'cn.leancloud:mixpush-xiaomi:8.1.4'
+ <ul>
+   <li>华为（HMS) 'cn.leancloud:mixpush-hms:{sdkVersions.leancloud.java}'</li>
+   <li>小米 'cn.leancloud:mixpush-xiaomi:{sdkVersions.leancloud.java}'</li>
+ </ul>
```

如果版本号出现在代码块中，需要先将包裹代码块的 ` ``` ``` ` 用 ` <CodeBlock>{``}</CodeBlock> ` 替换，然后在版本号出现的地方插值。代码的语言可通过 `className` 传递给 `CodeBlock`：

````diff
- ```groovy
- dependencies {
-   //混合推送需要的包
-   implementation 'cn.leancloud:mixpush-android:8.1.4'
-   //即时通信与推送需要的包
-   implementation 'cn.leancloud:realtime-android:8.1.4'
-   implementation 'io.reactivex.rxjava2:rxandroid:2.1.0'
-
-   implementation 'com.huawei.hms:push:4.0.2.300'
- }
- ```
+ <CodeBlock className="groovy">
+ {`dependencies {
+   //混合推送需要的包
+   implementation 'cn.leancloud:mixpush-android:${sdkVersions.leancloud.java}'
+   //即时通信与推送需要的包
+   implementation 'cn.leancloud:realtime-android:${sdkVersions.leancloud.java}'
+   implementation 'io.reactivex.rxjava2:rxandroid:2.1.0'\n
+   implementation 'com.huawei.hms:push:4.0.2.300'
+ }`}
+ </CodeBlock>
````

注意：如果代码中有空行，需要替换成 `\n` 放在前一行结尾，否则会报错。

### 文档中的链接、配图、文件

#### 链接

##### 链接到其他文档

链接时使用基于对应语言文档根目录的绝对路径，**不要使用相对路径**。

- `docs/sdk/taptap-login/features.mdx` 在其他 md 文件中跳转需写作 `[跳转标题](/sdk/taptap-login/features/)`
- `docs/design/design-moment.mdx` 在其他 md 文件中跳转需写作 `[跳转标题](/design/design-moment/)`
- `i18n/en/docusaurus-plugin-content-docs/current/sdk/taptap-login/features.mdx` 在其他 md 文件中跳转需写作 `[跳转标题](/sdk/taptap-login/features/)`
- 标题跳转需要去除标点、将空格换成 `-` 并将大写字母改为小写，比如 `[<FaqLink>1. 如何进行游戏认领？</FaqLink>](/store/store-creategame#我的游戏已经被 TapTap 收录，可以进行游戏认领吗？)` 应写作 `[<FaqLink>1. 如何进行游戏认领？</FaqLink>](/store/store-creategame#我的游戏已经被-taptap-收录可以进行游戏认领吗)`

##### 链接到外部网站

- 要链接到 `https://docusaurus.io/`，在 md 文件中引用需写作 `[链接文本](https://docusaurus.io/)`

#### 配图

配图风格和规则参照 [Figma: DC 文档规范](https://www.figma.com/file/tbgT7SaWYfYkr6RPko9dZo/%E6%96%87%E6%A1%A3%E9%85%8D%E5%9B%BE-%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97?node-id=0%3A1)，规范包括游戏界面处理、标注规则、流程图规则、敏感信息遮盖、多图排版。

##### 在文档中插入图片

- 要插入位于 `img/design-1.1.png` 的图片，在 md 文件中引用需写作 `![图片说明](/img/design-1.1.png)`
- 要插入位于 `https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png` 的图片，在 md 文件中引用需写作 `![图片说明](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)`

##### 如何用 Figma 为截图添加标注

1. 在 Figma 中新建一个文件，将截图拖放或粘贴（<kbd>command</kbd> <kbd>V</kbd>）到页面中的任意位置。
2. 打开[文档配图指南](https://www.figma.com/file/tbgT7SaWYfYkr6RPko9dZo/%E6%96%87%E6%A1%A3%E9%85%8D%E5%9B%BE-%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%E3%80%90%E8%AE%BE%E8%AE%A1%E3%80%91?node-id=113%3A91)，从中拷贝（<kbd>command</kbd> <kbd>C</kbd>）你想使用的标注组件。
3. 回到前面新建的文件，粘贴（<kbd>command</kbd> <kbd>V</kbd>）刚刚拷贝的标注组件。
4. 将标注组件拖拽到合适的位置并调整大小。
5. 如果调整好大小之后发现标注组件的边框太细或者里面的文本/箭头太小，可以适当缩小原始截图的大小（注意缩放截图时要按住 <kbd>shift</kbd> 以保持原始长宽比），然后重复第 4 步。
6. 如果截图需要多个标注，请重复第 2 至 5 步。注意更新标注组件里面用作序号的文本。
7. 选中所有元素（<kbd>command</kbd> <kbd>A</kbd>），然后按下 <kbd>option</kbd> <kbd>command</kbd> <kbd>G</kbd>（或者右击选中的内容，点击「Frame selection」）。此时包括截图和标注在内的所有元素会被包裹进一个 Frame（可以理解为其他平面设计软件中「画板」和「编组」的结合体）。
8. 点击右侧面板最下方的「Export」，保持默认设置，点击「Export _Frame 名称_」（如果没有改过 Frame 名称，那么这里默认会显示为「Export Frame 1」）。

##### Tips

- DC 后台的截图：可以用 Chrome 插件 GoFullPage 截图，之后再使用 Figma 完成敏感信息遮盖、标注等，最后导出图片。
- 一些需要绘制的图片：比如内嵌动态的很多图片，可以使用 UI/UX 同事的设计稿。
- IDE 或编辑器界面的截图：底色参考配图规范，尽量展示完整的界面。

#### 文件

视频等大文件可以上传到 LC 华北节点的 capacity-center 应用（App ID：lhzo7z96ayhad9flpynyiu79t2jpzuasz2ke8cdb09zduvug）。

0. 初次上传前，先找 jiangruoxu、suixiaoxu 加你为应用的协作者，之后即可通过 LC 控制台上传文件。
1. 登录 LC 控制台 > 数据存储 > 文件：<https://console.leancloud.cn/apps/lhzo7z96ayhad9flpynyiu79t2jpzuasz2ke8cdb09zduvug/storage/file>
2. 点击「上传」按钮上传文件。上传完成后，文件表格中的 URL 即为文件的 URL。

图片等小文件请直接提交至仓库。

## 翻译相关

### md 文档文件翻译

请放在其他语言（如 `en`）文件夹「相同路径」下。如想翻译 `docs/tap-download.mdx` 文件，则需要把翻译文件放在 `i18n/en/docusaurus-plugin-content-docs/current/tap-download.mdx`。

### 文件夹翻译（如有困难可直接联系技术支持）

首先请确保通过 `_category_.json` 为文件夹设置了中文 label：

```json
{
  "label": "中文侧边栏名",
  "collapsed": true,
  "position": 3
}
```

在非中文 `docs` 目录下有一个 `current.json` 文件用来存放所有中文 label 对应的英文翻译。下面的示例展示了包含 `docs/sdk/taptap-login`（TapTap 登录）和 `docs/sdk/taptap-login/guide`（开发指南）这两个目录的翻译的 `current.json` 文件：

```json
{
  "sidebar.sdk.category.TapTap 登录": {
    "message": "TapTap Login",
    "description": "The label for category TapTap 登录 in sidebar sdk"
  },
  "sidebar.sdk.category.开发指南": {
    "message": "Guides",
    "description": "The label for category 开发指南 in sidebar sdk"
  }
}
```

## 多品牌、多节点

本项目为三个服务的文档提供了支持：

- [TapTap 国内版](https://developer.taptap.cn/docs/)
- [TapTap 海外版](https://developer.taptap.io/docs/)
- [LeanCloud](https://docs.leancloud.cn/)

这三个服务的文档内容各不相同，每个服务的文档都有一些它独有的页面。不同文档的配置也存在差异，比如 TapTap 国内版文档的默认语言是简体中文，而 TapTap 海外版文档的默认语言则是英文。同一篇文档中不同内容的显示与否也会由配置来决定。此外，LeanCloud 文档需要使用和 TapTap 文档不一样的配色风格。

Docusaurus 自身并没有提供「从一个项目构建出不同版本」的功能。为实现该功能，我们在 `.ci` 目录下放置了两个构建脚本（`build-hk.sh` 和 `build-leancloud.sh`），它们会分别在 TapTap 海外版文档和 LeanCloud 文档的构建阶段被执行，将当前项目中的文档文件（也就是 TapTap 国内版用到的文件）改造成目标版本的文档所需的文件。你可以通过浏览这两个构建脚本来了解不同版本的文档相对于 TapTap 国内版的文档存在哪些差异。

对于文档维护者来说，可以借助这两个脚本来控制不同版本之间的内容差异：

- 加入 `docs` 和 `i18n` 的文档默认会出现在 TapTap 国内版和 TapTap 海外版的文档中，但不会出现在 LeanCloud 文档中。
- 如果想在 TapTap 海外版文档中隐藏这篇文档，需要在 `build-hk.sh` 中使用 `rm` 命令移除相关文件。
- 如果想在 LeanCloud 文档中显示这篇文档，需要在 `build-leancloud.sh` 中使用 `cp` 命令将相关文件复制到临时目录中。
- `.ci` 目录中提供了名为 `hk` 和 `leancloud` 的两个目录，分别用于存放仅适用于 TapTap 海外版的文档和仅适用于 LeanCloud 的文档。如需添加仅适用于某个版本的内容，请将文件放入对应目录，并在构建脚本中借助 `cp` 命令将文件复制到合适的位置。

## 文档发布注意事项

- 不支持 html 文件脚本，直接复制 markdown 过来的文件可能无法初始化
- 仔细检查 sidebars.js 结构，可能无法初始化左侧导航栏
- docusaurus.config.js/#themeConfig.items 可以配置多个 headerLinks，但是要与 sidebars.js 对应，否则无法初始化菜单栏
- 即便是代码块包裹的 dom 节点，也会无法编译，导致整个 md 无法加载。可以尝试用 markdown 转义符'\'试试
- 用不到的内容尽量删除（git 会保留历史）而不是注释掉，因为翻译人员不一定熟悉 HTML 注释标记，可能因此做无用功。
- 一定要本地运行一下，检查更改过的代码文件是否能正常打开再 pr
- 若端口冲突，可手动修改 package.json#start 脚本；可以添加外部访问 ip 段，或者指定全部 docusaurus start --port 3000 --host 0.0.0.0

## 优化图片

运行 `yarn optimg` 任务可以优化 `img` 下的 JPEG（有损压缩）和 PNG 图片（无损压缩）。这一任务运行时间较长，所以未加入构建环节，需要手动运行。建议过一段时间（比如一两个月）跑一下。

## 多版本

按照以下流程增加一个版本（`N` 表示当前版本；请将 `N` 替换为具体的数值）：

1. 确认当前仓库没有包含任何新版本（`N+1` 版本）的内容
2. 新建一个分支，比如 `vN`，运行 `yarn docusaurus docs:version vN`
3. 替换 `versioned_docs/version-vN/` 下的内链，替换的正则是 `\]\(/(sdk|store|design)` 替换值为 `](/vN/$1`

## 其他文档

[Docusaurus 文档介绍](https://docusaurus.io/zh-CN/docs/docs-introduction)
