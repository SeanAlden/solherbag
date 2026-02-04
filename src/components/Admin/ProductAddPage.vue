<template>
  <div class="bg-white shadow-sm mx-auto p-8 rounded-2xl max-w-4xl">
    <h1 class="mb-8 font-bold text-2xl">Add New Product</h1>
    <form
      @submit.prevent="handleSubmit"
      class="gap-6 grid grid-cols-1 md:grid-cols-2"
    >
      <div class="space-y-4">
        <input
          v-model="form.name"
          placeholder="Product Name"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        />
        <input
          v-model="form.code"
          placeholder="Product Code (Unique)"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        />
        <input
          v-model="form.price"
          type="number"
          placeholder="Price"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        />
        <input
          v-model="form.stock"
          type="number"
          placeholder="Stock Amount"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        />
        <select
          v-model="form.category_id"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        >
          <option value="" disabled>Select Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <input type="file" @change="handleFile" class="w-full" />
      </div>
      <div class="space-y-4">
        <textarea
          v-model="form.description"
          placeholder="Description"
          class="bg-gray-100 p-3 rounded-xl w-full h-24"
        ></textarea>
        <textarea
          v-model="form.care"
          placeholder="Care Instructions"
          class="bg-gray-100 p-3 rounded-xl w-full h-24"
        ></textarea>
        <textarea
          v-model="form.design"
          placeholder="Design Details"
          class="bg-gray-100 p-3 rounded-xl w-full h-24"
        ></textarea>
      </div>
      <div class="md:col-span-2">
        <button
          type="submit"
          class="bg-black hover:bg-gray-800 p-4 rounded-xl w-full font-bold text-white transition"
        >
          Save Product
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const categories = ref([]);
const form = ref({
  name: "",
  code: "",
  price: "",
  stock: "",
  category_id: "",
  description: "",
  care: "",
  design: "",
  image: null,
});

const handleFile = (e) => (form.value.image = e.target.files[0]);

const handleSubmit = async () => {
  const formData = new FormData();
  Object.keys(form.value).forEach((key) =>
    formData.append(key, form.value[key]),
  );

  try {
    await axios.post("http://localhost:8000/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    Swal.fire("Success", "Product Added", "success");
    router.push("/admin/products");
  } catch (e) {
    Swal.fire("Error", "Check Duplicate Code", "error");
  }
};

onMounted(async () => {
  const res = await axios.get("http://localhost:8000/api/categories", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  categories.value = res.data;
});
</script>
