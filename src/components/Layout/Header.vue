<template>
  <header class="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white px-6 py-4">
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <nav class="flex space-x-6 text-xs font-medium uppercase tracking-widest">
        <!-- <a href="#" class="transition hover:text-gray-500">Home</a>
        <a href="#" class="transition hover:text-gray-500">Catalog</a>
        <a href="#" class="transition hover:text-gray-500">Contact</a> -->
        <router-link to="/" class="cursor-pointer transition hover:text-gray-500"
          >Home</router-link
        >
        <router-link to="/catalog" class="cursor-pointer transition hover:text-gray-500"
          >Catalog</router-link
        >
        <router-link to="/contact" class="cursor-pointer transition hover:text-gray-500"
          >Contact</router-link
        >
      </nav>

      <div class="flex-shrink-0">
        <img
          src="../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="h-8 w-auto object-contain md:h-12"
        />
      </div>

      <div class="flex items-center space-x-5 text-gray-700">
        <button class="hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
        <button class="hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
        <button class="hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
