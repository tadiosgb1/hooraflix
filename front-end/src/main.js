import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import globals from './globals/globals.js';
import './assets/global.css';
import { createI18n } from 'vue-i18n';
import amharicMessages from '../locales/amharic.json';
import englishMessages from '../locales/english.json';
import tigrignaMessages from '../locales/tigrigna.json';
import apiClientPlugin from "./store/plugins/apiClientPlugin";
import './assets/css/darkmode.css'; 
import "animate.css";
import VueParticles from "vue-particles";
import VueApexCharts from 'vue3-apexcharts';
import { themeMixin } from './globals/themeMixin';

const defaultLocale = 'amharic';
const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'english',
  messages: {
    amharic: amharicMessages,
    english: englishMessages,
    tigrigna: tigrignaMessages,
  },
});

const app = createApp(App);
app.mixin(themeMixin);
app
  .use(store)
  .use(globals)
  .use(VueApexCharts)
  .use(router)
  .use(i18n)
  .use(VueParticles)
  .use(apiClientPlugin)
  .mount('#app');
