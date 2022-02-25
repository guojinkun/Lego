import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
      path: "/",                                   // 路由的路径 
      name: "home",                                    // 路由的名称 
      component: () => import("../pages/home.vue") // 路由的组件  
    },
    
  ];

  // 创建路由实例并传递 `routes` 配置
  const router = createRouter({
    history: createWebHistory(),  // 内部提供了 history 模式的实现，这里使用 hash 模式
    routes,                       // `routes: routes` 的缩写 
  });

  export default router;          //   
