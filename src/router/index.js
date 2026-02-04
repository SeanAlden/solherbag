// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/User/HomePage.vue'
import CatalogPage from '../components/User/CatalogPage.vue'
import ContactPage from '../components/User/ContactPage.vue'
import LoginPage from '../components/User/LoginPage.vue'
import RegisterPage from '../components/User/RegisterPage.vue'
import ProfilePage from '../components/User/ProfilePage.vue'
import OrderPage from '../components/User/OrderPage.vue'
import AdminLoginPage from '../components/Admin/AdminLoginPage.vue'
import DashboardPage from '../components/Admin/DashboardPage.vue'
import CategoryPage from '../components/Admin/CategoryPage.vue'
import ProductPage from '../components/Admin/ProductPage.vue'
import ProductAddPage from '../components/Admin/ProductAddPage.vue'
import ProductEditPage from '../components/Admin/ProductEditPage.vue'

// Import komponen lainnya (Anda bisa buat file kosong dulu untuk Catalog & Contact)
// const CatalogPage = { template: '<div class="py-20 text-center text-3xl">Catalog Page Coming Soon</div>' }
// const ContactPage = { template: '<div class="py-20 text-center text-3xl">Contact Page Coming Soon</div>' }

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/catalog', name: 'Catalog', component: CatalogPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
    { path: '/login', name: 'Login', component: LoginPage, meta: { hideHeaderFooter: true } },
    { path: '/admin/login', name: 'Admin Login', component: AdminLoginPage, meta: { hideHeaderFooter: true } },
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
    { path: '/orderpage', name: 'Orders', component: OrderPage, meta: { requiresAuth: true } },
    {
        path: '/admin/dashboard', name: 'Dashboard', component: DashboardPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/categories', name: 'Category', component: CategoryPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/products', name: 'Product', component: ProductPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/products/add', name: 'ProductAdd', component: ProductAddPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
    },
    {
        path: '/admin/products/edit/:id', name: 'ProductEdit', component: ProductEditPage,
        meta: {
            requiresAuth: true,
            hideHeaderFooter: true, // Sembunyikan Header/Footer standar
            isAdmin: true           // Trigger untuk Sidebar layout
        }
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