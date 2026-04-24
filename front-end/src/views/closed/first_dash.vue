<template>
  <div :class="['min-h-screen transition-colors duration-200', isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900']">
    <!-- Header -->
    <header :class="['px-8 py-6 border-b transition-colors duration-200', isDark ? 'bg-gradient-to-r from-black to-gray-900/50 border-red-600/20' : 'bg-gradient-to-r from-white to-gray-50 border-gray-200']">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 :class="['text-4xl font-bold tracking-tight', isDark ? 'text-white' : 'text-gray-900']">Executive Overview</h1>
          <p :class="['mt-2', isDark ? 'text-gray-400' : 'text-gray-600']">SaaS Platform Performance & Ecosystem Health</p>
        </div>
        
        <div class="flex items-center gap-3">
          <div :class="['p-1 rounded-xl border flex', isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-100 border-gray-300']">
            <button :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all', isDark ? 'bg-red-600 text-white' : 'bg-red-600 text-white']">Live View</button>
            <button :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all', isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900']">Analytics</button>
          </div>
          <button :class="['px-5 py-2.5 rounded-xl font-bold text-sm transition-all', isDark ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700']">
            Export Report
          </button>
        </div>
      </div>
    </header>

    <!-- Content -->
    <div class="px-8 py-12">
      <div class="max-w-7xl mx-auto">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div v-for="stat in topStats" :key="stat.label" :class="['p-6 rounded-2xl border transition-all duration-200 relative overflow-hidden group', isDark ? 'bg-gray-900/50 border-red-600/20 hover:border-red-600/50' : 'bg-white border-gray-200 hover:border-red-600/50']">
            <div class="relative z-10">
              <p :class="['text-xs font-bold uppercase tracking-widest mb-2', isDark ? 'text-gray-500' : 'text-gray-600']">{{ stat.label }}</p>
              <h3 :class="['text-3xl font-bold', isDark ? 'text-white' : 'text-gray-900']">{{ stat.value }}</h3>
              <div :class="['flex items-center text-xs font-bold mt-3', stat.trendUp ? isDark ? 'text-green-400' : 'text-green-600' : isDark ? 'text-red-400' : 'text-red-600']">
                <span>{{ stat.trendUp ? '↑' : '↓' }} {{ stat.percentage }}%</span>
                <span :class="['ml-2 font-normal italic', isDark ? 'text-gray-600' : 'text-gray-500']">vs last month</span>
              </div>
            </div>
            <div :class="['absolute -right-4 -bottom-4 w-20 h-20 rounded-full blur-2xl transition-all', isDark ? 'bg-red-600/5 group-hover:bg-red-600/10' : 'bg-red-600/5 group-hover:bg-red-600/10']"></div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Revenue Chart -->
          <div :class="['lg:col-span-2 rounded-2xl p-8 border transition-colors duration-200', isDark ? 'bg-gray-900/50 border-red-600/20' : 'bg-white border-gray-200']">
            <div class="flex items-center justify-between mb-8">
              <h2 :class="['text-xl font-bold', isDark ? 'text-white' : 'text-gray-900']">Revenue Distribution</h2>
              <select :class="['rounded-lg text-xs font-bold px-3 py-1.5 transition-colors duration-200', isDark ? 'bg-gray-800 border border-gray-700 text-white focus:ring-red-500' : 'bg-gray-100 border border-gray-300 text-gray-900 focus:ring-red-500']">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>
            
            <div class="h-64 w-full flex items-end justify-between gap-2 px-2">
              <div v-for="(h, i) in [40, 70, 45, 90, 65, 80, 100, 55, 75, 85, 60, 95]" :key="i" 
                   class="w-full bg-gradient-to-t from-red-600/20 to-red-600 rounded-t-sm transition-all hover:scale-110 cursor-pointer"
                   :style="{ height: h + '%' }">
              </div>
            </div>
            <div class="flex justify-between mt-4 text-[10px] font-bold uppercase tracking-tighter" :class="isDark ? 'text-gray-600' : 'text-gray-500'">
              <span>Week 01</span><span>Week 02</span><span>Week 03</span><span>Week 04</span>
            </div>
          </div>

          <!-- Library Health -->
          <div :class="['rounded-2xl p-8 border transition-colors duration-200', isDark ? 'bg-gray-900/50 border-red-600/20' : 'bg-white border-gray-200']">
            <h2 :class="['text-xl font-bold mb-6', isDark ? 'text-white' : 'text-gray-900']">Library Health</h2>
            <div class="space-y-6">
              <div v-for="item in contentMix" :key="item.type">
                <div class="flex justify-between text-sm mb-2">
                  <span :class="['font-medium', isDark ? 'text-gray-400' : 'text-gray-600']">{{ item.type }}</span>
                  <span :class="['font-bold', isDark ? 'text-white' : 'text-gray-900']">{{ item.count }}</span>
                </div>
                <div :class="['w-full rounded-full h-2', isDark ? 'bg-gray-800' : 'bg-gray-200']">
                  <div class="bg-red-600 h-2 rounded-full" :style="{ width: item.percent + '%' }"></div>
                </div>
              </div>
            </div>

            <div :class="['mt-10 p-4 rounded-2xl border', isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200']">
              <p :class="['text-xs font-bold uppercase mb-3', isDark ? 'text-gray-500' : 'text-gray-600']">Top Affiliate This Week</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-black font-bold">T</div>
                <div>
                  <p :class="['text-sm font-bold', isDark ? 'text-white' : 'text-gray-900']">Top Trainer</p>
                  <p class="text-xs text-green-500">+24 New Trainees</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div :class="['lg:col-span-3 rounded-2xl border overflow-hidden transition-colors duration-200', isDark ? 'bg-gray-900/50 border-red-600/20' : 'bg-white border-gray-200']">
            <div :class="['p-8 border-b flex justify-between items-center', isDark ? 'border-gray-700' : 'border-gray-200']">
              <h2 :class="['text-xl font-bold', isDark ? 'text-white' : 'text-gray-900']">Recent Activity</h2>
              <button :class="['text-sm font-bold hover:underline', isDark ? 'text-red-500' : 'text-red-600']">View All Logs</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr :class="['text-[11px] uppercase tracking-widest font-bold', isDark ? 'text-gray-500 bg-gray-800/50' : 'text-gray-600 bg-gray-50']">
                    <th class="px-8 py-4">Entity / User</th>
                    <th class="px-8 py-4">Category</th>
                    <th class="px-8 py-4">Transaction</th>
                    <th class="px-8 py-4">Commission</th>
                    <th class="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr v-for="(row, idx) in recentActivity" :key="idx" :class="['border-t transition-colors duration-200', isDark ? 'border-gray-700/50 hover:bg-gray-800/30' : 'border-gray-200 hover:bg-gray-50']">
                    <td class="px-8 py-4">
                      <div :class="['font-bold', isDark ? 'text-white' : 'text-gray-900']">{{ row.name }}</div>
                    </td>
                    <td class="px-8 py-4">
                      <span :class="['px-3 py-1 rounded-full text-xs font-semibold', row.category === 'Subscription' ? isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700' : isDark ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700']">
                        {{ row.category }}
                      </span>
                    </td>
                    <td :class="['px-8 py-4', isDark ? 'text-gray-400' : 'text-gray-600']">{{ row.transaction }}</td>
                    <td :class="['px-8 py-4 font-bold', isDark ? 'text-green-400' : 'text-green-600']">{{ row.commission }}</td>
                    <td class="px-8 py-4">
                      <span :class="['px-3 py-1 rounded-full text-xs font-semibold', row.status === 'Completed' ? isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-700' : isDark ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700']">
                        {{ row.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuperDashboard",

  data() {
    return {
      // ✅ simple static theme (no syncing, no crash)
      isDark: true,

      topStats: [
        { label: "Total Revenue", value: "482,900 ETB", percentage: "12.5", trendUp: true },
        { label: "Active Trainees", value: "1,240", percentage: "8.2", trendUp: true },
        { label: "Content Sales", value: "8,432", percentage: "3.1", trendUp: false },
        { label: "Affiliate Payouts", value: "42,000 ETB", percentage: "22.4", trendUp: true },
      ],

      contentMix: [
        { type: "Movies (PPV)", count: "1,240 Titles", percent: 85 },
        { type: "Music Albums", count: "4,820 Tracks", percent: 65 },
        { type: "Training Modules", count: "156 Courses", percent: 40 },
        { type: "Partner Companies", count: "42 Vendors", percent: 25 },
      ],

      recentActivity: [
        { name: "Global Film Studio", category: "Subscription", transaction: "Movie Sale", commission: "250.00 ETB", status: "Completed" },
        { name: "Abebe Kebede", category: "Training", transaction: "Course Enrollment", commission: "180.00 ETB", status: "Completed" },
        { name: "Melody Records", category: "Subscription", transaction: "Album Access", commission: "45.00 ETB", status: "Pending" },
        { name: "Sara Tech-Academy", category: "Training", transaction: "Module Listing", commission: "500.00 ETB", status: "Completed" },
      ]
    };
  }
};
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(220, 38, 38, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(220, 38, 38, 0.5);
}
</style>
