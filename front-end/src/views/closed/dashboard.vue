<template>
  <div :class="['flex flex-col h-screen font-sans transition-colors duration-200', 'bg-black']">
    <header :class="['relative w-full shadow-lg sticky top-0 z-20 px-4 py-3 transition-colors duration-200', 'bg-gradient-to-r from-black via-gray-900/80 to-black border-b border-red-600/30 backdrop-blur-md']">
      <div class="flex items-center justify-between w-full max-w-[1920px] mx-auto">
        
        <div class="flex items-center space-x-4">
          <button
            v-if="screenWidth < 1024"
            @click="toggleSidebar"
            :class="['p-2 rounded-lg transition-all focus:outline-none', 'text-gray-400 hover:bg-red-600/20 hover:text-red-500']"
            aria-label="Toggle sidebar"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>

          <div class="flex items-center space-x-3 group cursor-pointer">
            <div class="relative">
              <img
                src="../../assets/img/logo1.jpg"
                alt="Logo"
                :class="['h-9 w-9 rounded-xl object-cover ring-2 transition-all shadow-lg', 'ring-red-600/50 group-hover:ring-red-500 group-hover:shadow-red-600/30']"
              />
              <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-lg"></div>
            </div>
            <div class="flex flex-col">
              <h1 :class="['text-lg font-black leading-none tracking-tight transition-colors', 'text-red-500 group-hover:text-red-400']">
                Hooraflix
              </h1>
              <span :class="['text-[9px] font-bold uppercase tracking-[0.2em]', 'text-gray-500 group-hover:text-gray-400']">Premium Content</span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-5">
          
          <div class="relative" @click.stop="toggleNotificationDropdown">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all relative', 'text-gray-400 hover:bg-red-600/20 hover:text-red-500']">
              <i class="fas fa-bell text-lg"></i>
              <span
                v-if="notifications.length > 0"
                class="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-black shadow-lg animate-pulse"
              >
                {{ notifications.length }}
              </span>
            </div>

            <transition name="fade">
              <div
                v-show="isNotificationDropdownOpen"
                :class="['absolute right-0 mt-3 w-80 shadow-2xl z-50 rounded-[1.5rem] border overflow-hidden transition-colors duration-200', 'bg-gradient-to-br from-gray-900/95 to-black shadow-red-600/20 border-red-600/30']"
              >
                <div :class="['px-5 py-4 border-b flex justify-between items-center transition-colors duration-200', 'bg-gradient-to-r from-red-600/20 to-transparent border-red-600/30']">
                  <span :class="['text-xs font-black uppercase tracking-widest', 'text-red-400']">Notifications</span>
                  <span :class="['text-[10px] font-bold', 'text-red-500']">{{ notifications.length }} New</span>
                </div>
                
                <ul class="max-h-80 overflow-y-auto">
                  <li
                    v-for="(notif, index) in notifications"
                    :key="index"
                    :class="['px-5 py-4 cursor-pointer border-b last:border-0 transition-colors', 'hover:bg-red-600/10 border-gray-800']"
                    @click="goToNotification(notif.id)"
                  >
                    <div class="flex items-start space-x-3">
                      <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0', 'bg-red-600/20 text-red-400']">
                        <i class="fas fa-info-circle"></i>
                      </div>
                      <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                          <p :class="['text-[11px] font-black uppercase tracking-tight', 'text-gray-300']">
                            {{ notif.notification_type }}
                          </p>
                          <span :class="['text-[9px]', 'text-gray-600']">{{ notif.created_at }}</span>
                        </div>
                        <p :class="['text-xs leading-relaxed font-medium', 'text-gray-400']">
                          {{ notif.message }}
                        </p>
                      </div>
                    </div>
                  </li>

                  <li v-if="notifications.length === 0" class="px-5 py-10 text-center">
                    <i :class="['fas fa-check-circle text-3xl mb-3', 'text-gray-700']"></i>
                    <p :class="['text-xs font-bold uppercase tracking-widest', 'text-gray-600']">All caught up!</p>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <div :class="['h-8 w-px hidden sm:block', 'bg-red-600/20']"></div>

          <div class="flex items-center space-x-3 cursor-pointer group" @click.stop="toggleProfileDropdown">
            <div class="hidden sm:flex flex-col items-end">
              <span :class="['text-[9px] font-black uppercase tracking-widest leading-none mb-1', 'text-gray-600']">Welcome,</span>
              <h1 :class="['text-xs font-black transition-colors', 'text-red-500 group-hover:text-red-400']">
                {{ name }}
              </h1>
            </div>

            <div class="relative">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-xs shadow-lg transition-all active:scale-90', 'bg-gradient-to-br from-red-600 to-red-700 text-white group-hover:from-red-500 group-hover:to-red-600 group-hover:shadow-red-600/50']">
                <i class="fas fa-user"></i>
              </div>
            </div>

            <transition name="fade">
              <div
                v-show="isProfileDropdownOpen"
                :class="['absolute right-0 top-full mt-3 w-52 shadow-2xl z-50 rounded-[1.5rem] border overflow-hidden transition-colors duration-200', 'bg-gradient-to-br from-gray-900/95 to-black shadow-red-600/20 border-red-600/30']"
              >
                <div class="p-2">
                  <a @click="openProfile" href="#" :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors group/item', 'text-gray-400 hover:bg-red-600/20 hover:text-red-400']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all', 'bg-red-600/20 text-red-400 group-hover/item:bg-red-600 group-hover/item:text-white']">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <span class="text-xs font-bold uppercase tracking-tighter">My Profile</span>
                  </a>
                  
                  <a href="#" :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors group/item', 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all', 'bg-gray-800 text-gray-500 group-hover/item:bg-gray-700 group-hover/item:text-white']">
                      <i class="fas fa-key"></i>
                    </div>
                    <span class="text-xs font-bold uppercase tracking-tighter">Security</span>
                  </a>

                  <div :class="['h-px my-2 mx-2', 'bg-red-600/20']"></div>

                  <a @click="logout" href="#" :class="['flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors group/item', 'text-red-400 hover:bg-red-600/20']">
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all', 'bg-red-600/20 text-red-400 group-hover/item:bg-red-600 group-hover/item:text-white']">
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
      <aside :class="['hidden lg:block w-64 h-full overflow-y-auto border-r transition-colors duration-200', 'bg-black border-red-600/20']">
        <Sidebar />
      </aside>

      <transition name="fade">
        <div
          v-if="showSidebar && screenWidth < 1024"
          :class="['fixed inset-0 backdrop-blur-sm z-40 transition-opacity', 'bg-black/60']"
          @click="toggleSidebar"
        ></div>
      </transition>

      <transition name="slide">
        <aside
          v-if="showSidebar && screenWidth < 1024"
          :class="['fixed left-0 top-0 w-72 shadow-2xl z-50 h-full overflow-hidden flex flex-col transition-colors duration-200', 'bg-black']"
        >
          <div :class="['p-6 border-b flex justify-between items-center transition-colors duration-200', 'bg-gradient-to-r from-red-600/20 to-transparent border-red-600/30']">
            <h2 :class="['text-xs font-black uppercase tracking-[0.2em]', 'text-red-400']">Navigation</h2>
            <button :class="['w-8 h-8 flex items-center justify-center rounded-full shadow-sm border transition-colors duration-200', 'bg-gray-900 text-gray-600 border-red-600/30 hover:bg-red-600/20 hover:text-red-400']" @click="toggleSidebar">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </aside>
      </transition>

      <main :class="['flex-1 overflow-y-auto transition-colors duration-200', 'bg-black']">
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

/* Enhanced animations */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.2);
  }
}

/* Smooth scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(239, 68, 68, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(239, 68, 68, 0.5);
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
      name: localStorage.getItem("name") || "",
      showSidebar: false,
      isProfileDropdownOpen: false,
      isNotificationDropdownOpen: false,
      screenWidth: window.innerWidth,
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

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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
        this.showSidebar = false;
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
