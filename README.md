# danganvp-vue

## danganronpa vue project
- 利用vue写的脚本驱动型弹丸论破日常对话模块
- 基于Vue3.x
- 使用了animate.css动画库

## todos:
- 将UI更换为弹丸论破风格

## 已解决bugs:
- 部分情况下, 在进入/刷新页面时, background组件无法实现自动响应式缩放
  - 解决办法(临时): 手动修改一下浏览器窗口的比例/大小, 或者按F11进入全屏模式
  - 已解决, 用获取虚拟dom节点的width值和height值取代了windows.innerWidth和windows.innerHeight, 现在不会出现这种问题了.