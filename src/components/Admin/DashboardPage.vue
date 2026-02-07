<!-- <template>
  <div class="space-y-8">
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Sales</p>
        <p class="font-black text-gray-900 text-2xl">Rp 12.500.000</p>
        <span class="font-medium text-green-500 text-xs">↑ 12% from last month</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Products</p>
        <p class="font-black text-gray-900 text-2xl">48</p>
        <span class="text-gray-400 text-xs">Active in catalog</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Transactions</p>
        <p class="font-black text-gray-900 text-2xl">1,240</p>
        <span class="font-medium text-green-500 text-xs">↑ 5.4%</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Users</p>
        <p class="font-black text-gray-900 text-2xl">856</p>
        <span class="font-medium text-blue-500 text-xs">Registered members</span>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      <div class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Popular Products</h3>
        <div class="flex justify-center h-[300px]">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue (Million Rp)',
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    data: [5, 8, 7, 12.5, 10, 15],
    tension: 0.4, 
    fill: false
  }]
});

const pieData = ref({
  labels: ['Helia Bag', 'Eterna Bag', 'Solenne Bag', 'Others'],
  datasets: [{
    backgroundColor: ['#1e1e1e', '#3b82f6', '#10b981', '#f3f4f6'],
    data: [40, 25, 20, 15]
  }]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
};
</script> -->

<template>
  <div class="space-y-8 animate-fade-in">
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Sales
        </p>
        <p class="font-black text-gray-900 text-2xl">
          {{ formatPrice(stats.total_sales) }}
        </p>
        <span class="font-medium text-green-500 text-xs"
          >Completed payments</span
        >
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Products
        </p>
        <p class="font-black text-gray-900 text-2xl">
          {{ stats.total_products }}
        </p>
        <span class="text-gray-400 text-xs">Active pieces in catalog</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Transactions
        </p>
        <p class="font-black text-gray-900 text-2xl">
          {{ stats.total_transactions }}
        </p>
        <span class="text-gray-400 text-xs">All time orders</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Users
        </p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_users }}</p>
        <span class="font-medium text-blue-500 text-xs"
          >Registered members</span
        >
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      <div
        class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl"
      >
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]" v-if="!isLoading">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Popular Products</h3>
        <div class="flex justify-center h-[300px]" v-if="!isLoading">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const stats = ref({
  total_sales: 0,
  total_products: 0,
  total_transactions: 0,
  total_users: 0,
});
const revenueData = ref({ labels: [], datasets: [] });
const pieData = ref({ labels: [], datasets: [] });
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resStats, resRevenue, resPopular] = await Promise.all([
      axios.get(`${BASE_URL}/admin/dashboard/stats`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/revenue-chart`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/popular-products`, axiosConfig),
    ]);

    // Set Statistik
    stats.value = resStats.data;

    // Set Revenue Chart
    revenueData.value = {
      labels: resRevenue.data.map((item) => item.month),
      datasets: [
        {
          label: "Revenue (IDR)",
          backgroundColor: "#000",
          borderColor: "#000",
          data: resRevenue.data.map((item) => item.total),
          tension: 0.4,
          fill: false,
        },
      ],
    };

    // Set Popular Products Chart
    pieData.value = {
      labels: resPopular.data.map((item) => item.name),
      datasets: [
        {
          backgroundColor: [
            "#1e1e1e",
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
          ],
          data: resPopular.data.map((item) => item.total_sold),
        },
      ],
    };
  } catch (err) {
    console.error("Dashboard data failed", err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);
const chartOptions = { responsive: true, maintainAspectRatio: false };
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" } },
};

onMounted(fetchData);
</script>
