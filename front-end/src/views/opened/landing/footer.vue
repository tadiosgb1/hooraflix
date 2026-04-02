<template>
  <footer class="relative bg-[#080808] text-white pt-20 pb-10 px-6 overflow-hidden border-t border-white/5">
    
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 relative z-10">
      
      <div class="md:col-span-2 space-y-6">
        <div class="flex items-center space-x-3">
           <div class="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(61,90,254,0.3)]">
             <i class="fas fa-play text-white text-sm"></i>
           </div>
           <span class="text-2xl font-black tracking-tighter uppercase italic">Hoora<span class="text-primary">Flix</span></span>
        </div>
        
        <p class="text-white/60 text-sm leading-relaxed max-w-sm font-medium">
          The ultimate digital ecosystem for African talent. We combine world-class streaming with a powerful creator economy to empower actors, models, and filmmakers across the continent.
        </p>

        <div class="flex space-x-5 mt-6">
          <a v-for="social in socials" :key="social.name" href="#" 
             class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 group border border-white/10">
            <i :class="[social.class, 'text-lg group-hover:text-white transition-colors']"></i>
          </a>
        </div>
      </div>

      <div v-for="group in navGroups" :key="group.title">
        <h3 class="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">{{ group.title }}</h3>
        <ul class="space-y-4">
          <li v-for="link in group.links" :key="link.name">
            <a :href="link.url" class="text-sm text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
              {{ link.name }}
            </a>
          </li>
        </ul>
      </div>

    </div>

    <div class="mt-20 border-t border-white/5 pt-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
      <div class="text-[10px] font-bold text-white/30 uppercase tracking-widest">
        © 2026 HOORAFLIX. Powered by <span class="text-white/50">Ant Technology PLC</span>, Addis Ababa.
      </div>
      
      <div class="flex gap-8 mt-6 md:mt-0 text-[10px] font-black uppercase tracking-widest">
        <a href="#" class="text-white/30 hover:text-primary transition-colors">Creator Terms</a>
        <a href="#" class="text-white/30 hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" class="text-white/30 hover:text-primary transition-colors">KYC Compliance</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { name: 'Instagram', class: 'fab fa-instagram' },
  { name: 'TikTok', class: 'fab fa-tiktok' },
  { name: 'Telegram', class: 'fab fa-telegram-plane' },
  { name: 'YouTube', class: 'fab fa-youtube' }
];

const navGroups = [
  {
    title: 'Entertainment',
    links: [
      { name: 'Movies & Series', url: '#' },
      { name: 'Live Stream Events', url: '#' },
      { name: 'Training Hub', url: '#' },
      { name: 'Premium Plans', url: '#' }
    ]
  },
  {
    title: 'Talent Portal',
    links: [
      { name: 'Creator Onboarding', url: '#' },
      { name: 'Monetization Models', url: '#' },
      { name: 'Rank Management', url: '#' },
      { name: 'Referral Network', url: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Ant Tech', url: '#' },
      { name: 'Ad Placement', url: '#' },
      { name: 'Support Center', url: '#' },
      { name: 'Admin Login', url: '#' }
    ]
  }
];
</script>

<style scoped>
/* Preserving the grain effect but making it subtler for a dark mode cinematic look */
footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
}
</style>