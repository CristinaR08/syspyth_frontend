<template>
    <div>
      <h1>Detalle de Asistencia</h1>
      <div v-if="detalles.length">
        <h2>Datos del Docente y Sesión</h2>
        <table>
          <thead>
            <tr>
              <th>Docente</th>
              <th>Sala</th>
              <th>Materia</th>
              <th>Semestre</th>
              <th>Paralelo</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ detalles[0].nombre_docente }} {{ detalles[0].apellido_docente }}</td>
              <td>{{ detalles[0].aula }}</td>
              <td>{{ detalles[0].materia }}</td>
              <td>{{ detalles[0].semestre }}</td>
              <td>{{ detalles[0].paralelo }}</td>
              <td>{{ detalles[0].hora_inicio }}</td>
              <td>{{ detalles[0].hora_fin }}</td>
              <td>{{ detalles[0].fecha }}</td>
            </tr>
          </tbody>
        </table>
  
        <h2>Lista de Estudiantes</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Número de Máquina</th>
              <th>Cédula</th>
              <th>Asistencia Confirmada</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in detalles" :key="detalle.cedula_estudiante">
              <td>{{ detalle.nombre_estudiante }}</td>
              <td>{{ detalle.apellido_estudiante }}</td>
              <td>{{ detalle.maquina_estudiante }}</td>
              <td>{{ detalle.cedula_estudiante }}</td>
              <td>{{ detalle.confirmacion ? 'Sí' : 'No' }}</td>
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
        detalles: []
      };
    },
    async created() {
      const {aula, fecha, materia } = this.$route.query;
      const response = await fetch(`http://127.0.0.1:5000/api/v1.0/detalle_asistencia?aula=${aula}&fecha=${fecha}&materia=${materia}`);
      const data = await response.json();
      this.detalles = data;
    }
  };
  </script>
  