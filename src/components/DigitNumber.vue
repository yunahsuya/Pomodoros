<!-- 數字顯示設定 -->
<template>
  <!-- 圖片檔案(svg) => :、0-9 -->
  <svg
    class="digit"
    enable-background="new 0 0 251.333 380.004"
    height="380.004px"
    version="1.1"
    viewBox="0 0 251.333 380.004"
    width="251.333px"
    x="0px"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    y="0px"
  >
    <rect
      class="digit-a"
      :class="{ active: '02356789'.includes(data) }"
      height="22"
      width="189"
      x="31.667"
    />
    <rect
      class="digit-b"
      :class="{ active: '045689'.includes(data) }"
      height="157.001"
      width="21.333"
      y="22"
    />
    <rect
      class="digit-c"
      :class="{ active: '01234789'.includes(data) }"
      height="157.001"
      width="21.332"
      x="230"
      y="22"
    />
    <rect
      class="digit-d"
      :class="{ active: '2345689'.includes(data) }"
      height="22"
      width="189"
      x="31.667"
      y="179.001"
    />
    <rect
      class="digit-e"
      :class="{ active: '0268'.includes(data) }"
      height="157.001"
      width="21.333"
      y="201.001"
    />
    <rect
      class="digit-f"
      :class="{ active: '013456789'.includes(data) }"
      height="157.001"
      width="21.332"
      x="230"
      y="201.001"
    />
    <rect
      class="digit-g"
      :class="{ active: '0235689'.includes(data) }"
      height="22"
      width="189"
      x="31.667"
      y="358.004"
    />
    <circle :class="{ active: data === ':' }" cx="126.167" cy="100.5" r="22" />
    <circle :class="{ active: data === ':' }" cx="126.167" cy="279.502" r="22" />
  </svg>
</template>

<!--  這裡是 子元件 => DigitNumber.vue。 父元件是 => HomeView.vue

    ◆ defineProps() =>「子元件」
        => 用來宣告會接收哪些 props (Vue 3 <script setup> 的語法)

    ◆ ['data', 'color']
       => 表示這個元件可以從父元件接收到 data 和 color 這兩個資料

    ◆ defineProps(['data', 'color'])
       => 資料的入口 (接收外部傳進來的資料)
       => 元件可以變得超級彈性，外部可以決定 資料、顏色

    ◆ 資料是怎麼傳進來的？ => views -> HomeView.vue
       => 透過 HTML 樣式的寫法傳進來，例如：<DigitNumber color="#f4c8d0" :data="data" />
-->

<!--
    data  => 資料
    color => 顏色

-->
<script setup>
defineProps(['data', 'color'])
</script>

<style scoped lang="sass">
// 調整圖片大小、寬度 (svg)
svg
  margin: 5px
  width: 220px
rect, circle
  // fill => 填滿
  // transparent => 透明
  // fill: transparent => 讓圖形內部是透明的，只留下邊線或框線
  fill: transparent
  &.active
    // v-bind 把 CSS 值和 Vue 變數綁定
    // https://zh-hk.vuejs.org/api/sfc-css-features.html#v-bind-in-css
    fill: v-bind(color)
</style>
