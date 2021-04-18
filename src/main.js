import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import '@/main.scss';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

createApp(App).use(router).mount("#app");

library.add(faGithub)
dom.watch()
