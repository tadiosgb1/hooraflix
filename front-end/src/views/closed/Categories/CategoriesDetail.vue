
<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Categories..." />

    <!-- Page Header -->
    <div class="px-8 py-6 border-b border-red-600/20 bg-gradient-to-r from-black to-gray-900/50">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-2">Category Details</h1>
        <p class="text-gray-400">View detailed information about this category</p>
      </div>
    </div>

    <!-- Content -->
    <div class="px-8 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Detail Card -->
        <div class="bg-gradient-to-br from-gray-900/50 to-black border border-red-600/20 rounded-2xl p-8 shadow-lg">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- ID -->
            <div class="bg-black/50 p-6 rounded-xl border border-gray-700/50">
              <p class="text-gray-400 text-sm font-semibold mb-2">Category ID</p>
              <p class="text-2xl font-bold text-white">{{ item.id }}</p>
            </div>

            <!-- Name -->
            <div class="bg-black/50 p-6 rounded-xl border border-gray-700/50">
              <p class="text-gray-400 text-sm font-semibold mb-2">Category Name</p>
              <p class="text-2xl font-bold text-red-500">{{ item.name }}</p>
            </div>
          </div>

          <!-- Back Button -->
          <div class="mt-8 flex gap-4">
            <button 
              @click="$router.back()" 
              class="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-red-600 hover:text-red-500 transition duration-150 font-semibold"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
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
      const response = await this.$apiGetById('/categories', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

