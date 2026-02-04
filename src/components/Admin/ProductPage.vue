<template>
  <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
    <div class="flex justify-between items-center mb-8">
      <h1 class="font-bold text-gray-800 text-2xl">Products</h1>
      <router-link
        to="/admin/products/add"
        class="bg-black px-6 py-2 rounded-xl font-bold text-white"
        >+ New Product</router-link
      >
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Image</th>
            <th class="pb-4">Code</th>
            <th class="pb-4">Name</th>
            <th class="pb-4">Category</th>
            <th class="pb-4">Price</th>
            <th class="pb-4">Stock</th>
            <th class="pb-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="p in products"
            :key="p.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition"
          >
            <td class="py-4">
              <img
                :src="`http://localhost:8000/storage/${p.image}`"
                class="rounded-lg w-16 h-16 object-cover"
              />
            </td>
            <td class="py-4 font-mono text-sm">{{ p.code }}</td>
            <td class="py-4 font-bold text-gray-800">{{ p.name }}</td>
            <td class="py-4">{{ p.category?.name }}</td>
            <td class="py-4 font-bold">{{ formatPrice(p.price) }}</td>
            <td class="py-4">
              <span :class="p.stock < 5 ? 'text-red-500 font-bold' : ''"
                >{{ p.stock }} pcs</span
              >
            </td>
            <td class="py-4 text-center">
              <router-link
                :to="`/admin/products/edit/${p.id}`"
                class="mr-4 text-amber-500"
                >Edit</router-link
              >
              <button @click="confirmDelete(p.id)" class="text-red-500">
                Delete
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
import Swal from "sweetalert2";

const products = ref([]);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchProducts = async () => {
  const res = await axios.get(
    "http://localhost:8000/api/products",
    axiosConfig,
  );
  products.value = res.data;
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.delete(
        `http://localhost:8000/api/products/${id}`,
        axiosConfig,
      );
      fetchProducts();
      Swal.fire("Deleted!", "Success", "success");
    }
  });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
onMounted(fetchProducts);
</script>
