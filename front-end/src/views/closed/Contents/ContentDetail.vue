
<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Content..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">Content Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-gradient-to-br from-gray-900/50 to-black overflow-hidden rounded-2xl border border-gray-700/50 p-4 hidden md:block space-y-2 shadow-md">
      <div class="text-gray-300"><strong class="text-gray-500">ID:</strong> {{ item.id }}</div>
      <div class="text-gray-300"><strong class="text-gray-500">Title:</strong> {{ item.title }}</div><div class="text-gray-300"><strong class="text-gray-500">Description:</strong> {{ item.description }}</div><div class="text-gray-300"><strong class="text-gray-500">Content_type:</strong> {{ item.content_type }}</div><div class="text-gray-300"><strong class="text-gray-500">Release_date:</strong> {{ item.release_date }}</div><div class="text-gray-300"><strong class="text-gray-500">Duration:</strong> {{ item.duration }}</div><div class="text-gray-300"><strong class="text-gray-500">Language:</strong> {{ item.language }}</div><div class="text-gray-300"><strong class="text-gray-500">Country:</strong> {{ item.country }}</div><div class="text-gray-300"><strong class="text-gray-500">Rating:</strong> {{ item.rating }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-700/50 p-4 space-y-2 shadow-md">
      <div class="text-gray-300"><strong class="text-gray-500">ID:</strong> {{ item.id }}</div>
      <div class="text-gray-300"><strong class="text-gray-500">Title:</strong> {{ item.title }}</div><div class="text-gray-300"><strong class="text-gray-500">Description:</strong> {{ item.description }}</div><div class="text-gray-300"><strong class="text-gray-500">Content_type:</strong> {{ item.content_type }}</div><div class="text-gray-300"><strong class="text-gray-500">Release_date:</strong> {{ item.release_date }}</div><div class="text-gray-300"><strong class="text-gray-500">Duration:</strong> {{ item.duration }}</div><div class="text-gray-300"><strong class="text-gray-500">Language:</strong> {{ item.language }}</div><div class="text-gray-300"><strong class="text-gray-500">Country:</strong> {{ item.country }}</div><div class="text-gray-300"><strong class="text-gray-500">Rating:</strong> {{ item.rating }}</div>
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
      const response = await this.$apiGetById('/content', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

