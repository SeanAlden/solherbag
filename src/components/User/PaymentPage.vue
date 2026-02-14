<template>
  <div
    class="mx-auto px-6 py-12 md:py-24 max-w-4xl min-h-screen animate-fade-in"
  >
    <h1
      class="mb-12 font-serif text-3xl md:text-4xl uppercase tracking-tighter"
    >
      Checkout
    </h1>

    <div class="flex lg:flex-row flex-col gap-12">
      <div class="space-y-12 flex-grow">
        <section>
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >1</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Contact Information
            </h2>
          </div>
          <div class="bg-gray-50 p-6 border border-gray-100 rounded-2xl">
            <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">
              Email Address
            </p>
            <p class="font-medium text-gray-900">{{ userData?.email }}</p>
          </div>
        </section>

        <section>
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >2</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Shipping Address
            </h2>
          </div>
          <div
            v-if="addresses.length === 0"
            class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300"
          >
            <p class="text-gray-500 text-sm italic">No address found.</p>
            <router-link
              to="/profilepage"
              class="text-blue-600 text-xs font-bold underline"
              >+ Add New Address</router-link
            >
          </div>
          <div v-else class="space-y-4">
            <label
              v-for="addr in addresses"
              :key="addr.id"
              :class="[
                selectedAddressId === addr.id
                  ? 'border-black ring-1 ring-black bg-white'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
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
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ addr.receiver.full_name }}
                  </p>
                  <span
                    v-if="addr.is_default"
                    class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                    >Default</span
                  >
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

        <section v-if="selectedAddressId">
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >3</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Shipping Method
            </h2>
          </div>

          <div class="space-y-4">
            <label
              :class="[
                shippingMethod === 'free'
                  ? 'border-black ring-1 ring-black bg-white'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all"
            >
              <input
                type="radio"
                value="free"
                v-model="shippingMethod"
                class="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow flex justify-between items-center">
                <div>
                  <p
                    class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                  >
                    Free Shipping
                  </p>
                  <p class="text-green-600 font-bold text-xs mt-1">
                    Ships next day
                  </p>
                </div>
                <p class="font-black text-black">Rp 0</p>
              </div>
            </label>

            <label
              :class="[
                shippingMethod === 'biteship'
                  ? 'border-black ring-1 ring-black bg-white'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all"
            >
              <input
                type="radio"
                value="biteship"
                v-model="shippingMethod"
                class="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow flex justify-between items-center">
                <div>
                  <p
                    class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                  >
                    Standard / Express
                  </p>
                  <p class="text-gray-500 text-xs mt-1">Powered by Biteship</p>
                </div>
              </div>
            </label>

            <div
              v-if="shippingMethod === 'biteship'"
              class="pl-10 space-y-3 mt-2"
            >
              <div
                v-if="isLoadingRates"
                class="text-sm text-gray-500 animate-pulse"
              >
                Calculating couriers...
              </div>
              <div
                v-else-if="shippingRates.length === 0"
                class="text-xs text-red-500 italic"
              >
                No couriers available.
              </div>

              <label
                v-else
                v-for="(rate, idx) in shippingRates"
                :key="idx"
                :class="[
                  selectedRate?.company === rate.company &&
                  selectedRate?.type === rate.type
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200',
                ]"
                class="flex items-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50"
              >
                <input
                  type="radio"
                  :value="rate"
                  v-model="selectedRate"
                  class="w-3 h-3 text-black focus:ring-black border-gray-300"
                />
                <div class="ml-3 flex-grow flex justify-between items-center">
                  <div>
                    <p
                      class="font-bold text-gray-800 text-xs uppercase tracking-wide"
                    >
                      {{ rate.company }} - {{ rate.type }}
                    </p>
                    <p class="text-gray-500 text-[10px] mt-0.5">
                      {{ rate.courier_name }} ({{ rate.duration }})
                    </p>
                  </div>
                  <p class="font-bold text-black text-xs">
                    {{ formatPrice(rate.price) }}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </section>
      </div>

      <div class="lg:w-[380px] space-y-6">
        <div
          class="bg-white shadow-xl p-8 border border-gray-100 rounded-3xl sticky top-28"
        >
          <h2
            class="mb-6 font-bold text-gray-900 text-sm uppercase tracking-widest border-b pb-4"
          >
            Order Summary
          </h2>

          <div
            class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <div
              v-for="item in transactionData?.details"
              :key="item.id"
              class="flex gap-4"
            >
              <img
                :src="item.product.image"
                class="w-16 h-16 object-cover rounded-xl bg-gray-100"
              />
              <div class="flex-grow">
                <p
                  class="font-bold text-gray-900 text-[11px] uppercase truncate w-32"
                >
                  {{ item.product.name }}
                </p>
                <p class="text-gray-400 text-[10px]">
                  Qty: {{ item.quantity }}
                </p>
                <p class="font-medium text-gray-900 text-xs mt-1">
                  {{ formatPrice(item.price * item.quantity) }}
                </p>
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
              <span
                v-if="shippingMethod === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <span
                v-else-if="shippingMethod === 'biteship' && selectedRate"
                class="font-medium text-gray-900"
                >{{ formatPrice(selectedRate.price) }}</span
              >
              <span v-else class="italic text-[10px]">Select method</span>
            </div>

            <div
              class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
            >
              <span class="uppercase tracking-widest text-xs mt-1"
                >Total Amount</span
              >
              <span class="text-xl">{{ formatPrice(grandTotal) }}</span>
            </div>
          </div>

          <button
            @click="handlePayment"
            :disabled="
              isProcessing ||
              !selectedAddressId ||
              (shippingMethod === 'biteship' && !selectedRate)
            "
            class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10"
          >
            <span v-if="!isProcessing">Pay Now</span>
            <span v-else class="flex justify-center items-center gap-2">
              <div
                class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              Processing...
            </span>
          </button>

          <p
            v-if="!selectedAddressId"
            class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
          >
            * Please select a shipping address
          </p>
          <p
            v-else-if="shippingMethod === 'biteship' && !selectedRate"
            class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
          >
            * Please select a courier service
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();

const userData = ref(null);
const addresses = ref([]);
const transactionData = ref(null);
const selectedAddressId = ref(null);
const isProcessing = ref(false);

// State Baru untuk Metode Pengiriman
const shippingMethod = ref("free"); // Default ke 'free'
const shippingRates = ref([]);
const selectedRate = ref(null);
const isLoadingRates = ref(false);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    selectedRate.value = null;
    isLoadingRates.value = true;
    shippingRates.value = [];

    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { address_id: newVal },
        axiosConfig,
      );
      if (res.data && res.data.pricing) {
        shippingRates.value = res.data.pricing;
      }
    } catch (error) {
      console.error("Gagal mengambil ongkir", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || "Failed to calculate shipping.",
        showConfirmButton: false,
        timer: 4000,
      });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

// Reset courier selection jika user bolak-balik mengubah tipe shipping method
watch(shippingMethod, (newVal) => {
  if (newVal === "free") {
    selectedRate.value = null;
  }
});

const grandTotal = computed(() => {
  let total = parseFloat(transactionData.value?.total_amount) || 0;
  if (shippingMethod.value === "biteship" && selectedRate.value) {
    total += parseFloat(selectedRate.value.price);
  }
  return total;
});

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);

    const transactionId = route.params.id;
    const resTrx = await axios.get(
      `${BASE_URL}/transactions/${transactionId}`,
      axiosConfig,
    );
    transactionData.value = resTrx.data;

    const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
    addresses.value = resAddr.data.data;

    const defaultAddr = addresses.value.find((a) => a.is_default);
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
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value, // Kirim metode pengiriman ke server
      // Kirim null jika 'free', agar validasi backend tetap aman
      courier_company:
        shippingMethod.value === "biteship"
          ? selectedRate.value?.company
          : null,
      courier_type:
        shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
    };

    const res = await axios.post(
      `${BASE_URL}/payments/invoice`,
      payload,
      axiosConfig,
    );
    if (res.data.checkout_url) window.location.href = res.data.checkout_url;
  } catch (error) {
    Swal.fire(
      "Payment Error",
      error.response?.data?.message || "Failed to create invoice",
      "error",
    );
  } finally {
    isProcessing.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

onMounted(fetchData);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
</style>
