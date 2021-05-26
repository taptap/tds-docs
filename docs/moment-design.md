---
id: moment-design
title: Tap动态 - 主题规范设计规则
sidebar_label: 内嵌动态主题规范设计规则
---
import {Red, Blue, Black, Gray, Green, BlueBlack} from '/src/docComponents/doc';
import useBaseUrl from '@docusaurus/useBaseUrl';

## Tap动态 - 主题规范设计规则（基于内嵌动态V1.30）

## 1.导航主题字符规则

### 1.1 导航主题字符的类型与应用区域

导航主题字符分为深色和浅色两种类型，适用于叠加在页面背景上的导航类或注释类字符。

|应用区域  | 深色主题文字示例 |  浅色主题文字示例 | 
| ------ | ------ |  ------ |
| <b>主导航</b><br/><BlueBlack> - 图标地步注释字符 <br/> - Tap标志字符</BlueBlack>  | 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.1.0.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.1.00.png')} alt="" width="230" />| 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.1.1.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.1.11.png')} alt="" width="230" /> |
|  |  |  |
| <b>标签栏</b><br/><BlueBlack> - 标签按钮字符 <br/> - 排序图标 </BlueBlack> | 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.1.2.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.1.22.png')} alt="" width="230" />| 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.1.3.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.1.33.png')} alt="" width="230" /> |
|  |  |  |
| <b>标签栏</b><br/><BlueBlack> - 标签按钮字符 <br/> - 排序图标</BlueBlack>  | 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.1.4.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.1.44.png')} alt="" width="230" />| 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.1.5.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.1.55.png')} alt="" width="230" /> |


### 1.2导航主题字符配置建议

字符必须清晰可见。因此，当厂商选取的主题背景为浅色时，建议使用深色主题字符；当主题背景为深色时，建议使用浅色主题字符。

| | ✅ 正确的主题字符配置方式 | ❌ 错误的主题字符配置方式 | 
| ------ | ------ |------ |
| <b>深色字符</b>   | 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.2.0.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.2.00.png')} alt="" width="230" />| 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.2.1.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.2.11.png')} alt="" width="230" /> |
|  |  |  |
| <b>浅色字符</b>   | 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.2.2.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.2.22.png')} alt="" width="230" />| 横屏:<br/><img src={useBaseUrl('/img/design-moment-1.2.3.png')} alt="" width="500" /><br/><br/> 竖屏：<br/> <img src={useBaseUrl('/img/design-moment-1.2.33.png')} alt="" width="230" /> |

## 2. 背景图主题规则
### 2.1 背景图尺寸
Tap动态同时支持横屏和竖屏，因此每个接入游戏需要分别提供横屏和竖屏，共2种尺寸的背景图。

| 尺寸参数 |
| ------ |
| <b>横屏:</b> <br/> - 高为1125px    - 宽为2436px <br/> <img src={useBaseUrl('/img/design-moment-2.1.0.png')} alt="" width="500" />|
| <b>竖屏:</b> <br/> - 高为2436px    - 宽为1125px <br/> <img src={useBaseUrl('/img/design-moment-2.1.1.png')} alt="" width="230" />|

### 2.2 背景图裁切适配方式
在小屏手机中体验Tap动态时，背景图会被裁切适配。

| 示例 |
| ------ |
| <b>横屏</b>: <br/> - 背景图居中，左右区域被裁切 <br/> <img src={useBaseUrl('/img/design-moment-2.2.0.png')} alt="" width="500" />|
| <b>竖屏:</b> <br/> - 背景图顶对齐，底部被裁切 <br/> <img src={useBaseUrl('/img/design-moment-2.2.1.png')} alt="" width="230" />|

### 2.3 背景图定制化建议
#### 2.3.1 背景图风格建议
背景图不得干扰内容的呈现，因此建议使用较为简洁或对比度较弱的背景。

| ✅ 正确的背景图配置方式 | ❌ 错误的背景图配置方式 | 
| ------ | ------ |------ |
| <Green><b>*不干扰内容信息和操作区域的显示</b><br/>- 色彩相对单一、简洁<br/>- 图形元素与背景的对比较弱</Green><br/> <img src={useBaseUrl('/img/design-moment-2.3.1.0.png')} alt="" width="500" /><br/> <br/> <img src={useBaseUrl('/img/design-moment-2.3.1.1.png')} alt="" width="500" />| <Red><b>*内容信息和操作区域明显被干扰</b><br/>- 色彩过于丰富、复杂<br/>- 图形元素与背景的对比很强</Red><br/><img src={useBaseUrl('/img/design-moment-2.3.1.2.png')} alt="" width="500" /><br/><br/> <img src={useBaseUrl('/img/design-moment-2.3.1.3.png')} alt="" width="500" /> |

#### 2.3.2 可追加在背景图中的图形元素风格建议
支持在背景图中加入图形元素，但不得干扰内容呈现。

| ✅ 正确的背景图配置方式 | ❌ 错误的背景图配置方式 | 
| ------ | ------ |------ |
|<Green><b>建议图形元素一：低饱和度的纹理</b><br/>- 图形造型简单，并且图形与背景的对比度较弱</Green><br/><br/> 横屏: <br/> <img src={useBaseUrl('/img/design-moment-2.3.2.0.png')} alt="" width="500" /><br/> <br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.2.1.png')} alt="" width="230" />| <br/><Red>- 纹理与背景的对比度太强</Red><br/><br/>横屏: <br/><img src={useBaseUrl('/img/design-moment-2.3.2.2.png')} alt="" width="500"/><br/><br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.2.3.png')} alt="" width="230" /> |
|  |   |
|<Green><b>建议图形元素二：低饱和度的图案</b><br/>- 图案饱和度低，营造出"远景"感</Green><br/><br/> 横屏: <br/> <img src={useBaseUrl('/img/design-moment-2.3.2.4.png')} alt="" width="500" /><br/> <br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.2.5.png')} alt="" width="230" />| <Red>- 图案与背景的对比度太强<br/>- 图案过于丰富密集</Red><br/><br/>横屏: <br/><img src={useBaseUrl('/img/design-moment-2.3.2.6.png')} alt="" width="500" /><br/><br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.2.7.png')} alt="" width="230" /> |
|  |   |
|<Green><b>建议图形元素三：简洁的背景 + 小面积装饰元素</b><br/>- 支持加入装饰元素，且面积较小，局部呈现在背景中</Green><br/><br/> 横屏: <br/> <img src={useBaseUrl('/img/design-moment-2.3.2.8.png')} alt="" width="500" /><br/> <br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.2.9.png')} alt="" width="230" />| <Red>- 装饰元素过于丰富密集<br/>- 装饰元素面积过大</Red><br/><br/>横屏: <br/><img src={useBaseUrl('/img/design-moment-2.3.2.10.png')} alt="" width="500" /><br/><br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.2.11.png')} alt="" width="230" /> |

#### 2.3.3 图形元素的置放安全区域
为了使被追加的图形元素，也能够呈现完整，因此定义了置放的安全区域。

| 规则参数 | 示例 | 
| ------ | ------ |------ |
|<Green><b>建议图形元素一：低饱和度的纹理</b></Green><br/><br/> <BlueBlack>横屏：建议纹理的色彩饱和度不高于下图，纹理分布的区域不做限制</BlueBlack> <br/> <img src={useBaseUrl('/img/design-moment-2.3.3.0.png')} alt="" width="500" /><br/> <br/><BlueBlack>竖屏: 竖屏与横屏规则一致</BlueBlack><br/> <img src={useBaseUrl('/img/design-moment-2.3.3.1.png')} alt="" width="230" />|<br/><br/>横屏: <br/><img src={useBaseUrl('/img/design-moment-2.3.3.2.png')} alt="" width="500" /><br/><br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.3.3.png')} alt="" width="230" /> |
|  |   |
|<Green><b>建议图形元素二：低饱和度的图案</b></Green><br/><br/> <BlueBlack>横屏：建议图案分布在背景的左右两侧，并且图案的面积总和 ≤ 背景图总面积的50%</BlueBlack> <br/> <img src={useBaseUrl('/img/design-moment-2.3.3.4.png')} alt="" width="500" /><br/> <br/><BlueBlack>竖屏: 竖屏与横屏规则一致</BlueBlack><br/> <img src={useBaseUrl('/img/design-moment-2.3.3.5.png')} alt="" width="230" />|<br/><br/>横屏: <br/><br/><img src={useBaseUrl('/img/design-moment-2.3.3.6.png')} alt="" width="500" /><br/><br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.3.7.png')} alt="" width="230" /> |
|  |   |
|<Green><b>建议图形元素三：简洁的背景 + 小面积装饰元素</b></Green><br/><br/> <BlueBlack>横屏：背景左右两侧可放置装饰元素，安全区域大小为宽=222px，高=1125px</BlueBlack> <br/> <img src={useBaseUrl('/img/design-moment-2.3.3.8.png')} alt="" width="500" /><br/> <br/><BlueBlack>竖屏：背景上下两侧可放置装饰元素，安全区域大小为宽=1125px，高=120px</BlueBlack><br/> <img src={useBaseUrl('/img/design-moment-2.3.3.9.png')} alt="" width="230" />|<br/><br/> 横屏: <br/><br/><img src={useBaseUrl('/img/design-moment-2.3.3.10.png')} alt="" width="500" /><br/><br/> 竖屏:<br/><br/> <img src={useBaseUrl('/img/design-moment-2.3.3.11.png')} alt="" width="230" /> |

#### 2.3.4 吸顶标签栏的背景色规则
吸顶标签栏的背景色可进行自定义，建议吸取背景图顶部的色彩，能够使界面风格更统一。

| 规则参数 | 示例 | 
| ------ | ------ |------ |
|<BlueBlack>横屏：建议吸取以下吸色区域的色值</BlueBlack> <br/> <img src={useBaseUrl('/img/design-moment-2.3.4.0.png')} alt="" width="500" /><br/> <br/><BlueBlack>竖屏：建议吸取以下吸色区域的色值</BlueBlack><br/> <img src={useBaseUrl('/img/design-moment-2.3.4.1.png')} alt="" width="230" />|横屏: <br/><img src={useBaseUrl('/img/design-moment-2.3.4.2.png')} alt="" width="500" /><br/><br/>竖屏:<br/> <img src={useBaseUrl('/img/design-moment-2.3.4.3.png')} alt="" width="230" /> |
