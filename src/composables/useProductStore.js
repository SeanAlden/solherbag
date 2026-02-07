// src/composables/useProductStore.js
import { reactive } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../config/api';

// State global (di luar fungsi agar persistent)
const state = reactive({
    volumeOne: [],
    volumeTwo: [],
    catalogProducts: [],
    categories: [],
    isHomeLoaded: false,
    isCatalogLoaded: false
});

export function useProductStore() {

    // Fetch Data Home (Hanya jika belum loaded)
    const fetchHomeData = async () => {
        if (state.isHomeLoaded) return; // Return cached data

        try {
            const [resV1, resV2] = await Promise.all([
                axios.get(`${BASE_URL}/home/category/C001`),
                axios.get(`${BASE_URL}/home/category/C002`)
            ]);
            state.volumeOne = resV1.data;
            state.volumeTwo = resV2.data;
            state.isHomeLoaded = true;
        } catch (err) {
            console.error("Failed to load home data");
        }
    };

    // Fetch Data Catalog (Hanya jika belum loaded)
    const fetchCatalogData = async () => {
        if (state.isCatalogLoaded) return;

        try {
            const [prodRes, catRes] = await Promise.all([
                axios.get(`${BASE_URL}/products`),
                axios.get(`${BASE_URL}/guest/categories`)
            ]);
            state.catalogProducts = prodRes.data;
            state.categories = catRes.data.data; // Sesuaikan dengan struktur respons API
            state.isCatalogLoaded = true;
        } catch (error) {
            console.error("Error loading catalog:", error);
        }
    };

    return {
        state,
        fetchHomeData,
        fetchCatalogData
    };
}