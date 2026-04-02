
<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading TalentProfile..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">TalentProfile Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-white overflow-hidden rounded-md border border-gray-200 p-4 hidden md:block space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>User_id:</strong> {{ item.user_id }}</div><div><strong>Bio:</strong> {{ item.bio }}</div><div><strong>Profile_video_url:</strong> {{ item.profile_video_url }}</div><div><strong>Category(actor,model,creator):</strong> {{ item.category(actor,model,creator) }}</div><div><strong>Kyc_status(pending,approved,rejected):</strong> {{ item.kyc_status(pending,approved,rejected) }}</div><div><strong>Id_document_url:</strong> {{ item.id_document_url }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-white rounded-md border border-gray-200 p-4 space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>User_id:</strong> {{ item.user_id }}</div><div><strong>Bio:</strong> {{ item.bio }}</div><div><strong>Profile_video_url:</strong> {{ item.profile_video_url }}</div><div><strong>Category(actor,model,creator):</strong> {{ item.category(actor,model,creator) }}</div><div><strong>Kyc_status(pending,approved,rejected):</strong> {{ item.kyc_status(pending,approved,rejected) }}</div><div><strong>Id_document_url:</strong> {{ item.id_document_url }}</div>
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
      const response = await this.$apiGetById('/talentprofile', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
