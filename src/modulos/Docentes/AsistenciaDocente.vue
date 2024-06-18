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
        <input type="text" v-model="docente" id="docente"/>
        
        <label for="materia">Materia:</label>
        <input type="text" v-model="materia" id="materia"/>

      </div>

      <div class="filaB">
        <label for="semestre">Semestre: </label>
        <select id="sala" v-model="sala">
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
        <select id="Inicio" v-model="Inicio">
        <option value="7am">07:00</option>
        <option value="8am">08:00</option>
        <option value="9am">09:00</option>
        <option value="10am">10:00</option>
        <option value="11am">11:00</option>
        <option value="12pm">12:00</option>
        <option value="13pm">13:00</option>
        <option value="14pm">14:00</option>
        <option value="15pm">15:00</option>
        <option value="16pm">16:00</option>
        <option value="17pm">17:00</option>
        <option value="18pm">18:00</option>
        <option value="19pm">19:00</option>
        <option value="20pm">20:00</option>
      </select>

      <label for="Fin">Hora Fin: </label>
        <select id="Fin" v-model="Fin">
        <option value="7am">07:00</option>
        <option value="8am">08:00</option>
        <option value="9am">09:00</option>
        <option value="10am">10:00</option>
        <option value="11am">11:00</option>
        <option value="12pm">12:00</option>
        <option value="13pm">13:00</option>
        <option value="14pm">14:00</option>
        <option value="15pm">15:00</option>
        <option value="16pm">16:00</option>
        <option value="17pm">17:00</option>
        <option value="18pm">18:00</option>
        <option value="19pm">19:00</option>
        <option value="20pm">20:00</option>
      </select>
      </div>
      <div class="boton">
        <button @click="registrarAsistencia">VER LISTA</button>
      </div>
    </div>

<div class="mostrarLista">
  <div class="lista">
    <h1>Registro de Estudiantes</h1>
  <table>
    <thead>
      <tr>
        <th>Nómina</th>
        <th>Equipo</th>
        <th>Cédula</th>
        <th>Check</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="student in students" :key="student.cedula">
          <td>{{ student.cedula }}</td>
          <td>{{ student.nombre }}</td>
          <td>{{ student.apellido }}</td>
          <td>{{ student.correo }}</td>
          <td>{{ student.carrera }}</td>
        </tr>
      </tbody>
  </table>
  </div>
</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      mostrarContrasena: false
    };
  },
  computed: {
    tipoDeInput() {
      return this.mostrarContrasena ? 'text' : 'password';
    }
  },
  methods: {
    validarEmail() {
      if (!this.email.endsWith('@uce.edu.ec')) {
        this.emailError = 'El email debe ser de la Universidad Central del Ecuador (uce.edu.ec)';
      } else {
        this.emailError = '';
      }
    },
    toggleMostrarContrasena() {
      this.mostrarContrasena = !this.mostrarContrasena;
    },
    registrarAsistencia() {
      // Aquí puedes realizar alguna acción con los datos, como enviarlos a un servidor
      console.log('Email:', this.email);
      console.log('Contraseña:', this.password);
    }
  }
};
</script>

<style scoped>
.datos{
  display:grid;
  grid-template-columns: repeat(2, 100px);
  margin: 20px;
  
}

.contenedor{
  padding: 15px;
  justify-content: center;
  align-items: center;
  background-color:#DEEEFF ;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 0% 20%;
}

.salas{
  margin: 15px;
}

.asis{
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
  font-size: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

button{
  margin: 30px 0px;
  font-size: 15px;
  padding: 10px;
  color: #ffffff;
  background: #4A0E0A;
  border-radius: 10px;
  width: 200px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
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

  table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #8EC97F;
  font-weight: bold;
}

</style>
