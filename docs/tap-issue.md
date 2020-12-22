---
id: tap-issue
title: 注意事项
sidebar_label: 注意事项
---
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '4px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<!-- TODO:需要前端用react获取浏览器，用超链接携带用户信息跳转到指定位置 -->
## 接入流程
到这一步时，相信您已经完成了<Highlight color="#01DFA5">游戏创建</Highlight>和<Highlight color="#01DFA5">SDK申请</Highlight>这两步。如果您是优先看到这里，请先[创建游戏](https://www.taptap.com/developer-center)并[申请SDK](https://www.taptap.com/developer-center)


## 强制更新

<Highlight color="#f9422f">⚠️注意：</Highlight>

您在接入TapSDK的过程中，请务必接入[强制更新](https://www.taptap.com/developer-center/doc/11?id=77#1.%E5%94%A4%E8%B5%B7TapTap%E6%9B%B4%E6%96%B0%E6%B8%B8%E6%88%8F)功能以提升用户体验


## TapSDK注意事项

### TapMoment动态
- 打开动态 or LiveTV 关闭声音：iOS 端系统自动处理，Android 端需要游戏处理
- 横竖屏：游戏都需要主动设置

## XDG注意事项
- 只能设置横屏，否则会崩溃
