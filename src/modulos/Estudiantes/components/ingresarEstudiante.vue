<template>
  <div class="title">
    <h1>Registro de Asistencia Estudiante</h1>
  </div>
  <div class="indicacion">
    <h1>Por favor ingrese su cédula</h1>
  </div>

  <div class="cedula">
    <label for="cedula">Cédula: </label>
    <input type="text" id="cedula" v-model="cedula" @blur="validarCedula" maxlength="10" />
    <p v-if="cedulaError" style="color: red">{{ cedulaError }}</p>
  </div>

  <button @click="validarCedula" class="validar">Validar</button>

  <div class="contenedor">
    <div class="Datos">
      <label for="nombre">Nombre: </label>
      <span>{{ nombre }}</span>
      <label for="apellido">Apellido:</label>
      <span>{{ apellido }}</span>
      <label for="correo">Correo:</label>
      <span>{{ correo }}</span>
      <label for="carrera">Carrera:</label>
      <span>{{ carrera }}</span>
    </div>

    <div class="sala">
      <label for="sala">Sala:</label>
      <select v-model="sala" @change="updateMachineOptions">
        <option disabled value="">Selecciona un aula</option>
        <option value="Aula 1">Aula 1</option>
        <option value="Aula 2">Aula 2</option>
        <option value="Aula 3">Aula 3</option>
        <option value="Aula A">Aula A</option>
        <option value="Aula B">Aula B</option>
      </select>
    </div>

    <div class="maquina">
      <label for="maquina">Máquina:</label>
      <select id="maquina" v-model="selectedMachine">
        <option disabled value="">Selecciona una máquina</option>
        <option v-for="machine in obtenerMaquina" :key="machine" :value="machine">
          {{ machine }}
        </option>
      </select>
    </div>

    <div class="fecha">
      <label for="fecha">Fecha:</label>
      <div class="datetime">
        {{ currentDate }}
      </div>
    </div>
    <div class="hora">
      <label for="hora">Hora:</label>
      <div class="datetime">
        {{ currentTime }}
      </div>
    </div>

    <button
      @click="registrarAsistencia"
      class="registrar"
      :disabled="!cedulaValida"
    >
      Registrar Asistencia
    </button>
  </div>
</template>

<script>
import axios from "axios";
//const os = require("os");

export default {
  data() {
    return {
      currentDate: this.getCurrentDate(),
      currentTime: this.getCurrentTime(),
      cedula: "",
      nombre: "",
      apellido: "",
      correo: "",
      carrera: "",
      equipo: "",
      emailError: "",
      sala: "",
      maquina: "",
      cedulaError: "",
      cedulaValida: false,
      selectedMachine: '', // La máquina seleccionada
      machineOptions: {
        'Aula 1': Array.from({ length: 20 }, (_, i) => `PCLIC-${101 + i}`),
        'Aula 2': Array.from({ length: 20 }, (_, i) => `PCLIC-${201 + i}`),
        'Aula 3': Array.from({ length: 20 }, (_, i) => `PCLIC-${301 + i}`),
        'Aula A': Array.from({ length: 30 }, (_, i) => `PCLIC-A${String(i + 1).padStart(2, '0')}`),
        'Aula B': Array.from({ length: 24 }, (_, i) => `PCLIC-B${String(i + 1).padStart(2, '0')}`),
      }
    };
  },
  mounted() {
    //this.obtenerMaquina();
    this.interval = setInterval(this.updateDateTime, 1000);
  },
  computed: {
    // Computa las opciones de máquinas basadas en el aula seleccionada
    obtenerMaquina() {
      return this.machineOptions[this.sala] || [];
    }
  },
  methods: {
    updateMachineOptions() {
      this.selectedMachine = '';
    /*obtenerMaquina() {
      fetch('http://127.0.0.1:8086/api/v1.0/registro_estudiantes/maquina')
        .then(response => response.json())
        .then(data => {
          this.maquina = data.maquina; // Asegúrate de que esta clave coincida con el backend
        })
        .catch(error => console.error('Error:', error)); */
      /* this.maquina = os.hostname();
        console.log(this.maquina); */
      /* fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          this.maquina = data.ip;
        }); */
        return this.machineOptions[this.sala] || [];
    },
    formatNumber(number) {
      return number.toString().padStart(2, "0");
    },
    async validarCedula() {
      if (!this.cedula) {
        this.cedulaError = "La cédula es obligatoria";
        this.cedulaValida = false;
        return;
      }

      try {
        const response = await axios.get(
          `http://10.3.2.44:8087/api/v1.0/estudiantes/consultar/${this.cedula}`
        );
        const data = response.data;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.correo = data.correo;
        this.carrera = data.carrera;
        this.cedulaError = "";
        this.cedulaValida = true;
      } catch (error) {
        this.cedulaError = error.response
          ? error.response.data.message
          : "No existe estudiante registrado con esa cédula";
        this.cedulaValida = false;
      }
    },
    async registrarAsistencia() {
      if (!this.cedulaValida || !this.maquina || !this.sala) {
        this.cedulaError =
          "Debes completar todos los campos antes de registrar la asistencia";
        return;
      }

      const registroData = {
        cedula: this.cedula,
        numero_maquina: this.maquina,
        sala: this.sala,
        fecha: this.currentDate,
        hora: this.currentTime,
      };

      try {
        const response = await axios.post(
          "http://10.3.2.44:8087/api/v1.0/registro_estudiantes/registrar",
          registroData
        );
        alert("Asistencia registrada exitosamente");
        // Limpiar los datos después de registrar
        this.cedula = "";
        this.nombre = "";
        this.apellido = "";
        this.correo = "";
        this.carrera = "";
        this.sala = "";
        this.cedulaValida = false;
        this.cedulaError = "";
      } catch (error) {
        this.cedulaError = error.response
          ? error.response.data.error
          : "Error al registrar la asistencia";
      }
    },
    getCurrentDate() {
      const now = new Date();
      return now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    },
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`; // Formato HH:MM
    },
    updateDateTime() {
      this.currentDate = this.getCurrentDate();
      this.currentTime = this.getCurrentTime();
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  justify-content: center;
  margin: 35px 0px 40px 0px;
  /*top right bottom left*/
  background-color: #4a0e0a;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.indicacion {
  font-size: 15px;
  color: black;
  font-family: "Courier New", Courier, monospace;
}

.maquina {
  margin-bottom: 10px;
}


.Datos {
  display: grid;
  grid-template-columns: repeat(2, 100px);
}

.fecha,
.hora {
  display: flex;
  align-items: center;
}

.fecha label,
.hora label {
  margin-right: 15px;
}

.datetime {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 20px;
  color: black;
}

.validar {
  margin: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
}

.contenedor {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #deeeff;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 10px;
  margin-left: 40%;
  width: fit-content;
  padding: 10px;
}

.registrar {
  margin: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  margin-left: 40px;
}

label {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 25px;
  color: #000000;
  margin: 10px 20px;
  text-align: right;
}

select {
  height: 25px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
}

button {
  margin: 30px 0px;
  font-size: 15px;
  padding: 10px;
  color: #ffffff;
  background: #4a0e0a;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

span {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 25px;
  color: #444242;
  margin-top: 10px;
  margin-left: 20px;
  text-align: center;
}

input {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 15px;
  border-radius: 5px;
  padding: 5px 5px;
}

@media(max-width:900px) {
  .contenedor {
    margin-left: 30%;
  }
}

</style>
