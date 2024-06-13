import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/components/principalCivil.vue")
    },
    {
        path: "/registrarEstudiante",
        component: () => import("@/components/modules/registrarEstudiante.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router