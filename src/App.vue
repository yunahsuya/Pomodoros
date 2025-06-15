<!-- 最上面那條 -->
<template>
  <v-app>
    <!--
        <v-app-bar color="primary"> => 最上面改成 藍色
        <v-app-bar class="bg-deep-purple">  => 最上面改成 深紫色
        <v-app-bar class="bg-red"> => 最上面改成 紅色
        <v-app-bar class="bg-deep-orange-darken-4"> => 最上面改成 橘色

            <v-app-bar class="bg-red-darken-4">

            <v-app-bar class="bg-deep-orange-darken-4" style="background-color: #c93131">
            #ae2929

        # 顏色網址
        https://vuetifyjs.com/zh-Hans/styles/colors/#material-82725f698868

        # 自訂顏色網址
        https://angel-rs.github.io/css-color-filter-generator/

        # icon 網址
        https://pictogrammers.com/library/mdi/

    -->
    <!-- 最上面那條 -->
    <!-- 換顏色 -->
    <v-app-bar class="" style="background-color: #ae2929">
      <!-- 裡面的內容 => 1. 首頁、 2.事項、3. 設定 -->
      <v-container class="d-flex align-center">
        <!-- 最上面那條，最右邊的字 => 番茄鐘 -->
        <v-app-bar-title>番茄鐘</v-app-bar-title>
        <!-- 首頁 -->
        <v-btn prepend-icon="mdi-clock-check-outline" to="/">首頁</v-btn>
        <!-- 事項 -->
        <v-btn prepend-icon="mdi-robot-excited-outline" to="/list">事項</v-btn>
        <!-- 設定 -->
        <v-btn prepend-icon="mdi-bell-cog-outline" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <!-- 改背景顏色
          <v-main style="background-color: palegoldenrod">
    -->
    <v-main>
      <!--
      <SlotExample v-slot="apple">
        <h1>{{ apple }}</h1>
        <h1>{{ apple.num }}</h1>
        <h1>{{ apple.text }}</h1>
      </SlotExample>
      <SlotExample v-slot="{ num }">
        <h1>{{ num }}</h1>
      </SlotExample>
      -->
      <!--
      <CardA />
      <component :is="CardA" />
      <component :is="CardB" />
      <component :is="c" v-for="(c, i) in components" :key="i" />
      -->
      <!--
        slot = 插槽 = 自訂元件內的某部分 HTML
        v-slot="插槽提供的元件內的變數"
        https://zh-hk.vuejs.org/guide/components/slots.html#scoped-slots
        Component = 目前路由應該顯示的元件
        https://router.vuejs.org/zh/guide/advanced/router-view-slot.html#RouterView-%E6%8F%92%E6%A7%BD
      -->
      <!-- 會對應到 目前的所在位置 (例如: 1. 首頁、 2.事項、3. 設定) -->
      <router-view v-slot="{ Component }">
        <!--
          keep-alive 包住的元件不會被銷毀
          include 指定保留的元件
          https://zh-hk.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        -->
        <!--
          component 動態元件
          is 要使用的元件
        -->
        <keep-alive include="HomeView">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
// import CardA from '@/components/CardA.vue'
// import CardB from '@/components/CardB.vue'
// import SlotExample from '@/components/SlotExample.vue'

// const components = [CardA, CardB]
</script>
