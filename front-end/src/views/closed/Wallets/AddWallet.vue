
<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-sm p-6 text-sm">
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-white ">Add Wallet </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-500">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">User_id</label>
          <input v-model="form.user_id" type="text" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Balance</label>
          <input v-model="form.balance" type="text" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Pending_commission</label>
          <input v-model="form.pending_commission" type="text" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-300">Currency</label>
          <input v-model="form.currency" type="text" required class="border border-gray-600 bg-gray-900/50 rounded-lg px-4 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition duration-150" />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition duration-150">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-150 shadow-md">Add</button>
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
        user_id: this.data?.user_id || '',
balance: this.data?.balance || '',
pending_commission: this.data?.pending_commission || '',
currency: this.data?.currency || ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        if ("Add" === "Add") {
        const res= await this.$apiPost("/wallet", this.form);
        if(res){
           this.$root.$refs.toast.showToast('Added successfully', 'success');
         }

        } else {
         const res= await this.$apiPut("/wallet",this.data.id ,this.form);
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


