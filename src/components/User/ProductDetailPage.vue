<template>
  <div v-if="product" class="mx-auto px-6 py-12 md:py-24 max-w-7xl">
    <div class="flex md:flex-row flex-col gap-12 lg:gap-24">
      <div class="w-full md:w-1/2">
        <div class="bg-gray-100 aspect-[4/5] overflow-hidden">
          <img 
            :src="`http://localhost:8000/storage/${product.image}`" 
            class="w-full h-full object-cover" 
          />
        </div>
      </div>

      <div class="space-y-8 w-full md:w-1/2">
        <div class="space-y-4 md:text-left text-center">
          <h1 class="font-serif text-3xl md:text-5xl uppercase tracking-tighter">
            {{ product.name }}
          </h1>
          <p class="text-gray-600 text-xl">{{ formatPrice(product.price) }}</p>
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
          <div v-for="section in ['Description', 'Care', 'Design']" :key="section" class="py-4">
            <button 
              @click="activeSection = activeSection === section ? null : section"
              class="flex justify-between items-center w-full font-medium text-xs text-left uppercase tracking-widest"
            >
              {{ section }}
              <span>{{ activeSection === section ? '−' : '+' }}</span>
            </button>
            <div v-show="activeSection === section" class="mt-4 text-gray-600 text-sm leading-relaxed">
              {{ product[section.toLowerCase()] || 'No information available.' }}
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

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref('Description');

const fetchProductDetail = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/api/products/${route.params.id}`);
    product.value = res.data;
  } catch (error) {
    router.push('/catalog');
  }
};

const handleAction = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      icon: 'info',
      title: 'Login Required',
      text: 'Please login to continue shopping.',
      confirmButtonColor: '#000'
    }).then(() => router.push('/login'));
  } else {
    Swal.fire('Success', 'Item added to process (Feature coming soon)', 'success');
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

onMounted(fetchProductDetail);
</script>