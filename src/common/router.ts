import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../home/HomePage.vue";
import DropdownPage from "../dropdowns/DropdownPage.vue";
import MyModalPage from "../modals/MyModalPage.vue";
import MyComplexModalPage from "../complex-modals/MyComplexModalPage.vue";
import MyInputPage from "../inputs/MyInputPage.vue";
import MySelectPage from "../selects/MySelectPage.vue";
import SvgPage from "@/svg/SvgPage.vue";
import DragAndDropPage from "@/drag-and-drop/DragAndDropPage.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/dropdowns",
      name: "dropdowns",
      component: DropdownPage,
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
      path: "/selects",
      name: "selects",
      component: MySelectPage,
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
  ],
});
