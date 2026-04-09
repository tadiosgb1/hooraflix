<template>
  <div class="min-h-screen bg-[#050505] font-sans selection:bg-primary/30">
    <section id="home">
     <Header />
    </section>

     <Hero />
    
    <div class="bg-[#080808] py-24 border-y border-white/5">
      <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div class="relative group">
            <div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 aspect-video flex items-center justify-center">
              <i class="fas fa-play text-5xl text-white/20"></i>
              <div class="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-primary w-1/3 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div>
              <span class="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Talent & Streaming Super Platform</span>
              <h2 class="text-4xl md:text-5xl font-black text-white mt-4 mb-8 tracking-tighter leading-tight italic">
                Empowering the <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Next Generation</span>
              </h2>
              <p class="text-white/60 mb-10 leading-relaxed text-lg font-medium">
                HooraFlix is a dual-purpose digital ecosystem. We bridge the gap between <strong>Content Consumption</strong> and <strong>Career Growth</strong>. Whether you are a viewer seeking premium Ethiopian cinema or a talent looking to monetize your craft, we provide the ultimate stage.
              </p>
              
              <ul class="space-y-6">
                  <li class="flex items-start gap-4 font-bold text-white/80">
                    <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <i class="fas fa-film text-primary text-xs"></i>
                    </div>
                    <div>
                      <span class="block">Premium VOD & Live Streaming</span>
                      <p class="text-xs text-white/40 font-normal mt-1 italic uppercase tracking-wider">HLS/DASH Adaptive Bitrate</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-4 font-bold text-white/80">
                    <div class="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                      <i class="fas fa-star text-secondary text-xs"></i>
                    </div>
                    <div>
                      <span class="block">Talent Management & KYC</span>
                      <p class="text-xs text-white/40 font-normal mt-1 italic uppercase tracking-wider">Verified Portfolio Portals</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-4 font-bold text-white/80">
                    <div class="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                      <i class="fas fa-network-wired text-emerald-500 text-xs"></i>
                    </div>
                    <div>
                      <span class="block">MLM Referral & Wallet System</span>
                      <p class="text-xs text-white/40 font-normal mt-1 italic uppercase tracking-wider">Automated Payouts & Ranks</p>
                    </div>
                  </li>
              </ul>
          </div>
      </div>
    </div>

    <Features id="features" />

    <Fqs />
    <ContactUs />
    <Footer />

    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<script>
// --- ALL IMPORTS PRESERVED ---
import Header from './header.vue'
import Footer from './footer.vue'
import Hero from './hero.vue'
import Features from './features.vue'
import Fqs from './fqs.vue'
import ContactUs from './contactUs.vue'
import LoginModal from '../auth/login.vue'
import whyAlphaMessage from './whyAlphaMessage.vue'
import secondaryCta from './secondary-cta.vue'
import pricingPreview from './pricing-preview.vue'

export default {
  components: {
    Header,
    Hero,
    Features,
    Fqs,
    ContactUs,
    Footer,
    LoginModal,
    whyAlphaMessage,
    secondaryCta,
    pricingPreview
  },
  data() {
    return {
      showLoginModal: false,
      selectedLang: "en",
      mobileMenuOpen: false,
      selectedPlan: null,
      showForm: true, // Shown for MVP visibility
      form: {
        company_name: '', // Interpreted as Talent Agency / Name
        type: 'individual',
        email: '',
        password: '',
        phone_number: ''
      }
    };
  },
  methods: {
    apiDoc(){
      this.$router.push('/browse'); // Updated for streaming navigation
    },
    onPlanSelected(planId) {
      this.selectedPlan = planId;
      this.showForm = true;
      setTimeout(() => {
        const el = document.getElementById('onboard');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    scrollTo(id) {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
    },
    async submitForm() {
        console.log("HooraFlix Talent Registration:", this.form);
        alert("Welcome to HooraFlix! Setting up your Talent Dashboard...");
    }
  }
};
</script>

<style scoped>
/* Updated for dark mode inputs */
.custom-input {
  @apply w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-semibold text-white 
         transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-white/20;
}
</style>