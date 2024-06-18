import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    {
        //path: "/:patchMatch(.*)",
        //component: () => import('@/components/NotFound')
    },
    {
        path: "/",
        component: () =>import('@/components/principalCivil') 
    },
    {
        path: "/registrarEstudiante",
        component: () =>import('@/modulos/Estudiantes/registrarEstudiante')
    },
    {
        path: "/ingresarEstudiante",
        component: () => import ('@/modulos/Estudiantes/ingresarEstudiante')
    },


];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router