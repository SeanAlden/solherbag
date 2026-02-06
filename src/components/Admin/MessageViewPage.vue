<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse">Retrieving Messages...</p>
      </div>
    </div>

    <h1 class="mb-8 font-bold text-gray-800 text-2xl">Inbound Messages</h1>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium">Sender</th>
            <th class="pb-4 font-medium">Contact Info</th>
            <th class="pb-4 font-medium">Message</th>
            <th class="pb-4 font-medium text-center">Date</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr v-for="msg in messages" :key="msg.id" class="hover:bg-gray-50 border-gray-50 border-b transition">
            <td class="py-4 align-top">
              <p class="font-bold text-gray-900">{{ msg.name }}</p>
              <span v-if="msg.user_id" class="bg-blue-100 px-2 py-0.5 rounded-full font-bold text-[10px] text-blue-600 uppercase">Registered User</span>
              <span v-else class="bg-gray-100 px-2 py-0.5 rounded-full font-bold text-[10px] text-gray-500 uppercase">Guest</span>
            </td>
            <td class="py-4 text-sm align-top">
              <p>{{ msg.email }}</p>
              <p class="text-gray-400">{{ msg.phone || '-' }}</p>
            </td>
            <td class="py-4 max-w-xs align-top">
              <p class="text-sm truncate leading-relaxed hover:whitespace-normal cursor-help">
                {{ msg.description }}
              </p>
            </td>
            <td class="py-4 text-gray-400 text-xs text-center align-top">
              {{ new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
            </td>
          </tr>

          <tr v-if="!isLoading && messages.length === 0">
            <td colspan="4" class="py-20 font-serif text-gray-400 text-lg text-center italic">
              No inbound messages found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api.js";

const messages = ref([]);
const isLoading = ref(false); // State untuk mengontrol animasi

const fetchMessages = async () => {
  isLoading.value = true; // Aktifkan spinner
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    messages.value = res.data;
  } catch (error) {
    console.error("Failed to load messages", error);
  } finally {
    // Memberikan delay 500ms agar transisi visual lebih smooth dan profesional
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

onMounted(fetchMessages);
</script>

<style scoped>
/* Spinner Animation Logic */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Memperhalus tampilan teks pesan saat hover */
.leading-relaxed {
  transition: all 0.3s ease;
}
</style>