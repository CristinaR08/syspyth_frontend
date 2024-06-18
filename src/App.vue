<template>
  <div id="app">
    <Header />
    <principalCivil />
  </div>
</template>

<script>
import Header from './components/Header.vue'
//import principalCivil from './components/NotFound.vue'
//import principalCivil from './modulos/Estudiantes/registrarEstudiante.vue'
import principalCivil from './modulos/Docentes/AsistenciaDocente.vue'

export default {
  name: 'App',
  components: {
    Header,
    principalCivil
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  
}
</style>
