<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-black/90 border border-red-600/20 rounded-2xl w-full max-w-md max-h-[90vh] shadow-2xl flex flex-col">
      
      <!-- Header (Sticky) -->
      <div class="bg-gradient-to-r from-red-900/20 to-black border-b border-red-600/20 p-6 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 class="text-2xl font-bold text-white">Create Account</h2>
          <p class="text-gray-400 text-sm mt-1">
            <span class="font-semibold text-red-500">{{ selectedRole.toUpperCase() }}</span> Plan
          </p>
        </div>
        <button 
          @click="closeModal" 
          class="text-gray-400 hover:text-white transition text-2xl flex-shrink-0 ml-4"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <!-- Content (Scrollable) -->
      <div class="overflow-y-auto flex-1 p-8 custom-scrollbar">
        <!-- Error Alert -->
        <div v-if="error" class="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p class="text-red-300 text-sm flex items-center">
            <span class="mr-2">⚠️</span>
            {{ error }}
          </p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="register" class="space-y-4">
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
            <p class="text-xs text-gray-500 mt-2">At least 8 characters</p>
          </div>

          <!-- Terms & Conditions -->
          <label class="flex items-start space-x-3 cursor-pointer pt-2">
            <input type="checkbox" v-model="agreeToTerms" required class="w-4 h-4 mt-1 rounded flex-shrink-0" />
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
            class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2 mt-6"
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
        <div class="my-4 flex items-center">
          <div class="flex-1 border-t border-gray-700"></div>
          <span class="px-3 text-gray-500 text-sm">or</span>
          <div class="flex-1 border-t border-gray-700"></div>
        </div>

        <!-- Change Plan -->
        <button
          @click="changePlan"
          class="w-full border border-gray-700 hover:border-gray-600 text-white font-semibold py-2 rounded-lg transition duration-200 text-sm"
        >
          ← Change Plan
        </button>

        <!-- Login Link -->
        <p class="text-center text-gray-400 text-sm mt-4">
          Already have an account?
          <router-link to="/login" class="text-red-500 hover:text-red-400 font-semibold transition">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    selectedRole: {
      type: String,
      default: "viewer"
    }
  },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: ""
      },
      agreeToTerms: false,
      error: "",
      loading: false
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
      } else {
        // Restore body scroll when modal is closed
        document.body.style.overflow = 'auto';
      }
    }
  },
  methods: {
    async register() {
      this.error = "";

      // Validation
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

        this.$emit("registered", response.data);

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

    closeModal() {
      this.$emit("close");
      this.resetForm();
    },

    changePlan() {
      this.$emit("close");
      this.resetForm();
    },

    resetForm() {
      this.form = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: ""
      };
      this.agreeToTerms = false;
      this.error = "";
    }
  },
  beforeUnmount() {
    // Restore body scroll when component is destroyed
    document.body.style.overflow = 'auto';
  }
};
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

/* Custom scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(220, 38, 38, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(220, 38, 38, 0.5);
}

/* Firefox scrollbar */
.custom-scrollbar {
  scrollbar-color: rgba(220, 38, 38, 0.3) rgba(0, 0, 0, 0.1);
  scrollbar-width: thin;
}
</style>
