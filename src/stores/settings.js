// 音樂匯入
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSettingsStore = defineStore(
  'settings',
  // 新增(匯入) Music (聲音設定)
  () => {
    const alarms = [
      // 第一首 => 鬧鐘
      { id: 1, name: '鬧鐘', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
      // 第二首 => yay
      { id: 2, name: 'yay', file: new URL('@/assets/yay.mp3', import.meta.url).href },
      // 第三首 => relax
      { id: 3, name: 'relax', file: new URL('@/assets/relax.mp3', import.meta.url).href },
      // 第四首 => piano
      { id: 4, name: 'piano', file: new URL('@/assets/piano.mp3', import.meta.url).href },
      // 第五首 => peaceful-piano
      {
        id: 5,
        name: 'peaceful-piano',
        file: new URL('@/assets/peaceful-piano.mp3', import.meta.url).href,
      },
    ]

    const selected = ref(1)

    const selectedAlarm = computed(() => {
      const i = alarms.findIndex(alarm => alarm.id === selected.value)
      return alarms[i]
    })

    return {
      alarms,
      selected,
      selectedAlarm,
    }
  },
  {
    persist: {
      key: 'pomodoro-settings',
      pick: ['selected'],
    },
  }
)
