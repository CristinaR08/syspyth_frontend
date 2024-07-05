<template>
  <div>
    <div class="search-container">
    <label for="search">Buscar Docente:</label>
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
          <th>Contraseña</th>
          <th>Administrador</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="docente in docentes" :key="docente.id">
          <td>{{ docente.id }}</td>
          <td>{{ docente.cedula }}</td>
          <td>{{ docente.nombre }}</td>
          <td>{{ docente.apellido }}</td>
          <td>{{ docente.correo }}</td>
          <td>{{ docente.contraseña }}</td>
          <td>{{ docente.administrador }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListaDocentes',
  data() {
    return {
      docentes: [],
      cedula: ''
    };
  },
  created() {
    this.fetchDocentes();
  },
  methods: {
    async fetchDocentes() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1.0/docentes/lista');
        this.docentes = response.data;
      } catch (error) {
        console.error('Mo hay docentes:', error);
      }
    },
    async fetchDocentesByCedula() {
      if (this.cedula) {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1.0/docentes/consultar/${this.cedula}`);
          this.docentes = [response.data];
        } catch (error) {
          console.error('No se encontró al docente con la cédula ingresada:', error);
          this.docentes = [];
        }
      } else {
        this.fetchDocentes();
      }
    }
  }
};
</script>

<style scoped>
.table-container {
  width: 70%;
  margin: 0 auto; 
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #000000; /*Fondo oscuro*/
}

th,
td {
  border: 1px solid #ffffff21;
  padding: 8px;
  text-align: left;

}

th {
  background-color: #4A0A3B; /*encabezado*/
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
  background-color: #edf7ed; /*filas impares*/
  color: #000000; 
}

tbody tr:nth-child(even) {
  background-color: #F4C5E9; /*filas pares*/
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
th{
  text-align: center;
}
#search {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #333; /* Color for input text */
    font-size: 20px;
  }

  #search::placeholder {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #999; /* Color for placeholder text */
  }

</style>