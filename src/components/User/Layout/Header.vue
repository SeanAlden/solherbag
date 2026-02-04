<template>
  <header
    class="top-0 left-0 z-50 fixed bg-white px-6 py-4 border-gray-200 border-b w-full"
  >
    <div class="flex justify-between items-center mx-auto max-w-7xl">
      <nav class="flex space-x-6 font-medium text-xs uppercase tracking-widest">
        <router-link
          to="/"
          class="hover:text-gray-500 transition cursor-pointer"
          >Home</router-link
        >
        <router-link
          to="/catalog"
          class="hover:text-gray-500 transition cursor-pointer"
          >Catalog</router-link
        >
        <router-link
          to="/contact"
          class="hover:text-gray-500 transition cursor-pointer"
          >Contact</router-link
        >
      </nav>

      <div class="flex-shrink-0">
        <img
          src="../../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="w-auto h-8 md:h-12 object-contain"
        />
      </div>

      <div class="flex items-center space-x-5 text-gray-700">
        <button
          class="flex justify-center items-center focus:outline-none hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <div class="relative flex justify-center items-center">
          <button
            @click="toggleDropdown"
            class="flex justify-center items-center focus:outline-none hover:text-black transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>

          <!-- <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <h3
              class="mb-4 font-bold text-black text-xs text-left uppercase tracking-widest"
            >
              Account
            </h3>

            <router-link
              to="/login"
              @click="isDropdownOpen = false"
              class="block bg-black hover:bg-gray-800 mb-4 py-3 w-full font-bold text-white text-xs text-center uppercase tracking-widest transition"
            >
              Sign In
            </router-link>

            <div class="gap-2 grid grid-cols-2">
              <button
                @click="handleDummyClick('Orders')"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                >
              </button>

              <button
                @click="handleDummyClick('Profile')"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              
                <router-link
                  to="/profilepage"
                  @click="isDropdownOpen = false"
                  class="font-bold text-[10px] uppercase tracking-wider"
                >
                  Profile
                </router-link>
              </button>
            </div>
          </div> -->
          <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <div v-if="isAuthenticated" class="text-left">
              <h3
                class="font-bold text-black text-sm truncate uppercase tracking-tight"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-gray-500 text-xs truncate">
                {{ userData?.email }}
              </p>
            </div>

            <div v-else>
              <h3
                class="mb-4 font-bold text-black text-xs text-left uppercase tracking-widest"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block bg-black hover:bg-gray-800 mb-4 py-3 w-full font-bold text-white text-xs text-center uppercase tracking-widest transition"
              >
                Sign In
              </router-link>
            </div>

            <div class="gap-2 grid grid-cols-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                >
              </router-link>

              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                >
              </router-link>
            </div>
          </div>
        </div>

        <button
          class="flex justify-center items-center focus:outline-none hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
// import { ref, onMounted, onUnmounted } from "vue";

// const isDropdownOpen = ref(false);

// const toggleDropdown = () => {
//   isDropdownOpen.value = !isDropdownOpen.value;
// };

// // const handleDummyClick = (type) => {
// //   alert(`${type} button clicked!`);
// //   isDropdownOpen.value = false;
// // };

// // Menutup dropdown saat klik di luar area header
// const closeDropdown = (e) => {
//   if (!e.target.closest(".relative")) {
//     isDropdownOpen.value = false;
//   }
// };

// onMounted(() => {
//   window.addEventListener("click", closeDropdown);
// });

// onUnmounted(() => {
//   window.removeEventListener("click", closeDropdown);
// });
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const route = useRoute();

// Fungsi untuk mengecek status login
const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);
  } else {
    isAuthenticated.value = false;
    userData.value = null;
  }
};

const toggleDropdown = () => {
  checkAuth(); // Cek ulang status setiap kali dropdown dibuka
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (e) => {
  if (!e.target.closest(".relative")) {
    isDropdownOpen.value = false;
  }
};

// Pantau perubahan rute untuk menutup dropdown otomatis
watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    checkAuth();
  },
);

onMounted(() => {
  checkAuth();
  window.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
