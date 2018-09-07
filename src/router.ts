import Vue from "vue";
import Router from "vue-router";
import Shows from "./views/Shows.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: Shows,
      props: route => ({
        id: route.query.id
      })
    }
  ]
});
