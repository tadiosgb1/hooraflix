<template>
  <div class="min-h-screen bg-slate-900 text-white overflow-hidden">
    <!-- Background Video -->
    <video autoplay muted loop playsinline class="absolute w-full h-full object-cover opacity-85">
      <source src="https://cdn.coverr.co/videos/coverr-watching-a-movie-while-eating-popcorn-5406/1080p.mp4" />
    </video>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-indigo-950/55 to-slate-900/55"></div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-3">
      <div class="w-full max-w-md">
        <!-- Login Card -->
        <div class="bg-slate-900/95 text-white backdrop-blur-xl border border-indigo-300/20 rounded-none p-6 shadow-2xl shadow-black/50">
          <div class="text-center mb-4"><div class="text-2xl font-black tracking-tight">Alpha<span class="text-red-400">flix</span></div></div><h2 class="text-xl font-bold text-center mb-1">Sign in to your account</h2>
          

          <!-- Error Alert -->
          <div v-if="error" class="mb-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-300 text-sm flex items-center">
              {{ error }}
            </p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="login" class="space-y-2.5">
            <!-- Email Input -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-slate-200">Email Address</label>
              <input
                type="email"
                v-model="form.email"
                required
                placeholder="you@example.com"
                class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-red-600 transition"
              />
            </div>

            <!-- Password Input -->
            <div>
              <label class="block text-sm font-semibold mb-2 text-slate-200">Password</label>
              <input
                type="password"
                v-model="form.password"
                required
                placeholder="••••••••"
                class="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-red-600 transition"
              />
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" v-model="rememberMe" class="w-4 h-4 rounded" />
                <span class="text-slate-300">Remember me</span>
              </label>
                </div>

            <!-- Login Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <span v-if="!loading">Sign In</span>
              <span v-else class="flex items-center space-x-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing in...</span>
              </span>
            </button>
          </form>

          <!-- Google Sign In -->
          <div class="mt-4 mb-4">
            <button class="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-lg transition">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <!-- Sign Up Link -->
          <p class="text-center text-slate-300">
            Don't have an account?
            <a href="/#pricing" class="text-red-500 hover:text-red-400 font-semibold transition cursor-pointer">
              Sign up
            </a>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      rememberMe: false,
      error: "",
      loading: false,
    };
  },
  methods: {
    async login() {
      this.error = "";
      this.loading = true;

      try {
        const response = await this.$apiPost("/users/login", this.form);

        const data = response.data;

        // Save token and user info
        localStorage.setItem("access", data.access_token);
        localStorage.setItem("permissions", JSON.stringify(data.user.permissions));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", `${data.user.first_name} ${data.user.last_name}`);

        const roleNames = (data.user.roles || []).map(r => r.name.toLowerCase());
        localStorage.setItem("roles", JSON.stringify(roleNames));

        if (this.rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("rememberedEmail", this.form.email);
        }

        // Redirect based on role — viewer → home, everyone else → dashboard
        if (roleNames.includes("viewer") && !roleNames.includes("creator") && !roleNames.includes("admin")) {
          this.$router.push("/dashboard/first-dash");
        } else {
          this.$router.push("/dashboard/first-dash");
        }

      } catch (err) {
        this.error =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    }
  },

  mounted() {
    // Check if user wants to be remembered
    if (localStorage.getItem("rememberMe") === "true") {
      this.form.email = localStorage.getItem("rememberedEmail") || "";
      this.rememberMe = true;
    }
  }
};
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
</style>
