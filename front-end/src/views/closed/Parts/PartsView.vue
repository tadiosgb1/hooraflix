<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white relative">
    
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Parts..." />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">Parts</h1>
      <button @click="openAddModal"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center space-x-1 text-sm">
        <span>Add Parts</span>
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input v-model="searchQuery" @input="fetchItems(1)" type="text" placeholder="Search..."
        class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm" />

      <div class="flex items-center gap-2 text-sm text-gray-500">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchItems(1)"
          class="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white">
          <option v-for="size in [5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- 🔥 GRID VIEW -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      <div v-for="(item, index) in items" :key="item.id"
        class="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden">

        <!-- 🎥 Video -->
        <video v-if="item.video_url"
          :src="item.video_url"
          controls
          class="w-full h-48 object-cover bg-black">
        </video>

        <!-- Info -->
        <div class="p-4 space-y-2">
          <h2 class="font-semibold text-white text-sm">
            {{ item.title }}
          </h2>

          <p class="text-xs text-gray-500">
            <strong>Series:</strong> {{ item.series_id }}
          </p>

          <p class="text-xs text-gray-500">
            <strong>Part:</strong> {{ item.part_number }}
          </p>

          <p class="text-xs text-gray-500">
            <strong>Duration:</strong> {{ item.duration }}
          </p>

          <!-- Actions -->
          <div class="flex justify-between items-center pt-2 border-t mt-2">
            <div class="flex gap-3 text-sm">
              <button @click="viewDetails(item.id)" class="text-red-500 hover:text-red-400 transition duration-150">
                <i class="fas fa-eye"></i>
              </button>
              <button @click="editItem(item)" class="text-blue-400 hover:text-blue-300 transition duration-150">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-400 transition duration-150">
                <i class="fas fa-trash"></i>
              </button>
            </div>

            <span class="text-xs text-gray-500">#{{ index + 1 }}</span>
          </div>
        </div>

      </div>

      <!-- Empty -->
      <div v-if="items.length === 0"
        class="col-span-full text-center py-10 text-gray-500 italic">
        No data found.
      </div>

    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6 text-sm text-gray-500">
      <span>
        Showing {{ (currentPage - 1) * pageSize + 1 }}
        to {{ Math.min(currentPage * pageSize, count) }}
        of {{ count }} entries
      </span>

      <div class="flex items-center gap-2">
        <button @click="fetchItems(currentPage - 1)" :disabled="!previousPage"
          class="px-3 py-1 border rounded-lg disabled:opacity-50">
          ← Previous
        </button>

        <span class="px-3 py-1 bg-red-600 text-white rounded-lg">
          {{ currentPage }}
        </span>

        <button @click="fetchItems(currentPage + 1)" :disabled="!nextPage"
          class="px-3 py-1 border rounded-lg disabled:opacity-50">
          Next →
        </button>
      </div>
    </div>

    <!-- Modals -->
    <add-parts v-if="showModal && !editMode"
      :data="selectedItem"
      @close="showModal=false"
      @saved="fetchItems" />

    <edit-parts v-if="showModal && editMode"
      :data="selectedItem"
      @close="showModal=false"
      @saved="fetchItems" />

    <delete-confirm-modal
      :visible="deleteModalVisible"
      title="Delete Parts"
      message="Are you sure you want to delete this Parts?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible=false" />
  </div>
</template>

<script>
import AddParts from "./AddParts.vue";
import EditParts from "./EditParts.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddParts, EditParts, Loading, DeleteConfirmModal },

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
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;

      const params = {
        page: this.currentPage,
        page_size: this.pageSize,
        search: this.searchQuery
      };

      try {
        const response = await this.$apiGet('/parts', params);
        this.items = response.data;
        this.count = response.count || 0;
        this.nextPage = response.next || null;
        this.previousPage = response.previous || null;
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
      this.$router.push({ name: 'Parts-detail', params: { id } });
    },

    openDeleteModal(id) {
      this.deleteId = id;
      this.deleteModalVisible = true;
    },

    async confirmDelete() {
      const res = await this.$apiDelete('/parts', this.deleteId);
      if (res) {
        this.$root.$refs.toast.showToast('Parts deleted successfully', 'success');
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

