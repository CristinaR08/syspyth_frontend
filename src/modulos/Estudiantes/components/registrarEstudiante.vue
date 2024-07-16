<template>
  <div>
    <div class="title">
      <h2>Registro de Estudiante</h2>
    </div>
    <div class="container">
      <div class="datos">
        <label for="cedula">Cédula:</label>
        <input type="text" v-model="cedula" id="cedula" pattern="\d{10}" title="Ingrese los 10 dígitos de su cédula"/>
        
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" id="nombre" pattern="[A-Za-z]" title="Ingrese su nombre"/>
        
        <label for="apellido">Apellido:</label>
        <input type="text" v-model="apellido" id="apellido" pattern="[A-Za-z]" title="Ingrese su apellido"/>
        
        <label for="correo">Correo:</label>
        <input type="email" v-model="correo" id="correo" pattern="^[a-zA-Z0-9._%+-]+@uce.edu.ec$" title="El correo debe ser de la UCE"/>
        
        <label for="carrera">Carrera:</label>
        <input type="text" v-model="carrera" id="carrera" pattern="[A-Za-z]" title="Ingrese su carrera"/>
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

export default {
  data() {
    return {
      cedula: "",
      nombre: "",
      apellido: "",
      correo: "",
      carrera: "",
      errorMessage:""
    };
  },

  methods: {
    //LOGICA
    // CONEXIONES API
    async saveEstudent() {
      // Validaciones antes de enviar la solicitud
      if (!this.cedula || !this.nombre || !this.apellido || !this.correo || !this.carrera) {
        this.errorMessage = 'Todos los campos son obligatorios';
        return;
      }

      // Validación cédula (10 números)
      if (!(/^\d{10}$/.test(this.cedula))) {
        this.errorMessage = 'La cédula debe contener exactamente 10 números.';
        return;
      }

      // Validación correo electrónicoE)
      if (!(/^[\w.-]+@uce\.edu\.ec$/.test(this.correo))) {
        this.errorMessage = 'El correo electrónico debe ser de la UCE (ejemplo@uce.edu.ec).';
        return;
      }

      // Validación para nombre, apellido y carrera (solo caracteres alfanuméricos)
      if (!(/^[A-Za-z]+$/.test(this.nombre)) || !(/^[A-Za-z]+$/.test(this.apellido)) || !(/^[A-Za-z]+$/.test(this.carrera))) {
        this.errorMessage = 'Evite usar tildes. Solo letras';
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/v1.0/estudiantes/registrar', {
          cedula: this.cedula,
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          carrera: this.carrera
        });
        alert('Estudiante registrado exitosamente.');
        this.errorMessage = '';
        this.cedula = '';
        this.nombre = '';
        this.apellido = '';
        this.correo = '';
        this.carrera = '';
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = 'Error al registrar el estudiante';
        }
      }
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

alert{
  font-size: 40px;
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

.error-message {
  color: red;
  margin: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

@media(max-width:880px) {
  .container {
    width: 50%;
  }
}

</style>