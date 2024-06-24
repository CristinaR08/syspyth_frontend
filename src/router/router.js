import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    {
        path: "/:patchMatch(.*)",
        component: () => import('@/components/NotFound')
    },
    {
        path: "/solicitudExitosa",
        component: () => import('@/components/solicitudExitosa')
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

    {
        path: "/ingresarDocente",
        component: () => import ('@/modulos/Docentes/ingresarDocente')
    },
    {
        path: "/asistenciaDocente",
        component: () =>import('@/modulos/Docentes/AsistenciaDocente') 
    },
    {
        path: "/principal_admin",
        component: () =>import('@/modulos/Administrador/principalAdmin') 
    },
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router