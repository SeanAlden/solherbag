<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();

const externalId = ref(null);
const orderId = ref(null);

onMounted(() => {
  externalId.value = route.query.external_id || null;
  orderId.value = route.query.order_id || null;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
      
      <!-- Icon Success -->
      <div class="flex justify-center mb-6">
        <div class="bg-green-100 p-4 rounded-full">
          <svg
            class="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        Payment Successful 🎉
      </h1>

      <!-- Description -->
      <p class="text-gray-600 mb-4">
        Thank you! Your payment has been successfully processed.
      </p>

      <!-- Optional Info -->
      <div v-if="externalId || orderId" class="bg-gray-50 rounded-lg p-4 text-sm mb-6 text-left">
        <p v-if="orderId">
          <span class="font-semibold">Order ID:</span> {{ orderId }}
        </p>
        <p v-if="externalId">
          <span class="font-semibold">Payment Ref:</span> {{ externalId }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="space-y-3">
        <button
          @click="router.push('/orderpage')"
          class="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
        >
          View My Orders
        </button>

        <button
          @click="router.push('/')"
          class="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>
