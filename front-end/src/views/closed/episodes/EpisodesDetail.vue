
<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Episodes..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">Episodes Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-gradient-to-br from-gray-900/50 to-black overflow-hidden rounded-2xl border border-gray-700/50 p-4 shadow-md hidden md:block space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Season_id:</strong> {{ item.season_id }}</div><div><strong>Title:</strong> {{ item.title }}</div><div><strong>Episode_number:</strong> {{ item.episode_number }}</div><div><strong>Duration:</strong> {{ item.duration }}</div><div><strong>Video_url:</strong> {{ item.video_url }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-gradient-to-br from-gray-900/50 to-black border border-gray-700/50 rounded-2xl p-4 space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Season_id:</strong> {{ item.season_id }}</div><div><strong>Title:</strong> {{ item.title }}</div><div><strong>Episode_number:</strong> {{ item.episode_number }}</div><div><strong>Duration:</strong> {{ item.duration }}</div><div><strong>Video_url:</strong> {{ item.video_url }}</div>
    </div>

    <button @click="$router.back()" class="mt-4 text-red-500 hover:text-red-400 transition duration-150">Back</button>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  components: { Loading },
  data() {
    return {
      item: {},
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const id = this.$route.params.id;
    try {
      const response = await this.$apiGetById('/episodes', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

