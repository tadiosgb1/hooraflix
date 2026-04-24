<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl border border-red-600/30 w-full max-w-sm p-6 text-sm">
      <div class="flex justify-between items-center mb-4 border-b border-red-600/30 pb-2">
        <h2 class="text-lg font-semibold text-white">Edit Pricing Plan</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-red-500 transition text-xl leading-none">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="field-label">Name</label>
          <input v-model="form.name" type="text" required placeholder="e.g. Basic Rental" class="field-input" />
        </div>
        <div>
          <label class="field-label">Billing Type</label>
          <select v-model="form.billing_type" required class="field-input">
            <option value="" disabled>Select type</option>
            <option value="rental">Rental</option>
            <option value="subscription">Subscription</option>
            <option value="one_time">One Time</option>
            <option value="free">Free</option>
          </select>
        </div>
        <div>
          <label class="field-label">Price</label>
          <input v-model.number="form.price" type="number" min="0" step="0.01" required placeholder="0.00" class="field-input" />
        </div>
        <div>
          <label class="field-label">Duration (hours)</label>
          <input v-model.number="form.duration_hours" type="number" min="0" required placeholder="e.g. 48" class="field-input" />
        </div>
        <div>
          <label class="field-label">Ads Enabled</label>
          <div class="flex gap-3 mt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" :value="true" v-model="form.ad_enabled" class="accent-red-600" />
              <span class="text-gray-300 text-sm">Yes</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" :value="false" v-model="form.ad_enabled" class="accent-red-600" />
              <span class="text-gray-300 text-sm">No</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition">Cancel</button>
          <button type="submit" :disabled="submitting" class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg font-medium transition shadow-md">
            {{ submitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.field-label { @apply block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide; }
.field-input { @apply border border-gray-600 bg-gray-900/50 rounded-lg px-3 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition; }
</style>

<script>
export default {
  props: { data: Object },
  data() {
    return {
      submitting: false,
      form: {
        name:           this.data?.name           || '',
        billing_type:   this.data?.billing_type   || '',
        price:          this.data?.price          != null ? Number(this.data.price) : null,
        duration_hours: this.data?.duration_hours != null ? Number(this.data.duration_hours) : null,
        ad_enabled:     this.data?.ad_enabled     ?? false,
      },
    };
  },
  methods: {
    async submitForm() {
      this.submitting = true;
      try {
        const res = await this.$apiPut('/pricing-plans', this.data.id, {
          ...this.form,
          price:          Number(this.form.price),
          duration_hours: Number(this.form.duration_hours),
          ad_enabled:     Boolean(this.form.ad_enabled),
        });
        if (res) this.$root.$refs.toast.showToast('Updated successfully', 'success');
        this.$emit('saved');
        this.$emit('close');
      } catch(e) { console.error(e); }
      finally { this.submitting = false; }
    },
  },
};
</script>
