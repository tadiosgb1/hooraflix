<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-lg">
      
      <h2 class="text-2xl font-bold text-white text-center mb-6">
        Login
      </h2>

      <form @submit.prevent="login" class="space-y-4">
        
        <!-- Email -->
        <input
          type="email"
          v-model="form.email"
          required
          placeholder="Email"
          class="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        />

        <!-- Password -->
        <input
          type="password"
          v-model="form.password"
          required
          placeholder="Password"
          class="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        />

        <!-- Error -->
        <p v-if="error" class="text-red-400 text-sm">
          {{ error }}
        </p>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
          :disabled="loading"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleLogin",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
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

        localStorage.setItem("access", response.data.access_token);

        this.$router.push("/dashboard");
      } catch (err) {
        this.error =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Login failed";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>