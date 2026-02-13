<!-- <template>
  <div v-if="product" class="mx-auto px-6 py-12 md:py-24 max-w-7xl">
    <div class="flex md:flex-row flex-col gap-12 lg:gap-24">
      <div class="w-full md:w-1/2">
        <div class="bg-gray-100 aspect-[4/5] overflow-hidden">
          <img :src="product.image" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="space-y-8 w-full md:w-1/2">
        <div class="space-y-4 md:text-left text-center">
          <h1
            class="font-serif text-3xl md:text-5xl uppercase tracking-tighter"
          >
            {{ product.name }}
          </h1>
          <div class="flex justify-center md:justify-start items-center gap-4">
            <template v-if="product.discount_price">
              <p class="font-bold text-red-600 text-2xl">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-gray-400 text-lg line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span
                class="bg-red-100 px-2 py-1 rounded font-bold text-red-600 text-xs"
              >
                SAVE
                {{ calculateDiscount(product.price, product.discount_price) }}%
              </span>
            </template>
            <p v-else class="text-gray-600 text-2xl">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div class="flex sm:flex-row flex-col gap-4 pt-4">
          <button
            @click="handleAction"
            class="flex-1 hover:bg-black py-4 border-2 border-black font-bold hover:text-white text-xs uppercase tracking-widest transition"
          >
            Add to Cart
          </button>
          <button
            @click="handleAction"
            class="flex-1 bg-black hover:bg-gray-800 py-4 font-bold text-white text-xs uppercase tracking-widest transition"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-gray-200 border-t divide-y divide-gray-200">
          <div
            v-for="section in ['Description', 'Care', 'Design']"
            :key="section"
            class="py-4"
          >
            <button
              @click="
                activeSection = activeSection === section ? null : section
              "
              class="flex justify-between items-center w-full font-medium text-xs text-left uppercase tracking-widest"
            >
              {{ section }}
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <div
              v-show="activeSection === section"
              class="mt-4 text-gray-600 text-sm leading-relaxed"
            >
              {{
                product[section.toLowerCase()] || "No information available."
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");

const fetchProductDetail = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    product.value = res.data;
  } catch (error) {
    router.push("/catalog");
  }
};

const handleAction = async (type) => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      confirmButtonColor: "#000",
    }).then(() => router.push("/login"));
    return;
  }

  try {
    await axios.post(
      `${BASE_URL}/carts`,
      {
        product_id: product.value.id,
        quantity: 1,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (type === "buy") {
      // Logic Checkout langsung (Coming Soon)
      Swal.fire("Redirecting...", "Proceeding to checkout", "success");
    } else {
      Swal.fire({
        title: "Added to Bag",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    Swal.fire("Error", error.response.data.message || "Failed to add", "error");
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

onMounted(fetchProductDetail);
</script> -->

<template>
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin"
    ></div>
    <p class="mt-4 font-serif text-gray-400 italic animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div
    v-else-if="product"
    class="mx-auto px-6 py-12 md:py-24 max-w-7xl animate-fade-in"
  >
    <div class="flex md:flex-row flex-col gap-12 lg:gap-24">
      <div class="w-full md:w-1/2">
        <div class="bg-gray-100 aspect-[4/5] overflow-hidden">
          <img
            :src="product.image"
            class="shadow-sm w-full h-full object-cover main-product-image"
            alt="Product Image"
          />
        </div>
      </div>

      <div class="space-y-8 w-full md:w-1/2">
        <div class="space-y-4 md:text-left text-center">
          <h1
            class="font-serif text-3xl md:text-5xl uppercase tracking-tighter"
          >
            {{ product.name }}
          </h1>
          <div class="flex justify-center md:justify-start items-center gap-4">
            <template v-if="product.discount_price">
              <p class="font-bold text-red-600 text-2xl">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-gray-400 text-lg line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span
                class="bg-red-100 px-2 py-1 rounded font-bold text-red-600 text-xs"
              >
                SAVE
                {{ calculateDiscount(product.price, product.discount_price) }}%
              </span>
            </template>
            <p v-else class="text-gray-600 text-2xl">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div class="flex sm:flex-row flex-col gap-4 pt-4">
          <button
            @click="handleAction('cart')"
            class="flex-1 hover:bg-black py-4 border-2 border-black font-bold hover:text-white text-xs uppercase tracking-widest transition"
          >
            Add to Cart
          </button>
          <button
            @click="handleAction('buy')"
            class="flex-1 bg-black hover:bg-gray-800 py-4 font-bold text-white text-xs uppercase tracking-widest transition"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-gray-200 border-t divide-y divide-gray-200">
          <div
            v-for="section in ['Description', 'Care', 'Design']"
            :key="section"
            class="py-4"
          >
            <button
              @click="
                activeSection = activeSection === section ? null : section
              "
              class="group flex justify-between items-center w-full font-medium text-xs text-left uppercase tracking-widest"
            >
              <span class="group-hover:text-gray-500 transition">{{
                section
              }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-gray-600 text-sm leading-relaxed"
              >
                {{
                  product[section.toLowerCase()] || "No information available."
                }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");
const isLoading = ref(true);

const fetchProductDetail = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    product.value = res.data;

    // TRIGGER TRACKING VIEW
    const event = new CustomEvent("track-view", { detail: res.data });
    window.dispatchEvent(event);
  } catch (error) {
    console.error("Error fetching detail:", error);
    router.push("/catalog");
  } finally {
    // Memberikan delay halus agar transisi spinner tidak mengejutkan
    setTimeout(() => {
      isLoading.value = false;
    }, 600);
  }
};

// const handleAction = async (type) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     Swal.fire({
//       icon: "info",
//       title: "Login Required",
//       confirmButtonColor: "#000",
//     }).then(() => router.push("/login"));
//     return;
//   }

//   // --- 1. START FLY ANIMATION LOGIC ---
//   const productImage = document.querySelector(".main-product-image"); // Pastikan img memiliki class ini
//   const cartIcon = document.querySelector(".cart-icon-header"); // Pastikan icon bag di Header memiliki class ini

//   if (productImage && cartIcon) {
//     // Ambil koordinat sumber dan tujuan
//     const imgRect = productImage.getBoundingClientRect();
//     const cartRect = cartIcon.getBoundingClientRect();

//     // Buat elemen kloning untuk animasi
//     const flyer = productImage.cloneNode(true);
//     flyer.classList.add("fly-item");

//     // Set posisi awal tepat di atas gambar asli
//     Object.assign(flyer.style, {
//       position: "fixed",
//       top: `${imgRect.top}px`,
//       left: `${imgRect.left}px`,
//       width: `${imgRect.width}px`,
//       height: `${imgRect.height}px`,
//       zIndex: "1000",
//       transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)",
//       pointerEvents: "none",
//     });

//     document.body.appendChild(flyer);

//     // Jalankan animasi ke koordinat keranjang
//     setTimeout(() => {
//       Object.assign(flyer.style, {
//         top: `${cartRect.top}px`,
//         left: `${cartRect.left}px`,
//         width: "20px",
//         height: "20px",
//         opacity: "0.4",
//         transform: "rotate(720deg)",
//       });
//     }, 10);

//     // Hapus elemen setelah animasi selesai
//     flyer.addEventListener(
//       "transitionend",
//       () => {
//         flyer.remove();
//         // Trigger update data optimistik di Header setelah animasi 'masuk'
//         const event = new CustomEvent("optimistic-add-to-cart", {
//           detail: product.value,
//         });
//         window.dispatchEvent(event);
//       },
//       { once: true },
//     );
//   }
//   // --- END FLY ANIMATION LOGIC ---

//   if (type !== "buy") {
//     Swal.fire({
//       title: "Added to Bag",
//       icon: "success",
//       toast: true,
//       position: "top-center",
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   }

//   try {
//     const res = await axios.post(
//       `${BASE_URL}/carts`,
//       { product_id: product.value.id, quantity: 1 },
//       { headers: { Authorization: `Bearer ${token}` } },
//     );

//     if (type === "buy") router.push("/orderpage");
//   } catch (error) {
//     Swal.fire(
//       "Error",
//       error.response?.data?.message || "Failed to sync bag",
//       "error",
//     );
//     window.dispatchEvent(new Event("refresh-cart"));
//   }
// };

const handleAction = async (type) => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      confirmButtonColor: "#000",
    }).then(() => router.push("/login"));
    return;
  }

  // --- 1. START FLY ANIMATION LOGIC (HANYA UNTUK ADD TO CART) ---
  if (type === "cart") {
    const productImage = document.querySelector(".main-product-image");
    const cartIcon = document.querySelector(".cart-icon-header");

    if (productImage && cartIcon) {
      const imgRect = productImage.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const flyer = productImage.cloneNode(true);
      flyer.classList.add("fly-item");

      Object.assign(flyer.style, {
        position: "fixed",
        top: `${imgRect.top}px`,
        left: `${imgRect.left}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        zIndex: "1000",
        transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)",
        pointerEvents: "none",
      });

      document.body.appendChild(flyer);

      setTimeout(() => {
        Object.assign(flyer.style, {
          top: `${cartRect.top}px`,
          left: `${cartRect.left}px`,
          width: "20px",
          height: "20px",
          opacity: "0.4",
          transform: "rotate(720deg)",
        });
      }, 10);

      flyer.addEventListener(
        "transitionend",
        () => {
          flyer.remove();
          const event = new CustomEvent("optimistic-add-to-cart", {
            detail: product.value,
          });
          window.dispatchEvent(event);
        },
        { once: true },
      );
    }
  }
  // --- END FLY ANIMATION LOGIC ---

  try {
    // 2. Masukkan produk ke keranjang terlebih dahulu
    await axios.post(
      `${BASE_URL}/carts`,
      { product_id: product.value.id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (type === "buy") {
      // 3. LOGIKA KHUSUS "BUY IT NOW"
      
      // Tampilkan loading karena kita melakukan 2 API call berurutan
      Swal.fire({
        title: 'Preparing Order...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Eksekusi Checkout untuk mengubah Cart menjadi Transaction
      const checkoutRes = await axios.post(
        `${BASE_URL}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.close();

      // Dapatkan transaction_id dan arahkan ke PaymentPage
      const transactionId = checkoutRes.data.transaction_id;
      router.push(`/payment/${transactionId}`);

    } else {
      // 4. LOGIKA "ADD TO CART"
      Swal.fire({
        title: "Added to Bag",
        icon: "success",
        toast: true,
        position: "top-center",
        showConfirmButton: false,
        timer: 2000,
      });
      window.dispatchEvent(new Event("refresh-cart"));
    }
  } catch (error) {
    Swal.close();
    Swal.fire(
      "Error",
      error.response?.data?.message || "Action failed",
      "error"
    );
    window.dispatchEvent(new Event("refresh-cart"));
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

onMounted(fetchProductDetail);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transisi untuk akordeon */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
