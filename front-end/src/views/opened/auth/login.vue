<template>
  <div class="min-h-screen flex bg-[#050505] font-sans">
    <div class="hidden lg:flex lg:w-7/12 bg-[#080808] flex-col justify-between p-16 relative overflow-hidden border-r border-white/5">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>

      <div class="relative z-10">
        <div class="flex items-center gap-4 mb-16">
          <div class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <i class="fas fa-play text-white text-xl"></i>
          </div>
          <span class="text-white font-black text-3xl tracking-tighter uppercase italic">Hoora<span class="text-primary">Flix</span></span>
        </div>

        <div class="space-y-6">
          <h1 class="text-6xl font-black text-white leading-tight uppercase italic">
            The Stage for <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Digital Talent.</span> <br/>
            Amplified.
          </h1>
          <p class="text-white/40 text-xl max-w-xl leading-relaxed font-medium">
            Access Ethiopia's premier streaming and talent ecosystem. 
            Manage your content, track your network earnings, and 
            <span class="text-secondary font-bold italic">monetize your craft</span>.
          </p>
        </div>
      </div>

      <div class="relative z-10 grid grid-cols-2 gap-8">
        <div class="flex flex-col gap-2">
          <div class="h-1 w-12 bg-secondary rounded-full"></div>
          <h3 class="text-white font-bold uppercase tracking-widest text-xs italic">Creator Economy</h3>
          <p class="text-white/30 text-sm">Automated MLM referral & wallet payouts.</p>
        </div>
        <div class="flex flex-col gap-2">
          <div class="h-1 w-12 bg-primary rounded-full"></div>
          <h3 class="text-white font-bold uppercase tracking-widest text-xs italic">Global Delivery</h3>
          <p class="text-white/30 text-sm">4K HLS streaming & adaptive bitrate.</p>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-5/12 flex items-center justify-center p-8">
      <Toast ref="toast" />
      
      <div class="w-full max-w-md">
        <div class="lg:hidden flex flex-col items-center mb-10 text-center">
          <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4 text-white shadow-xl shadow-primary/20">
             <i class="fas fa-film"></i>
          </div>
          <h2 class="text-3xl font-black text-white tracking-tighter uppercase italic">HooraFlix</h2>
        </div>

        <div class="bg-[#0c0c0c] rounded-[3.5rem] shadow-2xl p-10 md:p-12 border border-white/5 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-secondary"></div>

          <div class="mb-10">
            <h2 class="text-3xl font-black text-white italic uppercase tracking-tighter">Creator Login</h2>
            <div class="flex items-center gap-2 mt-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p class="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Platform Gateway: Operational</p>
            </div>
          </div>

          <form @submit.prevent="login" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Creator Email</label>
              <div class="relative group">
                <i class="fas fa-at absolute left-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors"></i>
                <input
                  type="email"
                  v-model="form.email"
                  required
                  placeholder="your@email.com"
                  class="w-full pl-14 pr-4 py-5 bg-white/5 border-2 border-transparent rounded-2xl focus:bg-white/10 focus:border-primary/50 outline-none transition-all text-sm font-bold text-white placeholder:text-white/10"
                />
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-end px-1">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Access Token</label>
                <a @click="$emit('close')" href="/forgot-password" class="text-[10px] font-black uppercase text-secondary hover:text-white transition-colors">Lost?</a>
              </div>
              <div class="relative group">
                <i class="fas fa-key absolute left-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  required
                  placeholder="••••••••"
                  class="w-full pl-14 pr-12 py-5 bg-white/5 border-2 border-transparent rounded-2xl focus:bg-white/10 focus:border-primary/50 outline-none transition-all text-sm font-bold text-white placeholder:text-white/10"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
                </button>
              </div>
            </div>

            <transition name="error-shake">
              <div v-if="error" class="flex items-center gap-3 text-red-400 bg-red-400/5 p-4 rounded-2xl border border-red-400/20">
                <i class="fas fa-exclamation-circle text-sm"></i>
                <p class="text-[10px] font-black uppercase leading-none">{{ error }}</p>
              </div>
            </transition>

            <button
              type="submit"
              class="w-full bg-primary hover:bg-white hover:text-primary text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
              :disabled="loading"
            >
              <template v-if="!loading">
                Initialize Session <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </template>
              <template v-else>
                <div class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Verifying Identity...
              </template>
            </button>
          </form>

          <div class="mt-12 text-center pt-6 border-t border-white/5">
            <p class="text-[10px] font-black text-white/20 uppercase tracking-widest">
              New Content Partner? 
              <router-link :to="{ path: '/registerrrr'}" class="text-secondary hover:text-white ml-1 transition-colors">
                Apply for Onboarding
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "../../../components/Toast.vue";

export default {
  name: "LoginHooraFlix",
  components: { Toast },
  data() {
    return {
      form: { email: "", password: "" },
      error: "",
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    async login() {
      this.error = "";
      this.loading = true;
      try {
        const response = await this.$apiPost("/users/login", this.form);

        console.log("response",response);

      //  localStorage.setItem("refresh", response.refreshToken);
        localStorage.setItem("access", response.data.access_token);

        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("name", response.data.user.first_name);
       // localStorage.setItem("roles", response.roles);
        //localStorage.setItem("permissions", response.permissions);
        
        this.$refs.toast?.showSuccessToastMessage("Creator Session Authorized.");
    
        setTimeout(() => {
          this.$router.push({ path: "/dashboard" });
        }, 1200);
      } catch (err) {
        this.error = err.response?.data?.detail || err.response?.data?.message || "Authentication Failed.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.bg-primary { background-color: #3d5afe; }
.text-primary { color: #3d5afe; }
.bg-secondary { background-color: #FF6B00; }
.text-secondary { color: #FF6B00; }

.error-shake-enter-active {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

/* Custom Scrollbar for the dark theme */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #050505; }
::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
</style>