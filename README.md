## 文档发布  
1. git clone 本项目   
2. npm install，安装所有需要的包  
3. 修改/提交md文件到docs    
4. 参考sidebars.js文件，配置左侧目录  
5. npm start，浏览器默认打开3000端口，即可   

## 文档发布注意事项  
- docs 下部分中文文件名 markdown 是沿用产品提供的文档原本使用的文件名或其他迁移过来的文件名。新创建的文件请使用英文，单词之间用 `-` 连接，例如 `hello-world.md`。
- 不支持html文件脚本，直接复制markdown过来的文件可能无法初始化
- markdown跳转需要将空格换成 `-`，比如 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、 安卓端测试形式)` 替换成 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、-安卓端测试形式)`    
- 仔细检查sidebars.js结构，可能无法初始化左侧导航栏    
- docusaurus.config.js/#themeConfig.items可以配置多个headerLinks，但是要与sidebars.js对应，否则无法初始化菜单栏  
- 即便是代码块包裹的dom节点，也会无法编译，导致整个md无法加载。可以尝试用markdown转义符'\'试试  
- 一定要本地运行一下，检查更改过的代码文件是否能正常打开再pr  
- 若端口冲突，可手动修改package.json#start脚本；可以添加外部访问ip段，或者指定全部docusaurus start --port 3000 --host 0.0.0.0
- master 分支为主分支，其他分支均为开发使用，无特殊含义。

## 多编程语言

多种编程语言的代码示例可以使用 `MultiLang` 组件：

```mdx
<MultiLang>

```java
public static AccessToken getCurrentToken;
```

```objectivec
+ (AccessToken *)getCurrentToken;
```

```cs
public static void GetAccessToken (Action<AccessToken, TapError> action);
```

</MultiLang>
```

注意：

- 如果文件开头没有引入 `MultiLang` 组件，那么需要引入一下：`import MultiLang from '@theme/MultiLang';`
- `<MultiLang>` 后、`</MultiLang>` 前、以及不同语言的代码片段之间都要空一行，否则 MDX 语法无法正确解析。
- 有些地方多语言代码示例使用 `Tabs` 组件，它的效果和 `MultiLang` 是等效的（实际上 `MultiLang` 最终会生成 `Tabs` 组件）。因为 `MultiLang` 更简洁，所以新编写的多语言代码示例推荐使用 `MultiLang`。

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
 
