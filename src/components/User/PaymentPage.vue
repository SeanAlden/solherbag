<template>
  <div class="mx-auto px-6 py-12 md:py-24 max-w-4xl min-h-screen animate-fade-in">
    <h1 class="mb-12 font-serif text-3xl md:text-4xl uppercase tracking-tighter">Checkout</h1>

    <div class="flex lg:flex-row flex-col gap-12">
      <div class="space-y-12 flex-grow">
        
        <section>
          <div class="flex items-center gap-4 mb-4">
            <span class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white">1</span>
            <h2 class="font-bold text-gray-900 text-sm uppercase tracking-widest">Contact Information</h2>
          </div>
          <div class="bg-gray-50 p-6 border border-gray-100 rounded-2xl">
            <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Email Address</p>
            <p class="font-medium text-gray-900">{{ userData?.email }}</p>
          </div>
        </section>

        <section>
          <div class="flex items-center gap-4 mb-4">
            <span class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white">2</span>
            <h2 class="font-bold text-gray-900 text-sm uppercase tracking-widest">Shipping Address</h2>
          </div>
          
          <div v-if="addresses.length === 0" class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
             <p class="text-gray-500 text-sm italic">No address found.</p>
             <router-link to="/profilepage" class="text-blue-600 text-xs font-bold underline">+ Add New Address</router-link>
          </div>

          <div v-else class="space-y-4">
            <label 
              v-for="addr in addresses" 
              :key="addr.id" 
              :class="[selectedAddressId === addr.id ? 'border-black ring-1 ring-black bg-white' : 'border-gray-100 bg-gray-50/50']"
              class="relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all hover:bg-white"
            >
              <input 
                type="radio" 
                name="address" 
                :value="addr.id" 
                v-model="selectedAddressId"
                class="mt-1 w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow">
                <div class="flex justify-between">
                   <p class="font-bold text-gray-900 text-sm uppercase">{{ addr.receiver.full_name }}</p>
                   <span v-if="addr.is_default" class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase">Default</span>
                </div>
                <p class="mt-2 text-gray-600 text-sm leading-relaxed">
                  {{ addr.details.location }}, {{ addr.details.type }} <br />
                  {{ addr.details.city }}, {{ addr.details.province }} <br />
                  {{ addr.details.region }} - {{ addr.details.postal_code }}
                </p>
              </div>
            </label>
          </div>
        </section>
      </div>

      <div class="lg:w-[380px] space-y-6">
        <div class="bg-white shadow-xl p-8 border border-gray-100 rounded-3xl sticky top-28">
          <h2 class="mb-6 font-bold text-gray-900 text-sm uppercase tracking-widest border-b pb-4">Order Summary</h2>
          
          <div class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="item in transactionData?.details" :key="item.id" class="flex gap-4">
              <img :src="item.product.image" class="w-16 h-16 object-cover rounded-xl bg-gray-100" />
              <div class="flex-grow">
                <p class="font-bold text-gray-900 text-[11px] uppercase truncate w-32">{{ item.product.name }}</p>
                <p class="text-gray-400 text-[10px]">Qty: {{ item.quantity }}</p>
                <p class="font-medium text-gray-900 text-xs mt-1">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">
            <div class="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{{ formatPrice(transactionData?.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span class="italic text-[10px]">Calculated later</span>
            </div>
            <div class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100">
              <span class="uppercase tracking-widest text-xs">Total Amount</span>
              <span class="text-lg">{{ formatPrice(transactionData?.total_amount) }}</span>
            </div>
          </div>

          <button 
            @click="handlePayment" 
            :disabled="isProcessing || !selectedAddressId"
            class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10"
          >
            <span v-if="!isProcessing">Pay Now</span>
            <span v-else class="flex justify-center items-center gap-2">
               <div class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
               Processing...
            </span>
          </button>
          <p v-if="!selectedAddressId" class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter">* Please select a shipping address</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();

// States
const userData = ref(null);
const addresses = ref([]);
const transactionData = ref(null);
const selectedAddressId = ref(null);
const isProcessing = ref(false);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchData = async () => {
  try {
    // 1. Ambil data User dari localStorage
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);

    // 2. Ambil data Transaksi (bisa dari API atau state router)
    // Skenario: Kita fetch ulang data transaksi berdasarkan ID dari URL
    const transactionId = route.params.id; // Pastikan route: /payment/:id
    const resTrx = await axios.get(`${BASE_URL}/transactions/${transactionId}`, axiosConfig);
    transactionData.value = resTrx.data;

    // 3. Ambil daftar alamat
    const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
    addresses.value = resAddr.data.data;

    // Set default selected address jika ada
    const defaultAddr = addresses.value.find(a => a.is_default);
    if (defaultAddr) selectedAddressId.value = defaultAddr.id;

  } catch (error) {
    console.error("Fetch data failed", error);
    Swal.fire("Error", "Failed to load checkout data", "error");
  }
};

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      transaction_id: transactionData.value.id,
      address_id: selectedAddressId.value
    };

    const res = await axios.post(`${BASE_URL}/payments/invoice`, payload, axiosConfig);
    
    // Redirect ke URL Xendit
    if (res.data.checkout_url) {
      window.location.href = res.data.checkout_url;
    }
  } catch (error) {
    Swal.fire("Payment Error", error.response?.data?.message || "Failed to create invoice", "error");
  } finally {
    isProcessing.value = false;
  }
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

onMounted(fetchData);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
</style>