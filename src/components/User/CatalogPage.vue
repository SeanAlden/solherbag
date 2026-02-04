<template>
  <div class="bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="font-bold text-black text-3xl uppercase tracking-tight">Products</h1>
    </div>

    <div class="gap-x-4 gap-y-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto max-w-7xl">
      <div
        v-for="product in products"
        :key="product.id"
        class="group cursor-pointer"
        @click="$router.push(`/product/${product.id}`)"
      >
        <div class="relative bg-white mb-4 rounded-sm aspect-square overflow-hidden">
          <img 
            :src="`http://localhost:8000/storage/${product.image}`" 
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div class="space-y-1">
          <h3 class="font-medium text-[10px] text-gray-900 md:text-xs uppercase tracking-widest">
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

const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/products");
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
</script>