<template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-6 font-bold text-3xl">Your Profile</h1>
      
      <div v-if="userData" class="space-y-4">
        <div>
          <label class="font-bold text-gray-500 text-xs uppercase tracking-widest">Full Name</label>
          <p class="font-medium text-xl">{{ userData.first_name }} {{ userData.last_name }}</p>
        </div>
        <div>
          <label class="font-bold text-gray-500 text-xs uppercase tracking-widest">Email Address</label>
          <p class="font-medium text-xl">{{ userData.email }}</p>
        </div>

        <button 
          @click="handleLogout" 
          class="bg-red-500 hover:bg-red-600 mt-10 px-6 py-2 rounded-lg text-white transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const userData = ref(null);

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    userData.value = JSON.parse(user);
  }
});

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  Swal.fire({
    icon: 'info',
    title: 'Logged Out',
    text: 'Sesi Anda telah berakhir.',
    timer: 1500
  });
  
  router.push('/login');
};
</script>