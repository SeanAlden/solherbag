<template>
  <div class="flex justify-center items-center bg-[#E5E7EB] px-6 py-12 min-h-screen">
    <div class="bg-white shadow-sm p-10 border border-gray-300 rounded-[3rem] w-full max-w-md">
      
      <div class="flex justify-center mb-6">
        <img 
          src="../assets/solherbrandbook.png" 
          alt="SolHer Logo" 
          class="w-auto h-16 object-contain"
        />
      </div>

      <h2 class="mb-10 font-black text-black text-xl text-center uppercase tracking-widest">
        Register
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        
        <div class="flex flex-col">
          <label for="email" class="mb-1 font-bold text-black text-sm">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="firstName" class="mb-1 font-bold text-black text-sm">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            v-model="form.firstName"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="lastName" class="mb-1 font-bold text-black text-sm">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            v-model="form.lastName"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-1 font-bold text-black text-sm">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="confirmPassword" class="mb-1 font-bold text-black text-sm">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="pt-6">
          <button 
            type="submit" 
            class="bg-[#0066FF] hover:bg-blue-700 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white uppercase tracking-wider transition-colors duration-300"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-6 text-gray-600 text-xs text-center">
        Already have an account? 
        <router-link to="/login" class="font-bold text-blue-600 hover:underline">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
});

const handleRegister = () => {
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  console.log('Registering with:', form);
  alert(`Pendaftaran berhasil untuk: ${form.firstName} ${form.lastName}`);
};
</script>