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
          @click="openCart"
          class="relative hover:text-black transition-colors"
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
          <span
            v-if="cartCount > 0"
            class="-top-2 -right-2 absolute flex justify-center items-center bg-black rounded-full w-4 h-4 text-[10px] text-white"
          >
            {{ cartCount }}
          </span>
        </button>
        <div v-if="isCartOpen" class="z-[100] fixed inset-0 flex justify-end">
          <div
            @click="isCartOpen = false"
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          ></div>

          <div
            class="relative flex flex-col bg-white shadow-2xl w-full max-w-md h-screen animate-slide-in"
          >
            <div class="flex justify-between items-center p-6 border-b">
              <h2 class="font-serif text-2xl">
                Cart
                <span class="ml-2 text-gray-400 text-lg"
                  >({{ cartItems.length }})</span
                >
              </h2>
              <button @click="isCartOpen = false" class="text-2xl">
                &times;
              </button>
            </div>

            <div class="flex-grow space-y-6 p-6 overflow-y-auto">
              <div
                v-if="cartItems.length === 0"
                class="py-20 text-gray-400 text-center italic"
              >
                Your bag is empty
              </div>

              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex gap-4 pb-6 border-b"
              >
                <img
                  :src="item.product.image"
                  class="bg-gray-100 w-24 h-24 object-cover"
                />
                <div class="flex-grow">
                  <div class="flex justify-between font-bold text-sm uppercase">
                    <h3>{{ item.product.name }}</h3>
                    <p>{{ formatPrice(item.gross_amount) }}</p>
                  </div>
                  <p class="mt-1 text-gray-400 text-xs">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                  </p>

                  <!-- <div class="flex justify-between items-center mt-4">
                    <div class="flex border border-gray-200 rounded">
                      <button
                        @click="updateQty(item, -1)"
                        class="hover:bg-gray-100 px-3 py-1"
                      >
                        -
                      </button>
                      <span
                        class="px-4 py-1 border-gray-200 border-x text-sm"
                        >{{ item.quantity }}</span
                      >
                      <button
                        @click="updateQty(item, 1)"
                        class="hover:bg-gray-100 px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                    <button
                      @click="removeItem(item.id)"
                      class="text-gray-400 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div> -->
                  <div class="flex justify-between items-center mt-4">
                    <div
                      class="flex border border-gray-200 rounded overflow-hidden"
                    >
                      <button
                        @click="handleQtyChange(item, item.quantity - 1)"
                        class="hover:bg-gray-100 px-3 py-1 transition-colors"
                        :disabled="item.quantity <= 1"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        v-model.number="item.quantity"
                        @input="handleQtyInput(item)"
                        class="border-none focus:ring-0 w-12 text-sm text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                        min="1"
                        :max="item.product.stock"
                      />

                      <button
                        @click="handleQtyChange(item, item.quantity + 1)"
                        class="hover:bg-gray-100 px-3 py-1 transition-colors"
                        :disabled="item.quantity >= item.product.stock"
                      >
                        +
                      </button>
                    </div>

                    <button
                      @click="handleOptimisticDelete(item.id)"
                      class="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="mt-2 min-h-[1.25rem]">
                    <p
                      v-if="item.quantity >= item.product.stock"
                      class="font-bold text-[10px] text-red-600 uppercase tracking-tighter"
                    >
                      Maximum available stock reached ({{ item.product.stock }}
                      items)
                    </p>
                    <p
                      v-else-if="item.product.stock < 5"
                      class="text-[10px] text-amber-600 italic"
                    >
                      Only {{ item.product.stock }} left in stock!
                    </p>
                  </div>
                  <p
                    class="mt-2 text-[10px] text-amber-600"
                    v-if="item.product.stock < 5"
                  >
                    Only {{ item.product.stock }} left in stock!
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-6 border-t">
              <div class="flex justify-between items-end mb-6">
                <span class="text-gray-500 text-sm uppercase tracking-widest"
                  >Estimated total</span
                >
                <span class="font-bold text-xl"
                  >{{ formatPrice(totalCartAmount) }} IDR</span
                >
              </div>
              <p class="mb-6 text-[10px] text-gray-400 italic">
                Taxes, discounts and shipping calculated at checkout.
              </p>

              <button
                @click="handleCheckout"
                class="bg-black hover:bg-gray-800 py-4 w-full font-bold text-white uppercase tracking-widest transition"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../../config/api";

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const route = useRoute();

const isCartOpen = ref(false);
const cartItems = ref([]);
const cartCount = computed(() => cartItems.value.length);
let debounceTimer = null;

// Fungsi Utama Perubahan Qty (Optimistik)
const handleQtyChange = (item, newQty) => {
  // 1. Validasi Batas Stok secara lokal (Instan)
  if (newQty < 1) newQty = 1;
  if (newQty > item.product.stock) {
    newQty = item.product.stock;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: `Max stock is ${item.product.stock}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  // 2. Update UI secara Instan (Optimistik)
  item.quantity = newQty;
  // Update gross_amount lokal agar total harga di bawah ikut berubah instan
  const unitPrice = parseFloat(
    item.product.discount_price ?? item.product.price,
  );
  item.gross_amount = item.quantity * unitPrice;

  // 3. Jalankan Debounce untuk Sinkronisasi API
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    syncQtyToDatabase(item);
  }, 500); // Tunggu 0.5 detik tanpa aktivitas baru
};

// 1. Optimistic Delete (Instan)
const handleOptimisticDelete = async (id) => {
  // Simpan data cadangan untuk berjaga-jaga jika gagal
  const backupItems = [...cartItems.value];

  // Langsung hapus dari tampilan (UI update 0ms)
  cartItems.value = cartItems.value.filter((item) => item.id !== id);

  try {
    await axios.delete(`${BASE_URL}/carts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    // Jika sukses, biarkan saja. Kita tidak perlu panggil fetchCarts() lagi
    // agar tidak ada lonjakan data/flicker.
  } catch (error) {
    // Jika gagal (server down/timeout), kembalikan data asli
    cartItems.value = backupItems;
    Swal.fire({
      icon: "error",
      title: "Action Failed",
      text: "Could not remove item. Please check your connection.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

// Fungsi khusus saat user mengetik angka
const handleQtyInput = (item) => {
  // Jika input kosong saat mengetik, biarkan saja dulu
  if (item.quantity === null || item.quantity === "") return;
  handleQtyChange(item, item.quantity);
};

// Fungsi Sinkronisasi ke Backend
const syncQtyToDatabase = async (item) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/carts/${item.id}`,
      { quantity: item.quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );

    // Opsional: Update data final dari server jika ada selisih perhitungan
    item.gross_amount = res.data.gross_amount;
  } catch (error) {
    console.error("Sync failed:", error);
    // Jika gagal, tarik ulang data asli agar UI tidak salah
    fetchCarts();
  }
};

const totalCartAmount = computed(() => {
  // Pastikan cartItems adalah array dan memiliki isi
  if (!cartItems.value || cartItems.value.length === 0) return 0;

  return cartItems.value.reduce((acc, item) => {
    // Ambil gross_amount, jika tidak ada (null/undefined), gunakan 0
    const amount = parseFloat(item.gross_amount) || 0;
    return acc + amount;
  }, 0);
});

const handleCheckout = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/checkout`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );

    isCartOpen.value = false;
    Swal.fire({
      title: "Success!",
      text: `Order ${res.data.order_id} has been placed.`,
      icon: "success",
      confirmButtonColor: "#000",
    }).then(() => {
      window.location.href = "/orderpage";
    });
  } catch (error) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "Checkout failed",
      "error",
    );
  }
};

const openCart = () => {
  if (!isAuthenticated.value) {
    Swal.fire("Please login to see your cart", "", "info");
    return;
  }
  fetchCarts();
  isCartOpen.value = true;
};

const fetchCarts = async () => {
  const res = await axios.get(`${BASE_URL}/carts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  cartItems.value = res.data;
};

const updateQty = async (item, change) => {
  const newQty = item.quantity + change;
  if (newQty < 1) return;
  if (newQty > item.product.stock) {
    Swal.fire("Stock limited", "", "warning");
    return;
  }

  await axios.put(
    `${BASE_URL}/carts/${item.id}`,
    { quantity: newQty },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  );
  fetchCarts();
};

const removeItem = async (id) => {
  await axios.delete(`${BASE_URL}/carts/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  fetchCarts();
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

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
  if (isAuthenticated.value) {
    fetchCarts();
  }
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
