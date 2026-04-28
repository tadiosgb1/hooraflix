<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl w-full max-w-md border border-red-600/30 max-h-[92vh] flex flex-col">

      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-red-600/30 shrink-0">
        <h2 class="text-base font-semibold text-white">Add Subscription Plan</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-red-500 transition duration-150 text-xl leading-none">&times;</button>
      </div>

      <!-- Scrollable body -->
      <div class="overflow-y-auto flex-1 px-6 py-5">
        <form @submit.prevent="submitForm" class="space-y-4" id="sub-plan-form">

          <!-- Name -->
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Name</label>
            <input v-model="form.name" type="text" required placeholder="e.g. Basic Plan" class="input-field" />
          </div>

          <!-- Description -->
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Description</label>
            <textarea v-model="form.description" rows="3" placeholder="Brief description..." class="input-field resize-none"></textarea>
          </div>

          <!-- Price -->
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Price</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input v-model.number="form.price" type="number" min="0" step="0.01" required placeholder="0.00" class="input-field pl-7" />
            </div>
          </div>

          <!-- Duration Days & Device Limit -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Duration (days)</label>
              <input v-model.number="form.duration_days" type="number" min="1" required placeholder="e.g. 30" class="input-field" />
            </div>
            <div>
              <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Device Limit</label>
              <input v-model.number="form.device_limit" type="number" min="1" required placeholder="e.g. 2" class="input-field" />
            </div>
          </div>

          <!-- Included PPV Credits -->
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Included PPV Credits</label>
            <input v-model.number="form.included_ppv_credits" type="number" min="0" placeholder="e.g. 5" class="input-field" />
          </div>

          <!-- Has Ads (boolean toggle) -->
          <div class="flex items-center justify-between bg-gray-900/40 border border-gray-700/60 rounded-xl px-4 py-3">
            <div>
              <p class="text-sm font-medium text-gray-200">Has Ads</p>
              <p class="text-xs text-gray-500 mt-0.5">Show advertisements to subscribers on this plan</p>
            </div>
            <button type="button" @click="form.has_ads = !form.has_ads"
              :class="['relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none',
                form.has_ads ? 'bg-red-600' : 'bg-gray-700']">
              <span :class="['pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200',
                form.has_ads ? 'translate-x-5' : 'translate-x-0']" />
            </button>
          </div>

        </form>
      </div>

      <!-- Footer actions -->
      <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-800 shrink-0">
        <button type="button" @click="$emit('close')"
          class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 text-sm transition duration-150">
          Cancel
        </button>
        <button type="submit" form="sub-plan-form" :disabled="submitting"
          class="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg font-medium text-sm transition duration-150 shadow-md">
          {{ submitting ? 'Saving...' : 'Add Plan' }}
        </button>
      </div>

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
        name:                 this.data?.name                 || '',
        description:          this.data?.description          || '',
        price:                this.data?.price                ?? null,
        duration_days:        this.data?.duration_days        ?? null,
        device_limit:         this.data?.device_limit         ?? null,
        has_ads:              this.data?.has_ads              ?? false,
        included_ppv_credits: this.data?.included_ppv_credits ?? null,
      },
    };
  },

  methods: {
    async submitForm() {
      this.submitting = true;
      try {
        const res = await this.$apiPost('/subscription-plans', this.form);
        if (res) {
          this.$root.$refs.toast.showToast('Added successfully', 'success');
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
