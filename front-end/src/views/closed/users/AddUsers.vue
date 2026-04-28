<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl w-full max-w-md border border-red-600/30 max-h-[92vh] flex flex-col">

      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-red-600/30 shrink-0">
        <h2 class="text-base font-semibold text-white">Add User</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-red-500 transition text-xl leading-none">&times;</button>
      </div>

      <!-- Scrollable body -->
      <div class="overflow-y-auto flex-1 px-6 py-5">
        <form @submit.prevent="submitForm" class="space-y-4" id="add-user-form">

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">First Name</label>
              <input v-model="form.first_name" type="text" required placeholder="Jane" class="input-field" />
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Last Name</label>
              <input v-model="form.last_name" type="text" required placeholder="Doe" class="input-field" />
            </div>
          </div>

          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Email</label>
            <input v-model="form.email" type="email" required placeholder="jane@example.com" class="input-field" />
          </div>

          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Phone Number</label>
            <input v-model="form.phone_number" type="tel" required placeholder="+1234567890" class="input-field" />
          </div>

          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Password</label>
            <input v-model="form.password" type="password" required placeholder="••••••••" class="input-field" />
          </div>

          <!-- Role -->
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Role</label>
            <div v-if="loadingRoles" class="text-gray-500 text-xs py-2">Loading roles...</div>
            <select v-else v-model="selectedRoleId" required class="input-field">
              <option value="" disabled>Select a role</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
            </select>
          </div>

        </form>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-800 shrink-0">
        <button type="button" @click="$emit('close')"
          class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 text-sm transition">
          Cancel
        </button>
        <button type="submit" form="add-user-form" :disabled="submitting"
          class="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg font-medium text-sm transition shadow-md">
          {{ submitting ? 'Saving...' : 'Add User' }}
        </button>
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
export default {
  props: { data: Object },

  data() {
    return {
      submitting: false,
      loadingRoles: false,
      roles: [],
      selectedRoleId: '',
      form: {
        first_name:   this.data?.first_name   || '',
        last_name:    this.data?.last_name    || '',
        email:        this.data?.email        || '',
        phone_number: this.data?.phone_number || '',
        password:     this.data?.password     || '',
      },
    };
  },

  methods: {
    async fetchRoles() {
      this.loadingRoles = true;
      const params={
        page_size: 200
      }
      try {
        const res = await this.$apiGet('/roles', params);
        this.roles = res.data || res || [];
      } catch (e) { console.error(e); }
      finally { this.loadingRoles = false; }
    },

    async submitForm() {
      this.submitting = true;
      try {
        // Step 1 — register user
        const res = await this.$apiPost('/users', this.form);
        const userId = res?.data?.id || res?.data?.data?.id;

        if (!userId) throw new Error('User ID not found in response');

        // Step 2 — assign role
        if (this.selectedRoleId) {
          await this.$apiPost('/user-roles', {
            user_id: userId,
            role_id: this.selectedRoleId,
          });
        }

        this.$root.$refs.toast.showToast('User added and role assigned successfully', 'success');
        this.$emit('saved');
        this.$emit('close');
      } catch (e) {
        console.error(e);
        this.$root.$refs.toast.showToast('Something went wrong. Please try again.', 'error');
      } finally {
        this.submitting = false;
      }
    },
  },

  mounted() {
    this.fetchRoles();
  },
};
</script>
