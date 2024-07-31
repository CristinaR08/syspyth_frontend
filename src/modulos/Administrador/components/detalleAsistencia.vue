<template>
  <div>
    <div class="titulo">
      <h1>Detalle de Asistencia</h1>
    </div>
    <div v-if="detalles.length">
      <div class="contenedor" >
      <h2>UNIVERSIDAD CENTRAL DEL ECUADOR</h2>
      <h3>Facultad de Ingeniería y Ciencias Aplicadas</h3>
      <h3>Carrera de Ingeniería Civíl</h3>
      <h3>Laboratorio de Cómputo de Ingeniería Civíl</h3>
      <div class="detalle-contenedor">
        <div class="filaA">
          <label for="aula">Sala:</label>
          <span>{{ detalles[0].aula }}</span>
        </div>
        <div class="filaB">
          <label for="nombreDocente">Docente:</label>
          <span>{{ detalles[0].nombre_docente }} {{ detalles[0].apellido_docente }}</span>
          <label for="materia">Materia:</label>
          <span>{{ detalles[0].materia }}</span>
          <label for="fecha">Fecha:</label>
          <span>{{ detalles[0].fecha }}</span>
        </div>
        <div class="filaC">
          <label for="semestre">Semestre:</label>
          <span>{{ detalles[0].semestre }}</span>
          <label for="paralelo">Paralelo:</label>
          <span>{{ detalles[0].paralelo }}</span>
          <label for="horaInicio">Hora Inicio:</label>
          <span>{{ detalles[0].hora_inicio }}</span>
          <label for="horaFin">Hora Fin:</label>
          <span>{{ detalles[0].hora_fin }}</span>
        </div>
      </div>
    </div>
      <!-- Tabla de Datos del Estudiante -->
      <h2>Datos de los Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Máquina</th>
            <th>Confirmación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(estudiante, index) in detalles" :key="index">
            <td>{{ estudiante.cedula_estudiante }}</td>
            <td>{{ estudiante.nombre_estudiante }}</td>
            <td>{{ estudiante.apellido_estudiante }}</td>
            <td>{{ estudiante.maquina }}</td>
            <td>{{ estudiante.confirmacion ? 'Sí' : 'No' }}</td>
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
      detalles: [],
      nombre: '',
    };
  },
  async created() {
    const { aula, fecha, materia } = this.$route.query;

    if (!aula || !fecha || !materia) {
      console.error('Faltan parámetros: ', { aula, fecha, materia });
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1.0/asistencia/detalle_asistencia?aula=${aula}&fecha=${fecha}&materia=${materia}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      this.detalles = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
</script>

<style scoped>
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

.detalle-contenedor {
  margin-bottom: 20px;
}


h2,h3{
  margin: 0px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: black;
}

label {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #000000;
  margin: 10px;
}
</style>