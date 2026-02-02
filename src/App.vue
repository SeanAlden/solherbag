<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import HomePage from "./components/HomePage.vue";
</script>

<template>
  <div class="flex flex-col bg-[#F3F4F6] min-h-screen">
    <Header />

    <!-- <main class="flex flex-grow justify-center items-center p-10">
      <div class="opacity-20 text-center">
        <h1 class="font-light text-4xl italic">Main Content Space</h1>
      </div>
    </main> -->
    <main class="flex-grow pt-20 md:pt-24">
      <!-- <HomePage /> -->
      <router-view />
    </main>

    <Footer />
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
