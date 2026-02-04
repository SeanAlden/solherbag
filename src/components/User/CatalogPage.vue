<template>
  <div class="bg-[#E5E7EB] px-6 md:px-12 pt-12 pb-24 min-h-screen">
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
      >
        <div class="relative bg-gray-200 mb-4 aspect-square overflow-hidden">
          <img 
            :src="product.image" 
            :alt="product.name"
            class="group-hover:opacity-0 w-full h-full object-cover transition-opacity duration-100"
          />
          <img 
            src="../../assets/products/DSCF5174.jpg" 
            alt="Hover view"
            class="top-0 left-0 absolute opacity-0 group-hover:opacity-100 w-full h-full object-cover transition-opacity duration-100"
          />
        </div>
        <!-- <div class="relative bg-gray-200 mb-4 aspect-square overflow-hidden">
          <img
            :src="product.image"
            :alt="product.name"
            class="group-hover:hidden w-full h-full object-cover"
          />
          <img
            src="../assets/products/DSCF5174.jpg"
            alt="Hover view"
            class="hidden group-hover:block top-0 left-0 absolute w-full h-full object-cover"
          />
        </div> -->

        <div class="space-y-1">
          <h3
            class="font-medium text-gray-900 text-xs md:text-sm uppercase tracking-wider"
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
import { ref } from "vue";

// Menggunakan URL dummy atau path lokal aset Anda
const products = ref([
  {
    id: 1,
    name: "Product 1",
    price: 1500000,
    image: "/src/assets/products/product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 1000000,
    image: "/src/assets/products/product2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 2500000,
    image: "/src/assets/products/product3.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 3500000,
    image: "/src/assets/products/product4.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 1200000,
    image: "/src/assets/products/product5.jpg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 1600000,
    image: "/src/assets/products/product6.jpg",
  },
  {
    id: 7,
    name: "Product 7",
    price: 4500000,
    image: "/src/assets/products/product7.jpg",
  },
  {
    id: 8,
    name: "Product 8",
    price: 1000000,
    image: "/src/assets/products/product8.jpg",
  },
  {
    id: 9,
    name: "Product 9",
    price: 5500000,
    image: "/src/assets/products/product9.jpg",
  },
  {
    id: 10,
    name: "Product 10",
    price: 2500000,
    image: "/src/assets/products/product10.jpg",
  },
  {
    id: 11,
    name: "Product 11",
    price: 1500000,
    image: "/src/assets/products/product11.jpg",
  },
  {
    id: 12,
    name: "Product 12",
    price: 5100000,
    image: "/src/assets/products/product12.jpg",
  },
]);

// Fungsi helper untuk format mata uang Rupiah
const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);
};
</script>

<style scoped>
/* Transisi yang halus saat gambar berganti */
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
