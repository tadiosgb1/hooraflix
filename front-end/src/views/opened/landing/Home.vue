<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Navbar -->
    <header class="flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md fixed w-full z-50">
      <h1 class="text-2xl font-bold text-red-600">HooraFlix</h1>
      <nav class="space-x-6 hidden md:block">
        <a href="#features" class="hover:text-red-500">Features</a>
        <a href="#creators" class="hover:text-red-500">Creators</a>
        <a href="#pricing" class="hover:text-red-500">Pricing</a>
      </nav>
      <button class="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700">Get Started</button>
    </header>

    <!-- Hero Section -->
 <section class="relative h-screen flex items-center overflow-hidden">

  <!-- Background Video -->
  <video autoplay muted loop playsinline class="absolute w-full h-full object-cover">
    <source src="https://cdn.coverr.co/videos/coverr-watching-a-movie-while-eating-popcorn-5406/1080p.mp4" type="video/mp4">
  </video>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

  <!-- Content -->
  <div class="relative z-10 grid md:grid-cols-2 gap-10 px-8 w-full max-w-7xl mx-auto items-center">

    <!-- LEFT: Text -->
    <div>
      <p class="text-red-500 font-semibold mb-3">
        #1 Talent & Streaming Platform
      </p>

      <h2 class="text-4xl md:text-6xl font-bold mb-6">
        Stream. Create. Earn.
      </h2>

      <p class="text-gray-300 mb-8 max-w-lg">
        Watch movies, join live events, or upload your own content and start earning. HooraFlix connects viewers and creators in one powerful platform.
      </p>

      <div class="flex flex-wrap gap-4">
        <button class="bg-red-600 px-6 py-3 rounded-2xl hover:bg-red-700 transition">
          🎬 Watch Movies
        </button>

        <button class="border border-white px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition">
          🚀 Become Creator
        </button>
      </div>
    </div>

    <!-- RIGHT: Movie Preview Grid -->
    <div class="hidden md:grid grid-cols-2 gap-4">

      <div class="bg-gray-800 rounded-xl overflow-hidden">
        <img src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4" class="w-full h-40 object-cover" />
        <p class="p-2 text-sm">Action Movie</p>
      </div>

      <div class="bg-gray-800 rounded-xl overflow-hidden">
        <img src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4" class="w-full h-40 object-cover" />
        <p class="p-2 text-sm">Drama Series</p>
      </div>

      <div class="bg-gray-800 rounded-xl overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497032205916-ac775f0649ae" class="w-full h-40 object-cover" />
        <p class="p-2 text-sm">Live Event</p>
      </div>

      <div class="bg-gray-800 rounded-xl overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c" class="w-full h-40 object-cover" />
        <p class="p-2 text-sm">Creator Content</p>
      </div>

    </div>

  </div>

</section>

 <!-- Movie List (After Login) -->
    <section class="py-20 px-8 bg-black">
      <h3 class="text-3xl font-bold mb-10">Trending Movies</h3>

      <div class="grid md:grid-cols-4 gap-6">
        <div 
          v-for="movie in movies" 
          :key="movie.id"
          class="bg-gray-800 rounded-xl overflow-hidden cursor-pointer relative"
          @click="handleMovieClick(movie)"
        >
          <img :src="movie.thumbnail" class="w-full h-40 object-cover" />

          <!-- LOCK OVERLAY -->
          <div v-if="!user.hasAccess" class="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span class="text-white text-lg">🔒 Locked</span>
          </div>

          <p class="p-2 text-sm">{{ movie.title }}</p>
        </div>
      </div>
    </section>

    <!-- Paywall Modal -->
    <div v-if="showPaywall" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div class="bg-gray-900 p-8 rounded-2xl w-96 text-center">
        <h3 class="text-xl font-bold mb-4">Unlock Content</h3>
        <p class="text-gray-400 mb-6">
          Pay to watch "{{ selectedMovie?.title }}"
        </p>

        <div class="space-y-4">
          <button class="w-full bg-green-600 py-3 rounded-xl">
            Pay with Telebirr
          </button>

          <button class="w-full bg-blue-600 py-3 rounded-xl">
            Pay with Chapa / Card
          </button>
        </div>

        <button 
          @click="showPaywall = false"
          class="mt-6 text-gray-500 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Features Section -->
    <section id="features" class="py-20 px-8 bg-gray-900">
      <h3 class="text-3xl font-bold text-center mb-12">Platform Features</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gray-800 p-6 rounded-2xl">
          <h4 class="text-xl font-semibold mb-3">🎬 Video Streaming</h4>
          <p class="text-gray-400">Watch movies, series, and live events in HD and 4K.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-2xl">
          <h4 class="text-xl font-semibold mb-3">💰 Monetization</h4>
          <p class="text-gray-400">Creators earn via subscriptions, ads, and pay-per-view.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-2xl">
          <h4 class="text-xl font-semibold mb-3">🤖 AI Recommendations</h4>
          <p class="text-gray-400">Personalized content suggestions powered by AI.</p>
        </div>
      </div>
    </section>

    <!-- Creators Section -->
    <section id="creators" class="py-20 px-8">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 class="text-3xl font-bold mb-6">For Creators & Talents</h3>
          <p class="text-gray-300 mb-4">
            Upload your content, build your audience, and earn income through HooraFlix's powerful creator ecosystem.
          </p>
          <ul class="space-y-3 text-gray-400">
            <li>✔ Upload Movies & Videos</li>
            <li>✔ Earn Revenue</li>
            <li>✔ Build Referral Network</li>
            <li>✔ Access Training Hub</li>
          </ul>
        </div>
        <div class="bg-gray-800 h-64 rounded-2xl flex items-center justify-center">
          <span class="text-gray-500">Creator Dashboard Preview</span>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-8 bg-gray-900">
      <h3 class="text-3xl font-bold text-center mb-12">Pricing Plans</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gray-800 p-6 rounded-2xl">
          <h4 class="text-xl font-semibold mb-4">Free</h4>
          <p class="text-gray-400 mb-6">Ad-supported streaming</p>
          <button class="w-full bg-white text-black py-2 rounded-xl">Choose</button>
        </div>
        <div class="bg-red-600 p-6 rounded-2xl">
          <h4 class="text-xl font-semibold mb-4">Premium</h4>
          <p class="mb-6">Ad-free + HD Streaming</p>
          <button class="w-full bg-black py-2 rounded-xl">Choose</button>
        </div>
        <div class="bg-gray-800 p-6 rounded-2xl">
          <h4 class="text-xl font-semibold mb-4">Creator</h4>
          <p class="text-gray-400 mb-6">Upload & monetize content</p>
          <button class="w-full bg-white text-black py-2 rounded-xl">Join</button>
        </div>
      </div>
    </section>
<section class="py-20 px-8 bg-black">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-3xl font-bold mb-6">About HooraFlix</h3>
        <p class="text-gray-400">
          HooraFlix is more than streaming — it's a creator economy platform built to empower Ethiopian and African talents. From movies to live shows, from learning to earning, everything happens in one ecosystem.
        </p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-8 bg-red-600 text-center">
      <h3 class="text-3xl font-bold mb-4">Ready to Join HooraFlix?</h3>
      <p class="mb-6">Start watching, start creating, and start earning today.</p>
      <button class="bg-black px-8 py-3 rounded-2xl">Get Started Now</button>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-8 bg-gray-900">
      <div class="max-w-4xl mx-auto">
        <h3 class="text-3xl font-bold text-center mb-10">Contact Us</h3>
        <form class="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Your Name" class="p-3 rounded-xl bg-gray-800 border border-gray-700" />
          <input type="email" placeholder="Your Email" class="p-3 rounded-xl bg-gray-800 border border-gray-700" />
          <input type="text" placeholder="Subject" class="p-3 rounded-xl bg-gray-800 border border-gray-700 md:col-span-2" />
          <textarea placeholder="Your Message" rows="5" class="p-3 rounded-xl bg-gray-800 border border-gray-700 md:col-span-2"></textarea>
          <button class="bg-red-600 py-3 rounded-xl md:col-span-2 hover:bg-red-700">Send Message</button>
        </form>
      </div>
    </section>
    <!-- Footer -->
 <footer class="bg-black border-t border-gray-800 py-12 px-8">
  <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-gray-400">
    
    <!-- Brand -->
    <div>
      <h2 class="text-2xl font-bold text-red-600 mb-4">HooraFlix</h2>
      <p class="text-sm">
        Stream. Create. Earn. The all-in-one platform for entertainment and talent growth in Africa.
      </p>
    </div>

    <!-- Navigation -->
    <div>
      <h3 class="text-white font-semibold mb-4">Explore</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-red-500">Home</a></li>
        <li><a href="#features" class="hover:text-red-500">Features</a></li>
        <li><a href="#pricing" class="hover:text-red-500">Pricing</a></li>
        <li><a href="#contact" class="hover:text-red-500">Contact</a></li>
      </ul>
    </div>

    <!-- For Creators -->
    <div>
      <h3 class="text-white font-semibold mb-4">Creators</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-red-500">Upload Content</a></li>
        <li><a href="#" class="hover:text-red-500">Monetization</a></li>
        <li><a href="#" class="hover:text-red-500">Training Hub</a></li>
        <li><a href="#" class="hover:text-red-500">Referral Program</a></li>
      </ul>
    </div>

    <!-- Contact / Social -->
    <div>
      <h3 class="text-white font-semibold mb-4">Connect</h3>
      <ul class="space-y-2 text-sm">
        <li>Email: support@hooraflix.com</li>
        <li>Phone: +251 9XX XXX XXX</li>
        <li>Addis Ababa, Ethiopia</li>
      </ul>

      <!-- Social Icons -->
      <div class="flex space-x-4 mt-4">
        <a href="#" class="hover:text-red-500">Facebook</a>
        <a href="#" class="hover:text-red-500">Twitter</a>
        <a href="#" class="hover:text-red-500">YouTube</a>
      </div>
    </div>

  </div>

  <!-- Bottom Bar -->
  <div class="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
    <p>© 2026 HooraFlix. All rights reserved.</p>
    <p class="mt-2">
      <a href="#" class="hover:text-red-500">Privacy Policy</a> • 
      <a href="#" class="hover:text-red-500">Terms of Service</a>
    </p>
  </div>
</footer>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const user = ref({
  isLoggedIn: false,
  hasAccess: false
})

const movies = ref([
  { id: 1, title: 'Action Movie', thumbnail: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4' },
  { id: 2, title: 'Drama Series', thumbnail: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f' },
  { id: 3, title: 'Live Event', thumbnail: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae' },
  { id: 4, title: 'Creator Content', thumbnail: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c' }
])

const showPaywall = ref(false)
const selectedMovie = ref(null)

const handleMovieClick = (movie) => {
  if (!user.value.isLoggedIn) {
    alert('Please login first')
    return
  }

  if (!user.value.hasAccess) {
    selectedMovie.value = movie
    showPaywall.value = true
    return
  }

  alert('Playing ' + movie.title)
}
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>


<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
