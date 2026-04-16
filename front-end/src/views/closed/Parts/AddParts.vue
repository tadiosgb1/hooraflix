<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Parts</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">
        
        <!-- Series ID -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Series ID</label>
          <input v-model="form.series_id" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
        </div>

        <!-- Title -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <input v-model="form.title" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
        </div>

        <!-- Part Number -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Part Number</label>
          <input v-model="form.part_number" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
        </div>

        <!-- Duration -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Duration</label>
          <input v-model="form.duration" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
        </div>

        <!-- Video Upload -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Video File</label>
          <input 
            type="file" 
            @change="handleFileUpload" 
            accept="video/*"
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
          />
          <p v-if="videoFile" class="text-xs text-gray-500 mt-1">
            Selected: {{ videoFile.name }}
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
  props: { data: Object },

  data() {
    return {
      form: {
        series_id: this.data?.series_id || '',
        title: this.data?.title || '',
        part_number: this.data?.part_number || '',
        duration: this.data?.duration || ''
      },
      videoFile: null // store uploaded file
    };
  },

  methods: {
    // Handle file selection
    handleFileUpload(event) {
      this.videoFile = event.target.files[0];
    },

    // Submit form with multipart/form-data
    async submitForm() {


      try {

        const headers = { "Content-Type": "multipart/form-data" };

        const formData = new FormData();

        // append text fields
        formData.append("series_id", this.form.series_id);
        formData.append("title", this.form.title);
        formData.append("part_number", this.form.part_number);
        formData.append("duration", this.form.duration);

        // append video file
        if (this.videoFile) {
          formData.append("video", this.videoFile);
        }

        let res;

        // Add or Edit
        if ("Add" === "Add") {
          res = await this.$apiPost("/parts/upload", formData, headers);
          if (res) {
            this.$root.$refs.toast.showToast('Added successfully', 'success');
          }
        } else {
          res = await this.$apiPatch("/parts/upload", this.data.id, formData,headers);
          if (res) {
            this.$root.$refs.toast.showToast('Edited successfully', 'success');
          }
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