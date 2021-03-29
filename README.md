## 建站测试

**需要nodejs环境，自己建站需要走下面步骤；直接运行本项目请跳过【建站】这步**  
1. npx @docusaurus/init@latest init [projectName] classic  
2. 初始化后的目录。  
tap-sdk-doc  
├── blog  
│   ├── 2019-05-28-hola.md  
│   ├── 2019-05-29-hello-world.md  
│   └── 2020-05-30-welcome.md  
├── docs  
│   ├── doc1.md  
│   ├── doc2.md  
│   ├── doc3.md  
│   └── mdx.md  
├── src  
│   ├── css  
│   │   └── custom.css  
│   └── pages  
│       ├── styles.module.css  
│       └── index.js  
├── static  
│   └── img  
├── docusaurus.config.js   
├── package.json  
├── README.md  
├── sidebars.js  
└── yarn.lock  
3. npm start，开始项目，默认会打开本地3000端口  

## 文档发布  
1. git clone 本项目   
2. npm install，安装所有需要的包  
3. 修改/提交md文件到docs    
4. 参考sidebars.js文件，配置左侧目录  
5. npm start，浏览器默认打开3000端口，即可   

## 文档发布注意事项  
- 不支持html文件脚本，直接复制markdown过来的文件可能无法初始化
- markdown跳转需要将空格换成 `-`，比如 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、 安卓端测试形式)` 替换成 `[<FaqLink>2. 安卓端测试形式</FaqLink>](./store-test#二、-安卓端测试形式)`    
- 仔细检查sidebars.js结构，可能无法初始化左侧导航栏    
- docusaurus.config.js/#themeConfig.items可以配置多个headerLinks，但是要与sidebars.js对应，否则无法初始化菜单栏  
- 即便是代码块包裹的dom节点，也会无法编译，导致整个md无法加载。可以尝试用markdown转义符'\'试试  
- 一定要本地运行一下，检查更改过的代码文件是否能正常打开再pr  
- 若端口冲突，可手动修改package.json#start脚本；可以添加外部访问ip段，或者指定全部docusaurus start --port 3000 --host 0.0.0.0
- master 分支为主分支，其他分支均为开发使用，无特殊含义。
