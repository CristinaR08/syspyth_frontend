<template>
  <div class="title">
    <h2>Registro de Estudiante</h2>
  </div>
  <div class="container">
    <div class="datos">
      <label for="">Nombre:</label>
      <input type="text" v-model="nombre" />

      <label for="">Correo:</label>
      <input type="text" v-model="correo" />

      <label for="">Cedula:</label>
      <input type="text" v-model="cedula" />

      <label for="">Carrera:</label>
      <input type="text" v-model="carrera" />

    </div>

    
    <div class="boton">
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
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px; 
  justify-content: center;
  margin: 20px 0px 40px 0px; /*top right bottom left*/ 
  background-color: #f809097c;
  box-shadow: 0 2px 4px rgb(112, 22, 22); 
  padding: 0 20px; 
  color: rgb(15, 12, 49);
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #ffffff5e;
  border-radius: 15px;
  border: 4px solid #520404;
  margin: 0% 20%;
}
.datos{
  display:grid;
  grid-template-columns: repeat(2, 100px);
  margin: 20px;
  
}

button{
  margin: 30px 0px;
  font-size: 15px;
  padding: 10px;
  color: #000000;
  background: #c43613ce;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

input,label{
  margin: 10px;
}

input{
  width: 120px;
}

label{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
  color: #000000;
}

</style>