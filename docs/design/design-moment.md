---
title: 内嵌动态设计指南
---

import {Red, Blue, Black, Gray, Background, Figure} from '/src/docComponents/doc';
import useBaseUrl from '@docusaurus/useBaseUrl';

## 导航描述字符规则

**TapTap 动态 - 主题规范设计规则（基于内嵌动态 V1.30）**

### 导航描述字符的类型与应用区域

导航描述字符分为深色和浅色两种类型，适用于叠加在页面背景上的导航类或注释类字符。

<Background title="应用在主导航，图标底部描述字符及标志字符">

<Figure caption="深色描述字符示例" imgSrc={useBaseUrl('/img/design-moment/1.1.1.1.png')} imgAlt="" />

<Figure caption="浅色描述字符示例" imgSrc={useBaseUrl('/img/design-moment/1.1.1.2.png')} imgAlt="" />

</Background>

<Background title="应用在标签栏，标签按钮字符及排序图标">

<Figure caption="深色描述字符示例" imgSrc={useBaseUrl('/img/design-moment/1.1.2.1.png')} imgAlt="" />

<Figure caption="浅色描述字符示例" imgSrc={useBaseUrl('/img/design-moment/1.1.2.2.png')} imgAlt="" />

</Background>

<Background title="应用在标签栏，标签按钮字符及排序图标">

<Figure caption="深色描述字符示例" imgSrc={useBaseUrl('/img/design-moment/1.1.3.1.png')} imgAlt="" />

<Figure caption="浅色描述字符示例" imgSrc={useBaseUrl('/img/design-moment/1.1.3.2.png')} imgAlt="" />

</Background>

### 导航描述字符配置建议

字符必须清晰可见。因此，当厂商选取的主题背景为浅色时，建议使用深色描述字符；当主题背景为深色时，建议使用浅色描述字符。

<Background>

<Figure caption="深色描述字符示例" isRecommended={true} quote="正确的主题字符配置方式" imgSrc={useBaseUrl('/img/design-moment/1.2.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的主题字符配置方式" imgSrc={useBaseUrl('/img/design-moment/1.2.1.2.png')} imgAlt="" />

</Background>

<Background>

<Figure caption="浅色描述字符示例" isRecommended={true} quote="正确的主题字符配置方式" imgSrc={useBaseUrl('/img/design-moment/1.2.2.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的主题字符配置方式" imgSrc={useBaseUrl('/img/design-moment/1.2.2.2.png')} imgAlt="" />

</Background>

## 背景图主题规则

### 背景图尺寸

Tap 动态同时支持横屏和竖屏，因此每个接入游戏需要分别提供横屏和竖屏，共 2 种尺寸的背景图。

<Background>

<Figure caption="尺寸参数" imgSrc={useBaseUrl('/img/design-moment/2.1.png')} imgAlt="" />

</Background>

### 背景图裁切适配方式

在小屏手机中体验 TapTap 动态时，背景图会被裁切适配。

<Background>

<Figure imgSrc={useBaseUrl('/img/design-moment/2.2.png')} imgAlt="" />

</Background>

### 背景图定制化建议

#### 背景图风格建议

背景图不得干扰内容的呈现，因此建议使用较为简洁或对比度较弱的背景。

<Background>

<Figure isRecommended={true} quote="正确的背景图配置方式" content={<>*不干扰内容信息和操作区域的显示<br/>- 色彩相对单一、简洁<br/>- 图形元素与背景的对比较弱</>} imgSrc={useBaseUrl('/img/design-moment/2.3.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的背景图配置方式" content={<>*内容信息和操作区域明显被干扰<br/>- 色彩过于丰富、复杂<br/>- 图形元素与背景的对比很强</>} imgSrc={useBaseUrl('/img/design-moment/2.3.1.2.png')} imgAlt="" />

</Background>

#### 可追加在背景图中的图形元素风格建议

支持在背景图中加入图形元素，但不得干扰内容呈现。

<Background content="建议图形元素一：低饱和度的纹理">

<Figure isRecommended={true} quote="正确的背景图配置方式" content="- 图形造型简单，并且图形与背景的对比度较弱" imgSrc={useBaseUrl('/img/design-moment/2.3.2.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的背景图配置方式" content="- 纹理与背景的对比度太强" imgSrc={useBaseUrl('/img/design-moment/2.3.2.1.2.png')} imgAlt="" />

</Background>

<Background content="建议图形元素二：低饱和度的图案">

<Figure isRecommended={true} quote="正确的背景图配置方式" content='- 图案饱和度低，营造出"远景"感' imgSrc={useBaseUrl('/img/design-moment/2.3.2.2.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的背景图配置方式" content={<>- 图案与背景的对比度太强<br/>- 图案过于丰富密集</>} imgSrc={useBaseUrl('/img/design-moment/2.3.2.2.2.png')} imgAlt="" />

</Background>

<Background content="建议图形元素三：简洁的背景 + 小面积装饰元素">

<Figure isRecommended={true} quote="正确的背景图配置方式" content="- 支持加入装饰元素，且面积较小，局部呈现在背景中" imgSrc={useBaseUrl('/img/design-moment/2.3.2.3.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的背景图配置方式" content={<>- 装饰元素过于丰富密集<br/>- 装饰元素面积过大</>} imgSrc={useBaseUrl('/img/design-moment/2.3.2.3.2.png')} imgAlt="" />

</Background>

#### 图形元素的置放安全区域

为了使被追加的图形元素，也能够呈现完整，因此定义了置放的安全区域。

<Background content="建议图形元素一：低饱和度的纹理">

<Figure caption="规则参数" imgSrc={useBaseUrl('/img/design-moment/2.3.3.1.1.png')} imgAlt="" />

<Figure content="示例" imgSrc={useBaseUrl('/img/design-moment/2.3.3.1.2.png')} imgAlt="" />

</Background>

<Background content="建议图形元素二：低饱和度的图案">

<Figure caption="规则参数" imgSrc={useBaseUrl('/img/design-moment/2.3.3.2.1.png')} imgAlt="" />

<Figure content="示例" imgSrc={useBaseUrl('/img/design-moment/2.3.3.2.2.png')} imgAlt="" />

</Background>

<Background content="建议图形元素三：简洁的背景 + 小面积装饰元素">

<Figure caption="规则参数" imgSrc={useBaseUrl('/img/design-moment/2.3.3.3.1.png')} imgAlt="" />

<Figure content="示例" imgSrc={useBaseUrl('/img/design-moment/2.3.3.3.2.png')} imgAlt="" />

</Background>

#### 吸顶标签栏的背景色规则

吸顶标签栏的背景色可进行自定义，建议吸取背景图顶部的色彩，能够使界面风格更统一。

<Background>

<Figure caption="规则参数" imgSrc={useBaseUrl('/img/design-moment/2.3.4.1.png')} imgAlt="" />

<Figure content="示例" imgSrc={useBaseUrl('/img/design-moment/2.3.4.2.png')} imgAlt="" />

</Background>
