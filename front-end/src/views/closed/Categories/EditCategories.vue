
<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-black/90 border border-red-600/20 rounded-2xl shadow-2xl w-full max-w-md p-8 text-sm">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 border-b border-red-600/20 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-white">Edit Category</h2>
          <p class="text-gray-400 text-xs mt-1">Update category information</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white transition duration-150 text-2xl">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-5">
        
        <div>
          <label class="block mb-2 text-sm font-semibold text-gray-300">Category Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            required 
            placeholder="e.g., Action, Drama, Comedy"
            class="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition duration-150 shadow-sm" 
          />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-900/50 transition duration-150 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition duration-150 shadow-md"
          >
            Update Category
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
        name: this.data?.name || ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        if ("Edit" === "Add") {
        const res= await this.$apiPost("/categories", this.form);
        if(res){
           this.$root.$refs.toast.showToast('Added successfully', 'success');
         }

        } else {
         const res= await this.$apiPut("/categories",this.data.id ,this.form);
         if(res){
           this.$root.$refs.toast.showToast('Edited successfully', 'success');
         }
        }
        this.$emit("saved");
        this.$emit("close");
      } catch (e) { console.error(e); }
    }
  }
}
</script>

