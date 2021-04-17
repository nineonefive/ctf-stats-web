import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/stats/",
        component: () => import('../views/PlayerPage.vue'),
    },
    {
        path: "/stats/:player",
        component: () => import('../views/PlayerPage.vue'),
    },
    {
        path: "/experiments",
        component: () => import('../views/Experiments.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
