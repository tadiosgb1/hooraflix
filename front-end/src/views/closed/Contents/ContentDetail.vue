<template>
  <div class="p-6 bg-black min-h-screen text-sm text-white">
    <Loading :visible="loading" message="Loading Content..." />

    <!-- Back + Header -->
    <div class="flex items-center justify-between mb-6 border-b border-red-600/30 pb-4">
      <div class="flex items-center gap-3">
        <button @click="$router.back()" class="flex items-center gap-1.5 text-gray-400 hover:text-white transition duration-150 text-xs">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1 class="text-base font-bold text-white">Content Detail</h1>
      </div>
      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-2">
        <button @click="openModal('person')" class="action-btn bg-indigo-600/20 border-indigo-600/40 text-indigo-300 hover:bg-indigo-600/30">
          👤 Add Person
        </button>
        <button @click="openModal('category')" class="action-btn bg-teal-600/20 border-teal-600/40 text-teal-300 hover:bg-teal-600/30">
          🏷️ Add Category
        </button>
        <button @click="openModal('pricing')" class="action-btn bg-green-600/20 border-green-600/40 text-green-300 hover:bg-green-600/30">
          � Edit Pricing
        </button>
      </div>
    </div>

    <div v-if="item?.id" class="space-y-5">

      <!-- Hero Card -->
      <div class="bg-gradient-to-br from-gray-900/70 to-black rounded-2xl border border-gray-700/50 p-5 shadow-lg">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h2 class="text-xl font-bold text-white mb-1">{{ item.title }}</h2>
            <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span :class="contentTypeBadge(item.content_type)">{{ contentTypeLabel(item.content_type) }}</span>
              <span :class="pricingBadge(item.pricing_option)">{{ pricingLabel(item.pricing_option) }}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-yellow-900/30 text-yellow-300 border-yellow-700/50 flex items-center gap-1">
                ⭐ {{ item.rating || '—' }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs shrink-0 sm:text-right">
            <div><span class="text-gray-500">Released</span><p class="text-white font-medium">{{ formatDate(item.release_date) }}</p></div>
            <div><span class="text-gray-500">Duration</span><p class="text-white font-medium">{{ item.duration ? item.duration + ' min' : '—' }}</p></div>
            <div><span class="text-gray-500">Language</span><p class="text-white font-medium">{{ item.language || '—' }}</p></div>
            <div><span class="text-gray-500">Country</span><p class="text-white font-medium">{{ item.country || '—' }}</p></div>
          </div>
        </div>
      </div>

      <!-- Media Files -->
      <div v-if="item.mediaFiles?.length" class="section-card">
        <h3 class="section-title">Media Files</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div v-for="mf in item.mediaFiles" :key="mf.id" class="bg-gray-900/60 border border-gray-700/40 rounded-xl p-3 flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-red-600/20 border border-red-600/30 flex items-center justify-center shrink-0 text-red-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-white text-xs font-medium capitalize">{{ mf.file_type }}</p>
              <p class="text-gray-500 text-xs">Quality: {{ mf.quality || '—' }}</p>
            </div>
            <a :href="videoUrl(mf.video_url)" target="_blank" class="text-red-400 hover:text-red-300 transition shrink-0" title="Open">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Seasons & Episodes -->
      <div v-if="item.series?.seasons" class="section-card">
        <h3 class="section-title">
          Seasons &amp; Episodes
          <span class="ml-2 px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-700/50 text-xs normal-case font-normal">
            {{ item.series.seasons.length }} season{{ item.series.seasons.length !== 1 ? 's' : '' }}
          </span>
        </h3>
        <div class="space-y-2">
          <div v-for="season in item.series.seasons" :key="season.id"
            class="bg-gray-900/50 border border-gray-700/40 rounded-xl overflow-hidden">
            <!-- Season Header -->
            <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-700/40 bg-gray-900/60">
              <span class="text-white text-xs font-semibold">Season {{ season.season_number }}</span>
              <span class="text-gray-500 text-xs">{{ season.episodes?.length || 0 }} episode{{ (season.episodes?.length || 0) !== 1 ? 's' : '' }}</span>
            </div>
            <!-- Episodes -->
            <div v-if="season.episodes?.length" class="divide-y divide-gray-800/50">
              <div v-for="ep in season.episodes" :key="ep.id"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-800/30 transition">
                <span class="w-6 h-6 rounded-full bg-gray-800 text-gray-400 text-xs flex items-center justify-center shrink-0 font-medium">
                  {{ ep.episode_number }}
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-white text-xs font-medium truncate">{{ ep.title }}</p>
                  <p class="text-gray-500 text-xs">{{ ep.duration }} min</p>
                </div>
                <a v-if="ep.video_url" :href="videoUrl(ep.video_url)" target="_blank"
                  class="text-red-400 hover:text-red-300 transition shrink-0 text-xs flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Play
                </a>
              </div>
            </div>
            <p v-else class="px-4 py-2.5 text-gray-600 text-xs italic">No episodes yet.</p>
            <!-- Add Episode -->
            <button type="button" @click="openEpisodeModal(season.id)"
              class="w-full flex items-center justify-center gap-1.5 px-4 py-2 border-t border-gray-700/40 text-blue-400 hover:bg-blue-900/10 hover:text-blue-300 transition text-xs font-medium">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add Episode
            </button>
          </div>
          <!-- Add Season -->
          <button type="button" @click="openModal('season')"
            class="w-full flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-dashed border-purple-700/50 text-purple-400 hover:bg-purple-900/10 hover:border-purple-500/60 transition text-xs font-medium">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Season
          </button>
        </div>
      </div>

      <!-- Parts -->
      <div v-if="item.series" class="section-card">
        <h3 class="section-title">
          Parts
          <span v-if="item.series.parts?.length" class="ml-2 px-2 py-0.5 rounded-full bg-orange-900/40 text-orange-300 border border-orange-700/50 text-xs normal-case font-normal">
            {{ item.series.parts.length }} part{{ item.series.parts.length !== 1 ? 's' : '' }}
          </span>
        </h3>
        <div class="space-y-2">
          <div v-for="part in item.series.parts || []" :key="part.id"
            class="flex items-center gap-3 bg-gray-900/50 border border-gray-700/40 rounded-xl px-4 py-2.5 hover:bg-gray-800/30 transition">
            <span class="w-7 h-7 rounded-lg bg-orange-900/30 text-orange-300 text-xs flex items-center justify-center shrink-0 font-semibold border border-orange-700/40">
              {{ part.part_number }}
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-white text-xs font-medium truncate">{{ part.title }}</p>
              <p class="text-gray-500 text-xs">{{ part.duration }} min</p>
            </div>
            <a v-if="part.video_url" :href="videoUrl(part.video_url)" target="_blank"
              class="text-red-400 hover:text-red-300 transition shrink-0 text-xs flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Play
            </a>
          </div>
          <p v-if="!item.series.parts?.length" class="text-gray-600 text-xs italic px-1">No parts yet.</p>
          <!-- Add Part row -->
          <button type="button" @click="openModal('part')"
            class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-orange-700/50 text-orange-400 hover:bg-orange-900/10 hover:border-orange-600/60 transition duration-150 text-xs font-medium">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Part
          </button>
        </div>
      </div>

      <!-- Cast & Crew -->
      <div class="section-card">
        <h3 class="section-title">Cast &amp; Crew</h3>
        <div v-if="item.contentPersons?.length" class="flex flex-wrap gap-3">
          <div v-for="cp in item.contentPersons" :key="cp.person_id" class="flex items-center gap-2.5 bg-gray-900/60 border border-gray-700/40 rounded-xl px-3 py-2">
            <div class="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-bold text-xs shrink-0">
              {{ cp.person?.full_name?.charAt(0) || '?' }}
            </div>
            <div>
              <p class="text-white text-xs font-medium">{{ cp.person?.full_name || '—' }}</p>
              <p class="text-gray-500 text-xs capitalize">{{ cp.role }}</p>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-600 text-xs italic">No cast or crew assigned yet.</p>
      </div>

    </div>

    <div v-else-if="!loading" class="text-center py-20 text-gray-600 italic">Content not found.</div>

    <!-- ===== MODALS ===== -->

    <!-- Add Person Modal -->
    <div v-if="modal === 'person'" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title">👤 Add Person to Cast</h2>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="submitPerson" class="space-y-4">
          <div>
            <label class="field-label">Person</label>
            <div v-if="loadingPeople" class="text-gray-500 text-xs py-1">Loading...</div>
            <select v-else v-model="forms.person.person_id" required class="field-input">
              <option value="" disabled>Select person</option>
              <option v-for="p in people" :key="p.id" :value="p.id">{{ p.full_name }}</option>
            </select>
          </div>
          <div>
            <label class="field-label">Role</label>
            <input v-model="forms.person.role" type="text" required placeholder="e.g. Director, Actor" class="field-input" />
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="submitting" class="btn-submit">{{ submitting ? 'Saving...' : 'Add Person' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div v-if="modal === 'category'" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title">🏷️ Add Category</h2>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="submitCategory" class="space-y-4">
          <div>
            <label class="field-label">Category</label>
            <div v-if="loadingCategories" class="text-gray-500 text-xs py-1">Loading...</div>
            <select v-else v-model="forms.category.category_id" required class="field-input">
              <option value="" disabled>Select category</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="submitting" class="btn-submit">{{ submitting ? 'Saving...' : 'Add Category' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Season Modal -->
    <div v-if="modal === 'season'" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title">📺 Add Season</h2>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="submitSeason" class="space-y-4">
          <div>
            <label class="field-label">Season Number</label>
            <input v-model.number="forms.season.season_number" type="number" min="1" required placeholder="e.g. 1" class="field-input" />
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="submitting" class="btn-submit">{{ submitting ? 'Saving...' : 'Add Season' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Episode Modal -->
    <div v-if="modal === 'episode'" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title">🎬 Add Episode — Season {{ activeSeason?.season_number }}</h2>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="submitEpisode" class="space-y-4">
          <div>
            <label class="field-label">Title</label>
            <input v-model="forms.episode.title" type="text" required placeholder="Episode title" class="field-input" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="field-label">Episode #</label>
              <input v-model.number="forms.episode.episode_number" type="number" min="1" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Duration (min)</label>
              <input v-model.number="forms.episode.duration" type="number" min="1" required class="field-input" />
            </div>
          </div>
          <div>
            <label class="field-label">Video File</label>
            <input type="file" accept="video/*" @change="e => forms.episode.video = e.target.files[0]" required
              class="field-input file:text-gray-300 file:bg-gray-800 file:border-0 file:rounded file:mr-2 file:px-2 file:py-1" />
            <p v-if="forms.episode.video" class="text-xs text-gray-500 mt-1">{{ forms.episode.video?.name }}</p>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="submitting" class="btn-submit">{{ submitting ? 'Uploading...' : 'Add Episode' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Part Modal -->
    <div v-if="modal === 'part'" class="modal-overlay">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title">🎞️ Add Part</h2>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="submitPart" class="space-y-4">
          <div>
            <label class="field-label">Title</label>
            <input v-model="forms.part.title" type="text" required placeholder="Part title" class="field-input" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="field-label">Part #</label>
              <input v-model.number="forms.part.part_number" type="number" min="1" required class="field-input" />
            </div>
            <div>
              <label class="field-label">Duration (min)</label>
              <input v-model.number="forms.part.duration" type="number" min="1" required class="field-input" />
            </div>
          </div>
          <div>
            <label class="field-label">Video File</label>
            <input type="file" accept="video/*" @change="e => forms.part.video = e.target.files[0]" required
              class="field-input file:text-gray-300 file:bg-gray-800 file:border-0 file:rounded file:mr-2 file:px-2 file:py-1" />
            <p v-if="forms.part.video" class="text-xs text-gray-500 mt-1">{{ forms.part.video.name }}</p>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="submitting" class="btn-submit">{{ submitting ? 'Uploading...' : 'Add Part' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Pricing Modal -->
    <div v-if="modal === 'pricing'" class="modal-overlay">
      <div class="modal-box max-w-lg">
        <div class="modal-header">
          <h2 class="modal-title">💰 Edit Pricing</h2>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>
        <form @submit.prevent="submitPricing" class="space-y-5">
          <!-- Pricing Option -->
          <div>
            <label class="field-label mb-2 block">Pricing Option</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button v-for="opt in pricingOptions" :key="opt.value" type="button"
                @click="selectPricingOption(opt.value)"
                :class="['flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl border text-xs font-medium transition',
                  forms.pricing.pricing_option === opt.value
                    ? 'border-red-500 bg-red-600/20 text-white'
                    : 'border-gray-700 bg-gray-900/40 text-gray-400 hover:border-gray-500']">
                <span class="text-base">{{ opt.icon }}</span>
                <span>{{ opt.label }}</span>
              </button>
            </div>
          </div>
          <!-- Pricing Plan (rental / forever) -->
          <div v-if="forms.pricing.pricing_option === 'rental' || forms.pricing.pricing_option === 'forever'">
            <label class="field-label">Pricing Plan</label>
            <div v-if="loadingPricingPlans" class="text-gray-500 text-xs py-1">Loading...</div>
            <select v-else v-model="forms.pricing.pricing_plan_id" required class="field-input">
              <option value="" disabled>Select a pricing plan</option>
              <option v-for="plan in pricingPlans" :key="plan.id" :value="plan.id">
                {{ plan.name }} — {{ plan.price }} ({{ plan.billing_type }})
              </option>
            </select>
          </div>
          <!-- Subscription Plan -->
          <div v-if="forms.pricing.pricing_option === 'subscription'">
            <label class="field-label">Subscription Plan</label>
            <div v-if="loadingSubscriptionPlans" class="text-gray-500 text-xs py-1">Loading...</div>
            <select v-else v-model="forms.pricing.subscription_plan_id" required class="field-input">
              <option value="" disabled>Select a subscription plan</option>
              <option v-for="plan in subscriptionPlans" :key="plan.id" :value="plan.id">
                {{ plan.name }} — {{ plan.price }} / {{ plan.duration_days }}d
              </option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="submitting" class="btn-submit">{{ submitting ? 'Saving...' : 'Save Pricing' }}</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.section-card { @apply bg-gradient-to-br from-gray-900/70 to-black rounded-2xl border border-gray-700/50 p-5 shadow-lg; }
.section-title { @apply text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3; }
.action-btn   { @apply px-3 py-1.5 rounded-lg border text-xs font-medium transition duration-150; }
.modal-overlay { @apply fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4; }
.modal-box    { @apply bg-gradient-to-br from-gray-900/95 to-black rounded-2xl shadow-2xl w-full max-w-sm border border-red-600/30 p-6 text-sm max-h-[90vh] overflow-y-auto; }
.modal-header { @apply flex justify-between items-center mb-4 border-b border-red-600/30 pb-3; }
.modal-title  { @apply text-base font-semibold text-white; }
.modal-close  { @apply text-gray-500 hover:text-red-500 transition text-xl leading-none; }
.modal-actions { @apply flex justify-end gap-3 pt-2; }
.field-label  { @apply block mb-1 text-xs font-medium text-gray-400 uppercase tracking-wide; }
.field-input  { @apply border border-gray-600 bg-gray-900/50 rounded-lg px-3 py-2 text-sm w-full text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 shadow-sm transition; }
.btn-cancel   { @apply px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 text-sm transition; }
.btn-submit   { @apply px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-lg font-medium text-sm transition shadow-md; }
</style>

<script>
import Loading from "@/components/Loading.vue";

export default {
  components: { Loading },

  data() {
    return {
      item: {},
      loading: false,
      submitting: false,
      modal: null,
      activeSeason: null,
      expandedSeasons: [],

      // dropdown data
      people: [],
      categories: [],
      pricingPlans: [],
      subscriptionPlans: [],
      loadingPeople: false,
      loadingCategories: false,
      loadingPricingPlans: false,
      loadingSubscriptionPlans: false,

      pricingOptions: [
        { value: 'free',         label: 'Free',        icon: '🆓' },
        { value: 'rental',       label: 'Rental',       icon: '🎟️' },
        { value: 'subscription', label: 'Subscription', icon: '🔄' },
        { value: 'forever',      label: 'Forever',      icon: '♾️' },
      ],

      forms: {
        person:   { person_id: '', role: '' },
        category: { category_id: '' },
        season:   { season_number: '' },
        episode:  { season_id: '', title: '', episode_number: '', duration: '', video: null },
        part:     { title: '', part_number: '', duration: '', video: null },
        pricing:  { pricing_option: 'free', pricing_plan_id: '', subscription_plan_id: '' },
      },
    };
  },

  methods: {
    /* ---- modal helpers ---- */
    openModal(type) {
      this.modal = type;
      if (type === 'person' && !this.people.length)             this.fetchPeople();
      if (type === 'category' && !this.categories.length)       this.fetchCategories();
      if (type === 'pricing' && !this.pricingPlans.length)      this.fetchPricingPlans();
      if (type === 'pricing' && !this.subscriptionPlans.length) this.fetchSubscriptionPlans();
      // pre-fill pricing form from current item
      if (type === 'pricing') {
        this.forms.pricing.pricing_option      = this.item?.pricing_option || 'free';
        this.forms.pricing.pricing_plan_id     = this.item?.pricing_plan_id || '';
        this.forms.pricing.subscription_plan_id = this.item?.subscription_plan_id || '';
      }
    },
    closeModal() { this.modal = null; this.activeSeason = null; },

    openEpisodeModal(seasonId) {
      const season = this.item?.series?.seasons?.find(s => s.id === seasonId) || null;
      this.activeSeason = season;
      this.forms.episode = { season_id: seasonId, title: '', episode_number: '', duration: '', video: null };
      this.modal = 'episode';
    },

    selectPricingOption(val) {
      this.forms.pricing.pricing_option      = val;
      this.forms.pricing.pricing_plan_id     = '';
      this.forms.pricing.subscription_plan_id = '';
      if ((val === 'rental' || val === 'forever') && !this.pricingPlans.length)      this.fetchPricingPlans();
      if (val === 'subscription' && !this.subscriptionPlans.length) this.fetchSubscriptionPlans();
    },

    /* ---- data fetchers ---- */
    async fetchPeople() {
      this.loadingPeople = true;
      try { const r = await this.$apiGet('/people', { page_size: 200 }); this.people = r?.data || []; }
      catch(e) { console.error(e); } finally { this.loadingPeople = false; }
    },
    async fetchCategories() {
      this.loadingCategories = true;
      try { const r = await this.$apiGet('/categories'); this.categories = r?.data || r || []; }
      catch(e) { console.error(e); } finally { this.loadingCategories = false; }
    },
    async fetchPricingPlans() {
      this.loadingPricingPlans = true;
      try { const r = await this.$apiGet('/pricing-plans', { page_size: 100 }); this.pricingPlans = r?.data || []; }
      catch(e) { console.error(e); } finally { this.loadingPricingPlans = false; }
    },
    async fetchSubscriptionPlans() {
      this.loadingSubscriptionPlans = true;
      try { const r = await this.$apiGet('/subscription-plans', { page_size: 100 }); this.subscriptionPlans = r?.data || []; }
      catch(e) { console.error(e); } finally { this.loadingSubscriptionPlans = false; }
    },

    /* ---- submit handlers ---- */
    async submitPerson() {
      this.submitting = true;
      try {
        const res = await this.$apiPost('/content-people', {
          content_id: this.item.id,
          person_id:  this.forms.person.person_id,
          role:       this.forms.person.role,
        });
        if (res) { this.$root.$refs.toast.showToast('Person added', 'success'); this.reload(); }
      } catch(e) { console.error(e); } finally { this.submitting = false; this.closeModal(); }
    },

    async submitCategory() {
      this.submitting = true;
      try {
        const res = await this.$apiPost('/content-categories', {
          content_id:  this.item.id,
          category_id: this.forms.category.category_id,
        });
        if (res) { this.$root.$refs.toast.showToast('Category added', 'success'); this.reload(); }
      } catch(e) { console.error(e); } finally { this.submitting = false; this.closeModal(); }
    },

    async submitSeason() {
      this.submitting = true;
      try {
        const res = await this.$apiPost('/seasons', {
          series_id:     this.item?.series?.id,
          season_number: this.forms.season.season_number,
        });
        if (res) { this.$root.$refs.toast.showToast('Season added', 'success'); this.reload(); }
      } catch(e) { console.error(e); } finally { this.submitting = false; this.closeModal(); }
    },

    async submitEpisode() {
      this.submitting = true;
      try {
        const fd = new FormData();
        fd.append('season_id',      this.forms.episode.season_id);
        fd.append('title',          this.forms.episode.title);
        fd.append('episode_number', this.forms.episode.episode_number);
        fd.append('duration',       this.forms.episode.duration);
        if (this.forms.episode.video instanceof File) fd.append('video', this.forms.episode.video);
        const res = await this.$apiPost('/episodes/upload', fd, { 'Content-Type': 'multipart/form-data' });
        if (res) { this.$root.$refs.toast.showToast('Episode added', 'success'); this.reload(); }
      } catch(e) { console.error(e); } finally { this.submitting = false; this.closeModal(); }
    },

    async submitPart() {
      this.submitting = true;
      try {
        const fd = new FormData();
        fd.append('content_id',  this.item?.id);
        fd.append('title',       this.forms.part.title);
        fd.append('part_number', this.forms.part.part_number);
        fd.append('duration',    this.forms.part.duration);
        if (this.forms.part.video instanceof File) fd.append('video', this.forms.part.video);
        const res = await this.$apiPost('/parts/upload', fd, { 'Content-Type': 'multipart/form-data' });
        if (res) { this.$root.$refs.toast.showToast('Part added', 'success'); this.reload(); }
      } catch(e) { console.error(e); } finally { this.submitting = false; this.closeModal(); }
    },

    async submitPricing() {
      this.submitting = true;
      try {
        const payload = {
          pricing_option:       this.forms.pricing.pricing_option,
          pricing_plan_id:      this.forms.pricing.pricing_plan_id || null,
          subscription_plan_id: this.forms.pricing.subscription_plan_id || null,
        };
        const res = await this.$apiPut('/content', this.item.id, payload);
        if (res) { this.$root.$refs.toast.showToast('Pricing updated', 'success'); this.reload(); }
      } catch(e) { console.error(e); } finally { this.submitting = false; this.closeModal(); }
    },

    /* ---- reload detail ---- */
    async reload() {
      try {
        const response = await this.$apiGetById('/content', this.$route.params.id);
        this.item = response?.data || response || {};
      } catch(e) { console.error(e); }
    },

    /* ---- helpers ---- */
    contentTypeLabel(type) {
      return { full_movie: 'Full Movie', series: 'Series', part_based: 'Part Based', music: 'Music' }[type] || type || '—';
    },
    contentTypeBadge(type) {
      const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium border ';
      return base + ({ full_movie: 'bg-blue-900/40 text-blue-300 border-blue-700/50', series: 'bg-purple-900/40 text-purple-300 border-purple-700/50', part_based: 'bg-orange-900/40 text-orange-300 border-orange-700/50', music: 'bg-pink-900/40 text-pink-300 border-pink-700/50' }[type] || 'bg-gray-800 text-gray-400 border-gray-700');
    },
    pricingLabel(option) {
      return { free: 'Free', rental: 'Rental', subscription: 'Subscription', forever: 'Buy Forever' }[option] || option || 'Free';
    },
    pricingBadge(option) {
      const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium border ';
      return base + ({ free: 'bg-green-900/40 text-green-300 border-green-700/50', rental: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50', subscription: 'bg-red-900/40 text-red-300 border-red-700/50', forever: 'bg-indigo-900/40 text-indigo-300 border-indigo-700/50' }[option] || 'bg-green-900/40 text-green-300 border-green-700/50');
    },
    formatDate(d) {
      if (!d) return '—';
      return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    },
    videoUrl(path) {
      if (!path) return '#';
      if (path.startsWith('http')) return path;
      return (import.meta.env.VITE_APP_BASE_URL_LOCAL || '') + path;
    },
  },

  async mounted() {
    this.loading = true;
    try {
      const response = await this.$apiGetById('/content', this.$route.params.id);
      this.item = response?.data || response || {};
    } catch(e) { console.error(e); }
    finally { this.loading = false; }
  },
};
</script>
