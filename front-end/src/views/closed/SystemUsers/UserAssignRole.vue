<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-sm">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Assign Roles to {{ user.first_name }} {{ user.last_name }}</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-4 text-gray-500">Loading roles...</div>

      <!-- Roles Form -->
      <form v-else @submit.prevent="submitForm" class="space-y-4">
        <div v-for="role in roles" :key="role.id" class="flex items-center gap-2">
          <input 
            type="checkbox" 
            :id="'role-' + role.id" 
            :value="role.id" 
            v-model="selectedRoleIds" 
            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label :for="'role-' + role.id" class="text-gray-700">{{ role.name }}</label>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-dprimary transition">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: { user: Object },

  data() {
    return {
      roles: [],
      selectedRoleIds: [],
      loading: false,
    };
  },

  methods: {
    async fetchRoles() {
      this.loading = true;
      try {
        // Fetch all roles
        const allRoles = await this.$apiGet("/roles", { page: 1, page_size: 1000 });
        this.roles = allRoles.data || [];

        // Fetch roles assigned to this user
        const assignedRes = await this.$apiGet(`/user-role/${this.user.id}/roles`);
        const assignedRoleIds = assignedRes.map(r => r.id);

        // Pre-check assigned roles
        this.selectedRoleIds = assignedRoleIds;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    async submitForm() {
      try {
        const payload = { role_ids: this.selectedRoleIds };
        const res = await this.$apiPost(`/user-role/${this.user.id}/roles`, payload);
        if (res) {
          this.$root.$refs.toast.showToast("Roles updated successfully", "success");
        }

        this.$emit("saved");
        this.$emit("close");
      } catch (e) {
        console.error(e);
      }
    },
  },

  mounted() {
    this.fetchRoles();
  },
};
</script>