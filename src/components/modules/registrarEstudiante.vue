<template>
  <div class="container">
    <h2>Registro de Estudiante</h2>
    <div class="datos">
      <label for="">Nombre:</label>
      <input type="text" v-model="nombre" />

      <label for="">Correo:</label>
      <input type="text" v-model="correo" />

      <label for="">Cedula:</label>
      <input type="text" v-model="cedula" />

      <label for="">Carrera:</label>
      <input type="text" v-model="carrera" />

      <button @click="saveEstudent">Registrar Estudiante</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/router.js";

export default {
  data() {
    return {
      nombre: null,
      correo: null,
      cedula: null,
      carrera: null,
    };
  },

  methods: {

    //LOGICA

    // CONEXIONES API
    async saveEstudent() {
      const ruta = `/registrarEstudiante`;
      await router.push(ruta);

      const path = "http://localhost:5000/api/v1.0/estu_body";
      const data = {
        nombre: this.nombre,
        correo: this.correo,
        cedula: this.cedula,
        carrera: this.carrera,
      };
      axios
        .post(path, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
}
.datos{
  display:grid;
}
</style>