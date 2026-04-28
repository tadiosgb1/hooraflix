<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl w-full max-w-md border border-red-600/30 max-h-[92vh] flex flex-col">

      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-red-600/30 shrink-0">
        <h2 class="text-base font-semibold text-white">Add User Subscription</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-red-500 transition duration-150 text-xl leading-none">&times;</button>
      </div>

      <!-- Scrollable body -->
      <div class="overflow-y-auto flex-1 px-6 py-5">
        <form @submit.prevent="submitForm" class="space-y-5" id="user-sub-form">

          <!-- User searchable dropdown -->
          <div class="relative" ref="userDropdown">
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">User</label>
            <div class="relative">
              <input
                v-model="userSearch"
                type="text"
                placeholder="Search user by name or email..."
                class="input-field pr-8"
                @focus="showUserDropdown = true"
                @input="showUserDropdown = true"
                autocomplete="off"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">▾</span>
            </div>
            <div v-if="showUserDropdown && filteredUsers.length > 0"
              class="absolute z-20 mt-1 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl max-h-48 overflow-y-auto">
              <button v-for="u in filteredUsers" :key="u.id" type="button"
                @click="selectUser(u)"
                class="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-red-600/20 hover:text-white transition duration-100 flex flex-col">
                <span class="font-medium">{{ u.full_name || u.name }}</span>
                <span class="text-xs text-gray-500">{{ u.email }}</span>
              </button>
            </div>
            <div v-if="showUserDropdown && userSearch && filteredUsers.length === 0"
              class="absolute z-20 mt-1 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl px-4 py-3 text-sm text-gray-500">
              No users found
            </div>
            <p v-if="form.user_id" class="mt-1 text-xs text-green-500">
              ✓ Selected: {{ selectedUserLabel }}
            </p>
            <div v-if="loadingUsers" class="mt-1 text-xs text-gray-500">Loading users...</div>
          </div>

          <!-- Subscription Plan searchable dropdown -->
          <div class="relative" ref="planDropdown">
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Subscription Plan</label>
            <div class="relative">
              <input
                v-model="planSearch"
                type="text"
                placeholder="Search plan by name..."
                class="input-field pr-8"
                @focus="showPlanDropdown = true"
                @input="showPlanDropdown = true"
                autocomplete="off"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">▾</span>
            </div>
            <div v-if="showPlanDropdown && filteredPlans.length > 0"
              class="absolute z-20 mt-1 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl max-h-48 overflow-y-auto">
              <button v-for="p in filteredPlans" :key="p.id" type="button"
                @click="selectPlan(p)"
                class="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-red-600/20 hover:text-white transition duration-100 flex flex-col">
                <span class="font-medium">{{ p.name }}</span>
                <span class="text-xs text-gray-500">${{ p.price }} · {{ p.duration_days }}d</span>
              </button>
            </div>
            <div v-if="showPlanDropdown && planSearch && filteredPlans.length === 0"
              class="absolute z-20 mt-1 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl px-4 py-3 text-sm text-gray-500">
              No plans found
            </div>
            <p v-if="form.plan_id" class="mt-1 text-xs text-green-500">
              ✓ Selected: {{ selectedPlanLabel }}
            </p>
            <div v-if="loadingPlans" class="mt-1 text-xs text-gray-500">Loading plans...</div>
          </div>

          <!-- Starts At / Ends At -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Starts At</label>
              <input v-model="form.starts_at" type="date" required class="input-field" />
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Ends At</label>
              <input v-model="form.ends_at" type="date" required class="input-field" />
            </div>
          </div>

          <!-- Auto Renew (boolean toggle) -->
          <div class="flex items-center justify-between bg-gray-900/40 border border-gray-700/60 rounded-xl px-4 py-3">
            <div>
              <p class="text-sm font-medium text-gray-200">Auto Renew</p>
              <p class="text-xs text-gray-500 mt-0.5">Automatically renew when the subscription expires</p>
            </div>
            <button type="button" @click="form.auto_renew = !form.auto_renew"
              :class="['relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none',
                form.auto_renew ? 'bg-red-600' : 'bg-gray-700']">
              <span :class="['pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200',
                form.auto_renew ? 'translate-x-5' : 'translate-x-0']" />
            </button>
          </div>

        </form>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-800 shrink-0">
        <button type="button" @click="$emit('close')"
          class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 text-sm transition duration-150">
          Cancel
        </button>
        <button type="submit" form="user-sub-form" :disabled="submitting || !form.user_id || !form.plan_id"
          class="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg font-medium text-sm transition duration-150 shadow-md">
          {{ submitting ? 'Saving...' : 'Add Subscription' }}
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
      loadingUsers: false,
      loadingPlans: false,

      users: [],
      plans: [],

      userSearch: '',
      planSearch: '',
      showUserDropdown: false,
      showPlanDropdown: false,

      selectedUserLabel: '',
      selectedPlanLabel: '',

      form: {
        user_id:    this.data?.user_id    || null,
        plan_id:    this.data?.plan_id    || null,
        starts_at:  this.data?.starts_at  || '',
        ends_at:    this.data?.ends_at    || '',
        auto_renew: this.data?.auto_renew ?? false,
      },
    };
  },

  computed: {
    filteredUsers() {
      const q = this.userSearch.toLowerCase();
      if (!q) return this.users.slice(0, 50);
      return this.users.filter(u =>
        (u.full_name || u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      ).slice(0, 50);
    },
    filteredPlans() {
      const q = this.planSearch.toLowerCase();
      if (!q) return this.plans.slice(0, 50);
      return this.plans.filter(p =>
        (p.name || '').toLowerCase().includes(q)
      ).slice(0, 50);
    },
  },

  methods: {
    selectUser(u) {
      this.form.user_id = u.id;
      this.selectedUserLabel = `${u.full_name || u.name} (${u.email})`;
      this.userSearch = u.full_name || u.name || u.email;
      this.showUserDropdown = false;
    },
    selectPlan(p) {
      this.form.plan_id = p.id;
      this.selectedPlanLabel = `${p.name} — $${p.price}`;
      this.planSearch = p.name;
      this.showPlanDropdown = false;
    },

    handleOutsideClick(e) {
      if (this.$refs.userDropdown && !this.$refs.userDropdown.contains(e.target)) {
        this.showUserDropdown = false;
      }
      if (this.$refs.planDropdown && !this.$refs.planDropdown.contains(e.target)) {
        this.showPlanDropdown = false;
      }
    },

    async fetchUsers() {
      this.loadingUsers = true;
      const params={
        page_size: 200 
      }
      try {
        const res = await this.$apiGet('/users', params);
        this.users = res.data || res || [];
      } catch (e) { console.error(e); }
      finally { this.loadingUsers = false; }
    },

    async fetchPlans() {
      this.loadingPlans = true;
      const params={
        page_size: 200 
      }
      try {
        const res = await this.$apiGet('/subscription-plans',params);
        this.plans = res.data || res || [];
      } catch (e) { console.error(e); }
      finally { this.loadingPlans = false; }
    },

    async submitForm() {
      this.submitting = true;
      try {
        const res = await this.$apiPost('/user-subscriptions', this.form);
        if (res) {
          this.$root.$refs.toast.showToast('Added successfully', 'success');
          this.$emit('saved');
          this.$emit('close');
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
  },

  mounted() {
    this.fetchUsers();
    this.fetchPlans();
    document.addEventListener('click', this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
};
</script>
