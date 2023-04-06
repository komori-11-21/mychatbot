import { createRouter,createWebHistory } from "vue-router";
import tableIview from "@/views/tableIview.vue";
const router = createRouter({
  history:createWebHistory(),
  routes:[
    // {
    //   path: '/',
    //   redirect: '/home',
    //
    // },
    {
      path:'/table',
      components:tableIview
    }
  ]
})
export default router;

