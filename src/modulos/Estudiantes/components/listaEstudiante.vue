<template>
  <div class="title">
    <h1>Estudiantes Registrados</h1>
  </div>
  <div class="search-container">
    <label class="buscar" for="search">Buscar Estudiante: </label>
    <input type="text" v-model="cedula" id="search" placeholder=" Ingresar cédula" />
    <button @click="buscarCedula">Buscar</button>
  </div>
  <div class="table-container">
    <table class="table table-dark table-striped-columns">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Cédula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Correo</th>
        </tr>
      </thead>
      <tbody class="divisores">
        <tr v-for="student in students" :key="student.id" class="table-active">
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
  name: 'listaEstudiantes',

  data() {
    return {
      students: [],
      cedula: '',
      first: 0
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
    async buscarCedula() {
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
    },
  }
};
</script>

<style scoped>
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px; 
  justify-content: center;
  margin: 35px 0px 40px 0px; /*top right bottom left*/ 
  background-color: #034b1650;
  box-shadow: 0 2px 4px rgb(0, 0, 2); 
  padding: 0 20px; 
  color: rgb(0, 0, 0);
  font-size: 15px;
  font-family:'Courier New', Courier, monospace;
}

.table-container {
  width: 70%;
  margin: 0 auto;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #000000;
  /*Fondo oscuro*/
}

th,
td {
  border: 1px solid #ffffff21;
  padding: 8px;
  text-align: left;

}

th {
  background-color: #0c3708;
  /*encabezado*/
  font-weight: bold;
  font-size: 25px;
  color: #ffffff;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

tr {
  font-size: 22px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

tbody tr:nth-child(odd) {
  background-color: #edf7ed;
  /*filas impares*/
  color: #000000;
}

tbody tr:nth-child(even) {
  background-color: #d0f4c5;
  /*filas pares*/
  color: #000000;
}

.search-container {
  margin: 40px;
}

button {
  margin-left: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 15px;
  width: 70px;
  height: 40px;
  font-size: 20px;
}

.buscar {
  color: black;
  font-size: 25px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

input {
  margin-left: 10px;
  border-radius: 5px;
  height: 25px;
  background-color: #ffffff31;
}

th {
  text-align: center;
}

#search {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #333;
  /* Color for input text */
  font-size: 20px;
}

#search::placeholder {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #999;
  /* Color for placeholder text */
}
</style>