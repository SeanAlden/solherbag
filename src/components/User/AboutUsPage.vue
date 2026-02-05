<template>
  <div class="bg-white min-h-screen overflow-x-hidden">
    <div class="flex flex-col justify-center items-center px-6 py-20 min-h-[70vh]">
      <div class="max-w-3xl text-center">
        <h1 class="mb-8 font-serif text-gray-900 text-6xl md:text-8xl tracking-tight">
          About Us
        </h1>
        
        <p class="px-4 md:px-12 text-gray-600 text-sm md:text-base uppercase leading-relaxed tracking-widest">
          In every stitch and every detail, Solher creates more than just a bag – we craft a legacy. 
          Inspired by timeless elegance and the strength of modern women, each Solher piece is 
          designed to embody confidence, refined living, and luxury that transcends time.
        </p>
      </div>
    </div>

    <div class="relative flex bg-white py-10 border-gray-100 border-t border-b overflow-x-hidden">
      <div class="flex whitespace-nowrap animate-marquee">
        <span v-for="n in 10" :key="n" class="mx-4 font-medium text-gray-800 text-sm uppercase tracking-tighter">
          We make things that work better and last longer. &nbsp;&nbsp; •
        </span>
      </div>

      <div class="top-10 absolute flex whitespace-nowrap animate-marquee2">
        <span v-for="n in 10" :key="n" class="mx-4 font-medium text-gray-800 text-sm uppercase tracking-tighter">
          We make things that work better and last longer. &nbsp;&nbsp; •
        </span>
      </div>
    </div>

    <div class="w-full">
      <img 
        src="../../../src/assets/about_us_image.png" 
        alt="Solher Craftsmanship" 
        class="w-full h-auto max-h-[800px] object-cover"
      />
    </div>
  </div>
</template>

<script setup>
// Script tetap kosong
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&display=swap');

h1 {
  font-family: 'Playfair Display', serif;
}

/* Animasi Marquee */
.animate-marquee {
  display: inline-block;
  animation: marquee 35s linear infinite;
}

.animate-marquee2 {
  display: inline-block;
  animation: marquee2 35s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee2 {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
}

.whitespace-nowrap {
  white-space: nowrap;
}
</style>