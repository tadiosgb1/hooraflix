<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-md p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-primary">Permissions for {{ role.name }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-500 transition">&times;</button>
      </div>

      <!-- Permission List -->
      <div v-if="loading" class="py-4 text-center text-gray-500">Loading permissions...</div>
      <div v-else class="max-h-96 overflow-y-auto space-y-2">
        <div v-if="permissions.length === 0" class="text-gray-500 italic text-center">No permissions assigned.</div>
        <ul v-else class="space-y-1">
          <li v-for="perm in permissions" :key="perm.id" class="text-gray-300 border-b border-gray-200 py-1 px-2 rounded hover:bg-primary/10 transition">
            {{ perm.name }} ({{ perm.codename }})
          </li>
        </ul>
      </div>

      <!-- Close Button -->
      <div class="flex justify-end pt-4">
        <button @click="$emit('close')" class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition duration-150 hover:bg-gray-100 transition">Close</button>
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
      loading: false,
    };
  },
  mounted() {
    this.fetchRolePermissions();
  },
  methods: {
    async fetchRolePermissions() {
      this.loading = true;
      try {
        const res = await this.$apiGet(`/role-permissions/${this.role.id}`);
        this.permissions = res.permissions || [];
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
