<template>
  <div class="bg-black text-white min-h-screen">

    <!-- Header — same style as Home -->
    <header class="flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md fixed w-full z-50 border-b border-red-600/20">
      <div class="flex items-center space-x-2">
        <router-link to="/">
          <h1 class="text-3xl font-bold text-red-600">🎬 HooraFlix</h1>
        </router-link>
      </div>

      <nav class="space-x-8 hidden lg:flex text-sm font-medium">
        <router-link to="/" class="hover:text-red-500 transition">Home</router-link>
        <router-link to="/contents" class="hover:text-red-500 transition" :class="{ 'text-red-500': !activeType }">All Contents</router-link>
        <router-link :to="{ path: '/contents', query: { content_type: 'full_movie' } }" class="hover:text-red-500 transition" :class="{ 'text-red-500': activeType === 'full_movie' }">Movies & Series</router-link>
        <router-link :to="{ path: '/contents', query: { content_type: 'documentary' } }" class="hover:text-red-500 transition" :class="{ 'text-red-500': activeType === 'documentary' }">Documentary Films</router-link>
        <router-link :to="{ path: '/contents', query: { content_type: 'music' } }" class="hover:text-red-500 transition" :class="{ 'text-red-500': activeType === 'music' }">Music</router-link>
        <router-link :to="{ path: '/contents', query: { content_type: 'news' } }" class="hover:text-red-500 transition" :class="{ 'text-red-500': activeType === 'news' }">News</router-link>
      </nav>

      <div class="flex gap-3">
        <template v-if="isAuthenticated">
          <router-link v-if="!isViewer" to="/dashboard" class="border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600/10 transition text-sm font-semibold">Dashboard</router-link>
          <router-link to="/register?type=creator" class="border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-semibold">🚀 Become a Creator</router-link>
          <button @click="logout" class="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600/10 transition text-sm font-semibold">Sign In</router-link>
          <router-link to="/register" class="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold">Get Started</router-link>
        </template>
      </div>

      <!-- Mobile menu button -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden text-white text-xl ml-4">☰</button>
    </header>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="fixed top-16 left-0 w-full bg-black/95 z-40 border-b border-red-600/20 p-6 flex flex-col gap-3 lg:hidden">
      <router-link to="/" @click="mobileMenuOpen = false" class="text-sm font-medium hover:text-red-500">Home</router-link>
      <router-link to="/contents" @click="mobileMenuOpen = false" class="text-sm font-medium hover:text-red-500">All Contents</router-link>
      <router-link :to="{ path: '/contents', query: { content_type: 'full_movie' } }" @click="mobileMenuOpen = false" class="text-sm font-medium hover:text-red-500">Movies & Series</router-link>
      <router-link :to="{ path: '/contents', query: { content_type: 'documentary' } }" @click="mobileMenuOpen = false" class="text-sm font-medium hover:text-red-500">Documentary Films</router-link>
      <router-link :to="{ path: '/contents', query: { content_type: 'music' } }" @click="mobileMenuOpen = false" class="text-sm font-medium hover:text-red-500">Music</router-link>
      <router-link :to="{ path: '/contents', query: { content_type: 'news' } }" @click="mobileMenuOpen = false" class="text-sm font-medium hover:text-red-500">News</router-link>
      <div class="border-t border-gray-800 pt-3 flex flex-col gap-2">
        <template v-if="isAuthenticated">
          <router-link v-if="!isViewer" to="/dashboard" @click="mobileMenuOpen = false" class="text-sm font-semibold border border-red-600 px-4 py-2 rounded-lg text-center">Dashboard</router-link>
          <button @click="logout" class="text-sm font-semibold bg-red-600 px-4 py-2 rounded-lg">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" @click="mobileMenuOpen = false" class="text-sm font-semibold border border-red-600 px-4 py-2 rounded-lg text-center">Sign In</router-link>
          <router-link to="/register" @click="mobileMenuOpen = false" class="text-sm font-semibold bg-red-600 px-4 py-2 rounded-lg text-center">Get Started</router-link>
        </template>
      </div>
    </div>

    <div class="pt-20 px-6 max-w-7xl mx-auto">

      <!-- Page Title -->
      <div class="py-10">
        <h1 class="text-4xl font-bold mb-2">
          {{ activeType ? activeType.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Browse Content' }}
        </h1>
        <p class="text-gray-400">Discover movies, series, and more from our creators</p>
      </div>

      <!-- Search -->
      <div class="flex justify-end mb-8">
        <div class="relative">
          <input
            v-model="search"
            type="text"
            placeholder="Search content..."
            class="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 w-64"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-24">
        <div class="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredContents.length === 0" class="text-center py-24 text-gray-500">
        <div class="text-5xl mb-4">🎬</div>
        <p class="text-lg font-medium">No content found</p>
        <p class="text-sm mt-1">Try a different filter or search term</p>
      </div>

      <!-- Grid -->
      <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-16">
        <div
          v-for="item in filteredContents"
          :key="item.id"
          class="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
          @click="openContent(item)"
        >
          <!-- Thumbnail -->
          <div class="relative">
            <img
              :src="item.thumbnail_url || 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400'"
              class="w-full h-44 object-cover"
              :alt="item.title"
            />
            <span class="absolute top-2 left-2 bg-black/70 px-2 py-1 text-xs rounded capitalize">
              {{ item.content_type?.replace('_', ' ') }}
            </span>
            <!-- Auth overlay for locked content -->
            <div v-if="!isAuthenticated && item.pricing_option !== 'free'"
              class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div class="text-center">
                <div class="text-2xl mb-1">🔒</div>
                <p class="text-xs font-semibold">Sign in to watch</p>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="p-4">
            <h4 class="font-bold text-sm mb-1 line-clamp-1">{{ item.title }}</h4>
            <p class="text-xs text-gray-400 line-clamp-2 mb-3">{{ item.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">{{ item.language }} · {{ item.release_date?.slice(0,4) }}</span>
              <span v-if="item.pricing_option === 'free'" class="text-xs text-green-500 font-semibold">Free</span>
              <span v-else-if="!isAuthenticated" class="text-xs text-red-400 font-semibold">Sign in</span>
              <span v-else class="text-xs text-yellow-400 font-semibold capitalize">{{ item.pricing_option }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Detail Modal -->
    <div v-if="selectedContent" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="selectedContent = null">
      <div class="bg-gray-900 rounded-2xl w-full max-w-lg border border-gray-700 overflow-hidden">
        <img
          :src="selectedContent.thumbnail_url || 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600'"
          class="w-full h-52 object-cover"
        />
        <div class="p-6">
          <div class="flex items-start justify-between mb-3">
            <h2 class="text-xl font-bold">{{ selectedContent.title }}</h2>
            <button @click="selectedContent = null" class="text-gray-500 hover:text-white text-xl leading-none ml-4">&times;</button>
          </div>
          <p class="text-gray-400 text-sm mb-4">{{ selectedContent.description }}</p>
          <div class="flex flex-wrap gap-3 text-xs text-gray-500 mb-6">
            <span>🌍 {{ selectedContent.language }}</span>
            <span>📅 {{ selectedContent.release_date?.slice(0,4) }}</span>
            <span>⏱ {{ selectedContent.duration }} min</span>
            <span>🌐 {{ selectedContent.country }}</span>
          </div>

          <div v-if="!isAuthenticated" class="bg-gray-800 rounded-xl p-4 text-center">
            <p class="text-sm text-gray-300 mb-3">Sign in to watch this content</p>
            <div class="flex gap-3 justify-center">
              <router-link to="/login" class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition">Sign In</router-link>
              <router-link to="/register" class="px-5 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-semibold transition">Register</router-link>
            </div>
          </div>
          <button v-else class="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition">
            ▶ Watch Now
          </button>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>

<script>
import axios from "axios";
import FooterSection from "./footer.vue";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL_LOCAL;

export default {
  name: "ContentsPage",
  components: { FooterSection },

  data() {
    return {
      contents: [],
      loading: false,
      search: "",
      selectedContent: null,
      mobileMenuOpen: false,
    };
  },

  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("access");
    },
    isViewer() {
      try {
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");
        return roles.includes("viewer") && !roles.includes("creator") && !roles.includes("admin");
      } catch { return false; }
    },
    activeType() {
      return this.$route.query.content_type || null;
    },
    filteredContents() {
      return this.contents.filter(item => {
        const matchType = !this.activeType || item.content_type === this.activeType;
        const matchSearch = !this.search ||
          item.title?.toLowerCase().includes(this.search.toLowerCase()) ||
          item.description?.toLowerCase().includes(this.search.toLowerCase());
        return matchType && matchSearch;
      });
    },
  },

  watch: {
    '$route.query.content_type'() {
      this.mobileMenuOpen = false;
    },
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    async fetchContents() {
      this.loading = true;
      try {
        const res = await axios.get(`${BASE_URL}/content`);
        this.contents = res.data?.data || res.data || [];
      } catch (e) {
        console.error("Failed to fetch contents:", e);
      } finally {
        this.loading = false;
      }
    },
    openContent(item) {
      this.selectedContent = item;
    },
  },

  mounted() {
    this.fetchContents();
  },
};
</script>
