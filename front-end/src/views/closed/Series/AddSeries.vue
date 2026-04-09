<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Series</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          &times;
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Content Dropdown -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Content</label>
          <select
            v-model="form.content_id"
            required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition duration-150"
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
            class="px-4 py-2 border rounded-lg"
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