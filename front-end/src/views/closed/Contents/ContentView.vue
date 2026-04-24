<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white relative">
    <Loading :visible="loading" message="Loading Content..." />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">Content Library</h1>
      <button @click="openAddModal"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center gap-1.5 text-sm transition duration-150">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Content
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
      <input v-model="searchQuery" @input="fetchItems(1)" type="text" placeholder="Search by title, language..."
        class="border border-gray-700 bg-gray-900/60 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/40 transition duration-150" />
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <span>Show</span>
        <select v-model="pageSize" @change="fetchItems(1)"
          class="border border-gray-700 bg-gray-900/60 rounded-lg px-2 py-1 text-sm text-white focus:border-red-600">
          <option v-for="s in [5,10,20,50,100]" :key="s" :value="s">{{ s }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-700/50 shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-800">
          <thead class="bg-gray-900/80 text-gray-400 uppercase text-xs font-semibold border-b border-red-600/20">
            <tr>
              <th class="px-5 py-3 text-left w-10">#</th>
              <th class="px-5 py-3 text-left">Title</th>
              <th class="px-5 py-3 text-left">Type</th>
              <th class="px-5 py-3 text-left">Pricing</th>
              <th class="px-5 py-3 text-left">Language</th>
              <th class="px-5 py-3 text-left">Rating</th>
              <th class="px-5 py-3 text-left">Released</th>
              <th class="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800/60">
            <tr v-for="(item, index) in items" :key="item.id"
              class="hover:bg-red-900/10 transition duration-150 cursor-pointer group">
              <td class="px-5 py-3.5 text-gray-500">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td class="px-5 py-3.5">
                <div class="font-medium text-white group-hover:text-red-400 transition duration-150">{{ item.title }}</div>
                <div class="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{{ item.description }}</div>
              </td>
              <td class="px-5 py-3.5">
                <span :class="contentTypeBadge(item.content_type)">
                  {{ contentTypeLabel(item.content_type) }}
                </span>
              </td>
              <td class="px-5 py-3.5">
                <span :class="pricingBadge(item.pricing_option)">
                  {{ pricingLabel(item.pricing_option) }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-gray-300">{{ item.language || '—' }}</td>
              <td class="px-5 py-3.5">
                <span class="flex items-center gap-1 text-yellow-400 font-medium">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {{ item.rating || '—' }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-gray-400 text-xs">{{ formatDate(item.release_date) }}</td>
              <td class="px-5 py-3.5 text-center">
                <div class="flex items-center justify-center gap-3">
                  <button @click="viewDetails(item.id)" class="text-gray-400 hover:text-red-400 transition duration-150" title="View"><i class="fas fa-eye"></i></button>
                  <button @click="editItem(item)" class="text-gray-400 hover:text-blue-400 transition duration-150" title="Edit"><i class="fas fa-edit"></i></button>
                  <button @click="openDeleteModal(item.id)" class="text-gray-400 hover:text-red-500 transition duration-150" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
              </td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="8" class="text-center py-10 text-gray-600 italic">No content found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-3">
      <div v-for="item in items" :key="item.id"
        class="bg-gradient-to-br from-gray-900/60 to-black border border-gray-700/50 rounded-2xl p-4 shadow-md">
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1 min-w-0 pr-3">
            <p class="font-semibold text-white truncate">{{ item.title }}</p>
            <p class="text-xs text-gray-500 mt-0.5 line-clamp-2">{{ item.description }}</p>
          </div>
          <div class="flex gap-3 text-sm shrink-0">
            <button @click="viewDetails(item.id)" class="text-gray-400 hover:text-red-400 transition duration-150"><i class="fas fa-eye"></i></button>
            <button @click="editItem(item)" class="text-gray-400 hover:text-blue-400 transition duration-150"><i class="fas fa-edit"></i></button>
            <button @click="openDeleteModal(item.id)" class="text-gray-400 hover:text-red-500 transition duration-150"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <span :class="contentTypeBadge(item.content_type)">{{ contentTypeLabel(item.content_type) }}</span>
          <span :class="pricingBadge(item.pricing_option)">{{ pricingLabel(item.pricing_option) }}</span>
          <span class="px-2 py-0.5 rounded-full text-xs bg-gray-800 text-yellow-400 border border-gray-700">
            ⭐ {{ item.rating || '—' }}
          </span>
          <span class="px-2 py-0.5 rounded-full text-xs bg-gray-800 text-gray-400 border border-gray-700">
            {{ item.language || '—' }}
          </span>
        </div>
      </div>
      <p v-if="items.length === 0" class="text-center text-gray-600 py-8 italic">No content found.</p>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6 text-sm text-gray-500">
      <span>Showing {{ count === 0 ? 0 : (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, count) }} of {{ count }}</span>
      <div class="flex items-center gap-2">
        <button @click="fetchItems(currentPage - 1)" :disabled="!previousPage"
          class="px-3 py-1 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition duration-150">← Prev</button>
        <span class="px-3 py-1 bg-red-600 text-white rounded-lg font-medium">{{ currentPage }}</span>
        <button @click="fetchItems(currentPage + 1)" :disabled="!nextPage"
          class="px-3 py-1 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition duration-150">Next →</button>
      </div>
    </div>

    <!-- Modals -->
    <add-content v-if="showModal && !editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>
    <edit-content v-if="showModal && editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>
    <delete-confirm-modal
      :visible="deleteModalVisible"
      title="Delete Content"
      message="Are you sure you want to delete this content?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible=false"
    />
  </div>
</template>

<script>
import AddContent from "./AddContent.vue";
import EditContent from "./EditContent.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddContent, EditContent, Loading, DeleteConfirmModal },

  data() {
    return {
      items: [], count: 0, nextPage: null, previousPage: null,
      currentPage: 1, pageSize: 10, searchQuery: "",
      showModal: false, editMode: false, selectedItem: null,
      loading: false, deleteModalVisible: false, deleteId: null,
    };
  },

  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;
      try {
        const response = await this.$apiGet('/content', { page: this.currentPage, page_size: this.pageSize, search: this.searchQuery });
        this.items = response.data;
        this.count = response.count || 0;
        this.nextPage = response.next || null;
        this.previousPage = response.previous || null;
      } catch(e) { console.error(e); }
      finally { this.loading = false; }
    },

    openAddModal() { this.editMode = false; this.selectedItem = null; this.showModal = true; },
    editItem(item) { this.editMode = true; this.selectedItem = item; this.showModal = true; },
    viewDetails(id) { this.$router.push({ name: 'Content-detail', params: { id } }); },
    openDeleteModal(id) { this.deleteId = id; this.deleteModalVisible = true; },

    async confirmDelete() {
      const res = await this.$apiDelete('/content', this.deleteId);
      if (res) this.$root.$refs.toast.showToast('Content deleted successfully', 'success');
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },

    contentTypeLabel(type) {
      const map = { full_movie: 'Full Movie', series: 'Series', part_based: 'Part Based', music: 'Music' };
      return map[type] || type || '—';
    },
    contentTypeBadge(type) {
      const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium border ';
      const map = {
        full_movie: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
        series:     'bg-purple-900/40 text-purple-300 border-purple-700/50',
        part_based: 'bg-orange-900/40 text-orange-300 border-orange-700/50',
        music:      'bg-pink-900/40 text-pink-300 border-pink-700/50',
      };
      return base + (map[type] || 'bg-gray-800 text-gray-400 border-gray-700');
    },

    pricingLabel(option) {
      const map = { free: 'Free', rental: 'Rental', subscription: 'Subscription', forever: 'Buy Forever' };
      return map[option] || option || 'Free';
    },
    pricingBadge(option) {
      const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium border ';
      const map = {
        free:         'bg-green-900/40 text-green-300 border-green-700/50',
        rental:       'bg-yellow-900/40 text-yellow-300 border-yellow-700/50',
        subscription: 'bg-red-900/40 text-red-300 border-red-700/50',
        forever:      'bg-indigo-900/40 text-indigo-300 border-indigo-700/50',
      };
      return base + (map[option] || 'bg-green-900/40 text-green-300 border-green-700/50');
    },

    formatDate(d) {
      if (!d) return '—';
      return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    },
  },

  mounted() { this.fetchItems(); }
};
</script>
