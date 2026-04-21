<template>
  <div>
    <Toast ref="toast" />
    
    <Teleport to="body">
      <transition name="auth-overlay">
        <div
          v-if="visible"
          :class="['fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md p-4 overflow-y-auto', isDark ? 'bg-black/60' : 'bg-slate-900/60']"
          @click.self="$emit('close')"
        >
          <div :class="['w-full max-w-2xl rounded-[2rem] shadow-2xl relative overflow-hidden animate-pop-in transition-colors duration-200', isDark ? 'bg-gray-900' : 'bg-white']">
            
            <div :class="['px-8 py-6 border-b flex justify-between items-center transition-colors duration-200', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100']">
              <div class="flex items-center gap-4">
                <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-xl', isDark ? 'bg-red-600/20 text-red-400' : 'bg-primary/10 text-primary']">
                  <i class="fas fa-user-edit"></i>
                </div>
                <div>
                  <h2 :class="['text-xl font-black tracking-tight', isDark ? 'text-white' : 'text-slate-800']">Update Profile</h2>
                  <p :class="['text-[10px] font-black uppercase tracking-widest', isDark ? 'text-gray-500' : 'text-slate-400']">Personal Information Settings</p>
                </div>
              </div>
              <button 
                @click="$emit('close')" 
                :class="['w-10 h-10 flex items-center justify-center rounded-full transition-all', isDark ? 'bg-gray-700 text-gray-400 hover:bg-red-600/20 hover:text-red-400' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500']"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <form @submit.prevent="updateProfile" :class="['p-8 transition-colors duration-200', isDark ? 'bg-gray-900' : 'bg-white']">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                
                <div class="space-y-1">
                  <label :class="['text-[10px] font-black uppercase tracking-widest ml-1', isDark ? 'text-gray-500' : 'text-slate-400']">First Name</label>
                  <div class="relative group">
                    <i :class="['fas fa-signature absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-xs', isDark ? 'text-gray-600 group-focus-within:text-red-500' : 'text-slate-300 group-focus-within:text-primary']"></i>
                    <input v-model="form.first_name" type="text" :class="['compact-input', isDark ? 'dark-input' : '']" placeholder="John" />
                  </div>
                </div>

                <div class="space-y-1">
                  <label :class="['text-[10px] font-black uppercase tracking-widest ml-1', isDark ? 'text-gray-500' : 'text-slate-400']">Middle Name</label>
                  <div class="relative group">
                    <i :class="['fas fa-pen-nib absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-xs', isDark ? 'text-gray-600 group-focus-within:text-red-500' : 'text-slate-300 group-focus-within:text-primary']"></i>
                    <input v-model="form.middle_name" type="text" :class="['compact-input', isDark ? 'dark-input' : '']" placeholder="Edward" />
                  </div>
                </div>

                <div class="space-y-1">
                  <label :class="['text-[10px] font-black uppercase tracking-widest ml-1', isDark ? 'text-gray-500' : 'text-slate-400']">Last Name</label>
                  <div class="relative group">
                    <i :class="['fas fa-user absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-xs', isDark ? 'text-gray-600 group-focus-within:text-red-500' : 'text-slate-300 group-focus-within:text-primary']"></i>
                    <input v-model="form.last_name" type="text" :class="['compact-input', isDark ? 'dark-input' : '']" placeholder="Doe" />
                  </div>
                </div>

                <div class="space-y-1">
                  <label :class="['text-[10px] font-black uppercase tracking-widest ml-1', isDark ? 'text-gray-500' : 'text-slate-400']">Email Address</label>
                  <div class="relative group">
                    <i :class="['fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-xs', isDark ? 'text-gray-600 group-focus-within:text-red-500' : 'text-slate-300 group-focus-within:text-primary']"></i>
                    <input v-model="form.email" type="email" :class="['compact-input', isDark ? 'dark-input' : '']" placeholder="john.doe@alpha.com" />
                  </div>
                </div>

                <div class="space-y-1">
                  <label :class="['text-[10px] font-black uppercase tracking-widest ml-1', isDark ? 'text-gray-500' : 'text-slate-400']">Phone Number</label>
                  <div class="relative group">
                    <i :class="['fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-xs', isDark ? 'text-gray-600 group-focus-within:text-red-500' : 'text-slate-300 group-focus-within:text-primary']"></i>
                    <input v-model="form.phone_number" type="text" :class="['compact-input', isDark ? 'dark-input' : '']" placeholder="+123 456 7890" />
                  </div>
                </div>

                <div class="space-y-1">
                  <label :class="['text-[10px] font-black uppercase tracking-widest ml-1', isDark ? 'text-gray-500' : 'text-slate-400']">Physical Address</label>
                  <div class="relative group">
                    <i :class="['fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-xs', isDark ? 'text-gray-600 group-focus-within:text-red-500' : 'text-slate-300 group-focus-within:text-primary']"></i>
                    <input v-model="form.address" type="text" :class="['compact-input', isDark ? 'dark-input' : '']" placeholder="Street, City, Country" />
                  </div>
                </div>
              </div>

              <div :class="['mt-10 pt-6 border-t flex items-center justify-end gap-3 transition-colors duration-200', isDark ? 'border-gray-700' : 'border-slate-50']">
                <button 
                  type="button" 
                  @click="$emit('close')"
                  :class="['px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all', isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-slate-400 hover:bg-slate-50']"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  :class="['px-10 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95', isDark ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20' : 'bg-red-600 hover:bg-primary text-white shadow-dprimary/20']"
                  :disabled="loading"
                >
                  <span v-if="!loading">Save Changes</span>
                  <span v-else class="flex items-center gap-2">
                    <div class="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Input Field Styling */
.compact-input {
  @apply w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-red-600/10 focus:border-red-600 outline-none transition-all text-sm font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium;
}

.dark-input {
  @apply bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 focus:bg-gray-700 focus:ring-red-600/20 focus:border-red-600;
}

/* Animations */
@keyframes popIn {
  0% { opacity: 0; transform: scale(0.95) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-pop-in {
  animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.auth-overlay-enter-active, .auth-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.auth-overlay-enter-from, .auth-overlay-leave-to {
  opacity: 0;
}
</style>

<script>

import Toast from "../../components/Toast.vue";
export default {
  name: "Profile",
    components:{Toast},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
      },
      isDark: true,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.loadProfile();
      }
    },
  },
  mounted() {
    // Load theme preference
    const savedTheme = localStorage.getItem('hooraflix-theme');
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    }

    // Listen for theme changes from sidebar
    this.$root.$on('theme-changed', (isDark) => {
      this.isDark = isDark;
    });
  },
  beforeUnmount() {
    this.$root.$off('theme-changed');
  },
  methods: {
    async loadProfile() {
      try {
        const id = localStorage.getItem("userId");
        const res = await this.$apiGet(`/get_user/${id}`);
        //this.form = res;
        this.form.email=res.email;
        this.form.first_name=res.first_name;
        this.form.last_name=res.last_name;
        this.form.middle_name=res.middle_name;
        this.form.phone_number=res.phone_number;
        this.form.address=res.address;



      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    },
    async updateProfile() {
      try {
        const id = localStorage.getItem("userId");

        console.log("this form",this.form);

       const res = await this.$apiPatch(`/old_update_user`, id, this.form);
         if(res && res.error){
 this.$root.$refs.toast.showToast(
          res.error || "Failed to update profile ",
          "error"
        );
         this.$emit("close");
        } else {
        this.$root.$refs.toast.showToast(
          "Profile updated successfully ",
          "success"
        );
      this.$emit("updated", this.form);
        this.$emit("close");
        }
        
       
      } catch (err) {
        console.error("Update failed", err);
       this.$root.$refs.toast.showToast(
         "Failed to update profile ",
          "error"
        );
      }
    },
  },
};
</script>

