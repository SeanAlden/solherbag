// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import CatalogPage from '../components/CatalogPage.vue'
import ContactPage from '../components/ContactPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import ProfilePage from '../components/ProfilePage.vue'

// Import komponen lainnya (Anda bisa buat file kosong dulu untuk Catalog & Contact)
// const CatalogPage = { template: '<div class="py-20 text-center text-3xl">Catalog Page Coming Soon</div>' }
// const ContactPage = { template: '<div class="py-20 text-center text-3xl">Contact Page Coming Soon</div>' }

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/catalog', name: 'Catalog', component: CatalogPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
    { path: '/login', name: 'Login', component: LoginPage, meta: { hideHeaderFooter: true } },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: { hideHeaderFooter: true }
    },
    { path: '/profilepage', name: 'Profile', component: ProfilePage },
    {
        path: '/profilepage',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true } 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login'); // Jika belum login, lempar ke halaman login
    } else {
        next();
    }
});

export default router