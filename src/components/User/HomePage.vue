<template>
  <section class="bg-white w-full">
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

    <div class="grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden">
      <img
        src="../../assets/DSCF5814.jpg"
        @click="navigateToSpecificProduct('IMPERIAL RED')"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
      />
      <img
        src="../../assets/DSCF5186.jpg"
        @click="navigateToSpecificProduct('MAN TANG HONG')"
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

    <div class="px-6 py-24 w-full">
      <!-- <div class="mx-auto max-w-[1600px]">
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
      </div> -->
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 1 - Goddess Of The Sun
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div
            v-for="n in 4"
            :key="n"
            class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse"
          >
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeOne"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
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

    <div class="px-6 pb-24 w-full">
      <!-- <div class="mx-auto max-w-[1600px]">
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
      </div> -->
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 2 - The Red Chapter Collection
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div
            v-for="n in 4"
            :key="n"
            class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse"
          >
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeTwo"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
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
      @click="navigateToSpecificProduct('RED CHARM')"
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
import { useProductStore } from "../../composables/useProductStore"; // Import Store

const router = useRouter();
const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);
const volumeOneProducts = ref([]);
const volumeTwoProducts = ref([]);

const initData = async () => {
  // Hanya tampilkan loading jika data belum ada di cache
  if (!state.isHomeLoaded) {
    isLoading.value = true;
    await fetchHomeData();
    isLoading.value = false;
  } else {
    // Jika sudah ada cache, pastikan fetchHomeData dipanggil (akan langsung return)
    fetchHomeData();
  }
};

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

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);

onMounted(initData);
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
