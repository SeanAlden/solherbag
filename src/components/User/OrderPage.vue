<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-5xl min-h-screen">
    <h1 class="mb-10 font-serif text-gray-900 text-4xl uppercase tracking-tighter">My Orders</h1>

    <div v-if="loading" class="py-20 text-center">Loading orders...</div>
    
    <div v-else-if="transactions.length === 0" class="bg-white p-12 border rounded-2xl text-center">
      <p class="text-gray-400 italic">You haven't placed any orders yet.</p>
      <router-link to="/catalog" class="inline-block mt-4 font-bold text-black text-xs underline uppercase tracking-widest">Start Shopping</router-link>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in transactions" :key="order.id" class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div class="flex md:flex-row flex-col justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b">
          <div>
            <p class="font-bold text-gray-400 text-xs uppercase tracking-widest">Order ID</p>
            <p class="font-mono text-sm">{{ order.order_id }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-center">
            <p class="font-bold text-gray-400 text-xs uppercase tracking-widest">Date</p>
            <p class="text-sm">{{ formatDate(order.created_at) }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-right">
            <span :class="statusClass(order.status)" class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div v-for="detail in order.details" :key="detail.id" class="flex items-center gap-4 py-4 border-gray-50 last:border-0 border-b">
            <img :src="detail.product.image" class="bg-gray-100 rounded-lg w-16 h-16 object-cover" />
            <div class="flex-grow">
              <h4 class="font-bold text-gray-900 text-sm uppercase">{{ detail.product.name }}</h4>
              <p class="text-gray-400 text-xs">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
            </div>
            <p class="font-bold text-gray-900 text-sm">{{ formatPrice(detail.quantity * detail.price) }}</p>
          </div>
        </div>

        <div class="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-t">
          <p class="font-bold text-gray-400 text-xs uppercase tracking-widest">Total Amount</p>
          <p class="font-bold text-black text-xl">{{ formatPrice(order.total_amount) }} IDR</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const transactions = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    transactions.value = res.data;
  } catch (err) {
    console.error("Failed fetch orders", err);
  } finally {
    loading.value = false;
  }
};

const statusClass = (status) => {
  const map = {
    pending: 'bg-amber-100 text-amber-600',
    processing: 'bg-blue-100 text-blue-600',
    completed: 'bg-green-100 text-green-600',
    cancelled: 'bg-red-100 text-red-600'
  };
  return map[status] || 'bg-gray-100';
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

onMounted(fetchOrders);
</script> -->

<template>
  <div class="mx-auto px-6 py-20 max-w-5xl min-h-screen">
    <h1 class="mb-10 font-serif text-gray-900 text-4xl uppercase tracking-tighter">My Orders</h1>

    <div v-if="loading" class="space-y-6">
      <div v-for="n in 3" :key="n" class="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
        <div class="flex justify-between items-center bg-gray-50 px-6 py-4">
          <div class="space-y-2">
            <div class="bg-gray-200 rounded w-16 h-3"></div>
            <div class="bg-gray-200 rounded w-32 h-4"></div>
          </div>
          <div class="bg-gray-200 rounded-full w-20 h-6"></div>
        </div>
        <div class="space-y-4 p-6">
          <div class="flex items-center gap-4 py-2">
            <div class="bg-gray-100 rounded-lg w-16 h-16"></div>
            <div class="flex-grow space-y-2">
              <div class="bg-gray-100 rounded w-1/2 h-4"></div>
              <div class="bg-gray-100 rounded w-1/4 h-3"></div>
            </div>
            <div class="bg-gray-100 rounded w-20 h-4"></div>
          </div>
        </div>
        <div class="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-gray-50 border-t">
          <div class="bg-gray-200 rounded w-20 h-3"></div>
          <div class="bg-gray-200 rounded w-32 h-6"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="transactions.length === 0" class="bg-white p-12 border rounded-2xl text-center animate-fade-in">
      <div class="flex justify-center mb-6">
         <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
         </svg>
      </div>
      <p class="text-gray-400 italic">You haven't placed any orders yet.</p>
      <router-link to="/catalog" class="inline-block mt-6 font-bold text-black hover:text-gray-500 text-xs underline uppercase tracking-widest transition-colors">Start Shopping</router-link>
    </div>

    <div v-else class="space-y-6 animate-fade-in">
      <div v-for="order in transactions" :key="order.id" class="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-shadow duration-300">
        <div class="flex md:flex-row flex-col justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b">
          <div>
            <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]">Order ID</p>
            <p class="font-mono font-bold text-gray-800 text-sm">{{ order.order_id }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-center">
            <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]">Date</p>
            <p class="text-gray-600 text-sm">{{ formatDate(order.created_at) }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-right">
            <span :class="statusClass(order.status)" class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div v-for="detail in order.details" :key="detail.id" class="group flex items-center gap-4 py-4 border-gray-50 last:border-0 border-b">
            <img :src="detail.product.image" class="bg-gray-100 shadow-sm rounded-lg w-16 h-16 object-cover group-hover:scale-105 transition-transform" />
            <div class="flex-grow">
              <h4 class="font-bold text-gray-900 text-sm uppercase tracking-tight">{{ detail.product.name }}</h4>
              <p class="text-gray-400 text-xs">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
            </div>
            <p class="font-bold text-gray-900 text-sm">{{ formatPrice(detail.quantity * detail.price) }}</p>
          </div>
        </div>

        <div class="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-t">
          <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]">Total Amount</p>
          <p class="font-bold text-black text-xl">{{ formatPrice(order.total_amount) }} <span class="font-normal text-gray-400 text-xs">IDR</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const transactions = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    transactions.value = res.data;
  } catch (err) {
    console.error("Failed fetch orders", err);
  } finally {
    // Memberikan sedikit delay (600ms) agar transisi skeleton ke data tidak terasa "flicker"
    setTimeout(() => {
      loading.value = false;
    }, 600);
  }
};

const statusClass = (status) => {
  const map = {
    pending: 'bg-amber-50 text-amber-600 border border-amber-100',
    processing: 'bg-blue-50 text-blue-600 border border-blue-100',
    completed: 'bg-green-50 text-green-600 border border-green-100',
    cancelled: 'bg-red-50 text-red-600 border border-red-100'
  };
  return map[status] || 'bg-gray-100';
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

onMounted(fetchOrders);
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>