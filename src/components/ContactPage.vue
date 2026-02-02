<template>
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
</style>