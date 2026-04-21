<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-sm p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-white">Edit MediaFiles</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-500">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Content ID -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Content ID</label>
          <input v-model="form.content_id" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm" />
        </div>

        <!-- File Type -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">File Type</label>
          <input v-model="form.file_type" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm" />
        </div>

        <!-- Quality -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Quality</label>
          <input v-model="form.quality" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm" />
        </div>

        <!-- Current File -->
        <div v-if="data?.file_url">
          <label class="block mb-1 text-sm font-medium text-gray-300">Current File</label>
          <p class="text-xs text-gray-500 break-all">{{ data.file_url }}</p>
        </div>

        <!-- Upload New File -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Replace File</label>
          <input 
            type="file"
            @change="handleFileUpload"
            accept="video/*,image/*"
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
          />

          <p v-if="file" class="text-xs text-gray-500 mt-1">
            Selected: {{ file.name }}
          </p>
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
        content_id: this.data?.content_id || '',
        file_type: this.data?.file_type || '',
        quality: this.data?.quality || ''
      },
      file: null // 👈 new uploaded file
    };
  },

  methods: {
    // Handle file select
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    // Submit form
    async submitForm() {
      try {
        const formData = new FormData();

        // append text fields
        formData.append("content_id", this.form.content_id);
        formData.append("file_type", this.form.file_type);
        formData.append("quality", this.form.quality);

        // append file only if selected
        if (this.file) {
          formData.append("video", this.file); // ⚠️ match backend key
        }

        const headers = { "Content-Type": "multipart/form-data" };
        const res = await this.$apiPatch("/media-files/upload", this.data.id, formData, headers);

        if (res) {
          this.$root.$refs.toast.showToast('Edited successfully', 'success');
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

