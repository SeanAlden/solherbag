<template>
  <div class="mx-auto px-6 py-12 max-w-5xl min-h-screen">
    <div class="flex justify-between items-center mb-10">
      <button @click="$router.back()" class="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-bold text-sm uppercase tracking-widest">Back to List</span>
      </button>
      
      <div class="text-right">
        <span :class="statusClass(transaction?.status)" class="shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">
          {{ transaction?.status }}
        </span>
      </div>
    </div>

    <div v-if="isLoading" class="py-20 font-serif text-gray-400 text-center italic animate-pulse">
      Synchronizing transaction details...
    </div>

    <div v-else-if="transaction" class="gap-8 grid grid-cols-1 lg:grid-cols-3 animate-fade-in">
      <div class="space-y-6 lg:col-span-2">
        <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
          <h2 class="mb-6 font-bold text-gray-800 text-xl tracking-tight">Order Items</h2>
          <div class="divide-y divide-gray-50">
            <div v-for="item in transaction.details" :key="item.id" class="flex gap-6 py-6 first:pt-0 last:pb-0">
              <img :src="item.product.image" class="bg-gray-50 shadow-sm rounded-2xl w-24 h-24 object-cover" />
              <div class="flex flex-col flex-grow justify-center">
                <h3 class="font-bold text-gray-900 text-sm uppercase tracking-wide">{{ item.product.name }}</h3>
                <p class="mt-1 text-gray-400 text-xs">Code: {{ item.product.code }}</p>
                <div class="flex justify-between items-end mt-4">
                  <p class="text-gray-600 text-sm">{{ item.quantity }} x {{ formatPrice(item.price) }}</p>
                  <p class="font-bold text-black">{{ formatPrice(item.quantity * item.price) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-black shadow-xl p-8 rounded-[2rem] text-white">
          <h2 class="opacity-50 mb-4 font-black text-[10px] uppercase tracking-[0.3em]">Customer Details</h2>
          <p class="font-bold text-lg leading-none">{{ transaction.user.first_name }} {{ transaction.user.last_name }}</p>
          <p class="mt-2 text-gray-400 text-sm">{{ transaction.user.email }}</p>
          <div class="flex items-center gap-3 mt-6 pt-6 border-white/10 border-t">
             <div class="bg-white/10 p-2 rounded-lg font-mono text-[10px] uppercase tracking-tighter">ID: {{ transaction.order_id }}</div>
          </div>
        </div>

        <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
          <h2 class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em]">Payment Summary</h2>
          <div class="space-y-4">
            <div class="flex justify-between text-gray-500 text-sm">
              <span>Subtotal Items</span>
              <span>{{ formatPrice(transaction.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-gray-500 text-sm">
              <span>Shipping Fee</span>
              <span class="italic">Calculated at checkout</span>
            </div>
            <div class="flex justify-between items-end pt-4 border-gray-100 border-t">
              <span class="font-bold text-gray-900 text-xs uppercase">Total Amount</span>
              <span class="font-bold text-blue-600 text-2xl">{{ formatPrice(transaction.total_amount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const transaction = ref(null);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// const fetchData = async () => {
//   // 1. Cek state dari navigasi (Instan!)
//   const stateData = window.history.state?.transactionData;
//   if (stateData) {
//     transaction.value = stateData;
//     isLoading.value = false;
//   }

//   // 2. Tetap fetch API di background atau jika refresh (Data Integrity)
//   try {
//     const res = await axios.get(`${BASE_URL}/admin/transactions/${route.params.id}`, axiosConfig);
//     transaction.value = res.data;
//   } catch (error) {
//     console.error("Detail fetch error:", error);
//   } finally {
//     isLoading.value = false;
//   }
// };

const fetchData = async () => {
  // 1. Ambil data dari state navigasi
  const stateData = window.history.state?.transactionData;
  
  if (stateData) {
    transaction.value = stateData;
    isLoading.value = false;
    
    // Skenario Senior: Tetap fetch di background untuk memastikan data terbaru 
    // tanpa menampilkan loading spinner (Silent Refresh)
    try {
      const res = await axios.get(`${BASE_URL}/admin/transactions/${route.params.id}`, axiosConfig);
      transaction.value = res.data;
    } catch (error) {
      console.error("Background sync failed", error);
    }
  } else {
    // 2. Jika tidak ada state (user akses langsung via URL/Refresh), baru tampilkan loading
    isLoading.value = true;
    try {
      const res = await axios.get(`${BASE_URL}/admin/transactions/${route.params.id}`, axiosConfig);
      transaction.value = res.data;
    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

const statusClass = (status) => {
  const map = {
    pending: 'bg-amber-50 text-amber-600 border border-amber-200',
    processing: 'bg-blue-50 text-blue-600 border border-blue-200',
    completed: 'bg-green-50 text-green-600 border border-green-200',
    cancelled: 'bg-red-50 text-red-600 border border-red-200'
  };
  return map[status] || 'bg-gray-100 text-gray-500';
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>