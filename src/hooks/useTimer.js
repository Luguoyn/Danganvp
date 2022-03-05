import {onMounted, onUnmounted, ref} from "vue";

export default function () {
    const timer = ref(0);
    let timerId;
    onMounted(() => {
        timerId = setInterval(() => {
            timer.value++;
        }, 1);
    });
    onUnmounted(() => {
        window.clearInterval(timerId);
    });

    return timer;
}