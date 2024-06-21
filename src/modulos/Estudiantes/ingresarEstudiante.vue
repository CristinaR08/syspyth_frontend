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
        <option value="Aula1">Aula 1</option>
        <option value="Aula2">Aula 2</option>
        <option value="Aula3">Aula 3</option>
        <option value="AulaA">Aula A</option>
        <option value="AulaB">Aula B</option>
      </select>
    </div>

    <div>
      <label for="numero_maquina">Número Máquina:</label>
      <select id="numero_maquina" v-model="numeroMaquina">
        <option disabled value="">Selecciona un equipo</option>
        
  <template v-if="sala === 'Aula1'">
    <option value="101">Equipo 101</option>
    <option v-for="i in 19" :key="'Aula1-' + i" :value="101 + i">Equipo {{ 101 + i }}</option>
  </template>

  <template v-if="sala === 'Aula2'">
    <option value="201">Equipo 201</option>
    <option v-for="i in 19" :key="'Aula2-' + i" :value="201 + i">Equipo {{ 201 + i }}</option>
  </template>

  <template v-if="sala === 'Aula3'">
    <option value="301">Equipo 301</option>
    <option v-for="i in 19" :key="'Aula3-' + i" :value="301 + i">Equipo {{ 301 + i }}</option>
  </template>

  <template v-if="sala === 'AulaA'">
  <option value="101">Equipo A01</option>
  <option v-for="i in 29" :key="'AulaA-' + i" :value="'A' + formatNumber(i + 1)">Equipo {{ 'A' + formatNumber(i + 1) }}</option>
</template>

<template v-if="sala === 'AulaB'">
  <option value="101">Equipo B01</option>
  <option v-for="i in 23" :key="'AulaB-' + i" :value="'B' + formatNumber(i + 1)">Equipo {{ 'B' + formatNumber(i + 1) }}</option>
</template>
      </select>
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
      numeroMaquina: '',
      cedulaError: '',
      cedulaValida: false
    };
  },
  methods: {
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
      if (!this.cedulaValida || !this.numeroMaquina || !this.sala) {
        this.cedulaError = 'Debes completar todos los campos antes de registrar la asistencia';
        return;
      }

      const registroData = {
        cedula: this.cedula,
        numero_maquina: this.numeroMaquina,
        sala: this.sala
      };

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/v1.0/registro_estudiantes/registrar', registroData);
        alert('Asistencia registrada exitosamente');
        // Limpiar los datos después de registrar
        this.cedula = '';
        this.datosEstudiante = null;
        this.numeroMaquina = '';
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
  mounted() {
    this.interval = setInterval(this.updateDateTime, 1000);
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
