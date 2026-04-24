<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white relative">
    <Loading :visible="loading" message="Loading Categories..." />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">Categories</h1>
      <button @click="showAddModal = true"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center gap-1.5 text-sm transition duration-150">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Category
      </button>
    </div>

    <!-- Search -->
    <div class="mb-5">
      <input v-model="search" type="text" placeholder="Search categories..."
        class="border border-gray-700 bg-gray-900/60 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/40 transition duration-150" />
    </div>

    <!-- Table -->
    <div class="hidden md:block bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-700/50 shadow-md overflow-hidden">
      <table class="min-w-full text-sm divide-y divide-gray-800">
        <thead class="bg-gray-900/80 text-gray-400 uppercase text-xs font-semibold border-b border-red-600/20">
          <tr>
            <th class="px-5 py-3 text-left w-10">#</th>
            <th class="px-5 py-3 text-left">Name</th>
            <th class="px-5 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-800/60">
          <tr v-for="(item, index) in filtered" :key="item.id"
            class="hover:bg-red-900/10 transition duration-150">
            <td class="px-5 py-3.5 text-gray-500">{{ index + 1 }}</td>
            <td class="px-5 py-3.5 font-medium text-white">{{ item.name }}</td>
            <td class="px-5 py-3.5 text-center">
              <div class="flex items-center justify-center gap-3">
                <button @click="viewDetail(item.id)" class="text-gray-400 hover:text-red-400 transition" title="View">
                  <i class="fas fa-eye"></i>
                </button>
                <button @click="openEditModal(item)" class="text-gray-400 hover:text-blue-400 transition" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteItem(item.id)" class="text-gray-400 hover:text-red-500 transition" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="3" class="text-center py-10 text-gray-600 italic">No categories found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-3">
      <div v-for="item in filtered" :key="item.id"
        class="bg-gradient-to-br from-gray-900/60 to-black border border-gray-700/50 rounded-2xl px-4 py-3 flex items-center justify-between shadow-md">
        <span class="font-medium text-white">{{ item.name }}</span>
        <div class="flex gap-3 text-sm">
          <button @click="viewDetail(item.id)" class="text-gray-400 hover:text-red-400 transition"><i class="fas fa-eye"></i></button>
          <button @click="openEditModal(item)" class="text-gray-400 hover:text-blue-400 transition"><i class="fas fa-edit"></i></button>
          <button @click="deleteItem(item.id)" class="text-gray-400 hover:text-red-500 transition"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <p v-if="filtered.length === 0" class="text-center text-gray-600 py-8 italic">No categories found.</p>
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
      search: '',
      showAddModal: false,
      showEditModal: false,
      selectedItem: null,
    };
  },
  computed: {
    filtered() {
      if (!this.search.trim()) return this.items;
      const q = this.search.toLowerCase();
      return this.items.filter(i => i.name?.toLowerCase().includes(q));
    },
  },
  mounted() { this.loadData(); },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const res = await this.$apiGet('/categories');
        this.items = res.data || res || [];
      } catch(e) { console.error(e); }
      finally { this.loading = false; }
    },
    openEditModal(item) { this.selectedItem = item; this.showEditModal = true; },
    viewDetail(id) { this.$router.push(`/categories/${id}`); },
    async deleteItem(id) {
      if (!confirm('Delete this category?')) return;
      try {
        await this.$apiDelete('/categories', id);
        this.$root.$refs.toast.showToast('Deleted successfully', 'success');
        this.loadData();
      } catch(e) { console.error(e); }
    },
  },
};
</script>
