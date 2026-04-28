
<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white relative">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading users..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <h1 class="text-lg font-bold text-white">Users</h1>
      <button @click="openAddModal" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center space-x-1 text-sm transition duration-150">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Users</span>
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input v-model="searchQuery" @input="fetchItems(1)" type="text" placeholder="Search..."
        class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchItems(1)" class="border border-gray-600 bg-gray-900/50 rounded-lg px-2 py-1 text-sm text-white focus:border-red-600 focus:ring-1 focus:ring-red-600/50">
          <option v-for="size in [5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="bg-gradient-to-br from-gray-900/50 to-black overflow-hidden rounded-2xl border border-gray-700/50 hidden md:block shadow-md">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-700/50">
          <thead class="bg-gray-900/80 text-gray-300 uppercase text-xs font-semibold border-b border-red-600/30">
            <tr>
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">First_name</th><th class="px-6 py-3 text-left">Last_name</th><th class="px-6 py-3 text-left">Email</th><th class="px-6 py-3 text-left">Phone_number</th><th class="px-6 py-3 text-left">Password</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/50">
            <tr v-for="(item, index) in items" :key="item.id" class="hover:bg-red-900/10 transition duration-150">
              <td class="px-6 py-4 text-gray-300">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.first_name }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.last_name }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.email }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.phone_number }}</td><td class="px-6 py-4 whitespace-nowrap text-gray-300">{{ item.password }}</td>
              <td class="px-6 py-4 text-center space-x-3">
                <button @click="viewDetails(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-eye"></i></button>
                <button @click="editItem(item)" class="text-blue-400 hover:text-blue-300 transition duration-150"><i class="fas fa-edit"></i></button>
                <button @click="openAssignRole(item)" title="Assign Role" class="text-yellow-400 hover:text-yellow-300 transition duration-150"><i class="fas fa-user-tag"></i></button>
                <button @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="7" class="text-center py-6 text-gray-500 italic">No data found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-4">
      <div v-for="(item, index) in items" :key="item.id" class="bg-gradient-to-br from-gray-900/50 to-black border border-gray-700/50 rounded-2xl shadow-md p-4">
        <div class="flex justify-between mb-3">
          <h2 class="font-bold text-white">Users #{{ index + 1 }}</h2>
          <div class="flex gap-3 text-sm">
            <button @click="viewDetails(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-eye"></i></button>
            <button @click="editItem(item)" class="text-blue-400 hover:text-blue-300 transition duration-150"><i class="fas fa-edit"></i></button>
            <button @click="openAssignRole(item)" title="Assign Role" class="text-yellow-400 hover:text-yellow-300 transition duration-150"><i class="fas fa-user-tag"></i></button>
            <button @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-400 transition duration-150"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-y-1 text-sm text-gray-500">
          
            <div class="col-span-2">
              <span class="font-medium text-gray-500">First_name:</span>
              {{ item.first_name }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Last_name:</span>
              {{ item.last_name }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Email:</span>
              {{ item.email }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Phone_number:</span>
              {{ item.phone_number }}
            </div>
            <div class="col-span-2">
              <span class="font-medium text-gray-500">Password:</span>
              {{ item.password }}
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
          class="px-3 py-1 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">← Previous</button>
        <span class="px-3 py-1 bg-red-600 text-white rounded-lg font-medium">{{ currentPage }}</span>
        <button @click="fetchItems(currentPage + 1)" :disabled="!nextPage"
          class="px-3 py-1 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">Next →</button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <add-users v-if="showModal && !editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>
    <edit-users v-if="showModal && editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>

    <!-- Delete Confirmation Modal -->
    <delete-confirm-modal 
      :visible="deleteModalVisible"
      title="Delete Users"
      message="Are you sure you want to delete this users?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible=false"
    />

    <!-- Assign Role Modal -->
    <div v-if="assignRoleModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl w-full max-w-sm border border-red-600/30">
        <!-- Header -->
        <div class="flex justify-between items-center px-6 py-4 border-b border-red-600/30">
          <div>
            <h2 class="text-base font-semibold text-white">Assign Role</h2>
            <p class="text-xs text-gray-500 mt-0.5">
              {{ assignRoleUser?.first_name }} {{ assignRoleUser?.last_name }}
            </p>
          </div>
          <button @click="assignRoleModal = false" class="text-gray-500 hover:text-red-500 transition text-xl leading-none">&times;</button>
        </div>

        <div class="px-6 py-5 space-y-4">
          <!-- Role select -->
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Role</label>
            <div v-if="loadingRoles" class="text-gray-500 text-xs py-2">Loading roles...</div>
            <select v-else v-model="assignRoleId" class="input-field">
              <option value="" disabled>Select a role</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
            </select>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-800">
          <button @click="assignRoleModal = false"
            class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 text-sm transition">
            Cancel
          </button>
          <button @click="submitAssignRole" :disabled="!assignRoleId || assigningRole"
            class="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-black rounded-lg font-semibold text-sm transition shadow-md">
            {{ assigningRole ? 'Assigning...' : 'Assign Role' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply border border-gray-600 bg-gray-900/50 rounded-lg px-3 py-2 text-sm w-full text-white placeholder-gray-500
         focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150;
}
</style>

<script>
import AddUsers from "./AddUsers.vue";
import EditUsers from "./EditUsers.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddUsers, EditUsers, Loading, DeleteConfirmModal },

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
      // Assign role
      assignRoleModal: false,
      assignRoleUser: null,
      assignRoleId: '',
      roles: [],
      loadingRoles: false,
      assigningRole: false,
    };
  },

  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;
      const params = { page: this.currentPage, page_size: this.pageSize, search: this.searchQuery };
      try {
        const response = await this.$apiGet('/users', params);
        this.items = response.data;
        this.count = response.count || 0;
        this.nextPage = response.next || null;
        this.previousPage = response.previous || null;
      } catch(e) { console.error(e); }
      finally { this.loading = false; }
    },

    openAddModal() { this.editMode = false; this.selectedItem = null; this.showModal = true; },
    editItem(item) { this.editMode = true; this.selectedItem = item; this.showModal = true; },
    
    viewDetails(id) { 
      this.$router.push({ name: 'Users-detail', params: { id } });
    },

    openDeleteModal(id) { this.deleteId = id; this.deleteModalVisible = true; },

    async confirmDelete() {
      const res = await this.$apiDelete('/users', this.deleteId);
      if(res) {
        this.$root.$refs.toast.showToast('Users deleted successfully', 'success');
      }
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },

    async openAssignRole(user) {
      this.assignRoleUser = user;
      this.assignRoleId = '';
      this.assignRoleModal = true;
      if (this.roles.length === 0) {
        this.loadingRoles = true;
        try {
          const res = await this.$apiGet('/roles', { page_size: 200 });
          this.roles = res.data || res || [];
        } catch(e) { console.error(e); }
        finally { this.loadingRoles = false; }
      }
    },

    async submitAssignRole() {
      this.assigningRole = true;
      try {
        const payload = { user_id: this.assignRoleUser.id, role_id: this.assignRoleId };
        const res = await this.$apiPost('/user-roles', payload);
        if (res) {
          this.$root.$refs.toast.showToast('Role assigned successfully', 'success');
          this.assignRoleModal = false;
        }
      } catch(e) { console.error(e); }
      finally { this.assigningRole = false; }
    },
  },

  mounted() { this.fetchItems(); }
};
</script>

