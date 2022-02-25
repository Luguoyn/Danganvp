import {createApp} from 'vue'
import App from './App.vue'

import AudioVisual from 'vue-audio-visual'

const app = createApp(App);
app.mount('#app');

// 使用音频可视化组件
app.use(AudioVisual);