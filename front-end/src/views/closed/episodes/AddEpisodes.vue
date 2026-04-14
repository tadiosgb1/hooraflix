<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Episode</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Season -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Season</label>
          <select v-model="form.season_id" required class="input">
            <option value="" disabled>Select season</option>
            <option v-if="loadingSeasons" disabled>Loading...</option>
            <option v-for="season in seasonsList" :key="season.id" :value="season.id">
              {{ season.title }} - Season {{ season.season_number }}
            </option>
          </select>
        </div>

        <!-- Title -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <input v-model="form.title" type="text" required class="input" />
        </div>

        <!-- Episode Number -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Episode Number</label>
          <input v-model="form.episode_number" type="number" min="1" required class="input" />
        </div>

        <!-- Duration -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input v-model="form.duration" type="number" min="1" required class="input" />
        </div>

        <!-- Video Upload -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            @change="handleFile"
            required
            class="input"
          />

          <p v-if="form.video" class="text-xs text-gray-500 mt-1">
            Selected: {{ form.video.name }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg">
            Add
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        season_id: '',
        title: '',
        episode_number: '',
        duration: '',
        video: null
      },
      seasonsList: [],
      loadingSeasons: false
    };
  },

  mounted() {
    this.fetchSeasons();
  },

  methods: {

    async fetchSeasons() {
      this.loadingSeasons = true;
      try {
        const res = await this.$apiGet('/seasons', { page: 1, page_size: 50 });
        this.seasonsList = res.data || [];
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingSeasons = false;
      }
    },

    handleFile(e) {
      const file = e.target.files[0];
      console.log("SELECTED FILE:", file);

      this.form.video = file;
    },

    async submitForm() {
      try {
        const formData = new FormData();
       const headers={
          "Content-Type": "multipart/form-data"
        };
       
        formData.append("season_id", this.form.season_id);
        formData.append("title", this.form.title);
        formData.append("episode_number", this.form.episode_number);
        formData.append("duration", this.form.duration);

        // ✅ IMPORTANT: ensure real file
        if (this.form.video instanceof File) {
          formData.append("video", this.form.video);
        } else {
          throw new Error("Invalid video file");
        }

        // 🔥 DEBUG
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        // ❌ DO NOT pass Content-Type manually
        const res = await this.$apiPost("/episodes/upload", formData,headers);

        if (res) {
          this.$root.$refs.toast.showToast("Added successfully", "success");
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error("Upload error:", e);
      }
    }
  }
};
</script>

<style scoped>
.input {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  width: 100%;
}
</style>