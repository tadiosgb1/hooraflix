<template>
  <div class="min-h-screen bg-black text-white overflow-hidden">
    <!-- Background Video -->
    <video autoplay muted loop playsinline class="absolute w-full h-full object-cover">
      <source src="https://cdn.coverr.co/videos/coverr-watching-a-movie-while-eating-popcorn-5406/1080p.mp4" />
    </video>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-red-600 mb-2">🎬 HooraFlix</h1>
          <p class="text-gray-400">Stream. Create. Train. Earn.</p>
        </div>

        <!-- Registration Card -->
        <div class="bg-black/80 backdrop-blur-md border border-red-600/20 rounded-2xl p-8 shadow-2xl">
          <h2 class="text-3xl font-bold text-center mb-2">Create Your Account</h2>
          <p class="text-gray-400 text-center mb-2">
            <span class="font-semibold text-red-500">{{ selectedRole.toUpperCase() }}</span> Plan
          </p>
          <p class="text-gray-500 text-center text-sm mb-8">{{ selectedRole === 'viewer' ? 'Free - Pay-per-view' : selectedRole === 'creator' ? '$19.99/month' : '$29.99/month' }}</p>

          <!-- Error Alert -->
          <div v-if="error" class="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-300 text-sm flex items-center">
              <span class="mr-2">⚠️</span>
              {{ error }}
            </p>
          </div>

          <!-- Registration Form -->
          <form @submit.prevent="register" class="space-y-5">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-300">First Name</label>
              <input
                type="text"
                v-model="form.first_name"
                required
                placeholder="John"
                class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-300">Last Name</label>
              <input
                type="text"
                v-model="form.last_name"
                required
                placeholder="Doe"
                class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-300">Email Address</label>
              <input
                type="email"
                v-model="form.email"
                required
                placeholder="you@example.com"
                class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-300">Phone Number</label>
              <input
                type="tel"
                v-model="form.phone_number"
                required
                placeholder="+1 (555) 000-0000"
                class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-300">Password</label>
              <input
                type="password"
                v-model="form.password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
              <p class="text-xs text-gray-500 mt-2">At least 8 characters with uppercase, lowercase, and numbers</p>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-gray-300">Confirm Password</label>
              <input
                type="password"
                v-model="confirmPassword"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
            </div>

            <!-- Terms & Conditions -->
            <label class="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" v-model="agreeToTerms" required class="w-4 h-4 mt-1 rounded" />
              <span class="text-sm text-gray-400">
                I agree to the
                <a href="#" class="text-red-500 hover:text-red-400">Terms of Service</a>
                and
                <a href="#" class="text-red-500 hover:text-red-400">Privacy Policy</a>
              </span>
            </label>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading || !agreeToTerms"
              class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <span v-if="!loading">Create Account</span>
              <span v-else class="flex items-center space-x-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating...</span>
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-700"></div>
            <span class="px-3 text-gray-500 text-sm">or</span>
            <div class="flex-1 border-t border-gray-700"></div>
          </div>

          <!-- Back to Pricing -->
          <button
            @click="goBackToPricing"
            class="w-full border border-gray-700 hover:border-gray-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            ← Change Plan
          </button>

          <!-- Login Link -->
          <p class="text-center text-gray-400 mt-6">
            Already have an account?
            <router-link to="/login" class="text-red-500 hover:text-red-400 font-semibold transition">
              Sign in
            </router-link>
          </p>
        </div>

        <!-- Footer Links -->
        <div class="mt-8 text-center text-sm text-gray-500">
          <p>
            <a href="#" class="hover:text-gray-400 transition">Terms of Service</a>
            <span class="mx-2">•</span>
            <a href="#" class="hover:text-gray-400 transition">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: ""
      },
      confirmPassword: "",
      agreeToTerms: false,
      error: "",
      loading: false,
      selectedRole: this.$route.query.role || "viewer"
    };
  },
  methods: {
    async register() {
      this.error = "";

      // Validation
      if (this.form.password !== this.confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }

      if (this.form.password.length < 8) {
        this.error = "Password must be at least 8 characters";
        return;
      }

      if (!this.agreeToTerms) {
        this.error = "You must agree to the terms and conditions";
        return;
      }

      this.loading = true;

      try {
        const payload = {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          email: this.form.email,
          phone_number: this.form.phone_number,
          password: this.form.password,
          role: this.selectedRole
        };

        const response = await this.$apiPost("/users/register", payload);

        console.log("Registration successful:", response.data);

        // Save token if provided
        if (response.data.access_token) {
          localStorage.setItem("access", response.data.access_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("permissions", JSON.stringify(response.data.user.permissions || []));
        }

        // Redirect after successful registration
        setTimeout(() => {
          this.$router.push("/dashboard/first-dash");
        }, 1000);

      } catch (err) {
        this.error =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Registration failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    goBackToPricing() {
      this.$router.push("/#pricing");
    }
  }
};
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
</style>
