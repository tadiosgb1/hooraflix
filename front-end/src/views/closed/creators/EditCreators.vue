<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-sm p-6 text-sm max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-white">Edit Creator</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-red-500 transition text-xl leading-none">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- User search + select -->
        <div>
          <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">User</label>
          <!-- Show current user if already set -->
          <p v-if="currentUserLabel && !changingUser" class="text-white text-xs mb-1 px-1">
            Current: <span class="text-gray-300">{{ currentUserLabel }}</span>
            <button type="button" @click="changingUser = true" class="ml-2 text-red-400 hover:text-red-300 text-xs underline">Change</button>
          </p>
          <template v-if="!currentUserLabel || changingUser">
            <input
              v-model="userSearch"
              @input="searchUsers"
              type="text"
              placeholder="Search by name or email..."
              class="field-input mb-1"
            />
            <div v-if="loadingUsers" class="text-gray-500 text-xs py-1">Searching...</div>
            <select v-if="users.length" v-model="form.user_id" class="field-input">
              <option value="" disabled>Select user</option>
              <option v-for="u in users" :key="u.id" :value="u.id">
                {{ u.first_name }} {{ u.last_name }} — {{ u.email }}
              </option>
            </select>
            <p v-if="!loadingUsers && userSearch && !users.length" class="text-gray-600 text-xs italic">No users found.</p>
          </template>
        </div>

        <div>
          <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Stage Name</label>
          <input v-model="form.stage_name" type="text" required placeholder="e.g. DJ Nova" class="field-input" />
        </div>
        <div>
          <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Bio</label>
          <textarea v-model="form.bio" rows="3" placeholder="Short bio..." class="field-input resize-none"></textarea>
        </div>
        <div>
          <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Profile Image URL</label>
          <input v-model="form.profile_image_url" type="text" placeholder="https://..." class="field-input" />
        </div>
        <div>
          <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Cover Image URL</label>
          <input v-model="form.cover_image_url" type="text" placeholder="https://..." class="field-input" />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition">Cancel</button>
          <button type="submit" :disabled="submitting" class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg font-medium transition shadow-md">
            {{ submitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.field-input { @apply border border-gray-600 bg-gray-900/50 rounded-lg px-3 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition; }
</style>

<script>
export default {
  props: { data: Object },
  data() {
    return {
      submitting: false,
      loadingUsers: false,
      changingUser: false,
      userSearch: '',
      users: [],
      searchTimeout: null,
      currentUserLabel: this.data?.user
        ? `${this.data.user.first_name || ''} ${this.data.user.last_name || ''}`.trim() || `User #${this.data.user_id}`
        : (this.data?.user_id ? `User #${this.data.user_id}` : ''),
      form: {
        user_id:           this.data?.user_id           || null,
        stage_name:        this.data?.stage_name        || '',
        bio:               this.data?.bio               || '',
        profile_image_url: this.data?.profile_image_url || '',
        cover_image_url:   this.data?.cover_image_url   || '',
      },
    };
  },
  methods: {
    searchUsers() {
      clearTimeout(this.searchTimeout);
      if (!this.userSearch.trim()) { this.users = []; return; }
      this.searchTimeout = setTimeout(async () => {
        this.loadingUsers = true;
        try {
          const res = await this.$apiGet('/users', { search: this.userSearch, page_size: 20 });
          this.users = res?.data || [];
        } catch(e) { console.error(e); }
        finally { this.loadingUsers = false; }
      }, 300);
    },
    async submitForm() {
      this.submitting = true;
      try {
        const payload = {
          ...this.form,
          user_id: Number(this.form.user_id),
        };
        const res = await this.$apiPut('/creators', this.data.id, payload);
        if (res) this.$root.$refs.toast.showToast('Updated successfully', 'success');
        this.$emit('saved');
        this.$emit('close');
      } catch(e) { console.error(e); }
      finally { this.submitting = false; }
    },
  },
};
</script>
