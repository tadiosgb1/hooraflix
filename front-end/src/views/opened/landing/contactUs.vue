<template>
  <section id="contact" class="py-32 bg-[#050505] relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-0" 
         style="background-image: linear-gradient(#3d5afe 1px, transparent 1px), linear-gradient(90deg, #3d5afe 1px, transparent 1px); background-size: 50px 50px;">
    </div>
    
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <div class="lg:col-span-5 space-y-8">
          <div>
            <span class="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-primary bg-primary/10 rounded-full uppercase border border-primary/20">
              Partner with HooraFlix
            </span>
            <h2 class="text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9] italic uppercase">
              Claim Your <br/> <span class="text-primary">Spotlight.</span>
            </h2>
            <p class="text-white/40 text-lg font-medium leading-relaxed max-w-md">
              Ready to take your creative career to the next level? Our talent agents and production team are ready to review your pitch.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div v-for="info in contactInfo" :key="info.label" 
                 class="group p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-primary hover:border-primary transition-all duration-500 flex items-center gap-6">
              <div class="w-14 h-14 rounded-2xl bg-[#0a0a0a] shadow-xl flex items-center justify-center text-primary group-hover:bg-white group-hover:scale-110 transition-all">
                <i :class="info.icon" class="text-xl"></i>
              </div>
              <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60 mb-1">{{ info.label }}</p>
                <p class="text-md font-bold text-white">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-[2rem] bg-primary text-white relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(61,90,254,0.4)]">
            <div class="absolute top-0 right-0 p-4">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </div>
            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">Streaming Infrastructure</p>
            <p class="text-sm font-bold">Global CDN & Payment Nodes Online</p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="bg-[#0c0c0c] rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/5 relative">
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-3xl -rotate-12 -z-10 opacity-20"></div>
            
            <form @submit.prevent="submitForm" class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Full Name / Studio</label>
                  <input type="text" v-model="form.org_name" required placeholder="Full Name" 
                    class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-white placeholder:text-white/10" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Contact Email</label>
                  <input type="email" v-model="form.email" required placeholder="contact@talent.com" 
                    class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-white placeholder:text-white/10" />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Inquiry Type</label>
                <select v-model="form.subject" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-white appearance-none">
                  <option value="talent" class="bg-[#0c0c0c]">Talent Verification Inquiry</option>
                  <option value="content" class="bg-[#0c0c0c]">Content Distribution / Licensing</option>
                  <option value="ads" class="bg-[#0c0c0c]">Ad Placement & Partnerships</option>
                  <option value="referral" class="bg-[#0c0c0c]">Network Rank & Commission Help</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Message Details</label>
                <textarea v-model="form.message" rows="4" placeholder="Tell us about your portfolio or content catalog..." 
                  class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-white resize-none placeholder:text-white/10"></textarea>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-primary hover:bg-white hover:text-primary py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group"
              >
                {{ loading ? 'Sending Request...' : 'Send Message' }}
                <i class="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
              </button>
            </form>
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
      loading: false,
      contactInfo: [
        { label: 'Ethiopia HQ', value: 'Bole Road, Addis Ababa', icon: 'fas fa-map-marker-alt' },
        { label: 'Talent Desk', value: 'talents@hooraflix.com', icon: 'fas fa-star' },
        { label: 'Hotline', value: '+251 911 00 11 22', icon: 'fas fa-phone' },
      ],
      form: {
        org_name: "",
        email: "",
        subject: "talent",
        message: "",
      },
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      setTimeout(() => {
        alert("Your inquiry has been sent to the HooraFlix Talent Desk. We will reach out within 48 hours.");
        this.loading = false;
        this.form = { org_name: "", email: "", subject: "talent", message: "" };
      }, 1500);
    }
  }
};
</script>

<style scoped>
/* Remove default arrow for custom select styling */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 1rem;
}
</style>