<script setup>
import { useRoute } from "vue-router";
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";

const route = useRoute();
</script>

<template>
  <div class="flex flex-col bg-[#F3F4F6] min-h-screen">
    <Header v-if="!route.meta.hideHeaderFooter" />

    <main
      class="flex-grow"
      :class="[!route.meta.hideHeaderFooter ? 'pt-20 md:pt-24' : '']"
    >
      <router-view />
    </main>

    <Footer v-if="!route.meta.hideHeaderFooter" />
  </div>
</template>

<style>
/* Reset margin/padding default */
body {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif; /* Pastikan font sesuai keinginan */
}

#app {
  max-width: none !important;
  width: 100%;
}
</style>
