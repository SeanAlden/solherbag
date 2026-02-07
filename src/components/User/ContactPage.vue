<!-- <template>
  <section class="bg-[#E5E7EB] px-6 py-16 min-h-screen">
    <div class="mx-auto max-w-2xl">
      <h1 class="mb-12 font-serif text-black text-4xl md:text-5xl text-center uppercase tracking-wide">
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label for="name" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Name</label>
          <input 
            type="text" 
            id="name" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="email" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Email</label>
          <input 
            type="email" 
            id="email" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="phone" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
          />
        </div>

        <div class="flex flex-col">
          <label for="description" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Description</label>
          <textarea 
            id="description" 
            rows="8" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition resize-none"
            required
          ></textarea>
        </div>

        <div class="flex justify-center mt-8">
          <button 
            type="submit" 
            class="bg-[#1A1A1A] hover:bg-black shadow-lg px-12 py-3 font-semibold text-white text-sm uppercase tracking-widest transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
const handleSubmit = () => {
  alert("Thank you! Your message has been sent.");
  // Di sini Anda bisa menambahkan logika pengiriman data ke API atau email.
};
</script>

<style scoped>
/* Menambahkan font serif untuk judul agar mirip dengan gambar */
h1 {
  font-family: 'Playfair Display', serif; /* Pastikan font ini diimport atau gunakan font-serif bawaan tailwind */
}
</style> -->

<template>
  <section class="bg-[#E5E7EB] px-6 py-16 min-h-screen">
    <div class="mx-auto max-w-2xl">
      <h1
        class="mb-12 font-serif text-black text-4xl md:text-5xl text-center uppercase tracking-wide"
      >
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
            >Name</label
          >
          <input
            v-model="form.name"
            type="text"
            :readonly="isLoggedIn"
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black',
            ]"
            class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            :readonly="isLoggedIn"
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black',
            ]"
            class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
            >Phone</label
          >
          <input
            v-model="form.phone"
            type="tel"
            :readonly="isLoggedIn"
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black',
            ]"
            class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="8"
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition resize-none"
            required
          ></textarea>
        </div>

        <div class="flex justify-center mt-8">
          <button
            type="submit"
            :disabled="loading"
            class="bg-[#1A1A1A] hover:bg-black disabled:bg-gray-400 shadow-lg px-12 py-3 font-semibold text-white text-sm uppercase tracking-widest transition-all duration-300"
          >
            {{ loading ? "Sending..." : "Send Message" }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const isLoggedIn = ref(false);
const loading = ref(false);
const form = ref({
  name: "",
  email: "",
  phone: "",
  description: "",
});

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    isLoggedIn.value = true;
    // Otomatis isi data dari profil user
    form.value.name = `${userData.first_name} ${userData.last_name}`;
    form.value.email = userData.email;
    form.value.phone = userData.phone || "";
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    await axios.post(`${BASE_URL}/contact`, form.value, { headers });

    Swal.fire({
      icon: "success",
      title: "Sent!",
      text: "Thank you! Your message has been sent successfully.",
      confirmButtonColor: "#1A1A1A",
    });

    // Reset hanya deskripsi jika login, reset semua jika guest
    form.value.description = "";
    if (!isLoggedIn.value) {
      form.value.name = "";
      form.value.email = "";
      form.value.phone = "";
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Failed to send message. Please try again.";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
      confirmButtonColor: "#1A1A1A",
    });
    // Swal.fire('Error', 'Failed to send message. Please try again.', 'error');
  } finally {
    loading.value = false;
  }
};
</script>
