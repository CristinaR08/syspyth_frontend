<template>
  <div>
    <!-- Layout superior izquierdo -->
    <div class="layout-superior-izquierdo">
      <div>Docente</div>
      <div>{{ nombreDocente }}</div>
    </div>

    <!-- Tabla -->
    <table>
      <thead>
        <tr>
          <th>Nómina</th>
          <th>Correo</th>
          <th>Equipo</th>
          <th>Confirmar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(docente, index) in docentes" :key="index">
          <td>{{ docente.nomina }}</td>
          <td>{{ docente.correo }}</td>
          <td>{{ docente.equipo }}</td>
          <td><input type="checkbox" v-model="confirmacion[index]"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombreDocente: 'John Doe', // Nombre del docente (simulado)
      docentes: [ // Datos simulados de docentes
        { nomina: '001', correo: 'docente1@example.com', equipo: 'Equipo 1' },
        { nomina: '002', correo: 'docente2@example.com', equipo: 'Equipo 2' },
        { nomina: '003', correo: 'docente3@example.com', equipo: 'Equipo 3' }
        // Puedes agregar más datos simulados si lo deseas
      ],
      confirmacion: [] // Array para almacenar las confirmaciones de asistencia
    };
  },
  created() {
    // Inicializar el array de confirmaciones con el mismo tamaño que el array de docentes
    this.confirmacion = new Array(this.docentes.length).fill(false);
  }
};
</script>

<style scoped>
.layout-superior-izquierdo {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  background-color: lightgray;
  border-bottom-right-radius: 10px;
}
</style>
