import {onMounted, onUnmounted, reactive} from "vue";

export default function () {
    const win = reactive({
        width: 0, height: 0
    })

    function getWindowSize() {
        win.width = window.innerWidth;
        win.height = window.innerHeight;
        // win.width=div.value.width;
        // win.height=div.value.height;
        // win.width = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
        // win.height = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
    }

    onMounted(() => {
        window.addEventListener('resize', getWindowSize);
        getWindowSize()
        // win.width = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
        // win.height = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
    })

    onUnmounted(() => {
        window.removeEventListener('resize', getWindowSize);
    })

    return win;
}