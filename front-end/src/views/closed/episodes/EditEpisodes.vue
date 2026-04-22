<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-sm p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-white">Edit Episodes</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-500">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Season -->
        <div>
          <label class="block mb-1 font-medium text-gray-300">Season</label>
          <select v-model="form.season_id" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150">
            <option value="" disabled>Select season</option>
            <option v-if="loadingSeasons" disabled>Loading seasons...</option>
            <option v-for="season in seasonsList" :key="season.id" :value="season.id">
              {{ season.title }} - Season {{ season.season_number }}
            </option>
          </select>
        </div>

        <!-- Title -->
        <div>
          <label class="block mb-1 font-medium text-gray-300">Title</label>
          <input v-model="form.title" type="text" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
        </div>

        <!-- Episode Number -->
        <div>
          <label class="block mb-1 font-medium text-gray-300">Episode Number</label>
          <input v-model="form.episode_number" type="number" min="1" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
        </div>

        <!-- Duration -->
        <div>
          <label class="block mb-1 font-medium text-gray-300">Duration (minutes)</label>
          <input v-model="form.duration" type="number" min="1" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
        </div>

        <!-- ✅ VIDEO FILE UPLOAD -->
        <div>
          <label class="block mb-1 font-medium text-gray-300">Upload Video</label>
          <input 
            type="file" 
            accept="video/*"
            @change="handleFileUpload"
            class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150 file:text-gray-300 file:bg-gray-800 file:border-0 file:rounded file:mr-2"
          />

          <!-- Preview -->
          <video 
            v-if="previewVideo" 
            :src="previewVideo" 
            controls 
            class="mt-2 w-full rounded-lg"
          ></video>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition duration-150">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg">
            Edit
          </button>
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
        video: null, // ✅ file instead of video_url
      },
      previewVideo: this.data?.video_url || null, // show existing
      seasonsList: [],
      loadingSeasons: false
    };
  },

  mounted() {
    this.fetchSeasons();
  },

  methods: {

    handleFileUpload(e) {
      const file = e.target.files[0];
      if (file) {
        this.form.video = file;
        this.previewVideo = URL.createObjectURL(file);
      }
    },

    async fetchSeasons() {
      this.loadingSeasons = true;
      try {
        const params = { page: 1, page_size: 50 };
        const response = await this.$apiGet('/seasons', params);
        this.seasonsList = response.data || [];
      } catch (e) {
        console.error("Error fetching seasons:", e);
      } finally {
        this.loadingSeasons = false;
      }
    },

    async submitForm() {
      try {
        const formData = new FormData();

        formData.append("season_id", this.form.season_id);
        formData.append("title", this.form.title);
        formData.append("episode_number", this.form.episode_number);
        formData.append("duration", this.form.duration);

        // ✅ send file as "video"
        if (this.form.video) {
          formData.append("video", this.form.video);
        }

        const res = await this.$apiPut(
          "/episodes",
          this.data.id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );

        if (res) {
          this.$root.$refs.toast.showToast('Edited successfully', 'success');
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error("Error updating episode:", e);
      }
    }
  }
};
</script>

<style scoped>
.input {
  @apply border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150;
}
</style>

