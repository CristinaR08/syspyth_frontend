<template>
    <div>
        <div class="title">
            <h2>Administradores</h2>
        </div>
        <!--<div class="search-container">
      <label for="search">Buscar por Cédula:</label>
      <input type="text" v-model="cedula" id="search" />
      <button @click="fetchEstudianteByCedula">Buscar</button>
    </div>-->
    <div class="table-responsive">
        <table class="table table-dark table-striped-columns">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cédula</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Contraseña</th>
                    <th scope="col">Administrador</th>
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
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    justify-content: center;
    margin: 35px 0px 40px 0px;
    /*top right bottom left*/
    background-color: #034b1650;
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
    background-color: #0c3708;
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