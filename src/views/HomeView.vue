<!-- 父元件 HomeView.vue -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- 日期 -->
        <h1>今天日期：{{ today }}</h1>

        <!-- 分隔線 -->
        <hr />

        <!-- 目前待完成事項 -->
        <h1 class="mt-5">待完成事項：{{ list.currentItem }}</h1>

        <!-- 分隔線 -->
        <hr />

        <!-- 事項剩餘時間 -->
        <h2>{{ list.timeleft }}</h2>

        <!-- 剩餘時間 -->
        <h2>剩餘時間：{{ timeLeftText }}</h2>

        <!-- 改字體顏色
        color="white" => 白色
        color="#f4c8d0" => 粉紅色
        color="#ff806b" => 橘色

        # 選色網站
        https://angel-rs.github.io/css-color-filter-generator/
        -->
        <!-- 父元件 HomeView.vue => 子元件 DigitNumber.vue -->
        <DigitNumber v-for="(data, i) in timeLeftText" :key="i" color="#f4c8d0" :data="data" />
      </v-col>

      <v-col cols="12">
        <!--
          開始按鈕停用條件:
          1. 倒數中
          2. 目前沒有事項或沒有未完成事項
        -->
        <!-- 播放鍵_停用 -->
        <v-btn
          :disabled="
            status === STATUS.COUNTING || (list.currentItem.length === 0 && list.items.length === 0)
          "
          icon="mdi-play"
          @click="startTimer"
        />
        <!-- 只有倒數中才能按暫停 -->
        <v-btn :disabled="status !== STATUS.COUNTING" icon="mdi-pause" @click="pause" />
        <!-- 目前有事項才能跳過 -->
        <v-btn :disabled="list.currentItem.length === 0" icon="mdi-skip-next" @click="finish" />
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- -------------------------------------------- Script ------------------------------------------------------ -->
<script setup>
import { useWebNotification } from '@vueuse/core'
import { computed, ref } from 'vue'
import DigitNumber from '@/components/DigitNumber.vue'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'

// 日期
const now = new Date()
const today = now.toLocaleString('zh-TW', {
  timeZone: 'Asia/Taipei',
})
console.log(today)

//
const list = useListStore()
const settings = useSettingsStore()

// 倒數狀態
const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2,
}
const status = ref(STATUS.STOP)

// 計時器
let timer = 0
// 開始計時器
// 暫停繼續 + 停止開始
const startTimer = () => {
  // 如果是停止開始，更新目前事項
  if (status.value === STATUS.STOP && list.items.length > 0) {
    list.setCurrentItem()
  }

  // 狀態變成倒數中
  status.value = STATUS.COUNTING

  // 開始倒數
  timer = setInterval(() => {
    list.countdown()

    if (list.timeleft < 0) {
      finish(timer)
    }
  }, 1000)
}

const pause = () => {
  clearInterval(timer)
  status.value = STATUS.PAUSE
}

const finish = () => {
  clearInterval(timer)

  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = settings.selectedAlarm.file
  audio.play()

  // 通知提醒
  const { show, isSupported } = useWebNotification({
    title: '事項完成',
    body: list.currentItem,
    icon: new URL('@/assets/tomato.png', import.meta.url).href,
  })
  if (isSupported.value) {
    show()
  }

  list.setFinishItem()

  if (list.items.length > 0) {
    startTimer()
  }
}

const timeLeftText = computed(() => {
  const m = Math.floor(list.timeleft / 60)
    .toString()
    .padStart(2, '0')
  const s = (list.timeleft % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>
