<template>
  <footer
    class="relative mt-auto w-full border-t border-gray-300 bg-[#c1c1c1] px-6 pb-8 pt-16"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="mb-6 flex flex-col items-start justify-between gap-10 border-b border-gray-400 pb-12 md:flex-row"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 text-2xl font-normal text-black">Join our email list</h3>
          <p class="text-sm text-gray-600">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <input
            type="email"
            placeholder="Email address"
            class="min-w-[300px] border-none bg-gray-100/50 px-4 py-3 text-sm placeholder-gray-700 outline-none focus:ring-1 focus:ring-black"
          />
          <button
            class="bg-[#1A1A1A] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-black"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div class="text-center">
        <nav
          class="mb-4 flex justify-center space-x-6 text-xs font-bold uppercase tracking-wider"
        >
          <a href="#" class="hover:underline">About Us</a>
          <a href="#" class="hover:underline">Customer Care</a>
          <a href="#" class="hover:underline">FAQs</a>
        </nav>
        <div class="flex justify-center space-x-4 text-[10px] uppercase text-gray-500">
          <span>© 2026 Solher Bag</span>
          <a href="#" class="hover:text-black">Terms and Policies</a>
        </div>
      </div>
    </div>

    <!-- <a href="https://wa.me/yournumber" target="_blank" class="fixed bottom-8 right-8 transition-transform hover:scale-110">
      <img src="../../assets/wa_icon.png" alt="WA" class="h-12 w-12" />
    </a> -->
		
    <a
      href="https://wa.me/628883888585?text=Hi"
      target="_blank"
      class="fixed bottom-8 right-8 z-[60] transition-transform hover:scale-110"
    >
      <img src="../../assets/wa_icon.png" alt="WA" class="h-12 w-12" />
    </a>
  </footer>
</template>
