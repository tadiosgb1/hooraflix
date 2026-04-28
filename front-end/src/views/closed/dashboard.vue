<template>
  <div :class="['flex flex-col h-screen font-sans transition-colors duration-200', isDark ? 'bg-black' : 'bg-gray-50']">
    <header :class="['relative w-full shadow-lg sticky top-0 z-20 px-4 py-3 transition-colors duration-200', isDark ? 'bg-gradient-to-r from-black via-gray-900/80 to-black border-b border-red-600/30 backdrop-blur-md' : 'bg-white border-b border-gray-200 shadow-sm']">
      <div class="flex items-center justify-between w-full max-w-[1920px] mx-auto">
        <div class="flex items-center space-x-4">
          <button v-if="screenWidth < 1024" @click="toggleSidebar"
            :class="['p-2 rounded-lg transition-all focus:outline-none', isDark ? 'text-gray-400 hover:bg-red-600/20 hover:text-red-500' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700']">
            <i class="fas fa-bars text-xl"></i>
          </button>
          <div class="flex items-center space-x-3 group cursor-pointer">
            <img src="../../assets/img/logo1.jpg" alt="Logo"
              :class="['h-9 w-9 rounded-xl object-cover ring-2 transition-all shadow-lg', isDark ? 'ring-red-600/50' : 'ring-red-400/50']" />
            <div class="flex flex-col">
              <h1 :class="['text-lg font-black leading-none tracking-tight', isDark ? 'text-red-500' : 'text-red-600']">Hooraflix</h1>
              <span :class="['text-[9px] font-bold uppercase tracking-[0.2em]', isDark ? 'text-gray-500' : 'text-gray-400']">Premium Content</span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Theme Toggle -->
          <button @click="toggleTheme"
            :class="['w-9 h-9 rounded-xl flex items-center justify-center transition-all', isDark ? 'bg-gray-900/50 hover:bg-gray-800 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600']"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>

          <!-- Notifications -->
          <div class="relative" @click.stop="toggleNotificationDropdown">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all relative', isDark ? 'text-gray-400 hover:bg-red-600/20 hover:text-red-500' : 'text-gray-500 hover:bg-gray-100 hover:text-red-500']">
              <i class="fas fa-bell text-lg"></i>
              <span v-if="notifications.length > 0"
                class="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-black shadow-lg animate-pulse">
                {{ notifications.length }}
              </span>
            </div>
            <transition name="fade">
              <div v-show="isNotificationDropdownOpen"
                :class="['absolute right-0 mt-3 w-80 shadow-2xl z-50 rounded-[1.5rem] border overflow-hidden', isDark ? 'bg-gradient-to-br from-gray-900/95 to-black border-red-600/30' : 'bg-white border-gray-200 shadow-lg']">
                <div :class="['px-5 py-4 border-b flex justify-between items-center', isDark ? 'bg-gradient-to-r from-red-600/20 to-transparent border-red-600/30' : 'bg-gray-50 border-gray-200']">
                  <span :class="['text-xs font-black uppercase tracking-widest', isDark ? 'text-red-400' : 'text-gray-700']">Notifications</span>
                  <span :class="['text-[10px] font-bold', isDark ? 'text-red-500' : 'text-red-600']">{{ notifications.length }} New</span>
                </div>
                <ul class="max-h-80 overflow-y-auto">
                  <li v-for="(notif, index) in notifications" :key="index"
                    :class="['px-5 py-4 cursor-pointer border-b last:border-0 transition-colors', isDark ? 'hover:bg-red-600/10 border-gray-800' : 'hover:bg-gray-50 border-gray-100']"
                    @click="goToNotification(notif.id)">
                    <div class="flex items-start space-x-3">
                      <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0', isDark ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-500']">
                        <i class="fas fa-info-circle"></i>
                      </div>
                      <div class="flex-1">
                        <p :class="['text-[11px] font-black uppercase', isDark ? 'text-gray-300' : 'text-gray-700']">{{ notif.notification_type }}</p>
                        <p :class="['text-xs', isDark ? 'text-gray-400' : 'text-gray-500']">{{ notif.message }}</p>
                      </div>
                    </div>
                  </li>
                  <li v-if="notifications.length === 0" class="px-5 py-10 text-center">
                    <p :class="['text-xs font-bold uppercase tracking-widest', isDark ? 'text-gray-600' : 'text-gray-400']">All caught up!</p>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <div :class="['h-8 w-px hidden sm:block', isDark ? 'bg-red-600/20' : 'bg-gray-200']"></div>

          <!-- Profile -->
          <div class="flex items-center space-x-3 cursor-pointer group" @click.stop="toggleProfileDropdown">
            <div class="hidden sm:flex flex-col items-end">
              <span :class="['text-[9px] font-black uppercase tracking-widest leading-none mb-1', isDark ? 'text-gray-600' : 'text-gray-400']">Welcome,</span>
              <h1 :class="['text-xs font-black', isDark ? 'text-red-500' : 'text-red-600']">{{ name }}</h1>
            </div>
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xs shadow-lg bg-gradient-to-br from-red-600 to-red-700 text-white">
              <i class="fas fa-user"></i>
            </div>
            <transition name="fade">
              <div v-show="isProfileDropdownOpen"
                :class="['absolute right-0 top-full mt-3 w-52 shadow-2xl z-50 rounded-[1.5rem] border overflow-hidden', isDark ? 'bg-gradient-to-br from-gray-900/95 to-black border-red-600/30' : 'bg-white border-gray-200 shadow-lg']">
                <div class="p-2">
                  <a @click="openProfile" href="#"
                    :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors', isDark ? 'text-gray-400 hover:bg-red-600/20 hover:text-red-400' : 'text-gray-600 hover:bg-red-50 hover:text-red-600']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs', isDark ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-500']"><i class="fas fa-user-circle"></i></div>
                    <span class="text-xs font-bold uppercase tracking-tighter">My Profile</span>
                  </a>
                  <div :class="['h-px my-2 mx-2', isDark ? 'bg-red-600/20' : 'bg-gray-200']"></div>
                  <a @click="logout" href="#"
                    :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors', isDark ? 'text-red-400 hover:bg-red-600/20' : 'text-red-500 hover:bg-red-50']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs', isDark ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-500']"><i class="fas fa-power-off"></i></div>
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
      <aside :class="['hidden lg:block w-64 h-full overflow-y-auto border-r transition-colors duration-200', isDark ? 'bg-black border-red-600/20' : 'bg-white border-gray-200']">
        <Sidebar />
      </aside>

      <transition name="fade">
        <div v-if="showSidebar && screenWidth < 1024"
          :class="['fixed inset-0 backdrop-blur-sm z-40', isDark ? 'bg-black/60' : 'bg-gray-900/40']"
          @click="toggleSidebar"></div>
      </transition>

      <transition name="slide">
        <aside v-if="showSidebar && screenWidth < 1024"
          :class="['fixed left-0 top-0 w-72 shadow-2xl z-50 h-full overflow-hidden flex flex-col transition-colors duration-200', isDark ? 'bg-black' : 'bg-white']">
          <div :class="['p-6 border-b flex justify-between items-center', isDark ? 'bg-gradient-to-r from-red-600/20 to-transparent border-red-600/30' : 'bg-gray-50 border-gray-200']">
            <h2 :class="['text-xs font-black uppercase tracking-[0.2em]', isDark ? 'text-red-400' : 'text-gray-700']">Navigation</h2>
            <button :class="['w-8 h-8 flex items-center justify-center rounded-full border transition-colors', isDark ? 'bg-gray-900 text-gray-600 border-red-600/30 hover:text-red-400' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100']" @click="toggleSidebar">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto"><Sidebar /></div>
        </aside>
      </transition>

      <main :class="['flex-1 overflow-y-auto transition-colors duration-200', isDark ? 'bg-black' : 'bg-gray-50']" :data-theme="isDark ? 'dark' : 'light'">
        <div class="max-w-[1920px] mx-auto">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <Profile :visible="showProfileModal" @close="closeProfile" @updated="onProfileUpdated" />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.3); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(239, 68, 68, 0.5); }
</style>

<script>
import Sidebar from "@/components/layouts/leftSidevar.vue";
import Profile from "./Profile.vue";
import emitter from '@/eventBus';

export default {
  name: "AppLayout",
  components: { Sidebar, Profile },

  data() {
    return {
      isDark: localStorage.getItem('hooraflix-theme') !== 'light',
      showProfileModal: false,
      notifications: [],
      name: localStorage.getItem("name") || "",
      showSidebar: false,
      isProfileDropdownOpen: false,
      isNotificationDropdownOpen: false,
      screenWidth: window.innerWidth,
      themeHandler: null,
    };
  },

  async created() {
    window.addEventListener("resize", this.handleResize);
    this.name = localStorage.getItem("name");
    try {
      const res = await this.$apiGetById(`/get_unread_notifications`, localStorage.getItem("userId"));
      this.notifications = res.data || [];
    } catch (e) { console.error(e); }
  },

  mounted() {
    this.themeHandler = (isDark) => { this.isDark = isDark; };
    emitter.on('theme-changed', this.themeHandler);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    emitter.off('theme-changed', this.themeHandler);
  },

  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem('hooraflix-theme', this.isDark ? 'dark' : 'light');
      emitter.emit('theme-changed', this.isDark);
    },
    openProfile() { this.isProfileDropdownOpen = false; this.showProfileModal = true; },
    closeProfile() { this.showProfileModal = false; },
    onProfileUpdated(u) { if (u?.name) { this.name = u.name; localStorage.setItem("name", u.name); } },
    goToNotification(id) { this.$router.push({ name: "notificationDetail", params: { id } }); this.isNotificationDropdownOpen = false; },
    handleResize() { this.screenWidth = window.innerWidth; if (this.screenWidth > 1024) this.showSidebar = false; },
    toggleSidebar() { this.showSidebar = !this.showSidebar; },
    toggleProfileDropdown() { this.isProfileDropdownOpen = !this.isProfileDropdownOpen; },
    toggleNotificationDropdown() { this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen; },
    logout() { localStorage.clear(); this.$router.push("/"); },
  },
};
</script>
