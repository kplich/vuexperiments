import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomePage from "@/home/HomePage.vue";
import MyModalPage from "@/modals/MyModalPage.vue";
import MyComplexModalPage from "@/complex-modals/MyComplexModalPage.vue";
import MyInputPage from "@/inputs/MyInputPage.vue";
import SvgPage from "@/svg/SvgPage.vue";
import DragAndDropPage from "@/drag-and-drop/DragAndDropPage.vue";
import InfiniteScrollPage from "@/infinite-scroll/InfiniteScrollPage.vue";
import MenusPage from "@/menus/MenusPage.vue";

function createSimpleRoute(name: string, component: any): RouteRecordRaw {
  return {
    path: `/${name}`,
    name,
    component,
  };
}

export const INFINITE_SCROLL = "infinite-scroll";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/menus",
      name: "menus",
      component: MenusPage,
    },
    {
      path: "/modals",
      name: "modals",
      component: MyModalPage,
    },
    {
      path: "/complex-modals",
      name: "complex-modals",
      component: MyComplexModalPage,
    },
    {
      path: "/inputs",
      name: "inputs",
      component: MyInputPage,
    },
    {
      path: "/svg",
      name: "svg",
      component: SvgPage,
    },
    {
      path: "/drag-and-drop",
      name: "drag-and-drop",
      component: DragAndDropPage,
    },
    createSimpleRoute(INFINITE_SCROLL, InfiniteScrollPage),
  ],
});
