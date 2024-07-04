<template>
    <div>
        <h2 class="title">Administradores</h2>
        <!--<div class="search-container">
      <label for="search">Buscar por Cédula:</label>
      <input type="text" v-model="cedula" id="search" />
      <button @click="fetchEstudianteByCedula">Buscar</button>
    </div>-->
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
                <tr v-for="admin in admins" :key="admin.id">
                    <td>{{ admin.id }}</td>
                    <td>{{ admin.cedula }}</td>
                    <td>{{ admin.nombre }}</td>
                    <td>{{ admin.apellido }}</td>
                    <td>{{ admin.correo }}</td>
                    <td>{{ admin.contraseña }}</td>
                    <td>{{ admin.administrador }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ListaAdministradores',
    data() {
        return {
            admins: [],
            cedula: ''
        };
    },
    created() {
        this.fetchAdmin();
    },
    methods: {
        async fetchAdmin() {
            try {
                const response = await axios.get('http://localhost:5000/api/v1.0/administrador/lista');
                this.admins = response.data;
            } catch (error) {
                console.error('No hay administradores', error);
            }
        },
        async fetchAdminCedula() {
            if (this.cedula) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/v1.0/administrador/consultar/${this.cedula}`);
                    this.admins = [response.data];
                } catch (error) {
                    console.error('Error fetching student by cedula:', error);
                    this.admins = [];
                }
            } else {
                this.fetchAdmin();
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

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.search-container {
    margin-bottom: 20px;
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

</style>