# danganvp-vue

## danganronpa vue project
- 利用vue写的脚本驱动型弹丸论破日常对话模块
- 基于Vue3.x
- 使用了animate.css动画库

## todos:
- 增加UI动画
- 提高脚本能力
- 制作响应式UI

## 使用的组件/库

[vue-audio-visual](https://github.com/staskobzar/vue-audio-visual)

[animate.css](https://github.com/animate-css/animate.css)

## 已解决bugs:

### 部分情况下, 在进入/刷新页面时, background组件无法实现自动响应式缩放

解决方案:首次打开时, 利用
  ```javascript
      win.width=document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
      win.height=document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
  ```
获取窗口宽高