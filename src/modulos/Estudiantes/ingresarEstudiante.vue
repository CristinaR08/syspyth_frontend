<template>
  <div class="title">
    <h1>Registro de Asistencia Estudiante</h1>
  </div>

  <div class="indicacion">
    <h1>Por favor ingrese su cédula</h1>
  </div>

  <div>
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
        <option v-if="sala === 'Aula1'" value="100">Equipo 100</option>
        <option v-if="sala === 'Aula1'" value="101">Equipo 101</option>
        <option v-if="sala === 'Aula2'" value="200">Equipo 200</option>
        <option v-if="sala === 'Aula2'" value="201">Equipo 201</option>
        <option v-if="sala === 'Aula3'" value="301">Equipo 201</option>
        <option v-if="sala === 'Aula3'" value="302">Equipo 201</option>
        <option v-if="sala === 'AulaA'" value="1">Equipo 201</option>
        <option v-if="sala === 'AulaA'" value="2">Equipo 201</option>
        <option v-if="sala === 'AulaB'" value="1">Equipo 201</option>
        <option v-if="sala === 'AulaB'" value="2">Equipo 201</option>
      </select>
    </div>

    <div class="fecha">
      <label for="fecha">Fecha:</label>
      <div class="datetime">
        {{ currentDateTime }}
      </div>
    </div >
    
    <button @click="registrarAsistencia" class="registrar">Registrar Asistencia</button>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      currentDateTime: this.getCurrentDateTime(),
      nombre: '',
      apellido: '',
      correo: '',
      carrera: '',
      equipo: '',
      emailError: '',
      sala:'',
      numeroMaquina: ''
    };
  },
  methods: {
    async fetchUserData() {
      try {
        // Aquí simulamos una solicitud HTTP para obtener los datos del usuario desde tu base de datos
        const response = await fetch('https:');
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos del usuario');
        }
        const data = await response.json();
        // Asignamos los datos obtenidos a las variables del componente
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.correo = data.correo;
        this.carrera = data.carrera;
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error.message);
      }
    },
    validarEmail() {
      if (!this.correo.endsWith('@uce.edu.ec')) {
        this.emailError = 'El correo debe ser de la Universidad Central del Ecuador (uce.edu.ec)';
      } else {
        this.emailError = '';
      }
    },
    registrarAsistencia() {
      // Aquí puedes realizar alguna acción con los datos, como enviarlos a un servidor
      console.log('Registrando asistencia...');
      console.log('Datos del estudiante:', this.estudiante);
      //fetch
    },
    getCurrentDateTime() {
      const now = new Date(); //fecha larga
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
  display: grid
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

</style>
