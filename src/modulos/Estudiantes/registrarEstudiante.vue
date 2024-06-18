<template>
  <div>
    <div class="title">
      <h2>Registro de Estudiante</h2>
    </div>
    <div class="container">
      <div class="datos">
        <label for="cedula">Cédula:</label>
        <input type="text" v-model="cedula" id="cedula"/>
        
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" id="nombre"/>
        
        <label for="apellido">Apellido:</label>
        <input type="text" v-model="apellido" id="apellido"/>
        
        <label for="correo">Correo:</label>
        <input type="email" v-model="correo" id="correo"/>
        
        <label for="carrera">Carrera:</label>
        <input type="text" v-model="carrera" id="carrera"/>
      </div>

      <div class="boton">
        <button @click="saveEstudent">Registrar Estudiante</button>
      </div>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/router.js";

export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      correo: "",
      cedula: "",
      carrera: "",
      errorMessage:""
    };
  },

  methods: {
    //LOGICA
    // CONEXIONES API
    async saveEstudent() {
      const ruta = `/registrarEstudiante`;
      await router.push(ruta);

      // Validar el correo electrónico
      if (!this.correo.endsWith("@uce.edu.ec")) {
              this.errorMessage = "El correo debe ser de la UCE";
              return;
            }

      const path = "http://127.0.0.1:5000/api/v1.0/registro_estudiantes/registrar";
      const data = {
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        cedula: this.cedula,
        carrera: this.carrera,
      };
      
      try {
        const response = await axios.post(path, data);
        console.log(response.data);
        alert("Estudiante registrado exitosamente.");
        this.resetForm();
      } catch (error) {
        console.error(error);

        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.code === "DUPLICATE_CEDULA") {
            this.errorMessage = "La cédula ya está registrada.";
          } else if (errorData.code === "DUPLICATE_CORREO") {
            this.errorMessage = "El correo ya está registrado.";
          } else {
            this.errorMessage = "Ocurrió un error al registrar el estudiante.";
          }
        } else {
          this.errorMessage = "Ocurrió un error al registrar el estudiante.";
        }
      }
    },
    resetForm() {
      this.nombre = "";
      this.apellido = "";
      this.correo = "";
      this.cedula = "";
      this.carrera = "";
      this.errorMessage = "";
    }
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
  margin: 30px 0px 40px 0px; /*top right bottom left*/ 
  background-color: #4A0E0A;
  box-shadow: 0 2px 4px rgb(0, 0, 2); 
  padding: 0 20px; 
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color:#DEEEFF ;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 0% 30%;
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
  color: #ffffff;
  background: #4A0E0A;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

input,label{
  margin: 10px;
}

input{
  width: 150px;
}

label{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #000000;
}

</style>