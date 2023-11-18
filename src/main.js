import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .mount("#app");

Array.prototype.deleteNext = function() {
  /* overrides the first non-zero element with a 0 */
  this[this.findIndex((element) => element !== 0)] = 0;
};
