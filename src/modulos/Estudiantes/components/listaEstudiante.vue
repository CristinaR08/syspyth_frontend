<template>
    <div>
    <h2 class="title" >Lista de Estudiantes</h2>
    <div class="search-container">
      <label class="buscar" for="search">Buscar por Cédula:  </label>
      <input type="text" v-model="cedula" id="search" />
      <button @click="fetchEstudianteByCedula">Buscar</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.cedula }}</td>
          <td>{{ student.nombre }}</td>
          <td>{{ student.apellido }}</td>
          <td>{{ student.correo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListaEstudiantes',
  data() {
    return {
      students: [],
      cedula: ''
    };
  },
  created() {
    this.fetchEstudiantes();
  },
  methods: {
    async fetchEstudiantes() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1.0/estudiantes/lista');
        this.students = response.data;
      } catch (error) {
        console.error('No existen estudiantes', error);
      }
    },
    async fetchEstudianteByCedula() {
      if (this.cedula) {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1.0/estudiantes/consultar/${this.cedula}`);
          this.students = [response.data];
        } catch (error) {
          console.error('No existe un estudiante registrado con esa cédula', error);
          this.students = [];
        }
      } else {
        this.fetchEstudiantes();
      }
    }
  }
};
</script>

<style scoped>
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
  background-color: #f2f2f2;
  font-weight: bold;
}

.search-container {
  margin-bottom: 30px;
}

button {
  margin-left: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  justify-content: center;
  margin: 30px 0px 40px 0px;
  /*top right bottom left*/
  background-color: #4a0e0a;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.buscar{
  color: black;
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

input{
  margin-left: 10px;
  border-radius: 5px;
  background-color: #ffffff31;
}

</style>