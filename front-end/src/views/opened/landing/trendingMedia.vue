<template>
  <section class="py-14 px-6 bg-black text-white">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
      <h3 class="text-3xl font-bold">🔥 Trending Content</h3>

      <!-- FILTER TABS -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="px-3 py-1 rounded-full text-xs font-bold uppercase transition"
          :class="activeTab === tab
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- GRID -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
      >

        <!-- IMAGE -->
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
            class="w-full h-44 object-cover"
          />

          <!-- TYPE BADGE -->
          <span class="absolute top-2 left-2 bg-black/70 px-2 py-1 text-xs rounded">
            {{ item.content_type }}
          </span>
        </div>

        <!-- INFO -->
        <div class="p-3">
          <h4 class="font-bold text-sm">{{ item.title }}</h4>
          <p class="text-xs text-gray-400 line-clamp-2">
            {{ item.description }}
          </p>
        </div>

        <!-- ▶ PLAY MAIN -->
        <button
          v-if="item.mediaFiles?.length"
          @click="requestPlay(item.mediaFiles[0].video_url)"
          class="w-full bg-red-600 py-2 text-sm hover:bg-red-700"
        >
          ▶ Play
        </button>

        <!-- 📺 SERIES -->
        <div v-if="item.series" class="p-3 border-t border-gray-800">

          <!-- PARTS -->
          <div v-if="item.series.parts?.length">
            <p class="text-xs text-yellow-400 mb-1">Parts</p>
            <div
              v-for="part in item.series.parts"
              :key="part.id"
              class="text-xs bg-gray-800 p-2 mb-1 rounded cursor-pointer hover:bg-gray-700"
              @click="requestPlay(part.video_url)"
            >
              ▶ {{ part.title }}
            </div>
          </div>

          <!-- SEASONS -->
          <div v-if="item.series.seasons?.length" class="mt-2">
            <p class="text-xs text-blue-400 mb-1">Seasons</p>

            <div v-for="season in item.series.seasons" :key="season.id">
              <p class="text-xs text-gray-300">
                Season {{ season.season_number }}
              </p>

              <div
                v-for="ep in season.episodes"
                :key="ep.id"
                class="text-xs bg-gray-800 p-2 mt-1 rounded cursor-pointer hover:bg-gray-700"
                @click="requestPlay(ep.video_url)"
              >
                ▶ Ep {{ ep.episode_number }} - {{ ep.title }}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- 🔒 TELEBIRR PAY MODAL -->
    <div v-if="showPayModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <div class="bg-gray-900 p-8 rounded-2xl w-96 text-center shadow-2xl">

        <h3 class="text-xl font-bold mb-4">🔒 Unlock Content</h3>

        <p class="text-gray-400 mb-6">
          Pay with Telebirr to watch this content
        </p>

        <!-- TELEBIRR BUTTON -->
        <button
          @click="simulatePayment"
          class="w-full bg-green-600 py-3 rounded-xl mb-3 hover:bg-green-700"
        >
          💳 Pay with Telebirr
        </button>

        <button
          @click="closeModal"
          class="text-gray-500 hover:text-white"
        >
          Cancel
        </button>

      </div>
    </div>

  </section>
</template>

<script>
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL_LOCAL;

export default {
  name: "TrendingMedia",

  data() {
    return {
      activeTab: "all",
      tabs: ["all", "movie", "series", "music"],
      contents: [],
      loading: false,

      // 🔒 PAYWALL STATE
      showPayModal: false,
      selectedVideo: null,
      isPaid: false // default = NOT PAID
    };
  },

  computed: {
    filteredItems() {
      if (this.activeTab === "all") return this.contents;

      return this.contents.filter(
        item => item.content_type === this.activeTab
      );
    }
  },

  methods: {
    async fetchContent() {
      this.loading = true;
      try {
        const res = await axios.get(`${BASE_URL}/content`);
        this.contents = res.data?.data || res.data || [];
      } catch (e) {
        console.error("Failed to fetch content:", e);
      } finally {
        this.loading = false;
      }
    },

    // 🔥 USER TRIES TO WATCH
    requestPlay(videoUrl) {
      if (!this.isPaid) {
        this.selectedVideo = videoUrl;
        this.showPayModal = true;
        return;
      }

      this.playVideo(videoUrl);
    },

    // 💳 SIMULATED TELEBIRR PAYMENT
    simulatePayment() {
      this.isPaid = true;
      this.showPayModal = false;

      alert("✅ Payment Successful (Telebirr)");

      if (this.selectedVideo) {
        this.playVideo(this.selectedVideo);
      }
    },

    playVideo(url) {
      window.open(url, "_blank");
    },

    closeModal() {
      this.showPayModal = false;
    }
  },

  mounted() {
    this.fetchContent();
  }
};
</script>