<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-sm p-6 text-sm">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-white">Add Series</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-500">
          &times;
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Content Dropdown -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Content</label>
          <select
            v-model="form.content_id"
            required
            class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150"
          >
            <option value="" disabled>Select content</option>

            <option v-if="loadingContents" disabled>
              Loading contents...
            </option>

            <option
              v-for="item in contents"
              :key="item.id"
              :value="item.id"
            >
              {{ item.title }} ({{ item.content_type }})
            </option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition duration-150"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Add
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
        content_id: this.data?.content_id || ''
      },
      contents: [],
      loadingContents: false
    };
  },

  mounted() {
    this.fetchContents();
  },

  methods: {
    async fetchContents() {
      this.loadingContents = true;
      try {
        const params = {
          page: 1,
          page_size: 50
        };

        const response = await this.$apiGet('/content', params);

        // API structure: { data: [...] }
        this.contents = response.data || [];

      } catch (e) {
        console.error("Error fetching contents:", e);
      } finally {
        this.loadingContents = false;
      }
    },

    async submitForm() {
      try {
        let res;

        if (!this.data) {
          // Add
          res = await this.$apiPost("/series", this.form);
          if (res) {
            this.$root.$refs.toast.showToast('Added successfully', 'success');
          }
        } else {
          // Edit
          res = await this.$apiPut("/series", this.data.id, this.form);
          if (res) {
            this.$root.$refs.toast.showToast('Edited successfully', 'success');
          }
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error("Error saving series:", e);
      }
    }
  }
};
</script>

