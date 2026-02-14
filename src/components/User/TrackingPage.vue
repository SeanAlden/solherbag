<template>
  <div class="mx-auto px-6 py-20 max-w-3xl min-h-screen">
    
    <div class="mb-8">
      <button @click="$router.push('/orderpage')" class="text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 mb-6">
        <span>&larr;</span> Back to Orders
      </button>
      <h1 class="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-gray-900">Shipment Tracking</h1>
    </div>

    <div v-if="isLoading" class="flex flex-col justify-center items-center py-20">
      <div class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin"></div>
      <p class="mt-4 font-bold text-gray-400 text-xs uppercase tracking-widest animate-pulse">Fetching latest updates...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-8 rounded-2xl text-center border border-red-100">
      <p class="text-red-600 font-bold">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden animate-fade-in">
      
      <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-100">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill Number</p>
            <p class="font-mono font-bold text-xl text-black">{{ trackingData.waybill_id }}</p>
          </div>
          <div class="md:text-right">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courier</p>
            <p class="font-bold text-gray-800 uppercase">{{ trackingData.courier?.company }} - {{ trackingData.courier?.type }}</p>
          </div>
        </div>
        <div class="mt-6 flex items-center gap-3">
          <span class="bg-black text-white px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
            {{ trackingData.status }}
          </span>
        </div>
      </div>

      <div class="p-6 md:p-8">
        <div v-if="trackingData.history && trackingData.history.length > 0" class="relative border-l border-gray-200 ml-3 space-y-8">
          
          <div v-for="(history, index) in trackingData.history" :key="index" class="relative pl-8">
            <span 
              :class="index === 0 ? 'bg-black ring-4 ring-gray-100' : 'bg-gray-300'"
              class="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full"
            ></span>
            
            <div :class="index === 0 ? 'opacity-100' : 'opacity-60'">
              <p class="font-bold text-gray-900 text-sm mb-1">{{ history.note }}</p>
              <p class="text-xs text-gray-500 font-medium">{{ formatDate(history.updated_at) }}</p>
            </div>
          </div>

        </div>
        <div v-else class="text-center py-10 text-gray-400 italic">
          No tracking history available yet.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const route = useRoute();
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const fetchTracking = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/transactions/${route.params.id}/tracking`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    trackingData.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch tracking data.';
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(fetchTracking);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>