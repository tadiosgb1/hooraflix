<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <!-- MODAL CONTAINER -->
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl lg:max-w-4xl flex flex-col max-h-[90vh]"
    >

      <!-- HEADER (sticky) -->
      <div class="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
        <h2 class="text-lg font-bold text-white">
          Manage Permissions for
          <span class="text-primary">{{ role.name }}</span>
        </h2>

        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-red-500 text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      <!-- BODY (scrollable) -->
      <div class="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">

        <!-- Loading -->
        <div v-if="loading" class="text-center py-10 text-gray-500">
          Loading permissions...
        </div>

        <!-- Permissions Grid -->
        <form v-else @submit.prevent="submitForm">

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            <label
              v-for="perm in permissions"
              :key="perm.id"
              class="flex items-center gap-3 p-3 rounded-xl border hover:border-primary hover:bg-red-600/5 transition cursor-pointer"
            >
              <input
                type="checkbox"
                :value="perm.id"
                v-model="selectedPermissionIds"
                class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-red-600"
              />

              <span class="text-sm text-gray-300 font-medium">
                {{ perm.name }}
              </span>
            </label>

          </div>

        </form>
      </div>

      <!-- FOOTER (sticky) -->
      <div class="px-6 py-4 border-t flex justify-end gap-3 bg-white sticky bottom-0">

        <button
          type="button"
          @click="$emit('close')"
          class="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          @click="submitForm"
          class="px-5 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition"
        >
          Save Changes
        </button>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: { role: Object },

  data() {
    return {
      permissions: [],
      selectedPermissionIds: [],
      loading: false,
    };
  },

  methods: {
    async fetchPermissions() {
      this.loading = true;

      try {
        const allRes = await this.$apiGet("/permissions", {
          page: 1,
          page_size: 1000
        });

        this.permissions = allRes.data || [];

        const rolePermRes = await this.$apiGet(
          `/role-permissions/role/${this.role.id}/permissions`
        );

        const rolePermIds = rolePermRes.data.map(p => p.id);

        this.selectedPermissionIds = rolePermIds;

      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    async submitForm() {
      try {
        const payload = {
          role_id: this.role.id,
          add_permission_ids: this.selectedPermissionIds,
          remove_permission_ids: this.permissions
            .map(p => p.id)
            .filter(id => !this.selectedPermissionIds.includes(id))
        };

        const res = await this.$apiPatch(
          "/role-permissions/manage",
          "",
          payload
        );

        if (res) {
          this.$root.$refs.toast.showToast(
            "Permissions updated successfully",
            "success"
          );
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error(e);
      }
    }
  },

  mounted() {
    this.fetchPermissions();
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>

