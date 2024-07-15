<template>
  <div class="title">
    <h1>Registro de Asistencia Estudiante</h1>
  </div>

  <div class="indicacion">
    <h1>Por favor ingrese su cédula</h1>
  </div>

  <div class="cedula">
      <label for="cedula">Cédula: </label>
      <input type="text" id="cedula" v-model="cedula" @blur="validarCedula">
      <p v-if="cedulaError" style="color: red;">{{ cedulaError }}</p>
  </div>

  <button @click="validarCedula" class="validar">Validar</button>

  <div class="contenedor">
    <div class="Datos">
      <label for="nombre">Nombre:</label>
      <span>{{ nombre }}</span>
      <label for="apellido">Apellido:</label>
      <span>{{ apellido }}</span>
      <label for="correo">Correo:</label>
      <span>{{ correo }}</span>
      <label for="carrera">Carrera:</label>
      <span>{{ carrera }}</span>
    </div>

    <div>
      <label for="sala">Sala:</label>
      <select id="sala" v-model="sala">
        <option disabled value="">Selecciona un aula</option>
        <option value="Aula 1">Aula 1</option>
        <option value="Aula 2">Aula 2</option>
        <option value="Aula 3">Aula 3</option>
        <option value="Aula A">Aula A</option>
        <option value="Aula B">Aula B</option>
      </select>
    </div>

    <div>
      <label for="maquina">Máquina:</label>
      <span>{{ maquina }}</span>
    </div>

    <div class="fecha">
      <label for="fecha">Fecha:</label>
      <div class="datetime">
        {{ currentDateTime }}
      </div>
    </div >
    
    <button @click="registrarAsistencia" class="registrar" :disabled="!cedulaValida">Registrar Asistencia</button>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentDateTime: this.getCurrentDateTime(),
      cedula: '',
      nombre: '',
      apellido: '',
      correo: '',
      carrera: '',
      equipo: '',
      emailError: '',
      sala:'',
      maquina: '',
      cedulaError: '',
      cedulaValida: false
    };
  },
  mounted() {
  this.obtenerMaquina();
  this.interval = setInterval(this.updateDateTime, 1000);
},
  methods: {
    obtenerMaquina() {
  fetch('http://127.0.0.1:5000/api/v1.0/registro_estudiantes/maquina')
    .then(response => response.json())
    .then(data => {
      this.maquina = data.maquina; // Asegúrate de que esta clave coincida con el backend
    })
    .catch(error => console.error('Error:', error));
},
    formatNumber(number) {
      return number.toString().padStart(2, '0');
    },
    async validarCedula() {
      if (!this.cedula) {
        this.cedulaError = 'La cédula es obligatoria';
        this.cedulaValida = false;
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/v1.0/estudiantes/consultar/${this.cedula}`);
        const data = response.data;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.correo = data.correo;
        this.carrera = data.carrera;
        this.cedulaError = '';
        this.cedulaValida = true;
      } catch (error) {
        this.cedulaError = error.response ? error.response.data.message : 'No existe estudiante registrado con esa cédula';
        this.cedulaValida = false;
      }
    },
    async registrarAsistencia() {
      if (!this.cedulaValida || !this.maquina || !this.sala) {
        this.cedulaError = 'Debes completar todos los campos antes de registrar la asistencia';
        return;
      }

      const registroData = {
        cedula: this.cedula,
        numero_maquina: this.maquina,
        sala: this.sala
      };

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/v1.0/registro_estudiantes/registrar', registroData);
        alert('Asistencia registrada exitosamente');
        // Limpiar los datos después de registrar
        this.cedula = '';
        this.datosEstudiante = null;
        this.maquina = '';
        this.sala = '';
        this.cedulaValida = null;
        this.cedulaError = '';
      } catch (error) {
        this.cedulaError = error.response ? error.response.data.error : 'Error al registrar la asistencia';
      }
    },
    getCurrentDateTime() {
      const now = new Date();
      return now.toLocaleString();
    },
    updateDateTime() {
      this.currentDateTime = this.getCurrentDateTime();
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px; 
  justify-content: center;
  margin: 35px 0px 40px 0px; /*top right bottom left*/ 
  background-color: #4A0E0A;
  box-shadow: 0 2px 4px rgb(0, 0, 2); 
  padding: 0 20px; 
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.indicacion{
  font-size: 15px;
  color: black;
  font-family: 'Courier New', Courier, monospace;}


.Datos{
  display: grid;
  grid-template-columns: repeat(2, 100px);
}

.fecha {
  display: flex;
  align-items: center;
}

.fecha label {
  margin-right: 10px; 
}

.datetime{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
  color: black;
}

.validar{
  margin: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold
}

.contenedor{
  display: grid;
  justify-content: center;
  align-items: center;
  background-color:#DEEEFF ;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 0% 30%;
  margin-bottom: 100px;
}

.registrar{
  margin: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold
}


label{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #000000;
  margin: 10px;
}

select{
    height: 25px;
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

span{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #444242;
  margin: 10px;
}

select{
  margin: 10px;
}
</style>
