<template>
  <section id="features" class="py-32 bg-[#050505] relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#3d5afe_1px,transparent_1px),linear-gradient(to_bottom,#3d5afe_1px,transparent_1px)] bg-[size:60px_60px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <div class="max-w-4xl mb-24">
        <div class="flex items-center gap-4 mb-6">
          <span class="h-[1px] w-12 bg-primary"></span>
          <span class="text-[10px] font-black tracking-[0.4em] text-primary uppercase">HooraFlix Ecosystem 2.0</span>
        </div>
        <h2 class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none italic">
          Entertainment Meets <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Career Empowerment.</span>
        </h2>
        <p class="text-white/40 text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-white/5 pl-8">
          Beyond a streaming service—HooraFlix is a digital agency that turns viewers into fans and creators into entrepreneurs through 15 specialized core modules.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
        
        <div v-for="(feature, index) in features" :key="index"
          class="group relative bg-[#080808] p-12 transition-all duration-700 hover:bg-[#0c0c0c] cursor-default"
        >
          <div class="absolute -inset-px bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0"></div>

          <div class="relative z-10">
            <div class="relative w-16 h-16 mb-10">
              <div class="absolute inset-0 bg-primary/10 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"></div>
              <div class="relative w-16 h-16 bg-[#111] shadow-xl rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2">
                <i :class="[feature.icon, 'text-2xl']"></i>
              </div>
            </div>

            <h3 class="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-white/40 text-sm leading-relaxed font-medium mb-10 h-12 overflow-hidden">
              {{ feature.description }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-10">
              <span v-for="point in feature.points" :key="point" 
                class="px-3 py-1 bg-white/5 text-[9px] font-black uppercase tracking-tighter text-white/50 rounded-md border border-white/5 group-hover:border-primary/20 group-hover:bg-white/10 transition-all">
                {{ point }}
              </span>
            </div>

            <div class="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-primary transition-all">
              <span>Explore Module</span>
              <div class="h-px w-0 bg-primary group-hover:w-8 transition-all duration-500"></div>
              <i class="fas fa-arrow-right opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 bg-white/5 border border-white/10 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden group/stats">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-0 left-1/4 w-[px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
          <div class="absolute top-0 left-2/4 w-[px] h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent"></div>
          <div class="absolute top-0 left-3/4 w-[px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
        </div>
        
        <div class="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div v-for="stat in stats" :key="stat.label" class="text-center lg:text-left">
            <div class="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">{{ stat.label }}</div>
            <div class="text-4xl lg:text-6xl font-black text-white tracking-tighter tabular-nums group-hover/stats:scale-110 transition-transform duration-700 origin-left">
              {{ stat.value }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: "Next-Gen Streaming",
          icon: "fas fa-film",
          description: "4K VOD and Live Streaming powered by HLS/DASH with global CDN delivery.",
          points: ["Module 2 & 3", "Adaptive Bitrate", "Offline Downloads"]
        },
        {
          title: "Talent Hub",
          icon: "fas fa-id-card",
          description: "Digital portfolio management for actors and models with verified KYC onboarding.",
          points: ["Module 5", "Audition Listings", "Video Portfolios"]
        },
        {
          title: "Referral Network",
          icon: "fas fa-network-wired",
          description: "Hierarchical multi-level structure for promoters to earn commissions on network growth.",
          points: ["Module 8 & 9", "Rank Management", "MLM Structure"]
        },
        {
          title: "Training Academy",
          icon: "fas fa-graduation-cap",
          description: "Comprehensive creative arts training with automated progress tracking and certification.",
          points: ["Module 7", "LMS Integration", "Creative Skills"]
        },
        {
          title: "Fin-Tech Wallet",
          icon: "fas fa-wallet",
          description: "Real-time earnings dashboard with Telebirr and international payment integrations.",
          points: ["Module 10 & 14", "Auto-Payouts", "Revenue Share"]
        },
        {
          title: "Ad Ecosystem",
          icon: "fas fa-rectangle-ad",
          description: "Sophisticated ad placement engine for AVOD tiers and sponsored live session events.",
          points: ["Module 12", "Campaign Analytics", "Brand Integration"]
        }
      ],
      stats: [
        { label: "Uptime SLA", value: "99.9%" },
        { label: "Streaming Latency", value: "<10s" },
        { label: "Talent Ranks", value: "5 Levels" },
        { label: "Payment Gateways", value: "6+" }
      ]
    };
  }
};
</script>

<style scoped>
.gap-px {
  gap: 1px;
}
.group:hover .relative.z-10 {
  transform: translateY(-5px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>