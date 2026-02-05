<template>
  <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Category Management</h1>
        <p class="text-gray-500 text-sm">Manage your product categories here.</p>
      </div>
      <button @click="openModal()" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-semibold text-white transition">
        + Add Category
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-gray-100 border-b text-gray-400 text-sm uppercase tracking-wider">
            <th class="pb-4 font-medium">Code</th>
            <th class="pb-4 font-medium">Name</th>
            <th class="pb-4 font-medium">Description</th>
            <th class="pb-4 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-50 border-gray-50 border-b transition">
            <td class="py-4 font-mono text-blue-600 text-sm">{{ cat.code }}</td>
            <td class="py-4 font-medium text-gray-800">{{ cat.name }}</td>
            <td class="py-4 text-sm">{{ cat.description || '-' }}</td>
            <td class="py-4">
              <div class="flex justify-center gap-3">
                <button @click="openModal(cat)" class="hover:bg-amber-50 p-2 rounded-lg text-amber-500 transition">Edit</button>
                <button @click="confirmDelete(cat.id)" class="hover:bg-red-50 p-2 rounded-lg text-red-500 transition">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h2 class="mb-6 font-bold text-xl">{{ isEdit ? 'Update Category' : 'Create New Category' }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-bold text-sm">Category Code</label>
            <input v-model="form.code" type="text" class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full" placeholder="e.g. LTHR-BAG" required>
          </div>
          <div>
            <label class="block mb-1 font-bold text-sm">Category Name</label>
            <input v-model="form.name" type="text" class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full" placeholder="e.g. Leather Bag" required>
          </div>
          <div>
            <label class="block mb-1 font-bold text-sm">Description</label>
            <textarea v-model="form.description" class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full" rows="3"></textarea>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showModal = false" class="flex-1 py-3 font-bold text-gray-500">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-white transition">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from "../../config/api.js";

const categories = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const currentId = ref(null);
const form = ref({ code: '', name: '', description: '' });

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories`, axiosConfig);
  categories.value = res.data;
};

const openModal = (data = null) => {
  isEdit.value = !!data;
  currentId.value = data ? data.id : null;
  form.value = data ? { ...data } : { code: '', name: '', description: '' };
  showModal.value = true;
};

const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`${BASE_URL}/categories/${currentId.value}`, form.value, axiosConfig);
    } else {
      await axios.post(`${BASE_URL}/categories`, form.value, axiosConfig);
    }
    showModal.value = false;
    fetchCategories();
    Swal.fire('Success', 'Category saved!', 'success');
  } catch (err) {
    Swal.fire('Error', 'Check your data (Code must be unique)', 'error');
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.delete(`${BASE_URL}/categories/${id}`, axiosConfig);
      fetchCategories();
      Swal.fire('Deleted!', 'Category has been removed.', 'success');
    }
  });
};

onMounted(fetchCategories);
</script>