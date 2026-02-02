// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import CatalogPage from '../components/CatalogPage.vue'
import ContactPage from '../components/ContactPage.vue'

// Import komponen lainnya (Anda bisa buat file kosong dulu untuk Catalog & Contact)
// const CatalogPage = { template: '<div class="py-20 text-center text-3xl">Catalog Page Coming Soon</div>' }
// const ContactPage = { template: '<div class="py-20 text-center text-3xl">Contact Page Coming Soon</div>' }

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/catalog', name: 'Catalog', component: CatalogPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router