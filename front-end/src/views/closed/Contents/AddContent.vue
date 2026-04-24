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
          <div>
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Rating</label>
            <input v-model="form.rating" type="text" placeholder="e.g. PG-13" class="input-field" />
          </div>
        </div>

        <!-- Content Type -->
        <div>
          <label class="block mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Content Type</label>
          <div class="grid grid-cols-3 gap-3">
            <button v-for="ct in contentTypes" :key="ct.value" type="button"
              @click="form.content_type = ct.value"
              :class="['flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl border text-xs font-medium transition duration-150',
                form.content_type === ct.value
                  ? 'border-red-500 bg-red-600/20 text-white'
                  : 'border-gray-700 bg-gray-900/40 text-gray-400 hover:border-gray-500']">
              <span class="text-lg">{{ ct.icon }}</span>
              <span>{{ ct.label }}</span>
            </button>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <label class="block mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Categories</label>
          <div v-if="loadingCategories" class="text-gray-500 text-xs py-2">Loading categories...</div>
          <div v-else class="flex flex-wrap gap-2">
            <button v-for="cat in categories" :key="cat.id" type="button"
              @click="toggleCategory(cat.id)"
              :class="['px-3 py-1.5 rounded-full text-xs font-medium border transition duration-150',
                form.category_ids.includes(cat.id)
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500']">
              {{ cat.name }}
            </button>
            <span v-if="categories.length === 0" class="text-gray-600 text-xs italic">No categories found</span>
          </div>
        </div>

        <!-- Pricing Option -->
        <div>
          <label class="block mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">Pricing Option</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button v-for="opt in pricingOptions" :key="opt.value" type="button"
              @click="selectPricingOption(opt.value)"
              :class="['flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl border text-xs font-medium transition duration-150',
                form.pricing_option === opt.value
                  ? 'border-red-500 bg-red-600/20 text-white'
                  : 'border-gray-700 bg-gray-900/40 text-gray-400 hover:border-gray-500']">
              <span class="text-lg">{{ opt.icon }}</span>
              <span>{{ opt.label }}</span>
            </button>
          </div>

          <!-- Pricing Plan (Rental / Forever) -->
          <div v-if="form.pricing_option === 'rental' || form.pricing_option === 'forever'" class="mt-3">
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Pricing Plan</label>
            <div v-if="loadingPricingPlans" class="text-gray-500 text-xs py-2">Loading plans...</div>
            <select v-else v-model="form.pricing_plan_id" required class="input-field">
              <option value="" disabled>Select a pricing plan</option>
              <option v-for="plan in pricingPlans" :key="plan.id" :value="plan.id">
                {{ plan.name }} — {{ plan.price }} ({{ plan.billing_type }})
              </option>
            </select>
          </div>

          <!-- Subscription Plan -->
          <div v-if="form.pricing_option === 'subscription'" class="mt-3">
            <label class="block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide">Subscription Plan</label>
            <div v-if="loadingSubscriptionPlans" class="text-gray-500 text-xs py-2">Loading plans...</div>
            <select v-else v-model="form.subscription_plan_id" required class="input-field">
              <option value="" disabled>Select a subscription plan</option>
              <option v-for="plan in subscriptionPlans" :key="plan.id" :value="plan.id">
                {{ plan.name }} — {{ plan.price }} / {{ plan.duration_days }}d
              </option>
            </select>
          </div>
        </div>

        <!-- Content People -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-medium text-gray-400 uppercase tracking-wide">Content People</label>
            <button type="button" @click="addPerson"
              class="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition duration-150">
              <span class="text-base leading-none">+</span> Add Person
            </button>
          </div>
          <div v-if="loadingPeople" class="text-gray-500 text-xs py-2">Loading people...</div>
          <div v-else class="space-y-2">
            <div v-for="(entry, idx) in form.people" :key="idx"
              class="flex gap-2 items-center bg-gray-900/40 border border-gray-700/60 rounded-xl px-3 py-2">
              <select v-model="entry.person_id" class="input-field flex-1 min-w-0">
                <option value="" disabled>Select person</option>
                <option v-for="p in people" :key="p.id" :value="p.id">{{ p.full_name }}</option>
              </select>
              <input v-model="entry.role" type="text" placeholder="Role (e.g. Director)"
                class="input-field w-36 shrink-0" />
              <button type="button" @click="removePerson(idx)"
                class="text-gray-600 hover:text-red-500 transition duration-150 text-lg leading-none shrink-0">&times;</button>
            </div>
            <p v-if="form.people.length === 0" class="text-gray-600 text-xs italic">No people added yet.</p>
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
      loadingCategories: false,
      loadingPricingPlans: false,
      loadingSubscriptionPlans: false,
      loadingPeople: false,

      categories: [],
      pricingPlans: [],
      subscriptionPlans: [],
      people: [],

      contentTypes: [
        { value: 'full_movie', label: 'Full Movie', icon: '🎬' },
        { value: 'series',     label: 'Series',     icon: '📺' },
        { value: 'part_based', label: 'Part Based',  icon: '🎞️' },
      ],

      pricingOptions: [
        { value: 'free',         label: 'Free',         icon: '🆓' },
        { value: 'rental',       label: 'Rental',        icon: '🎟️' },
        { value: 'subscription', label: 'Subscription',  icon: '🔄' },
        { value: 'forever',      label: 'Forever',       icon: '♾️' },
      ],

      form: {
        title: this.data?.title || '',
        description: this.data?.description || '',
        content_type: this.data?.content_type || 'full_movie',
        release_date: this.data?.release_date || '',
        duration: this.data?.duration || '',
        language: this.data?.language || '',
        country: this.data?.country || '',
        rating: this.data?.rating || '',
        category_ids: [],
        pricing_option: this.data?.pricing_option || 'free',
        pricing_plan_id: this.data?.pricing_plan_id || '',
        subscription_plan_id: this.data?.subscription_plan_id || '',
        people: [],  // [{ person_id, role }]
      },
    };
  },

  methods: {
    toggleCategory(id) {
      const idx = this.form.category_ids.indexOf(id);
      if (idx === -1) this.form.category_ids.push(id);
      else this.form.category_ids.splice(idx, 1);
    },

    selectPricingOption(val) {
      this.form.pricing_option = val;
      this.form.pricing_plan_id = '';
      this.form.subscription_plan_id = '';
    },

    addPerson() {
      this.form.people.push({ person_id: '', role: '' });
    },

    removePerson(idx) {
      this.form.people.splice(idx, 1);
    },

    async fetchCategories() {
      this.loadingCategories = true;
      try {
        const res = await this.$apiGet('/categories');
        this.categories = res.data || res || [];
      } catch (e) { console.error(e); }
      finally { this.loadingCategories = false; }
    },

    async fetchPricingPlans() {
      this.loadingPricingPlans = true;
      try {
        const res = await this.$apiGet('/pricing-plans', { page_size: 100 });
        this.pricingPlans = res.data || res || [];
      } catch (e) { console.error(e); }
      finally { this.loadingPricingPlans = false; }
    },

    async fetchSubscriptionPlans() {
      this.loadingSubscriptionPlans = true;
      try {
        const res = await this.$apiGet('/subscription-plans', { page_size: 100 });
        this.subscriptionPlans = res.data || res || [];
      } catch (e) { console.error(e); }
      finally { this.loadingSubscriptionPlans = false; }
    },

    async fetchPeople() {
      this.loadingPeople = true;
      try {
        const res = await this.$apiGet('/people', { page_size: 200 });
        this.people = res.data || res || [];
      } catch (e) { console.error(e); }
      finally { this.loadingPeople = false; }
    },

    async submitForm() {
      this.submitting = true;
      try {
        const payload = {
          title: this.form.title,
          description: this.form.description,
          content_type: this.form.content_type,
          release_date: this.form.release_date,
          duration: this.form.duration,
          language: this.form.language,
          country: this.form.country,
          rating: this.form.rating,
          category_ids: this.form.category_ids,
          pricing_option: this.form.pricing_option,
          pricing_plan_id: this.form.pricing_plan_id || null,
          subscription_plan_id: this.form.subscription_plan_id || null,
          people: this.form.people.filter(p => p.person_id),
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

  mounted() {
    this.fetchCategories();
    this.fetchPricingPlans();
    this.fetchSubscriptionPlans();
    this.fetchPeople();
  },
};
</script>
