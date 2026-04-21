<template>
  <div :class="['flex flex-col h-screen font-sans transition-colors duration-200', isDark ? 'bg-black' : 'bg-slate-50']">
    <header :class="['relative w-full shadow-sm sticky top-0 z-20 px-4 py-2 transition-colors duration-200', isDark ? 'bg-gradient-to-r from-black to-gray-900/50 border-b border-red-600/20' : 'bg-white border-b border-slate-200']">
      <div class="flex items-center justify-between w-full max-w-[1920px] mx-auto">
        
        <div class="flex items-center space-x-4">
          <button
            v-if="screenWidth < 1024"
            @click="toggleSidebar"
            :class="['p-2 rounded-lg transition-all focus:outline-none', isDark ? 'text-gray-400 hover:bg-gray-900/50 hover:text-red-500' : 'text-slate-500 hover:bg-slate-100 hover:text-primary']"
            aria-label="Toggle sidebar"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>

          <div class="flex items-center space-x-3 group cursor-pointer">
            <div class="relative">
              <img
                src="../../assets/img/logo1.jpg"
                alt="Logo"
                :class="['h-9 w-9 rounded-xl object-cover ring-2 transition-all shadow-sm', isDark ? 'ring-gray-700 group-hover:ring-red-600/30' : 'ring-slate-100 group-hover:ring-primary/30']"
              />
              <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div class="flex flex-col">
              <h1 :class="['text-lg font-black leading-none tracking-tight transition-colors', isDark ? 'text-red-500 group-hover:text-red-400' : 'text-dprimary group-hover:text-primary']">
                Hooraflix
              </h1>
              <span :class="['text-[9px] font-bold uppercase tracking-[0.2em]', isDark ? 'text-gray-600' : 'text-slate-400']">Hooraflix </span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-5">
          
          <div class="relative" @click.stop="toggleNotificationDropdown">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all relative', isDark ? 'text-gray-400 hover:bg-gray-900/50 hover:text-red-500' : 'text-slate-500 hover:bg-slate-50 hover:text-primary']">
              <i class="fas fa-bell text-lg"></i>
              <span
                v-if="notifications.length > 0"
                class="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
              >
                {{ notifications.length }}
              </span>
            </div>

            <transition name="fade">
              <div
                v-show="isNotificationDropdownOpen"
                :class="['absolute right-0 mt-3 w-80 shadow-2xl z-50 rounded-[1.5rem] border overflow-hidden transition-colors duration-200', isDark ? 'bg-gray-900 shadow-black/50 border-gray-700' : 'bg-white shadow-slate-200 border-slate-100']"
              >
                <div :class="['px-5 py-4 border-b flex justify-between items-center transition-colors duration-200', isDark ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
                  <span :class="['text-xs font-black uppercase tracking-widest', isDark ? 'text-gray-300' : 'text-slate-800']">Notifications</span>
                  <span :class="['text-[10px] font-bold', isDark ? 'text-red-500' : 'text-primary']">{{ notifications.length }} New</span>
                </div>
                
                <ul class="max-h-80 overflow-y-auto">
                  <li
                    v-for="(notif, index) in notifications"
                    :key="index"
                    :class="['px-5 py-4 cursor-pointer border-b last:border-0 transition-colors', isDark ? 'hover:bg-gray-800 border-gray-700' : 'hover:bg-slate-50 border-slate-50']"
                    @click="goToNotification(notif.id)"
                  >
                    <div class="flex items-start space-x-3">
                      <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0', isDark ? 'bg-red-600/20 text-red-400' : 'bg-primary/10 text-primary']">
                        <i class="fas fa-info-circle"></i>
                      </div>
                      <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                          <p :class="['text-[11px] font-black uppercase tracking-tight', isDark ? 'text-gray-300' : 'text-slate-700']">
                            {{ notif.notification_type }}
                          </p>
                          <span :class="['text-[9px]', isDark ? 'text-gray-600' : 'text-slate-400']">{{ notif.created_at }}</span>
                        </div>
                        <p :class="['text-xs leading-relaxed font-medium', isDark ? 'text-gray-400' : 'text-slate-500']">
                          {{ notif.message }}
                        </p>
                      </div>
                    </div>
                  </li>

                  <li v-if="notifications.length === 0" class="px-5 py-10 text-center">
                    <i :class="['fas fa-check-circle text-3xl mb-3', isDark ? 'text-gray-700' : 'text-slate-200']"></i>
                    <p :class="['text-xs font-bold uppercase tracking-widest', isDark ? 'text-gray-600' : 'text-slate-400']">All caught up!</p>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <div :class="['h-8 w-px hidden sm:block', isDark ? 'bg-gray-700' : 'bg-slate-200']"></div>

          <div class="flex items-center space-x-3 cursor-pointer group" @click.stop="toggleProfileDropdown">
            <div class="hidden sm:flex flex-col items-end">
              <span :class="['text-[9px] font-black uppercase tracking-widest leading-none mb-1', isDark ? 'text-gray-600' : 'text-slate-400']">Welcome,</span>
              <h1 :class="['text-xs font-black transition-colors', isDark ? 'text-red-500 group-hover:text-red-400' : 'text-dprimary group-hover:text-primary']">
                {{ name }}
              </h1>
            </div>

            <div class="relative">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-xs shadow-lg transition-all active:scale-90', isDark ? 'bg-red-600 text-white group-hover:bg-red-700' : 'bg-slate-900 text-white group-hover:bg-primary']">
                <i class="fas fa-user"></i>
              </div>
            </div>

            <transition name="fade">
              <div
                v-show="isProfileDropdownOpen"
                :class="['absolute right-0 top-full mt-3 w-52 shadow-2xl z-50 rounded-[1.5rem] border overflow-hidden transition-colors duration-200', isDark ? 'bg-gray-900 shadow-black/50 border-gray-700' : 'bg-white shadow-slate-200 border-slate-100']"
              >
                <div class="p-2">
                  <a @click="openProfile" href="#" :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors group/item', isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-slate-600 hover:bg-slate-50']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all', isDark ? 'bg-red-600/20 text-red-400 group-hover/item:bg-red-600 group-hover/item:text-white' : 'bg-secondary/10 text-secondary group-hover/item:bg-secondary group-hover/item:text-white']">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <span class="text-xs font-bold uppercase tracking-tighter">My Profile</span>
                  </a>
                  
                  <a href="#" :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors group/item', isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-slate-600 hover:bg-slate-50']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all', isDark ? 'bg-gray-800 text-gray-500 group-hover/item:bg-gray-700 group-hover/item:text-white' : 'bg-slate-100 text-slate-500 group-hover/item:bg-slate-900 group-hover/item:text-white']">
                      <i class="fas fa-key"></i>
                    </div>
                    <span class="text-xs font-bold uppercase tracking-tighter">Security</span>
                  </a>

                  <div :class="['h-px my-2 mx-2', isDark ? 'bg-gray-700' : 'bg-slate-100']"></div>

                  <a @click="logout" href="#" :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors group/item', isDark ? 'text-red-400 hover:bg-red-600/20' : 'text-red-500 hover:bg-red-50']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all', isDark ? 'bg-red-600/20 text-red-400 group-hover/item:bg-red-600 group-hover/item:text-white' : 'bg-red-100/50 text-red-500 group-hover/item:bg-red-500 group-hover/item:text-white']">
                      <i class="fas fa-power-off"></i>
                    </div>
                    <span class="text-xs font-black uppercase tracking-tighter">Sign Out</span>
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden relative">
      <aside :class="['hidden lg:block w-64 h-full overflow-y-auto border-r transition-colors duration-200', isDark ? 'bg-black border-red-600/20' : 'bg-white border-slate-200']">
        <Sidebar />
      </aside>

      <transition name="fade">
        <div
          v-if="showSidebar && screenWidth < 1024"
          :class="['fixed inset-0 backdrop-blur-sm z-40 transition-opacity', isDark ? 'bg-black/60' : 'bg-slate-900/60']"
          @click="toggleSidebar"
        ></div>
      </transition>

      <transition name="slide">
        <aside
          v-if="showSidebar && screenWidth < 1024"
          :class="['fixed left-0 top-0 w-72 shadow-2xl z-50 h-full overflow-hidden flex flex-col transition-colors duration-200', isDark ? 'bg-black' : 'bg-white']"
        >
          <div :class="['p-6 border-b flex justify-between items-center transition-colors duration-200', isDark ? 'bg-gray-900/50 border-red-600/20' : 'bg-slate-50 border-slate-100']">
            <h2 :class="['text-xs font-black uppercase tracking-[0.2em]', isDark ? 'text-gray-600' : 'text-slate-400']">Navigation</h2>
            <button :class="['w-8 h-8 flex items-center justify-center rounded-full shadow-sm border transition-colors duration-200', isDark ? 'bg-gray-900 text-gray-600 border-gray-700' : 'bg-white text-slate-400 border-slate-200']" @click="toggleSidebar">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </aside>
      </transition>

      <main :class="['flex-1 overflow-y-auto transition-colors duration-200', isDark ? 'bg-black' : 'bg-slate-50/50']">
        <div class="max-w-[1920px] mx-auto">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <Profile
      :visible="showProfileModal"
      @close="closeProfile"
      @updated="onProfileUpdated"
    />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
<script>
import Sidebar from "@/components/layouts/leftSidevar.vue";
import Profile from "./Profile.vue";

export default {
  name: "AppLayout",
  components: { Sidebar, Profile },
  data() {
    return {
      showProfileModal: false,
      notifications: [],
      name: localStorage.getItem("name"),
      showSidebar: false,
      isLangOpen: false,
      isProfileDropdownOpen: false,
      isNotificationDropdownOpen: false,
      screenWidth: window.innerWidth,
      currentLanguage: "English",
      isDark: true,
    };
  },
  async created() {
    window.addEventListener("resize", this.handleResize);
    this.name = localStorage.getItem("name");

    try {
      const res = await this.$apiGetById(
        `/get_unread_notifications`,
        localStorage.getItem("userId")
      );
      this.notifications = res.data || [];
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
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
    window.removeEventListener("resize", this.handleResize);
    this.$root.$off('theme-changed');
  },
  methods: {
    openProfile() {
      this.isProfileDropdownOpen = false;
      this.showProfileModal = true;
    },
    closeProfile() {
      this.showProfileModal = false;
    },
    onProfileUpdated(updatedUser) {
      if (updatedUser?.name) {
        this.name = updatedUser.name;
        localStorage.setItem("name", updatedUser.name);
      }
    },
    goToNotification(id) {
      this.$router.push({ name: "notificationDetail", params: { id } });
      this.isNotificationDropdownOpen = false;
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 1024) {
        this.showSidebar = false; // prevent mobile sidebar from sticking open
      }
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    toggleProfileDropdown() {
      this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    },
    toggleNotificationDropdown() {
      this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
