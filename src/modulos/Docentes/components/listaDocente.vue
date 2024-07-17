<template>
  <div>
    <div class="title">
      <h1>Docentes Registrados</h1>
    </div>
    <div class="search-container">
      <label class="buscar" for="search">Buscar por Cédula: </label>
      <input type="text" v-model="cedula" id="search" placeholder="Ingresar cédula" />

      <label class="buscar" for="searchApellido">Buscar por Apellido: </label>
      <input type="text" v-model="filtroApellido" id="searchApellido" placeholder="Ingresar apellido" />

      <label class="buscar" for="searchNombre">Buscar por Nombre: </label>
      <input type="text" v-model="filtroNombre" id="searchNombre" placeholder="Ingresar nombre" />

      <div class="button-container">
        <button @click="buscar">Buscar</button>
        <button @click="limpiarFiltros">Limpiar</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-dark table-striped-columns">
        <thead>
          <tr>
            <th scope="col" @click="sortBy('id')" style="cursor: pointer;">ID</th>
            <th scope="col" @click="sortBy('cedula')" style="cursor: pointer;">Cédula</th>
            <th scope="col" @click="sortBy('nombre')" style="cursor: pointer;">Nombre</th>
            <th scope="col" @click="sortBy('apellido')" style="cursor: pointer;">Apellido</th>
            <th scope="col">Correo</th>
            <th scope="col">Contraseña</th>
            <th scope="col">Administrador</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="docente in paginatedDocentes" :key="docente.id">
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
    <div class="pagination">
      <button class="prev" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button class="next" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'listaDocentes',
  data() {
    return {
      docentes: [],
      cedula: '',
      filtroApellido: '',
      filtroNombre: '',
      sortOrder: 'asc',
      sortKey: 'id',
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.fetchDocentes();
  },
  computed: {
    sortedDocentes() {
      return this.filteredDocentes.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a[this.sortKey] > b[this.sortKey] ? 1 : -1;
        } else {
          return a[this.sortKey] < b[this.sortKey] ? 1 : -1;
        }
      });
    },
    filteredDocentes() {
      let filtered = this.docentes;

      if (this.filtroApellido) {
        filtered = filtered.filter(docente => docente.apellido.toLowerCase().includes(this.filtroApellido.toLowerCase()));
      }

      if (this.filtroNombre) {
        filtered = filtered.filter(docente => docente.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()));
      }

      return filtered;
    },
    paginatedDocentes() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedDocentes.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredDocentes.length / this.pageSize);
    },
  },
  methods: {
    async aplicarFiltros() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1.0/docentes/lista');
        let profes = response.data;
        if (this.filtroApellido) {
          profes = profes.filter(docente => docente.apellido.toLowerCase().includes(this.filtroApellido.toLowerCase()));
        }

        if (this.filtroNombre) {
          profes = profes.filter(docente => docente.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()));
        }

        this.docentes = profes;
      } catch (error) {
        console.error('Error al aplicar filtros:', error);
      }
    },
    async fetchDocentes() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1.0/docentes/lista');
        this.docentes = response.data;
      } catch (error) {
        console.error('Mo hay docentes:', error);
      }
    },
    async buscar() {
      try {
        let response;
        if (this.cedula) {
          response = await axios.get(`http://localhost:5000/api/v1.0/docentes/consultar/${this.cedula}`);
          this.docentes = [response.data];
        } else {
          await this.aplicarFiltros();
        }
      } catch (error) {
        console.error('No se encontró el estudiante o error al buscar:', error);
        this.docentes = [];
      }
    },
    limpiarFiltros() {
      this.cedula = '';
      this.filtroApellido = '';
      this.filtroNombre = '';
      this.fetchDocentes();
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  }
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  justify-content: center;
  margin: 35px 0px 40px 0px;
  /*top right bottom left*/
  background-color: #03144b50;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  font-family: 'Courier New', Courier, monospace;
}

.table-container {
  width: 70%;
  margin: 20 auto;
  overflow-x: auto;
}

.table {
  width: 70%;
  border-collapse: collapse;
  background-color: #000000;
  /*Fondo oscuro*/
  margin: 0 auto;
}

th {
  background-color: #080b37;
  /*encabezado*/
  font-weight: bold;
  height: 40px;
  font-size: 25px;
  color: #ffffff;

  font-family: Georgia, 'Times New Roman', Times, serif;

}

td {
  height: 30px;
}

tr {
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

tbody tr:nth-child(odd) {
  background-color: #f1edf7;
  /*filas impares*/
  color: #000000;
}

tbody tr:nth-child(even) {
  background-color: #c5c6f4;
  /*filas pares*/
  color: #000000;
}

.search-container {
  display: grid;
  grid-template-columns: repeat(2, 250px);
  margin: 40px auto;
  max-width: 550px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.918);
  border-radius: 10px;
}

.button-container {
  display: flex;
  grid-column: 2;
  justify-content: center;
  margin-top: 10px;
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
  margin: 10px 0;
  color: black;
  font-size: 25px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

input {
  margin-left: 10px;
  border-radius: 5px;
  height: 25px;
  background-color: #ffffff31;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.table-responsive {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-bottom: 150px;

}

.pagination button {
  margin: 0 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 15px;
  width: 130px;
  height: 40px;
  font-size: 20px;
}

@media(max-width:880px) {
  .table {
    width: 95%;
  }

  th {
    font-size: 18px;
    text-align: center;
  }

  td {
    font-size: 15px;
    text-align: center;
  }
}
</style>