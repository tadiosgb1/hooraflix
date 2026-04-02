
<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading LiveEvent..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">LiveEvent Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-white overflow-hidden rounded-md border border-gray-200 p-4 hidden md:block space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Title:</strong> {{ item.title }}</div><div><strong>Host_talent_id:</strong> {{ item.host_talent_id }}</div><div><strong>Scheduled_at:</strong> {{ item.scheduled_at }}</div><div><strong>Stream_key:</strong> {{ item.stream_key }}</div><div><strong>Status(upcoming,live,ended):</strong> {{ item.status(upcoming,live,ended) }}</div><div><strong>Is_ppv:</strong> {{ item.is_ppv }}</div><div><strong>Ticket_price:</strong> {{ item.ticket_price }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-white rounded-md border border-gray-200 p-4 space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Title:</strong> {{ item.title }}</div><div><strong>Host_talent_id:</strong> {{ item.host_talent_id }}</div><div><strong>Scheduled_at:</strong> {{ item.scheduled_at }}</div><div><strong>Stream_key:</strong> {{ item.stream_key }}</div><div><strong>Status(upcoming,live,ended):</strong> {{ item.status(upcoming,live,ended) }}</div><div><strong>Is_ppv:</strong> {{ item.is_ppv }}</div><div><strong>Ticket_price:</strong> {{ item.ticket_price }}</div>
    </div>

    <button @click="$router.back()" class="mt-4 text-blue-600 hover:underline">Back</button>
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
      const response = await this.$apiGetById('/liveevent', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
