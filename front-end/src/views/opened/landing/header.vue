<template>
  <header 
    class="bg-[#050505] sticky top-0 z-[100] border-b border-white/5 shadow-2xl backdrop-blur-2xl bg-opacity-95 transition-all duration-500"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      
      <router-link to="/" class="flex items-center space-x-3 group cursor-pointer">
        <div class="h-10 w-10 sm:h-11 sm:w-11 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(61,90,254,0.4)] transform group-hover:scale-110 transition-all duration-500">
          <i class="fas fa-play text-white text-sm ml-0.5"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-black text-white tracking-tighter leading-none italic uppercase">
            Hoora<span class="text-primary">Flix</span>
          </span>
          <span class="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] leading-none mt-1 hidden sm:block">
            Talent Super Platform
          </span>
        </div>
      </router-link>

      <nav class="hidden lg:flex items-center space-x-1">
        <router-link 
          v-for="nav in navLinks" 
          :key="nav.path" 
          :to="nav.path"
          class="px-4 py-2 text-white/60 text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
          active-class="text-white bg-white/10"
        >
          {{ nav.name }}
        </router-link>
      </nav>

      <div class="hidden md:flex items-center space-x-4">
        <div class="relative group">
          <select
            v-model="selectedLang"
            class="appearance-none bg-white/5 text-white text-[10px] font-black pl-4 pr-8 py-2 rounded-xl border border-white/10 outline-none hover:bg-white/10 transition-colors cursor-pointer"
          >
            <option value="en" class="text-slate-900 font-sans">EN</option>
            <option value="am" class="text-slate-900 font-sans">AM (አማርኛ)</option>
          </select>
          <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-white/50 pointer-events-none"></i>
        </div>

        <router-link 
          to="/login"
          class="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all duration-300"
        >
          Login
        </router-link>

        <router-link 
          to="/register"
          class="px-6 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-[0_10px_20px_-5px_rgba(61,90,254,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Get Started
        </router-link>
      </div>

      <button 
        @click="mobileMenuOpen = !mobileMenuOpen" 
        class="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white text-xl transition-all"
        :class="{'rotate-90 bg-white/10': mobileMenuOpen}"
      >
        <i class="fas" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'"></i>
      </button>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="lg:hidden absolute top-full left-0 w-full bg-[#050505] border-t border-white/5 shadow-2xl p-6 space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <div class="grid grid-cols-1 gap-2">
          <router-link 
            v-for="nav in navLinks" 
            :key="nav.path" 
            :to="nav.path"
            @click="mobileMenuOpen = false"
            class="flex items-center justify-between p-4 rounded-2xl bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            {{ nav.name }}
            <i class="fas fa-chevron-right text-[10px] text-primary"></i>
          </router-link>
        </div>

        <div class="pt-4 border-t border-white/5 flex flex-col gap-3">
          <button @click="$router.push('/login')" class="w-full p-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-[0.2em]">
            Access Portal
          </button>
          <div class="flex items-center justify-center gap-6 py-4">
             <span @click="selectedLang = 'en'" :class="selectedLang === 'en' ? 'text-primary' : 'text-white/40'" class="text-[10px] font-black cursor-pointer transition-all">ENGLISH</span>
             <span class="w-px h-3 bg-white/10"></span>
             <span @click="selectedLang = 'am'" :class="selectedLang === 'am' ? 'text-primary' : 'text-white/40'" class="text-[10px] font-black cursor-pointer transition-all">አማርኛ</span>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  data() {
    return {
      mobileMenuOpen: false,
      selectedLang: 'en',
      navLinks: [
        { name: 'Browse', path: '/browse' },         // Module 2: VOD
        { name: 'Live', path: '/live' },             // Module 3: Live
        { name: 'Training', path: '/training' },     // Module 7: Hub
        { name: 'Talents', path: '/talents' },       // Module 5: Management
        { name: 'Network', path: '/network' }        // Module 8: Referral/MLM
      ]
    };
  },
  watch: {
    $route() {
      this.mobileMenuOpen = false;
    }
  }
};
</script>

<style scoped>
nav a {
  position: relative;
}
nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: theme('colors.primary'); /* Uses the primary color from tailwind */
  transition: all 0.3s ease;
  transform: translateX(-50%);
}
nav a:hover::after, nav a.router-link-active::after {
  width: 12px;
}
</style>