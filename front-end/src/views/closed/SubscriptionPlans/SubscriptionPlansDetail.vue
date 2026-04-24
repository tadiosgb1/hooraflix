
<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading SubscriptionPlans..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">SubscriptionPlans Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-gradient-to-br from-gray-900/50 to-black overflow-hidden rounded-2xl border border-gray-700/50 p-4 shadow-md hidden md:block space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Name:</strong> {{ item.name }}</div><div><strong>Description:</strong> {{ item.description }}</div><div><strong>Price:</strong> {{ item.price }}</div><div><strong>Duration_days:</strong> {{ item.duration_days }}</div><div><strong>Device_limit:</strong> {{ item.device_limit }}</div><div><strong>Has_ads:</strong> {{ item.has_ads }}</div><div><strong>Included_ppv_credits:</strong> {{ item.included_ppv_credits }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-700/50 p-4 space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Name:</strong> {{ item.name }}</div><div><strong>Description:</strong> {{ item.description }}</div><div><strong>Price:</strong> {{ item.price }}</div><div><strong>Duration_days:</strong> {{ item.duration_days }}</div><div><strong>Device_limit:</strong> {{ item.device_limit }}</div><div><strong>Has_ads:</strong> {{ item.has_ads }}</div><div><strong>Included_ppv_credits:</strong> {{ item.included_ppv_credits }}</div>
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
      const response = await this.$apiGetById('/subscriptionplans', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

