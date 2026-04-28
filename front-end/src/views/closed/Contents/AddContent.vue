<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl w-full max-w-2xl border border-red-600/30 max-h-[92vh] overflow-y-auto">

      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-red-600/30 sticky top-0 bg-gray-900/95 z-10">
        <h2 class="text-base font-semibold text-white">Add Content</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-red-500 transition duration-150 text-xl leading-none">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="p-6 space-y-6">

        <!-- Basic Info -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Title</label>
            <input v-model="form.title" type="text" required placeholder="e.g. The Lion King"
              class="input-field" />
          </div>
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Release Date</label>
            <input v-model="form.release_date" type="date" required class="input-field" />
          </div>
          <div class="sm:col-span-2">
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Description</label>
            <textarea v-model="form.description" rows="3" required placeholder="Brief description..."
              class="input-field resize-none"></textarea>
          </div>
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Duration (min)</label>
            <input v-model="form.duration" type="number" min="1" placeholder="e.g. 120" class="input-field" />
          </div>
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Language</label>
            <input v-model="form.language" type="text" placeholder="e.g. English" class="input-field" />
          </div>
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Country</label>
            <input v-model="form.country" type="text" placeholder="e.g. Ethiopia" class="input-field" />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2 border-t border-gray-800">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 text-sm transition duration-150">
            Cancel
          </button>
          <button type="submit" :disabled="submitting"
            class="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg font-medium text-sm transition duration-150 shadow-md">
            {{ submitting ? 'Saving...' : 'Add Content' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply border border-gray-600 bg-gray-900/50 rounded-lg px-3 py-2 text-sm w-full text-white placeholder-gray-500
         focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150;
}
</style>

<script>
export default {
  props: { data: Object },

  data() {
    return {
      submitting: false,

      form: {
        title:        this.data?.title        || '',
        description:  this.data?.description  || '',
        content_type: this.data?.content_type || 'full_movie',
        release_date: this.data?.release_date || '',
        duration:     this.data?.duration     || '',
        language:     this.data?.language     || '',
        country:      this.data?.country      || '',
      },
    };
  },

  methods: {
    async submitForm() {
      this.submitting = true;
      try {
        const payload = {
          title:        this.form.title,
          description:  this.form.description,
          content_type: this.form.content_type,
          release_date: this.form.release_date,
          duration:     this.form.duration,
          language:     this.form.language,
          country:      this.form.country,
        };

        const res = await this.$apiPost('/content', payload);
        if (res) {
          this.$root.$refs.toast.showToast('Content added successfully', 'success');
          this.$emit('saved');
          this.$emit('close');
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
