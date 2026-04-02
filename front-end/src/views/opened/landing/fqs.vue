<template>
  <section id="faq" class="py-32 bg-[#050505] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-1/2 h-full bg-[#080808] skew-x-12 translate-x-32 z-0 border-l border-white/5"></div>
    
    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-3 gap-16">
        
        <div class="lg:sticky lg:top-32 h-fit">
          <span class="inline-block px-3 py-1 mb-4 text-[10px] font-black tracking-[0.3em] text-primary bg-primary/10 rounded-md uppercase">
            Support Center
          </span>
          <h2 class="text-4xl font-black text-white mb-6 leading-tight italic">
            Common <br/> <span class="text-primary">Questions</span>
          </h2>
          <p class="text-white/40 font-medium mb-8 leading-relaxed">
            Everything you need to know about streaming, talent onboarding, and our referral reward system.
          </p>
          
          <div class="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-sm backdrop-blur-xl">
            <p class="text-sm font-bold text-white mb-2">Technical Issues?</p>
            <p class="text-xs text-white/30 mb-4">Our support team is available 24/7 to help with streaming or payout inquiries.</p>
            <button class="w-full py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(61,90,254,0.4)] transition-all">
              Message Support
            </button>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-4">
          <transition-group 
            appear
            @before-enter="beforeEnter"
            @enter="enter"
          >
            <div
              v-for="(faq, index) in faqs"
              :key="faq.question"
              :data-index="index"
              class="faq-item group"
            >
              <div 
                class="bg-[#0c0c0c] border transition-all duration-500 rounded-2xl overflow-hidden"
                :class="activeIndex === index ? 'border-primary ring-4 ring-primary/5 shadow-2xl' : 'border-white/5 hover:border-white/10'"
              >
                <button
                  @click="toggleFaq(index)"
                  class="w-full flex items-center justify-between p-7 text-left outline-none"
                >
                  <span class="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {{ faq.question }}
                  </span>
                  <div 
                    class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-500"
                    :class="activeIndex === index ? 'rotate-180 bg-primary text-white' : 'bg-white/5 text-white/30'"
                  >
                    <i class="fas fa-chevron-down text-[10px]"></i>
                  </div>
                </button>

                <div
                  v-show="activeIndex === index"
                  class="overflow-hidden transition-all duration-500"
                >
                  <div class="px-7 pb-7">
                    <div class="h-px w-12 bg-primary/40 mb-6"></div>
                    <p class="text-white/50 leading-relaxed font-medium mb-6">
                      {{ faq.answer }}
                    </p>
                    
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tag in faq.tags" :key="tag" class="text-[9px] font-black uppercase tracking-tighter px-2 py-1 bg-white/5 text-white/40 rounded border border-white/5">
                        # {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const activeIndex = ref(0)

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

// GSAP Logic Preserved
const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateY(30px)'
}

const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}

// Updated FAQ Content for HooraFlix (Streaming & Talent Focus)
const faqs = [
  {
    question: 'What content can I watch on HooraFlix?',
    answer: 'We offer a wide range of premium Ethiopian movies, original series, and live streaming events. Our library is updated weekly with exclusive productions from local creators.',
    tags: ['VOD', 'Streaming']
  },
  {
    question: 'How do I join as a Talent (Actor/Model)?',
    answer: 'Simply register for a Talent account and complete your KYC verification. Once verified, you can upload your portfolio, apply for auditions, and access specialized training modules.',
    tags: ['Talent-Hub', 'KYC']
  },
  {
    question: 'How does the Referral Network work?',
    answer: 'HooraFlix uses a 5-rank hierarchical system. By referring new users or creators, you earn commissions. As your network grows, you move up in rank, unlocking higher payout percentages.',
    tags: ['Earning', 'MLM']
  },
  {
    question: 'Is there a limit on monthly earnings?',
    answer: 'No. Your earnings depend on your network activity and ad-revenue shares. All commissions are tracked in real-time in your Digital Wallet and can be withdrawn via local bank or Telebirr.',
    tags: ['Wallet', 'Payouts']
  },
  {
    question: 'Can I watch videos offline?',
    answer: 'Yes. Our mobile application supports encrypted offline downloads for premium subscribers, allowing you to enjoy content without an active internet connection.',
    tags: ['Mobile-App', 'Features']
  },
  {
    question: 'Are there different subscription tiers?',
    answer: 'We offer a "Free" tier with ads (AVOD) and a "Premium" tier that provides ad-free viewing, 4K resolution, and exclusive access to the Training Hub.',
    tags: ['Plans', 'Pricing']
  }
]
</script>

<style scoped>
.faq-item {
  will-change: transform, opacity;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #3d5afe;
  border-radius: 10px;
}
</style>