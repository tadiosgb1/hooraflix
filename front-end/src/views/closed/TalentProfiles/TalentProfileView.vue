
<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white relative">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading talentProfile..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">TalentProfile</h1>
      <button @click="openAddModal" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center space-x-1 text-sm">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add TalentProfile</span>
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input v-model="searchQuery" @input="fetchItems(1)" type="text" placeholder="Search..."
        class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchItems(1)" class="border border-gray-600 bg-gray-900/50 rounded-lg px-2 py-1 text-sm text-white focus:border-red-600 focus:ring-1 focus:ring-red-600/50">
          <option v-for="size in [5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="bg-gradient-to-br from-gray-900/50 to-black overflow-hidden rounded-2xl border border-gray-700/50 shadow-md hidden md:block">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-900/80 text-gray-300 uppercase text-xs font-semibold border-b border-red-600/30">
            <tr>
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">User_id</th><th class="px-6 py-3 text-left">Bio</th><th class="px-6 py-3 text-left">Profile_video_url</th><th class="px-6 py-3 text-left">Category</th><th class="px-6 py-3 text-left">Kyc_status</th><th class="px-6 py-3 text-left">Id_document_url</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/50">
            <tr v-for="(item, index) in items" :key="item.id" class="hover:bg-red-900/10 transition duration-150">
              <td class="px-6 py-4 text-gray-300">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.user_id }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.bio }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.profile_video_url }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.category }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.kyc_status }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.id_document_url }}</td>
              <td class="px-6 py-4 text-center space-x-3">
                <button @click="viewDetails(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-eye"></i></button>
                <button @click="editItem(item)" class="text-blue-400 hover:text-blue-300 transition duration-150"><i class="fas fa-edit"></i></button>
                <button @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="8" class="text-center py-6 text-gray-500 italic">No data found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-4">
      <div v-for="(item, index) in items" :key="item.id" class="bg-gradient-to-br from-gray-900/50 to-black border border-gray-700/50 rounded-2xl shadow-md p-4">
        <div class="flex justify-between mb-3">
          <h2 class="font-bold text-white">TalentProfile #{{ index + 1 }}</h2>
          <div class="flex gap-3 text-sm">
            <button @click="viewDetails(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-eye"></i></button>
            <button @click="editItem(item)" class="text-blue-400 hover:text-blue-300 transition duration-150"><i class="fas fa-edit"></i></button>
            <button @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-y-1 text-sm text-gray-300">
          
            <div class="col-span-2">
              <span class="font-medium text-gray-500">User_id:</span>
              {{ item.user_id }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Bio:</span>
              {{ item.bio }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Profile_video_url:</span>
              {{ item.profile_video_url }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Category:</span>
              {{ item.category }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Kyc_status:</span>
              {{ item.kyc_status }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Id_document_url:</span>
              {{ item.id_document_url }}
            </div>
        </div>
      </div>
      <p v-if="items.length === 0" class="text-center text-gray-500 py-6 italic">No data found.</p>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6 text-sm text-gray-500">
      <span>
        Showing {{ (currentPage - 1) * pageSize + 1 }} 
        to {{ Math.min(currentPage * pageSize, count) }} 
        of {{ count }} total entries
      </span>
      <div class="flex items-center gap-2">
        <button @click="fetchItems(currentPage - 1)" :disabled="!previousPage"
          class="px-3 py-1 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">← Previous</button>
        <span class="px-3 py-1 bg-red-600 text-white rounded-lg font-medium">{{ currentPage }}</span>
        <button @click="fetchItems(currentPage + 1)" :disabled="!nextPage"
          class="px-3 py-1 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">Next →</button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <AddTalentProfile v-if="showModal && !editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>
    <EditTalentProfile v-if="showModal && editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>

    <!-- Delete Confirmation Modal -->
    <delete-confirm-modal 
      :visible="deleteModalVisible"
      title="Delete TalentProfile"
      message="Are you sure you want to delete this talentProfile?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible=false"
    />
  </div>
</template>

<script>
import AddTalentProfile from "./AddTalentProfile.vue";
import EditTalentProfile from "./EditTalentProfile.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddTalentProfile, EditTalentProfile, Loading, DeleteConfirmModal },

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
      const params = { page: this.currentPage, page_size: this.pageSize, search: this.searchQuery };
      try {
        const response = await this.$apiGet('/talentprofile', params);
        this.items = response.data;
        this.count = response.count || 0;
        this.nextPage = response.next || null;
        this.previousPage = response.previous || null;
      } catch(e) { console.error(e); }
      finally { this.loading = false; }
    },

    openAddModal() { this.editMode = false; this.selectedItem = null; this.showModal = true; },
    editItem(item) { this.editMode = true; this.selectedItem = item; this.showModal = true; },
    
    // Navigate using static route name
    viewDetails(id) { 
      this.$router.push({ name: 'TalentProfile-detail', params: { id } });
    },

    openDeleteModal(id) { this.deleteId = id; this.deleteModalVisible = true; },

    // Delete with toast
    async confirmDelete() {
      const res = await this.$apiDelete('/talentprofile', this.deleteId);
      if(res) {
        this.$root.$refs.toast.showToast('TalentProfile deleted successfully', 'success');
      }
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },
  },

  mounted() { this.fetchItems(); }
};
</script>


