<template>
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
                    ? `http://localhost:8000/storage/${user.profile_image}`
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

const users = ref([]);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchUsers = async () => {
  const res = await axios.get(
    "http://localhost:8000/api/admin/users",
    axiosConfig,
  ); //
  users.value = res.data;
};

onMounted(fetchUsers);
</script>
