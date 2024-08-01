<template>
  <div>
    <h1 class="asis">Asistencia</h1>
    <div class="salas">
      <label for="sala">Sala:</label>
      <select id="sala" v-model="sala">
        <option value="">Seleccione la sala</option>
        <option value="Aula 1">Aula 1</option>
        <option value="Aula 2">Aula 2</option>
        <option value="Aula 3">Aula 3</option>
        <option value="Aula A">Aula A</option>
        <option value="Aula B">Aula B</option>
      </select>
      <p v-if="errors.sala" class="error">{{ errors.sala }}</p>
    </div>

    <div class="contenedor">
      <div class="filaA">
        <label for="nombreDocente">Docente:</label>
        <span>{{ nombre }} {{ apellido }}</span>
        <label for="materia">Materia:</label>
        <input type="text" v-model="materia" id="materia" placeholder="Ingresar materia" />
        <p v-if="errors.materia" class="error">{{ errors.materia }}</p>
      </div>

      <div class="filaB">
        <label for="semestre">Semestre: </label>
        <select id="semestre" v-model="semestre">
          <option value="">Selecciona un semestre</option>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
          <option value="Séptimo">Séptimo</option>
          <option value="Octavo">Octavo</option>
          <option value="Noveno">Noveno</option>
          <option value="Décimo">Décimo</option>
        </select>
        <p v-if="errors.semestre" class="error">{{ errors.semestre }}</p>

        <label for="paralelo">Paralelo: </label>
        <select id="paralelo" v-model="paralelo">
          <option value="">Selecciona un paralelo</option>
          <option value="P-01">1</option>
          <option value="P-02">2</option>
          <option value="P-03">3</option>
          <option value="P-04">4</option>
          <option value="P-05">5</option>
          <option value="P-06">6</option>
          <option value="P-07">7</option>
          <option value="P-08">8</option>
          <option value="P-09">9</option>
          <option value="P-10">10</option>
        </select>
        <p v-if="errors.paralelo" class="error">{{ errors.paralelo }}</p>

        <div class="filaB">
          <label for="Inicio">Hora Inicio: </label>
          <span>{{ Inicio }}</span>

          <label for="Fin">Hora Fin: </label>
          <span>{{ Fin }}</span>

          <label for="Fecha">Fecha: </label>
          <span>{{ fecha }}</span>
        </div>
      </div>
      <div class="boton">
        <button @click="verEstudiantes">VER LISTA</button>
      </div>
    </div>

    <div v-if="mostrarLista" class="lista">
      <h1 class="listado">Registro de Estudiantes</h1>
      <button class="actualizar" @click="obtenerEstudiantes">Actualizar Lista</button>
      <table>
        <thead>
          <tr>
            <th>NÓMINA</th>
            <th>EQUIPO</th>
            <th>CÉDULA</th>
            <th>
              <input type="checkbox" v-model="seleccionarTodos" @change="toggleSeleccionarTodos"> Asistencia
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.cedula">
            <td>{{ student.nombre }} {{ student.apellido }}</td>
            <td>{{ student.numero_maquina }}</td>
            <td>{{ student.cedula }}</td>
            <td>
              <input type="checkbox" v-model="student.confirmacion"
                @change="cambiarConfirmacion(student.cedula, student.confirmacion)">
            </td>
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
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return {
      nombre: this.$route.query.nombre || '',
      apellido: this.$route.query.apellido || '',
      sala: '',
      fecha: this.getCurrentDate(),
      materia: '',
      semestre: '',
      paralelo: '',
      Inicio: now.toTimeString().substr(0, 5),
      Fin: '',
      mostrarLista: false,
      students: [],
      seleccionarTodo: false,
      errors: {}
    };
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      return now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    },
    verEstudiantes() {
      if (this.validateForm()) {
        this.obtenerEstudiantes();
      }
    },
    async obtenerEstudiantes() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1.0/registro_docentes/sala/${this.sala}/fecha/${this.fecha}/inicio/${this.Inicio}/fin/${this.Fin}`);
        const data = await response.json();
        console.log("Datos de estudiantes:", data);
        this.students = data;
        this.mostrarLista = true;
        this.seleccionarTodos = false;
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    },
    toggleSeleccionarTodos() {
      this.students.forEach(student => {
        student.confirmacion = this.seleccionarTodos;
      });
    },
    async registrarAsistencia() {
      if (!this.validateForm()) {
        return;
      }
      const data = {
        nombre_docente: this.nombre,
        apellido_docente: this.apellido,
        aula: this.sala,
        materia: this.materia,
        semestre: this.semestre,
        paralelo: this.paralelo,
        fecha: this.fecha,
        hora_inicio: this.Inicio,
        hora_fin: this.Fin,
        estudiantes: this.students.map(student => ({
          cedula: student.cedula,
          nombre: student.nombre,
          apellido: student.apellido,
          carrera: student.carrera || '',
          maquina: student.numero_maquina || '',
          confirmacion: student.confirmacion
        }))
      };

      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1.0/asistencia/confirmar_asistencia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          const responseData = await response.json();
          alert(responseData.message);
          this.$router.push({ path: '/ingresarDocente' }); 
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error al registrar asistencia:', error);
        alert('Error al registrar asistencia. Por favor, inténtelo de nuevo.');
      }
    },
    getCurrentTime() {
      const now = new Date();
      now.setMinutes(0, 0, 0);
      return now.toTimeString().substr(0, 5); // Obtener solo HH:MM
    },
    calculateEndTime(startTime) {
      const [hours] = startTime.split(':').map(Number);
      const endTime = new Date();
      endTime.setHours(hours + 2, 0, 0, 0); // Sumar 2 horas y establecer minutos a 0
      return endTime.toTimeString().substr(0, 5); // Obtener solo HH:MM
    },
    validateForm() {
      this.errors = {};
      let valid = true;

      if (!this.sala) {
        this.errors.sala = 'La sala es obligatoria';
        valid = false;
      }

      if (!this.materia) {
        this.errors.materia = 'La materia es obligatoria';
        valid = false;
      }

      if (!this.semestre) {
        this.errors.semestre = 'El semestre es obligatorio';
        valid = false;
      }

      if (!this.paralelo) {
        this.errors.paralelo = 'El paralelo es obligatorio';
        valid = false;
      }

      return valid;
    },
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

.actualizar {
  margin: 5px;
  background: #0cc08a;
  color: #000000;
}

.registrar {
  background: #1A72C9;
  font-weight: bold;
  margin-bottom: 150px;
}

label {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #000000;
  margin: 10px;
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

option,
select,
input {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #302f2f;
  height: 20px;
  margin-bottom: 5px;
}

.error {
  color: red;
  margin-top: 5px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

@media(max-width:880px) {
  .contenedor {
    width: 80%;
    margin: 0% 10%;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: #DEEEFF;
    border-radius: 15px;
    border: 4px solid #000000;
  }
}
</style>
