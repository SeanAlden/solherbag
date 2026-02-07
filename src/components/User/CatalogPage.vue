<!-- <template>
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
            @click="resetAllFilters"
            :class="[selectedCategory === '' && !showOnlySale ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            All
          </button>

          <button 
            @click="toggleSaleFilter"
            :class="[showOnlySale ? 'bg-red-600 text-white' : 'bg-white text-red-500 hover:bg-red-50']"
            class="shadow-sm px-6 py-2 border border-red-100 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            % Sale
          </button>

          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectCategory(cat.name)"
            :class="[selectedCategory === cat.name && !showOnlySale ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
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
          <div class="relative bg-white shadow-sm mb-4 rounded-sm aspect-square overflow-hidden">
            <img
              :src="product.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Product Image"
            />
            
            <div v-if="product.discount_price" class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter">
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>

            <div v-if="product.stock <= 3 && product.stock > 0" class="top-2 left-2 absolute bg-amber-500 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase">
              Low Stock
            </div>
          </div>

          <div class="space-y-1">
            <h3 class="font-medium text-[10px] text-gray-900 md:text-xs truncate uppercase tracking-widest">
              {{ product.name }}
            </h3>
            
            <div class="flex items-center gap-2">
              <template v-if="product.discount_price">
                <p class="font-bold text-red-600 text-xs md:text-sm">
                  {{ formatPrice(product.discount_price) }}
                </p>
                <p class="text-[10px] text-gray-400 md:text-xs line-through">
                  {{ formatPrice(product.price) }}
                </p>
              </template>
              <p v-else class="font-semibold text-gray-600 text-xs md:text-sm">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mt-20">
        <button @click="currentPage--" :disabled="currentPage === 1" class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="font-bold text-xs uppercase tracking-widest">Page {{ currentPage }} of {{ totalPages || 1 }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages || totalPages === 0" class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="py-24 text-center">
      <p class="font-serif text-gray-400 text-xl italic">No items found matching your selection.</p>
      <button @click="resetAllFilters" class="mt-4 font-bold text-black text-sm underline uppercase tracking-widest">Reset All Filters</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);
const categories = ref([]);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false); 

const currentPage = ref(1);
const itemsPerPage = 12;

const fetchInitialData = async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      axios.get(`${BASE_URL}/products`),
      axios.get(`${BASE_URL}/guest/categories`)
    ]);
    products.value = prodRes.data;
    categories.value = catRes.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === "" || p.category?.name === selectedCategory.value;
    const matchesSale = showOnlySale.value ? (p.discount_price !== null && p.discount_price > 0) : true;
    
    return matchesSearch && matchesCategory && matchesSale;
  });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

onMounted(fetchInitialData);
</script> -->

<template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    
    <div v-if="isLoading" class="z-40 fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/60 backdrop-blur-[2px]">
      <div class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"></div>
      <p class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse">Loading Collection</p>
    </div>

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
            @click="resetAllFilters"
            :class="[selectedCategory === '' && !showOnlySale ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            All
          </button>

          <button 
            @click="toggleSaleFilter"
            :class="[showOnlySale ? 'bg-red-600 text-white' : 'bg-white text-red-500 hover:bg-red-50']"
            class="shadow-sm px-6 py-2 border border-red-100 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            % Sale
          </button>

          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectCategory(cat.category_name)"
            :class="[selectedCategory === cat.category_name && !showOnlySale ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            {{ cat.category_name }}
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
          <div class="relative bg-white shadow-sm mb-4 rounded-sm aspect-square overflow-hidden">
            <img
              :src="product.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Product Image"
            />
            
            <div v-if="product.discount_price" class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter">
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>

            <div v-if="product.stock <= 3 && product.stock > 0" class="top-2 left-2 absolute bg-amber-500 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase">
              Low Stock
            </div>
          </div>

          <div class="space-y-1">
            <h3 class="font-medium text-[10px] text-gray-900 md:text-xs truncate uppercase tracking-widest">
              {{ product.name }}
            </h3>
            
            <div class="flex items-center gap-2">
              <template v-if="product.discount_price">
                <p class="font-bold text-red-600 text-xs md:text-sm">
                  {{ formatPrice(product.discount_price) }}
                </p>
                <p class="text-[10px] text-gray-400 md:text-xs line-through">
                  {{ formatPrice(product.price) }}
                </p>
              </template>
              <p v-else class="font-semibold text-gray-600 text-xs md:text-sm">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mt-20">
        <button @click="currentPage--" :disabled="currentPage === 1" class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="font-bold text-xs uppercase tracking-widest">Page {{ currentPage }} of {{ totalPages || 1 }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages || totalPages === 0" class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div v-else-if="!isLoading" class="py-24 text-center">
      <p class="font-serif text-gray-400 text-xl italic">No items found matching your selection.</p>
      <button @click="resetAllFilters" class="mt-4 font-bold text-black text-sm underline uppercase tracking-widest">Reset All Filters</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);
const categories = ref([]);
const isLoading = ref(false); // State baru untuk loading

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false); 

const currentPage = ref(1);
const itemsPerPage = 12;

const fetchInitialData = async () => {
  isLoading.value = true; // Mulai loading
  try {
    const [prodRes, catRes] = await Promise.all([
      axios.get(`${BASE_URL}/products`),
      axios.get(`${BASE_URL}/guest/categories`)
    ]);
    products.value = prodRes.data;
    categories.value = catRes.data.data;
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    // Delay 500ms agar transisi halus
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

// Logika Filtering (Tetap sama)
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === "" || p.category?.name === selectedCategory.value;
    const matchesSale = showOnlySale.value ? (p.discount_price !== null && p.discount_price > 0) : true;
    
    return matchesSearch && matchesCategory && matchesSale;
  });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
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