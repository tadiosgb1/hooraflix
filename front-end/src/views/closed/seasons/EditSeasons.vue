<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Edit Seasons</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Series Dropdown -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Series</label>
          <select
            v-model="form.series_id"
            required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150"
          >
            <option value="" disabled>Select series</option>

            <option v-if="loadingSeries" disabled>Loading series...</option>

            <option
              v-for="series in seriesList"
              :key="series.id"
              :value="series.id"
            >
              {{ series.id }}
            </option>
          </select>
        </div>

        <!-- Season Number -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Season Number</label>
          <input
            v-model="form.season_number"
            type="number"
            min="1"
            required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg">Edit</button>
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
        series_id: this.data?.series_id || '',
        season_number: this.data?.season_number || ''
      },
      seriesList: [],
      loadingSeries: false
    };
  },

  mounted() {
    this.fetchSeries();
  },

  methods: {
    // Fetch all series from API
    async fetchSeries() {
      this.loadingSeries = true;
      try {
        const params = { page: 1, page_size: 50 }; // adjust page_size as needed
        const response = await this.$apiGet('/series', params);
        this.seriesList = response.data || [];
      } catch (e) {
        console.error("Error fetching series:", e);
      } finally {
        this.loadingSeries = false;
      }
    },

    // Submit updated season
    async submitForm() {
      try {
        const res = await this.$apiPut("/seasons", this.data.id, this.form);

        if (res) {
          this.$root.$refs.toast.showToast('Edited successfully', 'success');
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error("Error updating season:", e);
      }
    }
  }
};
</script>