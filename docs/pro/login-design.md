---
id: login-design
title: TapTap 登录入口的设计规则
sidebar_label: 登录规范
---
import {Red, Blue, Black, Gray} from '../component';
import useBaseUrl from '@docusaurus/useBaseUrl';

## 1.TapTap 登录入口内，信息的构成形式
TapTap 登录入口的信息构成形式，应该使用 "TapTap" 标志 + "登录"文字的方式。

✅ 正确入口信息构成 |- | ❌ 错误入口信息构成 | -|
| ------ | ------ |------ |------ |
| <Blue>"TapTap"标志   +   "登录"文字信息</Blue>   |![](/img/design-1.1.png) |<Red> 不允许使用"标志"  +  "TapTap登录"文字信息 </Red>  | ![](/img/design-1.2.png)


## 2.TapTap标志在登录入口上的规则

### 2.1 TapTap标志色彩规则
当需要在 TapTap 标志上加入色彩，必须使用标志的蓝绿品牌色，可基于品牌色做小幅度色值的微调。另外，还可以使用反白色的 TapTap 标志。  
**TapTap字样填充色只能是蓝白两种选一种**

✅ 正确标志颜色 |- | ❌ 错误标志颜色运用 | -|
| ------ | ------ |------ |------ |
| <Blue>1.允许基于TapTap标志蓝绿品牌色，做小幅度微调 <br/>2.在深色背景下，可使用TapTap标志反白色  </Blue>  |![](/img/design-2.1.1.png)<br/> ![](/img/design-2.1.2.png)| <Red>TapTap标志需要填充色彩时，不允许改变标志的品牌色 </Red> | ![](/img/design-2.1.3.png)

### 2.2 TapTap标志的定制规则
由于登录SDK会接入到各种手游中，TapTap登录入口的风格需要与游戏UI一致才能融合到游戏界面中，因此游戏厂商可以对TapTap标志进行轻微的定制，但必须保持TapTap标志的品牌识别度。 
**不限制外框、背景、“登录”字样，TapTap字样只能基于提供的svg去做填充**

✅ 正确的定制 |- | ❌ 错误的定制 | -|
| ------ | ------ |------ |------ |
| <Blue>1.保持TapTap标志的造型<br/>2.允许追加投影<br/>3.允许追加质感<br/>4.允许添加描边  </Blue> |![](/img/design-2.2.1.png)<br/> ![](/img/design-2.2.2.png)| <Red>1.不允许改变TapTap标志造型<br/>2.不允许模糊TapTap标志<br/>3.不允许使用其他内容替换TapTap标志 </Red> | ![](/img/design-2.2.3.png)<br/>![](/img/design-2.2.4.png)<br/>![](/img/design-2.2.5.png)

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


