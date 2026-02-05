<!-- <template>
  <div class="bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="font-bold text-black text-3xl uppercase tracking-tight">
        Products
      </h1>
    </div>

    <div
      class="gap-x-4 gap-y-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto max-w-7xl"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="group cursor-pointer"
        @click="$router.push(`/product/${product.id}`)"
      >
        <div
          class="relative bg-white mb-4 rounded-sm aspect-square overflow-hidden"
        >
          <img
            :src="product.image"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Product Image"
          />
        </div>

        <div class="space-y-1">
          <h3
            class="font-medium text-[10px] text-gray-900 md:text-xs uppercase tracking-widest"
          >
            {{ product.name }}
          </h3>
          <p class="font-semibold text-gray-600 text-xs md:text-sm">
            {{ formatPrice(product.price) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    products.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

onMounted(fetchProducts);
</script> -->

<template>
  <div class="bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 font-bold text-black text-3xl uppercase tracking-tight">
        Products
      </h1>

      <div class="flex md:flex-row flex-col justify-between gap-6 mb-12">
        <div class="relative w-full md:w-80">
          <span class="left-0 absolute inset-y-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search our collection..." 
            class="bg-white shadow-sm py-3 pr-4 pl-10 border-none rounded-full outline-none focus:ring-2 focus:ring-black w-full text-sm transition"
          />
        </div>

        <div class="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
          <button 
            @click="selectedCategory = ''"
            :class="[selectedCategory === '' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            All
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectedCategory = cat.name"
            :class="[selectedCategory === cat.name ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="paginatedProducts.length > 0">
      <div class="gap-x-4 gap-y-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto max-w-7xl">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="group cursor-pointer"
          @click="$router.push(`/product/${product.id}`)"
        >
          <div class="relative bg-white mb-4 rounded-sm aspect-square overflow-hidden">
            <img
              :src="product.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Product Image"
            />
            <div v-if="product.stock <= 3 && product.stock > 0" class="top-2 left-2 absolute bg-amber-500 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase">
              Low Stock
            </div>
          </div>

          <div class="space-y-1">
            <h3 class="font-medium text-[10px] text-gray-900 md:text-xs truncate uppercase tracking-widest">
              {{ product.name }}
            </h3>
            <p class="font-semibold text-gray-600 text-xs md:text-sm">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mt-20">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span class="font-bold text-xs uppercase tracking-widest">
          Page {{ currentPage }} of {{ totalPages || 1 }}
        </span>

        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages || totalPages === 0"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="py-24 text-center">
      <p class="font-serif text-gray-400 text-xl italic">No products found matching your criteria.</p>
      <button @click="resetFilters" class="mt-4 font-bold text-black text-sm underline uppercase tracking-widest">Clear All Filters</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);
const categories = ref([]);

// Filter & Search State
const searchQuery = ref("");
const selectedCategory = ref("");

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 12; // Menampilkan 12 produk per halaman

const fetchInitialData = async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      axios.get(`${BASE_URL}/products`),
      axios.get(`${BASE_URL}/guest/categories`)
    ]);
    products.value = prodRes.data;
    categories.value = catRes.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
};

// Logika Filtering (Search + Category)
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === "" || p.category?.name === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// Logika Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

// Reset ke halaman 1 jika filter berubah
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

onMounted(fetchInitialData);
</script>

<style scoped>
/* Menghilangkan scrollbar tapi tetap bisa di-scroll pada kategori */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>