<template>
  <aside 
    :class="[isCollapsed ? 'w-20' : 'w-64']"
    class="relative flex flex-col bg-white shadow-lg border-gray-200 border-r min-h-screen transition-all duration-300 ease-in-out"
  >
    <button 
      @click="toggleSidebar"
      class="top-6 -right-3 absolute bg-white hover:bg-gray-100 shadow-md p-1 border border-gray-200 rounded-full text-gray-600 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" 
        :class="{'rotate-180': isCollapsed}" class="w-4 h-4 transition-transform duration-300">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>

    <div class="flex justify-center p-6 border-gray-100 border-b overflow-hidden">
      <img src="../../../assets/solherbrandbook.png" alt="Logo" 
        :class="[isCollapsed ? 'h-8' : 'h-16']" class="w-auto transition-all duration-300" />
    </div>
    
    <nav class="flex-grow mt-6">
      <ul class="space-y-2 px-3">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" 
            class="group flex items-center hover:bg-gray-100 p-3 rounded-xl text-gray-700 transition-colors"
            active-class="bg-blue-50 text-blue-600">
            <div class="flex-shrink-0" v-html="item.icon"></div>
            <span v-show="!isCollapsed" class="ml-4 font-medium whitespace-nowrap transition-opacity duration-300">
              {{ item.name }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="p-4 border-gray-100 border-t">
      <button @click="handleLogout" 
        class="group flex items-center hover:bg-red-50 p-3 rounded-xl w-full text-red-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <span v-show="!isCollapsed" class="ml-4 font-medium whitespace-nowrap">Logout Admin</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isCollapsed = ref(false);

// Definisi Menu dengan Ikon SVG
const menuItems = [
  { 
    name: 'Dashboard', path: '/admin/dashboard', 
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>' 
  },
  { 
    name: 'Categories', path: '/admin/categories', 
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>' 
  },
  { 
    name: 'Products', path: '/admin/products', 
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>' 
  },
  { 
    name: 'Sales Reports', path: '/admin/salesreports', 
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' 
  },
  { 
    name: 'Transactions', path: '/admin/transactions', 
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>' 
  },
];

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Logika Deteksi Layar (Vertikal > Horizontal = Collapsed)
const checkOrientation = () => {
  // Jika tinggi layar lebih besar dari lebar (Mode Portrait / HP), kecilkan sidebar
  if (window.innerHeight > window.innerWidth) {
    isCollapsed.value = true;
  } else {
    isCollapsed.value = false;
  }
};

onMounted(() => {
  checkOrientation();
  window.addEventListener('resize', checkOrientation);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation);
});

const handleLogout = () => {
  localStorage.clear();
  router.push('/admin/login');
};
</script>