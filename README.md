# TapTap 开发者中心文档

## 本地预览

```sh
yarn
yarn start

# 预览英文文档
yarn start -- --locale en
```

注意：`yarn start` 并不会检查坏链。如需检查坏链，需要运行 `yarn build`。坏链检查只会检查文档内部链接指向的页面是否存在，不会检查指向第三方网站的外部链接，也不会检查页内链接（hash link）。

## 目录结构

```
.
├── docs                                     中文文档
│   ├── ddos.md                              隐藏文档
│   └── sdk                                  一级导航
│       └── 01-start                         二级导航
│           └── 01-overview.md               文档内容
├── i18n
│   ├── en                                   英文文档
│   │   ├── code.json                        UI 翻译（用于文档内容以外的地方，如文档搜索）
│   │   ├── docusaurus-plugin-content-docs
│   │   │   ├── current                      全部文档内容，需与 `docs`（中文文档）结构一致
│   │   │   └── current.json                 侧栏菜单项翻译
│   │   └── docusaurus-theme-classic
│   │       └── navbar.json                  顶栏菜单项翻译
│   └── eng                                  海外版英文文档
├── sidebars.js                              菜单配置
├── src
│   ├── docComponents                        自定义组件（用于文档内容，如多编程语言）
│   ├── pages                                首页等特殊页面
│   ├── styles                               一些共享样式
│   └── theme                                自定义组件（用于文档内容以外的地方，如文档搜索）
├── static
│   ├── img                                  文档配图
│   └── res                                  下载资源
├── versioned_docs                           旧版文档内容
├── versioned_sidebars                       旧版文档菜单配置
└── versions.json                            历史版本配置
```

其中编辑人员常用的目录有 `docs`（中文文档）、`i18n/en/docusaurus-plugin-content-docs/current`（英文文档）、`i18n/eng/docusaurus-plugin-content-docs/current`（海外版英文文档）、`static`（文档配图和下载资源）。

## 文档编写

### 名称风格

有部分文档或文件夹命名采用了 `DD-XXXX` 格式（`DD` 为数字，`XXXX` 为文档名称），这是之前为了通过文件名中的序号（DD）更改侧边栏排序（将在解析时**自动去除**）。新创建的文档使用 `sidebar_position` 排序，**不再添加 `DD-`**。

注意：如果文档有对应的英文内容，那么**修改 `DD` 后需要同时更新对应的英文文档的 `DD`**，保持两边一致，否则切换语言至英文后，仍然会显示中文内容。

### 文档前言（元信息 metadata）

位于文档头部可提供一些文档本身的信息，以 `---` 开头并以 `---` 结束。

> - `*` 为必填项，`[]` 为字段说明
> - 回退到 XXX：指如果没有设置该值则使用 XXX 作为替代
> - [完整文档](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-frontmatter)

```markdown
---
id: *[全局唯一的标识符，在不指定 slug 时，该 id 为 URL 路径]
title: *[正文的标题，同时也会显示在浏览器标签处]
sidebar_position: *[数字，决定左侧边栏的顺序，数字越小越靠前]
sidebar_label: [显示在左侧边栏的标题，回退到 title]
slug: [URL 路径，一般情况下无需指定，回退到 id]
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
id: tap-support
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

上面的例子中，我们使用了空标签 `<>...</>`（React 的 Fragment 组件）将 C#、Java、Objective-C 的不同内容包成三组。
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

> 注意：使用路径引用时需去除 `DD-` 前缀。程序默认将以 **id > title > 文件名** 的优先级进行查找文件。
>
> 可以通过 URL 快速知晓当前页面的路径引用。

链接时使用基于对应语言文档根目录的绝对路径，**不要使用相对路径**。

- `docs/sdk/02-taptap-login/01-features.md` 在其他 md 文件中跳转需写作 `[跳转标题](/sdk/taptap-login/features/)`
- `docs/sdk/02-taptap-login/01-features.md` 如果 id 为 `functions`（**建议文件名 ID 同步，仅作说明**），在其他 md 文件中跳转需写作 `[跳转标题](/sdk/taptap-login/functions/)`
- `docs/design/design-moment.md` 在其他 md 文件中跳转需写作 `[跳转标题](/design/design-moment/)`
- `i18n/en/docusaurus-plugin-content-docs/current/sdk/02-taptap-login/01-features.md` 在其他 md 文件中跳转需写作 `[跳转标题](/sdk/taptap-login/features/)`
- 标题跳转需要将空格换成 `-`，比如 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、 安卓端测试形式)` 替换成 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、-安卓端测试形式)`

##### 链接到外部网站

- 要链接到 `https://docusaurus.io/`，在 md 文件中引用需写作 `[链接文本](https://docusaurus.io/)`

#### 配图

配图风格和规则参照 [Figma: DC 文档规范](https://www.figma.com/file/tbgT7SaWYfYkr6RPko9dZo/%E6%96%87%E6%A1%A3%E9%85%8D%E5%9B%BE-%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97?node-id=0%3A1)，规范包括游戏界面处理、标注规则、流程图规则、敏感信息遮盖、多图排版。

##### 在文档中插入图片

- 要插入位于 `static/img/design-1.1.png` 的图片，在 md 文件中引用需写作 `![图片说明](/img/design-1.1.png)`
- 要插入位于 `https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png` 的图片，在 md 文件中引用需写作 `![图片说明](https://img.tapimg.com/market/images/c53d78b9b120276b53f82aebb0d01537.png)`

##### 如何用 Figma 为截图添加标注

1. 在 Figma 中新建一个文件，将截图拖放或粘贴（<kbd>command</kbd> <kbd>V</kbd>）到页面中的任意位置。
2. 打开[文档配图指南](https://www.figma.com/file/tbgT7SaWYfYkr6RPko9dZo/%E6%96%87%E6%A1%A3%E9%85%8D%E5%9B%BE-%E8%AE%BE%E8%AE%A1%E6%8C%87%E5%8D%97%E3%80%90%E8%AE%BE%E8%AE%A1%E3%80%91?node-id=113%3A91)，从中拷贝（<kbd>command</kbd> <kbd>C</kbd>）你想使用的标注组件。
3. 回到前面新建的文件，粘贴（<kbd>command</kbd> <kbd>V</kbd>）刚刚拷贝的标注组件。
4. 将标注组件拖拽到合适的位置并调整大小。
5. 如果调整好大小之后发现标注组件的边框太细或者里面的文本/箭头太小，可以适当缩小原始截图的大小（注意缩放截图时要按住 <kbd>shift</kbd> 以保持原始长宽比），然后重复第 4 步。
6. 如果截图需要多个标注，请重复第 2 至 5 步。注意更新标注组件里面用作序号的文本。
7. 选中所有元素（<kbd>command</kbd> <kbd>A</kbd>），然后按下 <kbd>option</kbd> <kbd>command</kbd> <kbd>G</kbd>（或者右击选中的内容，点击「Frame selection」）。此时包括截图和标注在内的所有元素会被包裹进一个 Frame（可以理解为其他平面设计软件中「画板」和「编组」的结合体）。
8. 点击右侧面板最下方的「Export」，保持默认设置，点击「Export {Frame 名称}」（如果没有改过 Frame 名称，那么这里默认会显示为「Export Frame 1」）。

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

请放在其他语言（如 `en`）文件夹「相同路径」下。如想翻译 `docs/tap-download.md` 文件，则需要把翻译文件放在 `i18n/en/docusaurus-plugin-content-docs/current/tap-download.md`。

### 文件夹翻译（如有困难可直接联系技术支持）

> 详细用法可查[官方文档](https://docusaurus.io/docs/2.0.0-alpha.73/sidebar#autogenerated-sidebar-metadatas)

使用 `_category_.json` 文件设置「文件夹侧边栏标题文案」（下称「文件夹 Label 名」）。

```json
{
  "label": "中文侧边栏名",
  "position": 3
}
```

在非中文 `docs` 目录下有一个 `current.json` 文件。以 `i18n/en/docusaurus-plugin-content-docs/current.json` 举例，请注意 `[]` 中的说明。

仅文件夹需要在此翻译，md 文件请直接放在对应文件夹下，通过 `title` 字段进行标题翻译。

```json
{
  "sidebar.[一级导航('sdk'|'store')].category.[文件夹Label名]": {
    "message": "[对应的英文翻译]",
    "description": "[该翻译对应的说明，一般情况只起注释作用]"
  }
}
```

注意：**文件夹名翻译与层级无关**，例如 `docs/sdk/04-中文父级/中文子级/02-排序中文/xxxx.md` 目录下，应添加目录翻译如下：

```json
{
  "sidebar.sdk.category.中文父级": {
    "message": "zhong wen fu ji",
    "description": "translate for 中文父级"
  },
  "sidebar.sdk.category.中文子级": {
    "message": "zhong wen zi ji",
    "description": "translate for 中文子级"
  },
  "sidebar.sdk.category.排序中文": {
    "message": "pai xu zhong wen",
    "description": "translate for 排序中文"
  }
}
```

## 文档发布注意事项

- 不支持 html 文件脚本，直接复制 markdown 过来的文件可能无法初始化
- 仔细检查 sidebars.js 结构，可能无法初始化左侧导航栏
- docusaurus.config.js/#themeConfig.items 可以配置多个 headerLinks，但是要与 sidebars.js 对应，否则无法初始化菜单栏
- 即便是代码块包裹的 dom 节点，也会无法编译，导致整个 md 无法加载。可以尝试用 markdown 转义符'\'试试
- 用不到的内容尽量删除（git 会保留历史）而不是注释掉，因为翻译人员不一定熟悉 HTML 注释标记，可能因此做无用功。
- 一定要本地运行一下，检查更改过的代码文件是否能正常打开再 pr
- 若端口冲突，可手动修改 package.json#start 脚本；可以添加外部访问 ip 段，或者指定全部 docusaurus start --port 3000 --host 0.0.0.0

## 优化图片

运行 `yarn optimg` 任务可以优化 `static/img` 下的 JPEG（有损压缩）和 PNG 图片（无损压缩）。这一任务运行时间较长，所以未加入构建环节，需要手动运行。建议过一段时间（比如一两个月）跑一下。

## 多版本

按照以下流程增加一个版本（`N` 表示当前版本；请将 `N` 替换为具体的数值）：

1. 确认当前仓库没有包含任何新版本（`N+1` 版本）的内容
2. 新建一个分支，比如 `vN`，运行 `yarn docusaurus docs:version vN`
3. 替换 `versioned_docs/version-vN/` 下的内链，替换的正则是 `\]\(/(sdk|store|design)` 替换值为 `](/vN/$1`

## 其他文档

[Docusaurus 文档介绍](https://docusaurus.io/zh-CN/docs/docs-introduction)
