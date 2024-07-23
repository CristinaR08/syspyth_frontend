<template>
    <div>
        <h1>Consultar Asistencias</h1>
        <label for="fecha">Fecha:</label>
        <input type="date" v-model="fecha" />
        <button @click="consultarAsistencias">Consultar</button>
        <table v-if="asistencias.length">
            <thead>
                <tr>
                    <th>Aula</th>
                    <th>Cédula Docente</th>
                    <th>Docente</th>
                    <th>Ver Asistencia</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asistencia in asistencias" :key="asistencia.cedula_docente">
                    <td>{{ asistencia.aula }}</td>
                    <td>{{ asistencia.cedula_docente }}</td>
                    <td>{{ asistencia.nombre_docente }} {{ asistencia.apellido_docente }}</td>
                    <td>
                        <router-link
                            :to="{ name: 'DetalleAsistencia', query: { cedula_docente: asistencia.cedula_docente, aula: asistencia.aula, fecha: fecha } }">
                            Ver Asistencia
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
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