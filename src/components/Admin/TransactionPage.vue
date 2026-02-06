<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]"
  >
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
    >
      <div class="flex flex-col items-center">
        <div
          class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
        >
          Processing Data...
        </p>
      </div>
    </div>

    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Manage and track all customer orders in real-time.
        </p>
      </div>
      <div class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl">
        <span
          class="block font-black text-[10px] text-gray-400 uppercase tracking-widest"
          >Total Revenue</span
        >
        <span class="font-bold text-green-600 text-xl">{{
          formatPrice(totalRevenue)
        }}</span>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Order ID & Date</th>
            <th class="pb-4">Customer</th>
            <th class="pb-4">Items</th>
            <th class="pb-4">Total Amount</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-center">Update Status</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <!-- <tr v-for="trx in transactions" :key="trx.id" class="hover:bg-gray-50 border-gray-50 border-b transition"> -->
          <tr
            v-for="trx in transactions"
            :key="trx.id"
            @click="goToDetail(trx)"
            class="group hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
          >
            <!-- <td class="py-6">
              <span
                class="block font-mono font-bold text-black text-sm uppercase"
                >{{ trx.order_id }}</span
              >
              <span class="text-gray-400 text-xs">{{
                formatDate(trx.created_at)
              }}</span>
            </td> -->
            <td class="py-6">
              <span
                class="block font-mono font-bold text-black group-hover:text-blue-600 text-sm uppercase transition-colors"
              >
                {{ trx.order_id }}
              </span>
              <span class="text-gray-400 text-xs">{{
                formatDate(trx.created_at)
              }}</span>
            </td>
            <td class="py-6">
              <span class="block font-bold text-gray-800 text-sm"
                >{{ trx.user.first_name }} {{ trx.user.last_name }}</span
              >
              <span class="text-gray-400 text-xs">{{ trx.user.email }}</span>
            </td>
            <td class="py-6">
              <div class="flex -space-x-2">
                <img
                  v-for="detail in trx.details.slice(0, 3)"
                  :key="detail.id"
                  :src="detail.product.image"
                  class="shadow-sm border-2 border-white rounded-full w-8 h-8 object-cover"
                  :title="detail.product.name"
                />
                <div
                  v-if="trx.details.length > 3"
                  class="flex justify-center items-center bg-gray-200 shadow-sm border-2 border-white rounded-full w-8 h-8 font-bold text-[10px] text-gray-600"
                >
                  +{{ trx.details.length - 3 }}
                </div>
              </div>
            </td>
            <td class="py-6">
              <span class="font-bold text-black">{{
                formatPrice(trx.total_amount)
              }}</span>
            </td>
            <td class="py-6">
              <span
                :class="statusClass(trx.status)"
                class="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter"
              >
                {{ trx.status }}
              </span>
            </td>
            <td class="py-6 text-center">
              <select
                @change="updateStatus(trx.id, $event.target.value)"
                :value="trx.status"
                class="bg-gray-100 px-3 py-2 border-none rounded-xl focus:ring-2 focus:ring-black font-bold text-[10px] uppercase transition-all cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
          <tr v-if="!isLoading && transactions.length === 0">
            <td
              colspan="6"
              class="py-20 font-serif text-gray-400 text-center italic"
            >
              No transactions found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

const transactions = ref([]);
const isLoading = ref(false);

const goToDetail = (trx) => {
  router.push({
    name: 'TransactionDetail', // Pastikan nama route ini sesuai di index.js
    params: { id: trx.id },
    state: { transactionData: trx } 
  });
};

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);
});

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data;
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const updateStatus = async (id, newStatus) => {
  try {
    isLoading.value = true;
    const res = await axios.put(
      `${BASE_URL}/admin/transactions/${id}/status`,
      { status: newStatus },
      axiosConfig,
    );

    // Update data lokal agar tidak perlu fetch ulang seluruh tabel
    const index = transactions.value.findIndex((t) => t.id === id);
    if (index !== -1) transactions.value[index].status = newStatus;

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    Swal.fire("Failed", "Could not update status", "error");
  } finally {
    isLoading.value = false;
  }
};

const statusClass = (status) => {
  const map = {
    pending: "bg-amber-100 text-amber-600",
    processing: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

onMounted(fetchTransactions);
</script>

<style scoped>
/* Transisi untuk tabel */
tr {
  transition: all 0.2s ease-in-out;
}
</style>
