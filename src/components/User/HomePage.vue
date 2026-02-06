<template>
  <section class="bg-white w-full">
    <!-- HERO IMAGE -->
    <!-- <div class="w-full">
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="w-full h-auto object-cover"
      />
    </div> -->
    <div
      class="w-full overflow-hidden cursor-pointer"
      @click="navigateToSpecificProduct('ETERNA RED')"
    >
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
      />
    </div>

    <!-- INTRO -->
    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2
        class="mb-6 font-medium text-black text-2xl md:text-3xl tracking-tight"
      >
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="font-light text-gray-700 text-sm md:text-base leading-relaxed">
        Crafted from carefully selected genuine leather, each SolHerbag piece
        reflects timeless elegance and refined craftsmanship — a seamless blend
        of beauty, quality, and modern sophistication.
      </p>
    </div>

    <!-- DOUBLE IMAGE -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 w-full">
      <img
        src="../../assets/DSCF5814.jpg"
        alt="SolHer Style Left"
        class="w-full h-full object-cover"
      />
      <img
        src="../../assets/DSCF5186.jpg"
        alt="SolHer Style Right"
        class="w-full h-full object-cover"
      />
    </div> -->

    <div class="grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden">
      <img
        src="../../assets/DSCF5814.jpg"
        @click="navigateToSpecificProduct('DSCF5814')"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
      />
      <img
        src="../../assets/DSCF5186.jpg"
        @click="navigateToSpecificProduct('DSCF5186')"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
      />
    </div>

    <!-- CTA -->
    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2 class="mb-8 font-medium text-black text-xl md:text-2xl leading-snug">
        Embrace the possibilities with <br />go everywhere bags
      </h2>

      <router-link
        to="/catalog"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition"
      >
        Shop New Arrival
      </router-link>
    </div>

    <!-- ===================== -->
    <!-- VOLUME 1 -->
    <!-- ===================== -->
    <!-- <div class="px-6 pb-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 1 - Goddess Of The Sun
        </h3>

        <div class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="(product, index) in volumeOneProducts"
            :key="index"
            class="flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer will-change-transform contain"
          >
            <div class="bg-gray-100 mb-4 rounded-sm overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                decoding="async"
                class="w-full h-[350px] md:h-[450px] object-cover"
              />
            </div>
            <div class="text-left">
              <h4
                class="mb-1 text-[10px] text-gray-500 md:text-xs uppercase tracking-widest"
              >
                {{ product.name }}
              </h4>
              <p class="font-medium text-black text-xs md:text-sm">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="px-6 py-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 1 - Goddess Of The Sun
        </h3>
        <div class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in volumeOneProducts"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">{{ formatPrice(p.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== -->
    <!-- VOLUME 2 -->
    <!-- ===================== -->
    <!-- <div class="px-6 pb-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <div class="flex justify-between items-end mb-10">
          <h3
            class="font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
          >
            Volume 2 - The Red Chapter Collection
          </h3>
          <router-link
            to="/catalog"
            class="text-gray-400 hover:text-black text-xs uppercase tracking-widest transition"
          >
            View all
          </router-link>
        </div>

        <div class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="(product, index) in volumeTwoProducts"
            :key="index"
            class="flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer will-change-transform contain"
          >
            <div class="bg-gray-100 mb-4 rounded-sm overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                decoding="async"
                class="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div class="text-left">
              <h4
                class="mb-1 text-[10px] text-gray-500 uppercase tracking-widest"
              >
                {{ product.name }}
              </h4>
              <p class="font-medium text-black text-xs">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="px-6 pb-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 2 - The Red Chapter Collection
        </h3>
        <div class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in volumeTwoProducts"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">{{ formatPrice(p.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER IMAGE -->
    <!-- <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden"> -->
    <div
      class="relative w-full h-[300px] md:h-[500px] overflow-hidden cursor-pointer"
      @click="navigateToSpecificProduct('DSCF5958')"
    >
      <img
        src="../../assets/home_lastimage.jpg"
        alt="Premium Materials"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 flex items-end bg-black/10 p-8 md:p-16">
        <h2
          class="max-w-md font-serif font-light text-white text-2xl md:text-5xl"
        >
          Premium materials and <br />hand-selected finishing touches
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const volumeOneProducts = ref([]);
const volumeTwoProducts = ref([]);

// Fungsi navigasi berdasarkan pencarian Nama/Kode
const navigateToSpecificProduct = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/home/find-product`, {
      params: { query },
    });
    router.push(`/product/${res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

const fetchData = async () => {
  try {
    const [resV1, resV2] = await Promise.all([
      axios.get(`${BASE_URL}/home/category/C001`),
      axios.get(`${BASE_URL}/home/category/C002`),
    ]);
    volumeOneProducts.value = resV1.data;
    volumeTwoProducts.value = resV2.data;
  } catch (err) {
    console.error("Failed to load volume products");
  }
};

import img1 from "../../assets/products/helia_series.png";
import img2 from "../../assets/products/eterna_series.png";
import img3 from "../../assets/products/solenne_series.png";
import img4 from "../../assets/products/glisenta_series.png";
import img5 from "../../assets/products/marquesa_series.png";
import img6 from "../../assets/products/allegra_series.png";

import v2_img1 from "../../assets/products/man_tang_hong.jpg";
import v2_img2 from "../../assets/products/yu_pai.jpg";
import v2_img3 from "../../assets/products/jin_zun.jpg";
import v2_img4 from "../../assets/products/jiang_ye.jpg";
import v2_img5 from "../../assets/products/hong_yun.jpg";

// const volumeOneProducts = ref([
//   { name: "Helia Series", price: 2558000, image: img1 },
//   { name: "ETERNA SERIES", price: 3225000, image: img2 },
//   { name: "SOLENNE SERIES", price: 3445000, image: img3 },
//   { name: "Glisenta Series", price: 3225000, image: img4 },
//   { name: "MARQUESA SERIES", price: 2940000, image: img5 },
//   { name: "ALLEGRA SERIES", price: 3100000, image: img6 },
// ]);

// const volumeTwoProducts = ref([
//   { name: "Mǎn Táng Hóng", price: 3450000, image: v2_img1 },
//   { name: "Yù Pái", price: 2850000, image: v2_img2 },
//   { name: "Jīn Zūn", price: 3100000, image: v2_img3 },
//   { name: "Jiāng Yè", price: 2750000, image: v2_img4 },
//   { name: "Hóng Yùn", price: 3200000, image: v2_img5 },
// ]);

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);

onMounted(fetchData);
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.contain {
  contain: layout paint;
}
</style>
