<template>
  <section class="bg-white w-full">
    <div class="w-full">
      <img
        src="../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="w-full h-auto object-cover"
      />
    </div>

    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2 class="mb-6 font-medium text-black text-2xl md:text-3xl tracking-tight">
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="font-light text-gray-700 text-sm md:text-base leading-relaxed">
        Crafted from carefully selected genuine leather, each SolHerbag piece reflects
        timeless elegance and refined craftsmanship — a seamless blend of beauty, quality,
        and modern sophistication.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 w-full">
      <div class="w-full">
        <img
          src="../assets/DSCF5814.jpg"
          alt="SolHer Style Left"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="w-full">
        <img
          src="../assets/DSCF5186.jpg"
          alt="SolHer Style Right"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2
        class="mb-8 font-medium text-black text-xl md:text-2xl leading-snug tracking-tight"
      >
        Embrace the possibilities with <br />
        go everywhere bags
      </h2>

      <router-link
        to="/catalog"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition-all duration-300"
      >
        Shop New Arrival
      </router-link>
    </div>
    
  </section>
</template>

<script setup></script>
