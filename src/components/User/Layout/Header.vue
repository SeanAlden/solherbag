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
          @click="openSearch"
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

        <!-- <div
          v-if="isSearchOpen"
          class="top-[73px] right-0 left-0 z-[110] fixed flex flex-col bg-white shadow-2xl border-gray-100 border-b max-h-[80vh] animate-slide-down"
        >
          <div class="bg-gray-200 px-6 py-6 border-gray-50 border-b">
            <div class="flex items-center mx-auto max-w-5xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-4 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="searchInput"
                type="text"
                placeholder="Search our collection..."
                class="flex-grow border-none outline-none focus:ring-0 font-serif text-base placeholder-gray-300"
                ref="searchInputRef"
              />
              <button
                @click="isSearchOpen = false"
                class="ml-4 text-gray-300 hover:text-black transition-all"
              >
                <span class="font-bold text-xs uppercase tracking-widest"
                  >Close</span
                >
              </button>
            </div>
          </div>

          <div class="flex-grow bg-gray-300 px-6 py-10 overflow-y-auto custom-scrollbar">
            <div class="mx-auto max-w-5xl">
              <div v-if="recentlyViewed.length > 0" class="mb-12">
                <div class="flex justify-between items-end mb-4 px-1">
                  <h3
                    class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]"
                  >
                    Recently Viewed
                  </h3>
                  <button
                    @click="clearRecentlyViewed"
                    class="font-bold text-[9px] text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div class="gap-4 grid grid-cols-3 md:grid-cols-6">
                  <div
                    v-for="item in recentlyViewed"
                    :key="item.id"
                    class="group cursor-pointer"
                    @click="navigateToProduct(item.id)"
                  >
                    <div
                      class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden"
                    >
                      <img
                        :src="item.image"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h4
                      class="font-bold text-[9px] text-gray-900 truncate uppercase tracking-wider"
                    >
                      {{ item.name }}
                    </h4>
                  </div>
                </div>
              </div>

              <div>
                <h3
                  class="mb-4 px-1 font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]"
                >
                  Recommended
                </h3>
                <div class="gap-4 grid grid-cols-3 md:grid-cols-6">
                  <div
                    v-for="product in randomProducts"
                    :key="product.id"
                    class="group cursor-pointer"
                    @click="navigateToProduct(product.id)"
                  >
                    <div
                      class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden"
                    >
                      <img
                        :src="product.image"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h4
                      class="font-bold text-[9px] text-gray-900 truncate uppercase tracking-wider"
                    >
                      {{ product.name }}
                    </h4>
                    <p class="mt-0.5 text-[9px] text-gray-400">
                      {{ formatPrice(product.discount_price ?? product.price) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div
          v-if="isSearchOpen"
          class="z-[110] fixed inset-0 flex justify-center items-start px-6 pt-[73px]"
          @click="isSearchOpen = false"
        >
          <div class="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

          <div
            @click.stop
            class="relative flex flex-col bg-white shadow-2xl border border-gray-100 rounded-b-[2rem] w-full max-w-2xl max-h-[75vh] overflow-hidden animate-slide-down"
          >
            <div class="bg-gray-50 px-8 py-6 border-gray-100 border-b">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-4 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  v-model="searchInput"
                  type="text"
                  placeholder="Search products..."
                  class="flex-grow bg-transparent border-none outline-none focus:ring-0 font-serif text-base placeholder-gray-300"
                  ref="searchInputRef"
                />
                <button
                  @click="isSearchOpen = false"
                  class="ml-4 text-gray-400 hover:text-black transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex-grow px-8 py-8 overflow-y-auto custom-scrollbar">
              <div v-if="recentlyViewed.length > 0" class="mb-10">
                <div class="flex justify-between items-end mb-4">
                  <h3
                    class="font-bold text-[9px] text-gray-400 uppercase tracking-[0.25em]"
                  >
                    Recently Viewed
                  </h3>
                  <button
                    @click="clearRecentlyViewed"
                    class="font-bold text-[9px] text-gray-300 hover:text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div class="gap-4 grid grid-cols-3 md:grid-cols-4">
                  <div
                    v-for="item in recentlyViewed"
                    :key="item.id"
                    class="group cursor-pointer"
                    @click="navigateToProduct(item.id)"
                  >
                    <div
                      class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden"
                    >
                      <img
                        :src="item.image"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h4
                      class="font-bold text-[9px] text-gray-900 truncate uppercase"
                    >
                      {{ item.name }}
                    </h4>
                  </div>
                </div>
              </div>

              <div>
                <h3
                  class="mb-4 font-bold text-[9px] text-gray-400 uppercase tracking-[0.25em]"
                >
                  You May Also Like
                </h3>
                <div class="gap-4 grid grid-cols-3 md:grid-cols-4">
                  <div
                    v-for="product in randomProducts"
                    :key="product.id"
                    class="group cursor-pointer"
                    @click="navigateToProduct(product.id)"
                  >
                    <div
                      class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden"
                    >
                      <img
                        :src="product.image"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h4
                      class="font-bold text-[9px] text-gray-900 truncate uppercase"
                    >
                      {{ product.name }}
                    </h4>
                    <p class="mt-0.5 text-[8px] text-gray-400">
                      {{ formatPrice(product.discount_price ?? product.price) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                <span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                >
              </router-link>
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
              >
                <span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                >
              </router-link>
            </div>
          </div>
        </div>

        <button
          @click="openCart"
          class="relative hover:text-black transition-colors cart-icon-header"
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
            :class="[
              isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black',
            ]"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none"
          >
            {{ cartCount }}
          </span>
        </button>
        <div
          v-if="isCartOpen"
          class="z-[100] fixed inset-0 flex justify-center items-center p-4"
        >
          <div
            @click="isCartOpen = false"
            class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>

          <div
            class="relative flex flex-col bg-white shadow-2xl rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden animate-modal-in"
          >
            <div class="flex justify-between items-center p-8 border-b">
              <h2 class="font-serif text-3xl">
                Your Bag
                <span class="ml-2 font-sans text-gray-400 text-lg"
                  >({{ cartItems.length }} items)</span
                >
              </h2>
              <button
                @click="isCartOpen = false"
                class="focus:outline-none text-3xl hover:rotate-90 transition-transform duration-300"
              >
                &times;
              </button>
            </div>

            <div
              class="flex-grow space-y-6 p-8 overflow-y-auto custom-scrollbar"
            >
              <div
                v-if="cartItems.length === 0"
                class="py-20 font-serif text-gray-400 text-xl text-center italic"
              >
                Your bag is currently empty.
              </div>

              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex sm:flex-row flex-col gap-6 pb-6 last:border-0 border-b"
              >
                <img
                  :src="item.product.image"
                  class="bg-gray-100 shadow-sm rounded-2xl w-full sm:w-32 h-32 object-cover"
                />

                <div class="flex flex-col flex-grow justify-between">
                  <div>
                    <div
                      class="flex justify-between items-start font-bold text-base uppercase"
                    >
                      <h3 class="max-w-[200px] truncate leading-tight">
                        {{ item.product.name }}
                      </h3>
                      <p
                        :class="[
                          'transition-all duration-300 text-lg',
                          item.isSyncing
                            ? 'blur-[3px] opacity-50 animate-shimmer'
                            : '',
                        ]"
                      >
                        {{ formatPrice(item.gross_amount) }}
                      </p>
                    </div>
                    <p
                      class="mt-1 text-gray-400 text-xs italic tracking-widest"
                    >
                      {{
                        formatPrice(
                          item.product.discount_price ?? item.product.price,
                        )
                      }}
                      / piece
                    </p>
                  </div>

                  <div class="flex justify-between items-center mt-6">
                    <div
                      class="flex items-center bg-gray-50 border border-gray-100 rounded-xl overflow-hidden"
                    >
                      <button
                        @click="handleQtyChange(item, item.quantity - 1)"
                        class="hover:bg-gray-200 px-4 py-2 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        v-model.number="item.quantity"
                        @input="handleQtyInput(item)"
                        class="bg-transparent border-none focus:ring-0 w-12 font-bold text-sm text-center"
                      />
                      <button
                        @click="handleQtyChange(item, item.quantity + 1)"
                        class="hover:bg-gray-200 px-4 py-2 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      @click="handleOptimisticDelete(item.id)"
                      class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-xs uppercase tracking-tighter transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
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
                      Remove
                    </button>
                  </div>

                  <div class="mt-3 min-h-[1.25rem]">
                    <p
                      v-if="item.quantity >= item.product.stock"
                      class="font-bold text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                    >
                      Out of stock! Maximum {{ item.product.stock }} reached.
                    </p>
                    <p
                      v-else-if="item.product.stock < 5"
                      class="text-[10px] text-amber-600 italic"
                    >
                      Hurry! Only {{ item.product.stock }} left in our
                      collection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-8 border-t">
              <div class="flex justify-between items-end mb-6">
                <span
                  class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
                  >Estimated Total</span
                >
                <div class="text-right">
                  <span class="block font-bold text-black text-2xl"
                    >{{ formatPrice(totalCartAmount) }} IDR</span
                  >
                  <p
                    class="mt-1 text-[10px] text-gray-400 italic leading-relaxed"
                  >
                    Tax and shipping will be calculated during checkout.
                  </p>
                </div>
              </div>

              <button
                @click="handleCheckout"
                class="bg-black hover:bg-gray-800 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-500"
              >
                Proceed to Check Out
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
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const route = useRoute();

const isCartOpen = ref(false);
const cartItems = ref([]);
const cartCount = computed(() => cartItems.value.length);
const isBadgePopping = ref(false);
let debounceTimer = null;

const isSearchOpen = ref(false);
const searchInput = ref("");
const searchInputRef = ref(null);
const recentlyViewed = ref([]);
const randomProducts = ref([]);
const allProducts = ref([]); // Untuk penampung semua produk dari API

// 1. Logic Recently Viewed
const loadRecentlyViewed = () => {
  const data = localStorage.getItem("recently_viewed");
  recentlyViewed.value = data ? JSON.parse(data) : [];
};

const clearRecentlyViewed = () => {
  localStorage.removeItem("recently_viewed");
  recentlyViewed.value = [];
};

// 2. Logic Random Products
const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    allProducts.value = res.data;
  } catch (err) {
    console.error("Search fetch failed", err);
  }
};

const getRandomProducts = () => {
  if (allProducts.value.length === 0) return;
  // Shuffle dan ambil 6 item (sesuaikan grid)
  const shuffled = [...allProducts.value].sort(() => 0.5 - Math.random());
  randomProducts.value = shuffled.slice(0, 6);
};

// const openSearch = () => {
//   loadRecentlyViewed();
//   getRandomProducts();
//   isSearchOpen.value = true;
//   // Focus input otomatis
//   setTimeout(() => searchInputRef.value?.focus(), 100);
// };

const openSearch = () => {
  // Logic Toggle: Jika sedang buka, maka tutup
  if (isSearchOpen.value) {
    isSearchOpen.value = false;
    return;
  }

  loadRecentlyViewed();
  getRandomProducts();
  isSearchOpen.value = true;

  // Focus input otomatis
  setTimeout(() => searchInputRef.value?.focus(), 150);
};

const navigateToProduct = (id) => {
  isSearchOpen.value = false;
  route.push(`/product/${id}`);
};

const totalCartAmount = computed(() => {
  if (!cartItems.value || cartItems.value.length === 0) return 0;
  return cartItems.value.reduce((acc, item) => {
    const amount = parseFloat(item.gross_amount) || 0;
    return acc + amount;
  }, 0);
});

const handleQtyChange = (item, newQty) => {
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

  item.isSyncing = true;
  item.quantity = newQty;
  const unitPrice = parseFloat(
    item.product.discount_price ?? item.product.price,
  );
  item.gross_amount = item.quantity * unitPrice;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    syncQtyToDatabase(item);
  }, 500);
};

const handleQtyInput = (item) => {
  if (item.quantity === null || item.quantity === "") return;
  handleQtyChange(item, item.quantity);
};

const syncQtyToDatabase = async (item) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/carts/${item.id}`,
      { quantity: item.quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    item.gross_amount = res.data.gross_amount;
  } catch (error) {
    console.error("Sync failed:", error);
    fetchCarts();
  } finally {
    item.isSyncing = false;
  }
};

const handleOptimisticDelete = async (id) => {
  const backupItems = [...cartItems.value];
  cartItems.value = cartItems.value.filter((item) => item.id !== id);

  try {
    await axios.delete(`${BASE_URL}/carts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
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

const handleOptimisticAdd = (event) => {
  const newProduct = event.detail;

  const existingItem = cartItems.value.find(
    (item) => item.product_id === newProduct.id,
  );

  if (existingItem) {
    existingItem.quantity += 1;
    const unitPrice = parseFloat(
      existingItem.product.discount_price ?? existingItem.product.price,
    );
    existingItem.gross_amount = existingItem.quantity * unitPrice;
  } else {
    cartItems.value.push({
      id: Date.now(),
      product_id: newProduct.id,
      quantity: 1,
      gross_amount: parseFloat(newProduct.discount_price ?? newProduct.price),
      isSyncing: false,
      product: newProduct,
    });
  }

  isBadgePopping.value = true;
  setTimeout(() => (isBadgePopping.value = false), 300);
};

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
      title: "Order Placed!",
      text: `Your order ${res.data.order_id} is being processed.`,
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

const fetchCarts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/carts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    cartItems.value = res.data.map((item) => ({ ...item, isSyncing: false }));
  } catch (err) {
    console.error("Failed to load bag", err);
  }
};

const openCart = () => {
  if (!isAuthenticated.value) {
    Swal.fire({
      icon: "info",
      title: "Sign In Required",
      text: "Please login to see your shopping bag.",
      confirmButtonColor: "#000",
    });
    return;
  }
  fetchCarts();
  isCartOpen.value = true;
};

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

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
};

onMounted(() => {
  checkAuth();
  fetchAllProducts();
  if (isAuthenticated.value) fetchCarts();
  window.addEventListener("optimistic-add-to-cart", handleOptimisticAdd);

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });

  window.addEventListener("refresh-cart", fetchCarts);
});

onMounted(() => {
  window.addEventListener("track-view", (e) => {
    const product = e.detail;
    let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");

    // Hapus duplikat lama
    list = list.filter((item) => item.id !== product.id);

    // Masukkan ke posisi paling depan
    list.unshift(product);

    // Batasi maksimal 6 item
    list = list.slice(0, 6);

    localStorage.setItem("recently_viewed", JSON.stringify(list));
  });
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", handleOptimisticAdd);
});

watch(
  () => route.params.id,
  async (newId) => {
    if (route.name === "ProductDetail" && newId) {
      // Tunggu data produk tersedia (misal di halaman detail)
      // Skenario terbaik: Halaman detail mengirim event saat data load
    }
  },
);

watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    checkAuth();
    if (isAuthenticated.value) fetchCarts();
  },
);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-modal-in {
  animation: modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

.animate-shimmer {
  animation: shimmerPulse 1.2s infinite;
}

.animate-shimmer {
  animation: shimmerPulse 1.2s infinite;
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

@keyframes shimmerPulse {
  0% {
    filter: blur(2px);
    opacity: 0.5;
  }
  50% {
    filter: blur(4px);
    opacity: 0.3;
  }
  100% {
    filter: blur(2px);
    opacity: 0.5;
  }
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.animate-slide-down {
  animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Mempercantik custom scrollbar agar lebih tipis */
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
</style>
