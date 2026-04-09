<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Episodes</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Season Dropdown -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Season</label>
          <select
            v-model="form.season_id"
            required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150"
          >
            <option value="" disabled>Select season</option>
            <option v-if="loadingSeasons" disabled>Loading seasons...</option>
            <option
              v-for="season in seasonsList"
              :key="season.id"
              :value="season.id"
            >
              {{ season.title }} - Season {{ season.season_number }}
            </option>
          </select>
        </div>

        <!-- Episode Details -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <input v-model="form.title" type="text" required class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Episode Number</label>
          <input v-model="form.episode_number" type="number" min="1" required class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input v-model="form.duration" type="number" min="1" required class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Video URL</label>
          <input v-model="form.video_url" type="url" required class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg">Add</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: Object },

  data() {
    return {
      form: {
        season_id: this.data?.season_id || '',
        title: this.data?.title || '',
        episode_number: this.data?.episode_number || '',
        duration: this.data?.duration || '',
        video_url: this.data?.video_url || ''
      },
      seasonsList: [],
      loadingSeasons: false
    };
  },

  mounted() {
    this.fetchSeasons();
  },

  methods: {
    // Fetch all seasons from API
    async fetchSeasons() {
      this.loadingSeasons = true;
      try {
        const params = { page: 1, page_size: 50 }; // adjust as needed
        const response = await this.$apiGet('/seasons', params);
        this.seasonsList = response.data || [];
      } catch (e) {
        console.error("Error fetching seasons:", e);
      } finally {
        this.loadingSeasons = false;
      }
    },

    // Submit new episode
    async submitForm() {
      try {
        const res = await this.$apiPost("/episodes", this.form);

        if (res) {
          this.$root.$refs.toast.showToast('Added successfully', 'success');
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error("Error adding episode:", e);
      }
    }
  }
};
</script>