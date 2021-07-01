## 文档发布

1. 请到 https://git.gametaptap.com/tds/client-sdk/tds-sdk-all/tapsdk-doc 项目中编写文档

## 文档发布注意事项

- docs 下部分中文文件名 markdown 是沿用产品提供的文档原本使用的文件名或其他迁移过来的文件名。新创建的文件请使用英文，单词之间用 `-` 连接，例如 `hello-world.md`。
- 不支持html文件脚本，直接复制markdown过来的文件可能无法初始化
- markdown跳转需要将空格换成 `-`，比如 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、 安卓端测试形式)`
  替换成 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、-安卓端测试形式)`
- 仔细检查sidebars.js结构，可能无法初始化左侧导航栏
- docusaurus.config.js/#themeConfig.items可以配置多个headerLinks，但是要与sidebars.js对应，否则无法初始化菜单栏
- 即便是代码块包裹的dom节点，也会无法编译，导致整个md无法加载。可以尝试用markdown转义符'\'试试
- 用不到的内容尽量删除（git 会保留历史）而不是注释掉，因为翻译人员不一定熟悉 HTML 注释标记，可能因此做无用功。
- 一定要本地运行一下，检查更改过的代码文件是否能正常打开再pr
- 若端口冲突，可手动修改package.json#start脚本；可以添加外部访问ip段，或者指定全部docusaurus start --port 3000 --host 0.0.0.0
- master 分支为主分支，其他分支均为开发使用，无特殊含义。

## 多编程语言

多种编程语言的代码示例可以使用 `MultiLang` 组件：

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

注意：

- 如果文件开头没有引入 `MultiLang` 组件，那么需要引入一下：`import MultiLang from '@theme/MultiLang';`
- `<MultiLang>` 后、`</MultiLang>` 前、以及不同语言的代码片段之间都要空一行，否则 MDX 语法无法正确解析。
- 语言的顺序为 C#、Java、Objective-C，不能乱。
- 有些地方多语言代码示例使用 `Tabs` 组件，它的效果和 `MultiLang` 是等效的（实际上 `MultiLang` 最终会生成 `Tabs` 组件）。因为 `MultiLang`
  更简洁，所以新编写的多语言代码示例推荐使用 `MultiLang`。

实际上，`MultiLang` 里不仅可以放入代码片段，还可以放入其他各种组件，只需保证：1) 内容顺序为 C#、Java、Objective-C，2) 不同编程语言内容在组件层级上是同级的。 下面是一个例子：

    <MultiLang>
    <>

    ```cs
    public static void Login (LoginType loginType, string[] permissions);
    ```

    **LoginType参数说明**

    参数  | 描述
    | ------ | ------ |
    LoginType.TAPTAP | TapTap 登录

    </>
    <>

    ```java
    /**
    * @param type TapTap = 0
    */
    public static void login(Activity activity, @LoginType.ThirdPartyType int type, String... permissions);
    ``` 

    **LoginType参数说明**
    
    参数  | 描述
    | ------ | ------ |
    0 | TapTap 登录

    </>
    <>

    ```objectivec
    + (void)login:(TapBootstrapLoginType)type permissions:(NSArray *_Nullable)permissions;
    ```

    **LoginType参数说明**
    
    参数  | 描述
    | ------ | ------ |
    TapBootstrapLoginTypeTapTap | TapTap 登录

    </>
    </MultiLang>

上面的例子中，我们使用了空标签 `<>...</>` (React 的 Fragment 组件) 将 C#、Java、Objective-C 的不同内容包成三组。
同样，空标签和 markdown 之间也需要留出空行。
另外，由于 docsaurus 的 TOC 生成并不能正确处理这种情况下的小标题（仅会根据第一个标签的内容生成小标题，切换标签后 TOC 的内容不变），请不要在 `Multilang` 标签中使用 `h1`、`h2`、`h3` 级别的标题。
最后，某些文档面向的平台并不是 Unity、iOS、Android，这种情况下可以用 `kind` 参数指定使用 MultiLang 的变体，比如云引擎文档使用 `<MultiLang kind="engine">`，顺序为 JavaScript、Python、PHP、Java、C#、Go.

## 图表

支持 [Mermaid](https://mermaid-js.github.io/mermaid/#/)。

在文件开头引入 Mermaid 组件：

```js
import Mermaid from '@theme/Mermaid';
```

然后在 Mermaid 组件的 diagram 属性中写 Mermaid 语法：

```js
<Mermaid diagram={`
graph LR
A((delete))-->|beforeDelete|H{error?}
H-->Y(Yes)
Y-->Z((interrupted))
H-->N(No)
N-->B[delete object on the cloud]
B -->|afterDelete|C((done))
`} />
```

## 本地预览

```sh
npm start
```

注意，`npm start` 并不会检查坏链。
如需检查坏链，需要运行 `npm run build`。

## 关于国际化

> 参考 [docusaurus文档](https://v2.docusaurus.io/docs/i18n/tutorial)

- 国际化文件存放于`i18n`文件夹下，对应的目录结构如下：

    ```
    └── en
      ├── code.json  默认的翻译（自定义页面等）
      ├── docusaurus-plugin-content-docs
      │  ├── current 翻译文档的文件夹（层级相当于/doc，需要一一对应）
      │  └── current.json  文档目录Sidebar的翻译
      └── docusaurus-theme-classic
         └── navbar.json 顶栏Header的翻译
    ```

- 运行 `npm start -- --locale en` 可预览英文文档效果。

- 文档翻译使用 [memsource]，UI 文案翻译使用 [weblate]，详询 yangyuning

[memsource]: https://www.memsource.com/

[weblate]: https://translate.gametaptap.com/projects/taptap-developer/
 
