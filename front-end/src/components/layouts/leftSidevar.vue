<template>
  <div>
    <transition name="slide">
      <aside
        :class="[
          'w-72 flex flex-col fixed md:relative z-15 h-full border-r shadow-lg transition-colors duration-200',
          isDark 
            ? 'bg-black border-red-600/20' 
            : 'bg-white border-gray-200'
        ]"
      >
        <!-- Header (Logo + Theme Toggle) -->
        <div
          :class="[
            'flex items-center justify-between p-6 border-b sticky top-0 z-20 shadow-md transition-colors duration-200',
            isDark
              ? 'bg-gradient-to-r from-red-900/20 to-black border-red-600/20'
              : 'bg-gradient-to-r from-red-50 to-white border-gray-200'
          ]"
        >
          <div class="flex items-center space-x-3">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', isDark ? 'bg-red-600/20' : 'bg-red-100']">
              <img src="../../assets/img/logo1.jpg" class="h-7 w-7 rounded-lg" />
            </div>
            <span :class="['text-xl font-bold', isDark ? 'text-red-500' : 'text-red-600']">HooraFlix</span>
          </div>

          <!-- Theme Toggle Button -->
          <button
            @click="toggleTheme"
            :class="[
              'p-2 rounded-lg transition-colors duration-200',
              isDark
                ? 'bg-gray-900/50 hover:bg-gray-800 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
        </div>

        <!-- Menu -->
        <div class="flex-1 overflow-y-auto pt-4 px-3 custom-scrollbar">
          <ul class="space-y-2">
            <li v-for="menu in filteredMenu" :key="menu.name">
              <!-- Single Menu Item -->
              <router-link
                v-if="!menu.children"
                :to="{ name: menu.route }"
                :class="[
                  'flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200',
                  isActive(menu.route)
                    ? isDark
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-red-600 text-white shadow-lg'
                    : isDark
                    ? 'text-gray-400 hover:bg-gray-900/50 hover:text-red-500'
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                ]"
              >
                <i :class="[menu.icon, 'mr-3 w-5']"></i>
                {{ menu.name }}
              </router-link>

              <!-- Parent Menu with Children -->
              <div v-else>
                <button
                  @click="toggleMenu(menu.name)"
                  type="button"
                  :class="[
                    'w-full flex justify-between items-center px-4 py-3 cursor-pointer rounded-xl font-semibold text-sm transition-all duration-200 select-none',
                    openMenus[menu.name]
                      ? isDark
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-red-600 text-white shadow-lg'
                      : isDark
                      ? 'text-gray-400 hover:bg-gray-900/50 hover:text-red-500'
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  ]"
                >
                  <div class="flex items-center space-x-3">
                    <i :class="[menu.icon, 'w-5']"></i>
                    <span>{{ menu.name }}</span>
                  </div>
                  <i
                    class="fas text-xs transition-transform duration-200"
                    :class="openMenus[menu.name] ? 'fa-chevron-down' : 'fa-chevron-right'"
                  ></i>
                </button>

                <!-- Submenu -->
                <transition name="fade">
                  <ul v-if="openMenus[menu.name]" class="ml-6 mt-2 space-y-1">
                    <li
                      v-for="child in menu.children"
                      :key="child.route"
                    >
                      <router-link
                        :to="{ name: child.route }"
                        :class="[
                          'block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                          isActive(child.route)
                            ? isDark
                              ? 'bg-red-600/30 text-red-400 border-l-2 border-red-600'
                              : 'bg-red-100 text-red-600 border-l-2 border-red-600'
                            : isDark
                            ? 'text-gray-400 hover:bg-gray-900/50 hover:text-red-500'
                            : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        ]"
                      >
                        {{ child.name }}
                      </router-link>
                    </li>
                  </ul>
                </transition>
              </div>
            </li>
          </ul>
        </div>

        <!-- Footer -->
        <div
          :class="[
            'p-4 border-t transition-colors duration-200',
            isDark ? 'border-red-600/20 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
          ]"
        >
          <p :class="['text-xs text-center', isDark ? 'text-gray-500' : 'text-gray-500']">
            © 2026 HooraFlix. All rights reserved.
          </p>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTitle: false,
      openMenus: {},
      isDark: true,

      menuItems: [
        {
          name: "Dashboard",
          icon: "fas fa-chart-line",
          route: "first-dash",
          permission: ""
        },

        {
          name: "User Management",
          icon: "fas fa-users",
          children: [
            { name: "Users", route: "Users-view", permission: "user.view" },
            { name: "Roles", route: "Role-view", permission: "role.view" },
            { name: "Permissions", route: "Permission-view", permission: "permission.view" }
          ]
        },

        {
          name: "Content Management",
          icon: "fas fa-folder",
          children: [
            { name: "Categories", route: "Categories-view", permission: "category.view" },
            { name: "Content Peoples", route: "Contentpeople-view", permission: "" },
            { name: "Content Categories", route: "Contentcategories-view", permission: "" },
            { name: "Peoples", route: "People-view", permission: "" },
            { name: "Contents", route: "Content-view", permission: "" },
            { name: "Media Files", route: "MediaFiles-view", permission: "" }
          ]
        },

        {
          name: "Series Management",
          icon: "fas fa-film",
          children: [
            { name: "Series", route: "Series-view", permission: "" },
            { name: "Seasons", route: "Seasons-view", permission: "" },
            { name: "Episodes", route: "Episodes-view", permission: "" }
          ]
        },

        {
          name: "Pricing Management",
          icon: "fas fa-dollar-sign",
          children: [
            { name: "Pricing Plans", route: "PricingPlans-view", permission: "" },
            { name: "Content Pricing", route: "ContentPricing-view", permission: "" },
            { name: "Content Contract", route: "ContentContract-view", permission: "" }
          ]
        },

        {
          name: "Subscription Management",
          icon: "fas fa-credit-card",
          children: [
            { name: "Subscription Plans", route: "SubscriptionPlans-view", permission: "" },
            { name: "User Subscriptions", route: "UserSubscriptions-view", permission: "" }
          ]
        },

        {
          name: "Creators",
          icon: "fas fa-user-tie",
          route: "Creators-view",
          permission: ""
        },

        {
          name: "Parts",
          icon: "fas fa-cubes",
          children: [
            { name: "Parts", route: "Parts-view", permission: "" }
          ]
        }
      ]
    };
  },

  computed: {
    filteredMenu() {
      return this.menuItems
        .map(menu => {
          if (menu.children) {
            const children = menu.children.filter(child => this.can(child));
            if (children.length) return { ...menu, children };
            return null;
          }
          return this.can(menu) ? menu : null;
        })
        .filter(Boolean);
    }
  },

  methods: {
    can(item) {
      if (!item.permission) return true;
      return this.$hasPermission(item.permission);
    },

    toggleMenu(name) {
      this.openMenus[name] = !this.openMenus[name];
    },

    isActive(route) {
      return this.$route.name === route;
    },

    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem('hooraflix-theme', this.isDark ? 'dark' : 'light');
      this.$root.$emit('theme-changed', this.isDark);
    },

    handleResize() {
      this.showTitle = window.innerWidth < 1024;
    },

    autoOpenMenu() {
      this.menuItems.forEach(menu => {
        if (menu.children) {
          const found = menu.children.find(child =>
            child.route === this.$route.name && this.can(child)
          );
          if (found) this.openMenus[menu.name] = true;
        }
      });
    }
  },

  mounted() {
    this.handleResize();
    this.autoOpenMenu();
    window.addEventListener("resize", this.handleResize);

    // Load theme preference
    const savedTheme = localStorage.getItem('hooraflix-theme');
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    }

    // Listen for theme changes from other components
    this.$root.$on('theme-changed', (isDark) => {
      this.isDark = isDark;
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.$root.$off('theme-changed');
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(220, 38, 38, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(220, 38, 38, 0.5);
}
</style>
