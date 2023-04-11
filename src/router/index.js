import { createRouter,createWebHistory } from "vue-router";
import tableIview from "@/views/tableIview.vue";

import myScoll from "@/components/myScoll.vue";
const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/table',
      components:tableIview
    },
    {
      path:'/list',
      components:myScoll
    }

  ]
})
export default router;

