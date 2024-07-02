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
        component: () =>import('@/modulos/Estudiantes/components/registrarEstudiante')
    },
    {
        path: "/ingresarEstudiante",
        component: () => import ('@/modulos/Estudiantes/components/ingresarEstudiante')
    },

    {
        path: "/ingresarDocente",
        component: () => import ('@/modulos/Docentes/components/ingresarDocente')
    },
    {
        path: "/asistenciaDocente",
        component: () =>import('@/modulos/Docentes/components/AsistenciaDocente') 
    },
    {
        path: "/principal_admin",
        component: () =>import('@/modulos/Administrador/components/principalAdmin') 
    },
    {
        path: "/registrarNuevo",
        component: () =>import('@/modulos/Administrador/components/registrarNuevo')
    },
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router