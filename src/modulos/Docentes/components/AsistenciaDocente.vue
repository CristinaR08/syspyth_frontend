<template>
  <div>
    <h1 class="asis">Asistencia</h1>
    <div class="salas">
      <label for="sala">Sala:</label>
      <select id="sala" v-model="sala">
        <option value="Aula1">Aula 1</option>
        <option value="Aula2">Aula 2</option>
        <option value="Aula3">Aula 3</option>
        <option value="AulaA">Aula A</option>
        <option value="AulaB">Aula B</option>
      </select>
    </div>

    <div class="contenedor">
      <div class="filaA">
        <label for="nombreDocente">Docente:</label>
        <span>{{ nombre }} {{ apellido }}</span>
        <label for="materia">Materia:</label>
        <input type="text" v-model="materia" id="materia" />

      </div>

      <div class="filaB">
        <label for="semestre">Semestre: </label>
        <select id="sala" v-model="semestre">
          <option value="primero">Primero</option>
          <option value="segundo">Segundo</option>
          <option value="tercer">Tercero</option>
          <option value="cuarto">Cuarto</option>
          <option value="quinto">Quinto</option>
          <option value="sexto">Sexto</option>
          <option value="septimo">Séptimo</option>
          <option value="octavo">Octavo</option>
          <option value="noveno">Noveno</option>
          <option value="decimo">Décimo</option>
        </select>

        <label for="paralelo">Paralelo: </label>
        <select id="paralelo" v-model="paralelo">
          <option value="P1">1</option>
          <option value="P2">2</option>
          <option value="P3">3</option>
          <option value="P4">4</option>
          <option value="P5">5</option>
          <option value="P6">6</option>
          <option value="P7">7</option>
          <option value="P8">8</option>
          <option value="P9">9</option>
          <option value="P10">10</option>
        </select>

        <label for="Inicio">Hora Inicio: </label>
        <span>{{ Inicio }}</span>

        <label for="Fin">Hora Fin: </label>
        <span>{{ Fin }}</span>
      </div>
      <div class="boton">
        <button @click="verEstudiantes">VER LISTA</button>
      </div>
    </div>

    <div v-if="mostrarLista" class="lista">
      <h1 class="listado">Registro de Estudiantes</h1>
      <table>
        <thead>
          <tr>
            <th>NÓMINA</th>
            <th>EQUIPO</th>
            <th>CÉDULA</th>
            <th>ASISTENCIA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.cedula">
            <td>{{ student.nombre }}</td>
            <td>{{ student.equipo }}</td>
            <td>{{ student.cedula }}</td>
            <td>{{ student.asistencia }}</td>
          </tr>
        </tbody>
      </table>
      <button class="registrar" @click="registrarAsistencia">REGISTRAR ASISTENCIA</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: this.$route.query.nombre || '',
      apellido: this.$route.query.apellido || '',
      sala: '',
      materia: '',
      semestre: '',
      paralelo: '',
      Inicio: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      Fin: '',
      mostrarLista: false,
      students: []
    };
  },
  computed: {
    tipoDeInput() {
      return this.mostrarContrasena ? 'text' : 'password';
    }
  },
  methods: {
    verEstudiantes() {
      this.obtenerEstudiantes();
    },
    async obtenerEstudiantes() {
      try {
        const startTime = this.Inicio;
        const endTime = this.Fin; // Usa la hora fin calculada
        const response = await fetch(`http://127.0.0.1:5000/api/v1.0/listaEstudiantes?sala=${this.sala}&inicio=${startTime}&fin=${endTime}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.students = data;
        this.mostrarLista = true;
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    },
    registrarAsistencia() {
      this.$router.push({ path: '/solicitudExitosa' });
    },
    getCurrentTime() {
      const now = new Date();
      return now.toTimeString().substr(0, 5); // Obtener solo HH:MM
    },
    calculateEndTime(startTime) {
      const [hours, minutes] = startTime.split(':').map(Number);
      const endTime = new Date();
      endTime.setHours(hours + 2, 0, 0, 0); // Sumar 2 horas y establecer minutos a 0
      return endTime.toTimeString().substr(0, 5); // Obtener solo HH:MM
    }
  },
  watch: {
    Inicio(newInicio) {
      this.Fin = this.calculateEndTime(newInicio);
    }
  },
  created() {
    this.Fin = this.calculateEndTime(this.Inicio);
  }
};
</script>

<style scoped>
.datos {
  display: grid;
  grid-template-columns: repeat(2, 100px);
  margin: 20px;

}

.contenedor {
  padding: 15px;
  justify-content: center;
  align-items: center;
  background-color: #DEEEFF;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 0% 20%;
}

.salas {
  margin: 15px;
}

.asis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  justify-content: center;
  margin: 30px 0px 40px 0px;
  /*top right bottom left*/
  background-color: #4A0E0A;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.listado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  justify-content: center;
  margin: 40px 0px 40px 0px;
  /*top right bottom left*/
  background-color: #4A749F;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

button {
  margin: 30px 0px;
  font-size: 15px;
  padding: 10px;
  color: #ffffff;
  background: #4A0E0A;
  border-radius: 10px;
  width: 200px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.registrar {
  background: #1A72C9;
  font-weight: bold;
}

label {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #000000;
  margin: 10px;
}

select {
  height: 25px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  border: 1px solid #C2DBF4;
  padding: 8px;
}

th {
  background-color: #0A2A4A;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

span {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #302f2f;
  margin: 10px;
}
</style>
