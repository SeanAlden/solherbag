<!-- <template>
  <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
    <h1 class="mb-8 font-bold text-gray-800 text-2xl">Registered Users</h1>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium">Profile</th>
            <th class="pb-4 font-medium">Full Name</th>
            <th class="pb-4 font-medium">Email</th>
            <th class="pb-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
          >
            <td class="py-4">
              <img
                :src="
                  user.profile_image
                    ? `${user.profile_image}`
                    : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
                "
                class="rounded-full w-10 h-10 object-cover"
              />
            </td>
            <td class="py-4 font-bold">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="py-4">{{ user.email }}</td>
            <td class="py-4 text-center">
              <button
                @click="$router.push(`/admin/users/${user.id}`)"
                class="font-medium text-blue-600 text-sm hover:underline"
              >
                View Addresses
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const users = ref([]);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchUsers = async () => {
  const res = await axios.get(
    `${BASE_URL}/admin/users`,
    axiosConfig,
  ); //
  users.value = res.data;
};

onMounted(fetchUsers);
</script> -->

<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 font-bold text-blue-600 text-xs uppercase tracking-widest animate-pulse">Fetching Users...</p>
      </div>
    </div>

    <h1 class="mb-8 font-bold text-gray-800 text-2xl">Registered Users</h1>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium">Profile</th>
            <th class="pb-4 font-medium">Full Name</th>
            <th class="pb-4 font-medium">Email</th>
            <th class="pb-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
            @click="$router.push(`/admin/users/${user.id}`)"
          >
            <td class="py-4">
              <img
                :src="
                  user.profile_image
                    ? `${user.profile_image}`
                    : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`
                "
                class="shadow-sm rounded-full w-10 h-10 object-cover"
                alt="User Profile"
              />
            </td>
            <td class="py-4 font-bold">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="py-4">{{ user.email }}</td>
            <td class="py-4 text-center">
              <button
                class="font-medium text-blue-600 text-sm hover:underline"
              >
                View Addresses
              </button>
            </td>
          </tr>
          
          <tr v-if="!isLoading && users.length === 0">
            <td colspan="4" class="py-20 text-gray-400 text-center italic">
              No registered users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const users = ref([]);
const isLoading = ref(false); // State Loading

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchUsers = async () => {
  isLoading.value = true; // Aktifkan spinner
  try {
    const res = await axios.get(
      `${BASE_URL}/admin/users`,
      axiosConfig,
    );
    users.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
  } finally {
    // Memberikan delay 500ms agar transisi halus (tidak flicker)
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

onMounted(fetchUsers);
</script>