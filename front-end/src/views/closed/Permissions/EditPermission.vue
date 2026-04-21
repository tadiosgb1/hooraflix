<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-sm p-6 text-sm">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-primary">Edit Permission</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-dprimary text-2xl leading-none">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            required 
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm transition duration-150" 
          />
        </div>

        <!-- Codename -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Codename</label>
          <input 
            v-model="form.codename" 
            type="text" 
            required 
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm transition duration-150" 
          />
        </div>

        <!-- Module -->
        <!-- <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Module</label>
          <input 
            v-model="form.content_type" 
            type="text" 
            required 
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-red-600 shadow-sm transition duration-150" 
          />
        </div> -->

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition duration-150 text-gray-500 hover:text-dprimary hover:border-dprimary transition duration-150"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition duration-150"
          >
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
        name: this.data?.name || '',
        codename: this.data?.codename || '',
        content_type: this.data?.content_type || ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // PUT request for edit
        const res = await this.$apiPatch("/permissions", this.data.id, this.form);
        if(res){
          this.$root.$refs.toast.showToast('Edited successfully', 'success');
        }
        this.$emit("saved");
        this.$emit("close");
      } catch (e) { console.error(e); }
    }
  }
}
</script>

