<template>
  <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
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
              {{ new Date(msg.created_at).toLocaleDateString('id-ID') }}
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

const fetchMessages = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    messages.value = res.data;
  } catch (error) {
    console.error("Failed to load messages", error);
  }
};

onMounted(fetchMessages);
</script>