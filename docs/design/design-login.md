---
id: design-login
title: TapTap 登录入口的设计规则
sidebar_label: 登录设计指南
slug: /design
---
import {Red, Blue, Black, Gray} from '/src/docComponents/doc';
import useBaseUrl from '@docusaurus/useBaseUrl';

## 登录入口的类型

A. 符号型| B.长胶囊按钮型 | 
| ------ | ------ |
| 示例：（不同语言环境，不做样式区分）<br/>![](/img/design-1.1.0.png)   |中文示例：<br/>![](/img/design-1.1.png)<br/> 英文示例：<br/> <img src={useBaseUrl('/img/design-1.1-en.png')} alt="" width="300" />|


## A. 符号型登录入口

### 1.符号型登录入口内，信息的构成形式
由"Tap"字样标志 + 按钮底板构成 .

✅ 正确入口信息构成 |- | ❌ 错误入口信息构成 | -|
| ------ | ------ |------ |------ |
| <Blue>"Tap"字样标志   +   按钮底板</Blue>   |![](/img/design-1.1.0.png) |<Red> 不允许使用"TapTap"字样标志  +  按钮底板 </Red>  |<img src={useBaseUrl('/img/design-1.1.1.png')} alt="" width="400" />



### 2.登录入口底板的定制规则
登录入口的底板可进行定制，从而保持所有登录入口的统一性

✅ 正确的按钮底板样式 |- | ❌ 错误的按钮底板样式 | -|
| ------ | ------ |------ |------ |
| <Blue>允许替换底板风格<br/>允许根据游戏按钮的整体风格，<br/>对按钮底板进行任意造型的改造，<br/>但必须与其他登录形式的造型保持统一</Blue>   |![](/img/design-1.2.1.png) |<Red> 不允许与其他登录方式的<br/>底板造型产生差别 </Red>  | <img src={useBaseUrl('/img/design-1.2.2.png')} alt="" width="400" />

## B.长胶囊按钮型登录入口
### 1. 长胶囊按钮型登录入口内，信息的构成形式

#### 1.1 中文版
由于TapTap没有图形符号标志，因此TapTap登录入口的信息构成形式，应该使用"TapTap"字样标志 + "登录"文字的方式。

✅ 正确入口信息构成 |- | ❌ 错误入口信息构成 | -|
| ------ | ------ |------ |------ |
| <Blue>"TapTap"标志   +   "登录"文字信息</Blue>   |![](/img/design-1.1.png) |<Red> 不允许使用"标志"  +  "TapTap登录"文字信息 </Red>  | ![](/img/design-1.2.png)

#### 1.2 海外版
为了让TapTap登录入口，能够与其他海外第三方登录入口保持视觉上的一致性，应该使用"Tap"字样标志 + "Log in with TapTap"文字的方式。

✅ 正确入口信息构成 |- | ❌ 错误入口信息构成 | -|
| ------ | ------ |------ |------ |
| <Blue>"Tap"字样标志   +   "Log in with TapTap"文字信息</Blue>   |![](/img/design-1.1-en.png) |<Red> 不允许使用"TapTap"字样标志  +  "Log in with TapTap"文字信息 </Red>  | ![](/img/design-1.2-en.png)






### 2.TapTap标志在长胶囊按钮型登录入口上的规则
#### 2.1 TapTap标志模板
#### 2.1.1中文版
在中文版环境下，应该使用"TapTap"字样标志模板，必须基于该标志模板进行风格上的定制

中文版，"TapTap" 字样模板示例|
| ------ | 
| ![](/img/design-2.1.11.png)   |

#### 2.1.2海外版
在海外版环境下，应该使用"Tap"字样标志模板，必须基于该标志模板进行风格上的定制

中文版，"TapTap" 字样模板示例|
| ------ | 
| ![](/img/design-2.1.12.png)   |

### 2.2 TapTap标志色彩规则
当需要在 TapTap 标志上加入色彩，必须使用标志的蓝绿品牌色，可基于品牌色做小幅度色值的微调。另外，还可以使用反白色的 TapTap 标志。  
**TapTap字样填充色只能是蓝白两种选一种**

✅ 正确标志颜色 |- | ❌ 错误标志颜色运用 | -|
| ------ | ------ |------ |------ |
| <Blue>1.允许基于TapTap标志蓝绿品牌色，做小幅度微调 <br/>2.在深色背景下，可使用TapTap标志反白色  </Blue>  |中文示例：<br/>![](/img/design-2.1.1.png) ![](/img/design-2.1.2.png) <br/>英文示例：<br/>![](/img/design-2.1.1-en.png) ![](/img/design-2.1.2-en.png)| <Red>TapTap标志需要填充色彩时，不允许改变标志的品牌色 </Red> | 中文示例：<br/>![](/img/design-2.1.3.png)英文示例：<br/>![](/img/design-2.1.3-en.png)

### 2.3 TapTap标志的定制规则
由于登录SDK会接入到各种手游中，TapTap登录入口的风格需要与游戏UI一致才能融合到游戏界面中，因此游戏厂商可以对TapTap标志进行轻微的定制，但必须保持TapTap标志的品牌识别度。
**不限制外框、背景、“登录”字样，TapTap字样只能基于提供的svg去做填充**

✅ 正确的定制 |- | ❌ 错误的定制 | -|
| ------ | ------ |------ |------ |
| <Blue>1.保持TapTap标志的造型<br/>2.允许追加投影<br/>3.允许追加质感<br/>4.允许添加描边  </Blue> |中文示例：<br/>![](/img/design-2.2.1.png)<br/>英文示例：<br/>![](/img/design-2.2.1-en.png)<br/>中文示例：<br/> ![](/img/design-2.2.2.png)<br/>英文示例：<br/>![](/img/design-2.2.2-en.png)<br/>中文示例：<br/>![](/img/design-2.3.1.png)英文示例：<br/>![](/img/design-2.3.1-en.png)| <Red>1.不允许改变TapTap标志造型<br/>2.不允许模糊TapTap标志<br/>3.不允许使用其他内容替换TapTap标志 </Red> |中文示例：<br/> ![](/img/design-2.2.3.png)<br/>英文示例：<br/>![](/img/design-2.2.3-en.png)<br/>中文示例：<br/>![](/img/design-2.2.4.png)<br/>英文示例：<br/>![](/img/design-2.2.4-en.png)<br/>中文示例：<br/>![](/img/design-2.2.5.png)<br/>英文示例：<br/>![](/img/design-2.2.5-en.png)

<!-- <table>
<tbody>
	<tr>
	<th colSpan={2}>✅ 正确标志颜色</th>
	<th colSpan={2}>❌ 错误标志颜色运用 </th>
	</tr>
	<tr >
	<td><Blue>1.允许基于TapTap标志蓝绿品牌色，做小幅度微调 <br/>2.在深色背景下，可使用TapTap标志反白色  </Blue></td>
	<td><img src={useBaseUrl('/img/design-2.1.1.png')} alt="" /></td>
	<td><Red>TapTap标志需要填充色彩时，不允许改变标志的品牌色 </Red> </td>
	<td><img src={useBaseUrl('/img/design-2.1.3.png')} alt="" /></td>
	</tr>
</tbody>
</table> -->


