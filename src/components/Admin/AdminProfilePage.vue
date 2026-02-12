<template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Admin Profile</h1>

      <div v-if="adminData" class="flex md:flex-row flex-col gap-10">
        <!-- Avatar -->
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <img
              :key="adminData.profile_image"
              :src="adminData.profile_image"
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
              alt="Admin Avatar"
              @error="handleImageError"
            />
            <label
              class="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
            >
              <span class="font-bold text-white text-xs">Change</span>
              <input
                type="file"
                class="hidden"
                @change="handleImageUpdate"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <!-- Info -->
        <div class="flex-grow space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest">
                Full Name & Email
              </label>
              <p class="font-medium text-xl">
                {{ adminData.first_name }} {{ adminData.last_name }}
              </p>
              <p class="text-gray-400">{{ adminData.email }}</p>
            </div>
            <button
              @click="openInfoModal"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              ✎
            </button>
          </div>

          <div class="flex justify-between items-start pt-4 border-gray-50 border-t">
            <div>
              <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest">
                Password
              </label>
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button
              @click="showPasswordModal = true"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              ✎
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Logout -->
    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition"
      >
        Logout
      </button>
    </div>

    <!-- Update Info Modal -->
    <div v-if="showInfoModal" class="modal">
      <div class="modal-card">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input v-model="infoForm.first_name" placeholder="First Name" class="input" required />
          <input v-model="infoForm.last_name" placeholder="Last Name" class="input" required />
          <input v-model="infoForm.email" type="email" placeholder="Email" class="input" required />
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showInfoModal = false" class="flex-1 text-gray-500">
              Cancel
            </button>
            <button type="submit" class="flex-1 bg-black py-3 rounded-xl font-bold text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Update Password Modal -->
    <div v-if="showPasswordModal" class="modal">
      <div class="modal-card">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input v-model="passForm.old_password" type="password" placeholder="Old Password" class="input" required />
          <input v-model="passForm.password" type="password" placeholder="New Password" class="input" required />
          <input v-model="passForm.password_confirmation" type="password" placeholder="Confirm Password" class="input" required />
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showPasswordModal = false" class="flex-1 text-gray-500">
              Cancel
            </button>
            <button type="submit" class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const adminData = ref(null);

const showInfoModal = ref(false);
const showPasswordModal = ref(false);

const infoForm = ref({ first_name: "", last_name: "", email: "" });
const passForm = ref({ old_password: "", password: "", password_confirmation: "" });

const openInfoModal = () => {
  infoForm.value = { ...adminData.value };
  showInfoModal.value = true;
};

const updateAdminData = (admin) => {
  adminData.value = { ...adminData.value, ...admin };
  localStorage.setItem("admin", JSON.stringify(adminData.value));
};

const fetchAdminProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    updateAdminData(res.data);
  } catch (err) {
    if (err.response?.status === 401) handleLogout();
  }
};

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/admin/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    updateAdminData(res.data.admin);
    Swal.fire("Success", "Profile image updated!", "success");
  } catch {
    Swal.fire("Error", "Failed to upload image", "error");
  }
};

const handleImageError = (e) => {
  e.target.src = `https://ui-avatars.com/api/?name=${adminData.value.first_name}+${adminData.value.last_name}&background=random`;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/update-info`, infoForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    updateAdminData(res.data.admin);
    showInfoModal.value = false;
    Swal.fire("Success", "Profile updated!", "success");
  } catch {
    Swal.fire("Error", "Failed to update profile", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/admin/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    showPasswordModal.value = false;
    Swal.fire("Success", "Password updated!", "success");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Failed", "error");
  }
};

const handleLogout = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin");
  router.push("/admin/login");
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) adminData.value = JSON.parse(admin);
  fetchAdminProfile();
});
</script>

<style scoped>
.modal {
  @apply fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4;
}
.modal-card {
  @apply bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md;
}
.input {
  @apply bg-gray-50 p-3 border rounded-xl outline-none w-full;
}
</style>
