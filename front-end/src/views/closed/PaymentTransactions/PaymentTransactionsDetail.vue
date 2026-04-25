
<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading PaymentTransactions..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">PaymentTransactions Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-gradient-to-br from-gray-900/50 to-black overflow-hidden rounded-2xl border border-gray-700/50 p-4 shadow-md hidden md:block space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>User_id:</strong> {{ item.user_id }}</div>
      <div><strong>Content_id:</strong> {{ item.content_id }}</div>
      <div><strong>Amount:</strong> {{ item.amount }}</div>
      <div><strong>Payment_type:</strong> {{ item.payment_type }}</div>
      <div><strong>Currency:</strong> {{ item.currency }}</div>
      <div><strong>Reference_id:</strong> {{ item.reference_id }}</div>
      <div><strong>External_transaction_id:</strong> {{ item.external_transaction_id }}</div>
      <div><strong>Metadata:</strong> {{ item.metadata }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-gradient-to-br from-gray-900/50 to-black border border-gray-700/50 rounded-2xl p-4 space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>User_id:</strong> {{ item.user_id }}</div>
      <div><strong>Content_id:</strong> {{ item.content_id }}</div>
      <div><strong>Amount:</strong> {{ item.amount }}</div>
      <div><strong>Payment_type:</strong> {{ item.payment_type }}</div>
      <div><strong>Currency:</strong> {{ item.currency }}</div>
      <div><strong>Reference_id:</strong> {{ item.reference_id }}</div>
      <div><strong>External_transaction_id:</strong> {{ item.external_transaction_id }}</div>
      <div><strong>Metadata:</strong> {{ item.metadata }}</div>
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
      const response = await this.$apiGetById('/paymenttransactions', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
