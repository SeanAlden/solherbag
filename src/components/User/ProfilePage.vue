<template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Your Profile</h1>

      <div v-if="userData" class="flex md:flex-row flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <!-- <img
              :src="
                userData.profile_image
                  ? `http://localhost:8000/storage/${userData.profile_image}?t=${new Date().getTime()}`
                  : 'https://ui-avatars.com/api/?name=' +
                    userData.first_name +
                    '+' +
                    userData.last_name
              "
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
            /> -->
            <img
              :src="
                userData.profile_image
                  ? userData.profile_image
                  : `https://ui-avatars.com/api/?name=${userData.first_name}+${userData.last_name}&background=random`
              "
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
              alt="Profile Avatar"
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

        <div class="flex-grow space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Full Name & Email</label
              >
              <p class="font-medium text-xl">
                {{ userData.first_name }} {{ userData.last_name }}
              </p>
              <p class="text-gray-400">{{ userData.email }}</p>
              <p class="text-gray-400 text-sm italic">
                {{ userData.phone || "No phone number added" }}
              </p>
            </div>
            <button
              @click="openInfoModal"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          <div
            class="flex justify-between items-start pt-4 border-gray-50 border-t"
          >
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Your Password</label
              >
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button
              @click="showPasswordModal = true"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Logout Button -->
    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition duration-200"
      >
        Logout
      </button>
    </div>

    <div
      v-if="showInfoModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input
            v-model="infoForm.first_name"
            placeholder="First Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.last_name"
            placeholder="Last Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.email"
            type="email"
            placeholder="Email"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.phone"
            type="tel"
            placeholder="Phone Number (e.g. 0812345678)"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showInfoModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-black py-3 rounded-xl font-bold text-white"
            >
              Save Info
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showPasswordModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input
            v-model="passForm.old_password"
            type="password"
            placeholder="Old Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password"
            type="password"
            placeholder="New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password_confirmation"
            type="password"
            placeholder="Confirm New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-12 pt-12 border-gray-100 border-t">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-2xl">Addresses</h2>

        <button
          @click="openModal()"
          class="font-medium text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div
          v-for="addr in addresses"
          :key="addr.id"
          class="relative bg-gray-50/50 p-6 border border-gray-100 rounded-xl"
        >
          <div v-if="addr.is_default" class="mb-2 text-gray-400 text-xs">
            Default address
          </div>

          <button
            @click="openModal(addr)"
            class="top-4 right-4 absolute text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          <p class="mb-1 font-bold">
            {{ addr.first_name_address }} {{ addr.last_name_address }}
          </p>

          <p class="text-gray-600 text-sm">{{ addr.address_location }}</p>

          <p class="text-gray-600 text-sm">{{ addr.location_type || "-" }}</p>

          <p class="text-gray-600 text-sm">{{ addr.city }}</p>

          <p class="text-gray-600 text-sm">
            {{ addr.province }} {{ addr.postal_code }}
          </p>

          <p class="text-gray-600 text-sm">{{ addr.region }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="relative bg-white shadow-2xl p-8 rounded-3xl w-full max-w-xl">
        <button
          @click="showModal = false"
          class="top-6 right-6 absolute text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h3 class="mb-6 font-bold text-2xl">
          {{ isEdit ? "Edit address" : "Add address" }}
        </h3>

        <form @submit.prevent="saveAddress" class="space-y-4">
          <div class="flex items-center gap-2 mb-4">
            <input type="checkbox" v-model="form.is_default" id="def" />

            <label for="def" class="text-sm">This is my default address</label>
          </div>

          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="mb-1 text-gray-400 text-xs">Country/region</label>

              <select
                v-model="form.region"
                @change="fetchProvinces"
                class="bg-gray-50 p-3 border rounded-xl outline-none focus:ring-1 focus:ring-blue-500 w-full"
              >
                <option v-for="c in countries" :key="c.name" :value="c.name">
                  {{ c.name }}
                </option>
              </select>
            </div>

            <div class="gap-4 grid grid-cols-2">
              <input
                v-model="form.first_name_address"
                placeholder="First name"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
                required
              />

              <input
                v-model="form.last_name_address"
                placeholder="Last name"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
                required
              />
            </div>

            <input
              v-model="form.address_location"
              placeholder="Address"
              class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
              required
            />

            <input
              v-model="form.location_type"
              placeholder="Apartment, suite, etc (optional)"
              class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            />

            <input
              v-model="form.city"
              placeholder="City"
              class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
              required
            />

            <div class="gap-4 grid grid-cols-2">
              <select
                v-model="form.province"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
              >
                <option value="" disabled>Select Province</option>

                <option v-for="p in filteredProvinces" :key="p" :value="p">
                  {{ p }}
                </option>
              </select>

              <input
                v-model="form.postal_code"
                placeholder="Postal code"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
                required
              />
            </div>
          </div>

          <div class="flex justify-between items-center pt-6">
            <button
              v-if="isEdit"
              type="button"
              @click="deleteAddress"
              class="text-red-500 hover:underline"
            >
              Delete
            </button>

            <div class="flex gap-4 ml-auto">
              <button
                type="button"
                @click="showModal = false"
                class="text-blue-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="bg-blue-600 px-8 py-3 rounded-xl font-bold text-white"
              >
                Save
              </button>
            </div>
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
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../config/api.js";

const addresses = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const router = useRouter();
const userData = ref(null);
const showInfoModal = ref(false);
const showPasswordModal = ref(false);

const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const openInfoModal = () => {
  infoForm.value = {
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone: userData.value.phone || "",
  };
  showInfoModal.value = true;
};

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/user/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.user) {
      updateUserData(res.data.user);

      setTimeout(() => {
        Swal.fire("Success", "Foto profil diperbarui!", "success");
      }, 100);
    }
  } catch (err) {
    if (err.response?.status === 403) {
      Swal.fire(
        "Error",
        "Izin akses ditolak oleh server. Coba refresh halaman.",
        "error",
      );
    }
  }
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/update-info`,
      infoForm.value,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    updateUserData(res.data.user);
    showInfoModal.value = false;
    Swal.fire("Success", "Info profil diperbarui!", "success");
  } catch (err) {
    Swal.fire("Error", "Gagal memperbarui info", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/user/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showPasswordModal.value = false;
    passForm.value = {
      old_password: "",
      password: "",
      password_confirmation: "",
    };
    Swal.fire("Success", "Password berhasil diubah!", "success");
  } catch (err) {
    Swal.fire(
      "Error",
      err.response.data.message || "Gagal mengubah password",
      "error",
    );
  }
};

const updateUserData = (user) => {
  if (!user) return;

  userData.value = Object.assign({}, userData.value, user);
  localStorage.setItem("user", JSON.stringify(userData.value));
};

const editForm = ref({
  first_name: "",

  last_name: "",

  password: "",

  image: null,
});

onMounted(() => {
  const user = localStorage.getItem("user");

  if (user) {
    userData.value = JSON.parse(user);

    editForm.value.first_name = userData.value.first_name;

    editForm.value.last_name = userData.value.last_name;
  }

  fetchAddresses();

  fetchProvinces();
});

const form = ref({
  id: null,
  region: "Indonesia",
  first_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  is_default: false,
});

const fetchAddresses = async () => {
  const res = await axios.get(`${BASE_URL}/addresses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  addresses.value = res.data;
};

const fetchProvinces = () => {
  const selectedCountry = countries.value.find(
    (c) => c.name === form.value.region,
  );

  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).map((s) => s.name);
  }
};

const openModal = (data = null) => {
  isEdit.value = !!data;

  if (data) {
    form.value = { ...data };

    fetchProvinces();
  } else {
    form.value = { region: "Indonesia", is_default: false };
  }

  showModal.value = true;
};

const saveAddress = async () => {
  const url = isEdit.value
    ? `${BASE_URL}/addresses/${form.value.id}`
    : `${BASE_URL}/addresses`;

  const method = isEdit.value ? "put" : "post";

  await axios[method](url, form.value, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  showModal.value = false;

  fetchAddresses();

  Swal.fire("Success", "Address updated!", "success");
};

const handleLogout = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  Swal.fire({
    icon: "info",
    title: "Logged Out",
    text: "Sesi Anda telah berakhir.",
    timer: 1500,
  });

  router.push("/login");
};
</script>
