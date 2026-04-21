<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading categories..." />

    <!-- Page Header -->
    <div class="px-8 py-6 border-b border-red-600/20 bg-gradient-to-r from-black to-gray-900/50 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-white mb-2">Categories</h1>
          <p class="text-gray-400">Manage all content categories</p>
        </div>
        <button 
          @click="openAddModal" 
          class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition duration-150 shadow-md"
        >
          + Add Category
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="px-8 py-12">
      <div class="max-w-7xl mx-auto">
        <!-- Empty State -->
        <div v-if="items.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">📁</div>
          <h3 class="text-2xl font-bold text-white mb-2">No Categories Found</h3>
          <p class="text-gray-400 mb-8">Create your first category to get started</p>
          <button 
            @click="openAddModal"
            class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-150"
          >
            Create Category
          </button>
        </div>

        <!-- Categories Grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in items" 
            :key="item.id"
            class="bg-gradient-to-br from-gray-900/50 to-black border border-red-600/20 rounded-2xl p-6 hover:border-red-600/50 transition duration-150 shadow-lg group"
          >
            <!-- Category Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white group-hover:text-red-500 transition duration-150">{{ item.name }}</h3>
                <p class="text-gray-500 text-sm mt-1">ID: {{ item.id }}</p>
              </div>
              <div class="text-3xl">📂</div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-4 border-t border-gray-700/50">
              <button 
                @click="viewDetail(item.id)"
                class="flex-1 px-3 py-2 bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition duration-150"
              >
                View
              </button>
              <button 
                @click="openEditModal(item)"
                class="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm font-medium transition duration-150"
              >
                Edit
              </button>
              <button 
                @click="deleteItem(item.id)"
                class="flex-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium transition duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddCategories v-if="showAddModal" @close="showAddModal = false" @saved="loadData" />
    <EditCategories v-if="showEditModal" :data="selectedItem" @close="showEditModal = false" @saved="loadData" />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import AddCategories from "./AddCategories.vue";
import EditCategories from "./EditCategories.vue";

export default {
  components: { Loading, AddCategories, EditCategories },
  data() {
    return {
      items: [],
      loading: false,
      showAddModal: false,
      showEditModal: false,
      selectedItem: null,
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const response = await this.$apiGet("/categories");
        this.items = response.data || [];
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    openEditModal(item) {
      this.selectedItem = item;
      this.showEditModal = true;
    },
    viewDetail(id) {
      this.$router.push(`/categories/${id}`);
    },
    async deleteItem(id) {
      if (confirm("Are you sure you want to delete this category?")) {
        try {
          await this.$apiDelete("/categories", id);
          this.$root.$refs.toast.showToast("Deleted successfully", "success");
          this.loadData();
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
