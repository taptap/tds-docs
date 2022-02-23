---
title: TapTap 登录入口的设计规则
sidebar_label: 登录设计指南
slug: /design
---

import {Red, Blue, Black, Gray, Background, Figure} from '/src/docComponents/doc';
import useBaseUrl from '@docusaurus/useBaseUrl';

## 登录入口的类型

<Background>

<Figure subtitle="A. 符号型" imgSrc={useBaseUrl('/img/design/1.1.png')} imgAlt="" />

<Figure subtitle="B. 长胶囊按钮型" imgSrc={useBaseUrl('/img/design/1.2.png')} imgAlt="" />

</Background>

## A. 符号型登录入口

### 符号型登录入口内，信息的构成形式

由"Tap"字样标志 + 按钮底板构成。

<Background>

<Figure isRecommended={true} quote="正确入口信息构成" content='"Tap"字样标志 + 按钮底板' imgSrc={useBaseUrl('/img/design/2.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误入口信息构成" content='不允许使用"TapTap"字样标志 + 按钮底板' imgSrc={useBaseUrl('/img/design/2.1.2.png')} imgAlt="" />

</Background>

### 登录入口底板的定制规则

登录入口的底板可进行定制，从而保持所有登录入口的统一性。

<Background>

<Figure isRecommended={true} quote="正确的按钮底板样式" content='允许替换底板风格允许根据游戏按钮的整体风格，对按钮底板进行任意造型的改造，但必须与其他登录形式的造型保持统一' imgSrc={useBaseUrl('/img/design/2.2.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的按钮底板样式" content='不允许与其他登录方式的底板造型产生差别' imgSrc={useBaseUrl('/img/design/2.2.2.png')} imgAlt="" />

</Background>

## B. 长胶囊按钮型登录入口

### 长胶囊按钮型登录入口内，信息的构成形式

#### 中文版

由于 TapTap 没有图形符号标志，因此 TapTap 登录入口的信息构成形式，应该使用"TapTap"字样标志 + "登录"文字的方式。

<Background>

<Figure isRecommended={true} quote="正确入口信息构成" content='"TapTap"标志 + "登录"文字信息' imgSrc={useBaseUrl('/img/design/3.1.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误入口信息构成" content='不允许使用"标志" + "TapTap 登录"文字信息' imgSrc={useBaseUrl('/img/design/3.1.1.2.png')} imgAlt="" />

</Background>

#### 海外版

为了让 TapTap 登录入口能够与其他海外第三方登录入口保持视觉上的一致性，应该使用 `Tap` 字样标志 + `Log in with TapTap` 文字的方式。

<Background>

<Figure isRecommended={true} quote="正确入口信息构成" content='"Tap"字样标志 + "Log in with TapTap"文字信息' imgSrc={useBaseUrl('/img/design/3.1.2.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误入口信息构成" content='不允许使用"TapTap"字样标志 + "Log in with TapTap"文字信息' imgSrc={useBaseUrl('/img/design/3.1.2.2.png')} imgAlt="" />

</Background>

### TapTap 标志在长胶囊按钮型登录入口上的规则

#### TapTap 标志模板

#### 中文版

在中文版环境下，应该使用"TapTap"字样标志模板，必须基于该标志模板进行风格上的定制。

<Background>

<Figure caption='中文版，"TapTap" 字样模板示例' imgSrc={useBaseUrl('/img/design/3.2.1.png')} imgAlt="" />

</Background>

#### 海外版

在海外版环境下，应该使用"Tap"字样标志模板，必须基于该标志模板进行风格上的定制。

<Background>

<Figure caption='海外版，"Tap" 字样模板示例' imgSrc={useBaseUrl('/img/design/3.2.2.png')} imgAlt="" />

</Background>

### TapTap 标志色彩规则

当需要在 TapTap 标志上加入色彩，必须使用标志的蓝绿品牌色，可基于品牌色做小幅度色值的微调。另外，还可以使用反白色的 TapTap 标志。

**TapTap 字样填充色只能是蓝白两种选一种。**

<Background>

<Figure isRecommended={true} quote="正确标志颜色" content={<>1. 允许基于 TapTap 标志蓝绿品牌色，做小幅度微调<br/>2. 在深色背景下，可使用 TapTap 标志反白色</>} imgSrc={useBaseUrl('/img/design/3.3.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误标志颜色" content='TapTap 标志需要填充色彩时，不允许改变标志的品牌色' imgSrc={useBaseUrl('/img/design/3.3.2.png')} imgAlt="" />

</Background>

### TapTap 标志的定制规则

由于登录 SDK 会接入到各种手游中，TapTap 登录入口的风格需要与游戏 UI 一致才能融合到游戏界面中，因此游戏厂商可以对 TapTap 标志进行轻微的定制，但必须保持 TapTap 标志的品牌识别度。

**不限制外框、背景、「登录」字样，TapTap 字样只能基于提供的 svg 去做填充。**

<Background>

<Figure isRecommended={true} quote="正确的定制" content={<>1. 保持 TapTap 标志的造型<br/>2. 允许追加投影<br/>3. 允许追加质感<br/>4. 允许添加描边</>} imgSrc={useBaseUrl('/img/design/3.4.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="错误的定制" content={<>1. 不允许改变 TapTap 标志造型<br/>2. 不允许模糊 TapTap 标志<br/>3. 不允许使用其他内容替换 TapTap 标志</>} imgSrc={useBaseUrl('/img/design/3.4.2.png')} imgAlt="" />

</Background>
