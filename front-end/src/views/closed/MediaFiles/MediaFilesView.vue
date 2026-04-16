<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800 relative">

    <!-- Loading -->
    <Loading :visible="loading" message="Loading MediaFiles..." />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold">MediaFiles</h1>
      <button @click="openAddModal"
        class="bg-primary text-white px-4 py-2 rounded-lg shadow">
        Add MediaFiles
      </button>
    </div>

    <!-- Search -->
    <div class="flex flex-col sm:flex-row justify-between mb-6 gap-4">
      <input v-model="searchQuery" @input="fetchItems(1)"
        type="text" placeholder="Search..."
        class="border px-4 py-2 rounded-lg w-full sm:max-w-xs" />

      <select v-model="pageSize" @change="fetchItems(1)"
        class="border px-2 py-1 rounded-lg">
        <option v-for="size in [5,10,20,50,100]" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>

    <!-- 🔥 GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      <div v-for="(item, index) in items" :key="item.id"
        class="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">

        <!-- 🎥 MEDIA -->
        <div class="w-full h-48 bg-black flex items-center justify-center">

          <!-- ✅ VIDEO -->
          <video v-if="isVideo(item)"
            :src="getFileUrl(item)"
            controls
            class="w-full h-full object-cover">
          </video>

          <!-- ✅ IMAGE -->
          <img v-else-if="isImage(item)"
            :src="getFileUrl(item)"
            class="w-full h-full object-cover" />

          <!-- ❌ FALLBACK -->
          <span v-else class="text-gray-400 text-xs">
            No Preview
          </span>

        </div>

        <!-- INFO -->
        <div class="p-4 space-y-1 text-xs text-gray-600">
          <p><b>Content:</b> {{ item.content_id }}</p>
          <p><b>Type:</b> {{ item.file_type }}</p>
          <p><b>Quality:</b> {{ item.quality }}</p>

          <!-- ACTIONS -->
          <div class="flex justify-between items-center pt-2 border-t mt-2">
            <div class="flex gap-3">
              <button @click="viewDetails(item.id)">👁</button>
              <button @click="editItem(item)">✏</button>
              <button @click="openDeleteModal(item.id)">🗑</button>
            </div>
            <span>#{{ index + 1 }}</span>
          </div>
        </div>

      </div>

      <!-- EMPTY -->
      <div v-if="items.length === 0"
        class="col-span-full text-center py-10 text-gray-400">
        No data found
      </div>

    </div>

    <!-- Pagination -->
    <div class="flex justify-between mt-6 text-sm">
      <span>
        Showing {{ (currentPage - 1) * pageSize + 1 }}
        to {{ Math.min(currentPage * pageSize, count) }}
        of {{ count }}
      </span>

      <div class="flex gap-2">
        <button @click="fetchItems(currentPage - 1)" :disabled="!previousPage">
          ←
        </button>
        <span>{{ currentPage }}</span>
        <button @click="fetchItems(currentPage + 1)" :disabled="!nextPage">
          →
        </button>
      </div>
    </div>

    <!-- Modals -->
    <AddMediaFiles v-if="showModal && !editMode"
      :data="selectedItem"
      @close="showModal=false"
      @saved="fetchItems" />

    <EditMediaFiles v-if="showModal && editMode"
      :data="selectedItem"
      @close="showModal=false"
      @saved="fetchItems" />

    <delete-confirm-modal
      :visible="deleteModalVisible"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible=false" />
  </div>
</template>

<script>
import AddMediaFiles from "./AddMediaFiles.vue";
import EditMediaFiles from "./EditMediaFiles.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddMediaFiles, EditMediaFiles, Loading, DeleteConfirmModal },

  data() {
    return {
      items: [],
      count: 0,
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
      showModal: false,
      editMode: false,
      selectedItem: null,
      loading: false,
      deleteModalVisible: false,
      deleteId: null,
    };
  },

  methods: {
    // ✅ FIX: support both video & video_url
    getFileUrl(item) {
      return item.video || item.video_url || '';
    },

    isVideo(item) {
      return item.file_type?.toLowerCase().includes('video');
    },

    isImage(item) {
      return item.file_type?.toLowerCase().includes('image');
    },

    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;

      const params = {
        page,
        page_size: this.pageSize,
        search: this.searchQuery
      };

      try {
        const res = await this.$apiGet('/media-files', params);
        this.items = res.data;
        this.count = res.count || 0;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    openAddModal() {
      this.editMode = false;
      this.selectedItem = null;
      this.showModal = true;
    },

    editItem(item) {
      this.editMode = true;
      this.selectedItem = item;
      this.showModal = true;
    },

    viewDetails(id) {
      this.$router.push({ name: 'MediaFiles-detail', params: { id } });
    },

    openDeleteModal(id) {
      this.deleteId = id;
      this.deleteModalVisible = true;
    },

    async confirmDelete() {
      const res = await this.$apiDelete('/mediafiles', this.deleteId);
      if (res) {
        this.$root.$refs.toast.showToast('Deleted successfully', 'success');
      }
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },
  },

  mounted() {
    this.fetchItems();
  }
};
</script>