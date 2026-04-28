<template>
  <div class="min-h-screen bg-black text-white overflow-hidden">
    <video autoplay muted loop playsinline class="absolute w-full h-full object-cover opacity-40">
      <source src="https://cdn.coverr.co/videos/coverr-watching-a-movie-while-eating-popcorn-5406/1080p.mp4" />
    </video>
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">

        <!-- Logo -->
        <div class="text-center mb-10">
          <router-link to="/"><h1 class="text-5xl font-bold text-red-600 mb-2">🎬 HooraFlix</h1></router-link>
          <p class="text-gray-400">Stream. Create. Train. Earn.</p>
        </div>

        <!-- Card -->
        <div class="bg-black/80 backdrop-blur-md border border-red-600/20 rounded-2xl p-8 shadow-2xl">

          <!-- Title changes based on type -->
          <h2 class="text-2xl font-bold text-center mb-1">
            {{ isCreator ? '🎥 Join as Creator' : '🎬 Start Watching' }}
          </h2>
          <p class="text-gray-400 text-center text-sm mb-7">
            {{ isCreator ? 'Upload content and earn through revenue sharing' : 'Create your free viewer account' }}
          </p>

          <!-- Error -->
          <div v-if="error" class="mb-5 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-300 text-sm">⚠️ {{ error }}</p>
          </div>

          <form @submit.prevent="register" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold mb-1 text-gray-400 uppercase tracking-wide">First Name</label>
                <input v-model="form.first_name" type="text" required placeholder="Jane" class="field" />
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-gray-400 uppercase tracking-wide">Last Name</label>
                <input v-model="form.last_name" type="text" required placeholder="Doe" class="field" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold mb-1 text-gray-400 uppercase tracking-wide">Email</label>
              <input v-model="form.email" type="email" required placeholder="you@example.com" class="field" />
            </div>

            <div>
              <label class="block text-xs font-semibold mb-1 text-gray-400 uppercase tracking-wide">Phone Number</label>
              <input v-model="form.phone_number" type="tel" required placeholder="+1234567890" class="field" />
            </div>

            <div>
              <label class="block text-xs font-semibold mb-1 text-gray-400 uppercase tracking-wide">Password</label>
              <input v-model="form.password" type="password" required placeholder="••••••••" class="field" />
            </div>

            <div>
              <label class="block text-xs font-semibold mb-1 text-gray-400 uppercase tracking-wide">Confirm Password</label>
              <input v-model="confirmPassword" type="password" required placeholder="••••••••" class="field" />
            </div>

            <button type="submit" :disabled="loading"
              class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition flex items-center justify-center mt-2">
              <span v-if="!loading">Create Account</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Creating...
              </span>
            </button>
          </form>

          <!-- Switch type -->
          <div class="mt-5 text-center text-sm text-gray-500">
            <span v-if="isCreator">
              Just want to watch?
              <router-link to="/register" class="text-red-400 hover:text-red-300 font-semibold">Sign up as Viewer</router-link>
            </span>
            <span v-else>
              Want to upload content?
              <router-link to="/register?type=creator" class="text-red-400 hover:text-red-300 font-semibold">Join as Creator</router-link>
            </span>
          </div>

          <p class="text-center text-gray-400 text-sm mt-3">
            Already have an account?
            <router-link to="/login" class="text-red-500 hover:text-red-400 font-semibold">Sign In</router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.field {
  @apply w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white
         placeholder-gray-500 text-sm focus:outline-none focus:border-red-600 transition;
}
input:focus { box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1); }
</style>

<script>
export default {
  name: "RegisterPage",

  data() {
    return {
      form: {
        first_name:   '',
        last_name:    '',
        email:        '',
        phone_number: '',
        password:     '',
      },
      confirmPassword: '',
      loading: false,
      error: '',
      roles: [],
    };
  },

  computed: {
    isCreator() {
      return this.$route.query.type === 'creator';
    },
  },

  methods: {
    async fetchRoles() {
     
      const params={
        page_size: 200 
      }

      try {
        const res = await this.$apiGet('/roles', params);
        this.roles = res.data || res || [];
      } catch (e) { console.error(e); }
    },

    getRoleId(roleName) {
      const role = this.roles.find(r => r.name?.toLowerCase() === roleName.toLowerCase());
      return role?.id || null;
    },

    async register() {
      this.error = '';

      if (this.form.password !== this.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }

      this.loading = true;
      try {
        // Step 1 — register user
        const res = await this.$apiPost('/users', this.form);
        const userId = res?.data?.id || res?.data?.data?.id;

    
        if (!userId) throw new Error('User ID not found in response');

        // Step 2 — assign role silently based on type
        const targetRole = this.isCreator ? 'creator' : 'viewer';
        const roleId = this.getRoleId(targetRole);
        const payload={
        user_id: userId, 
        role_id: roleId
        }

        if (roleId) {
          await this.$apiPost('/user-roles', payload);
        }

        this.$router.push('/login');
      } catch (err) {
        this.error =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          'Registration failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.fetchRoles();
  },
};
</script>
