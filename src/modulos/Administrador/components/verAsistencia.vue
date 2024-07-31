<template>
    <div>
        <div class="titulo">
            <h1>Consultar Asistencias</h1>
        </div>
        <label for="fecha">Fecha:</label>
        <input type="date" v-model="fecha" />
        <button @click="consultarAsistencias">Consultar</button>
        <div class="tablaAsistencia">
            <table v-if="asistencias.length" class="table">
                <thead>
                    <tr>
                        <th>Aula</th>
                        <th>Docente</th>
                        <th>Materia</th>
                        <th>Ver Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="asistencia in asistencias" :key="asistencia.aula + asistencia.nombre_docente">
                        <td>{{ asistencia.aula }}</td>
                        <td>{{ asistencia.nombre_docente }} {{ asistencia.apellido_docente }}</td>
                        <td>{{ asistencia.materia }}</td>
                        <td>
                            <router-link :to="{
                                path: '/detalle',
                                query: {
                                    aula: asistencia.aula,
                                    fecha: fecha,
                                    materia: asistencia.materia
                                }}">
                                Ver Asistencia
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fecha: '',
            asistencias: []
        };
    },
    methods: {
        async consultarAsistencias() {
            if (!this.fecha) return;
            const response = await fetch(`http://127.0.0.1:5000/api/v1.0/asistencia/consultar_asistencias?fecha=${this.fecha}`);
            const data = await response.json();
            this.asistencias = data;
        }
    }
};
</script>

<style>
.titulo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    justify-content: center;
    margin: 30px 0px 40px 0px;
    background-color: #4A0E0A;
    box-shadow: 0 2px 4px rgb(0, 0, 2);
    padding: 0 20px;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.table {
    width: 70%;
    border-collapse: collapse;
    background-color: #000000;
    margin: 20px auto;
}

.tablaAsistencia {
  margin-bottom: 20px;
}

th {
    background-color: #0c3708;
    font-weight: bold;
    height: 40px;
    font-size: 20px;
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
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
</style>