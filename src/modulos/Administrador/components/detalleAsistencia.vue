<template>
  <div>
    <div class="titulo">
      <h1>Detalle de Asistencia</h1>
    </div>
    <div v-if="detalles.length">
      <div class="contenedor">
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
            <span>{{ formatDate(detalles[0].fecha) }}</span>
          </div>
          <div class="filaC">
            <label for="semestre">Semestre:</label>
            <span>{{ detalles[0].semestre }}</span>
            <label for="paralelo">Paralelo:</label>
            <span>{{ detalles[0].paralelo }}</span>
            <label for="horaInicio">Hora Inicio:</label>
            <span>{{ formatTime(detalles[0].hora_inicio) }}</span>
            <label for="horaFin">Hora Fin:</label>
            <span>{{ formatTime(detalles[0].hora_fin) }}</span>
          </div>
        </div>
      </div>
      <div class="center-content">
        <button class="descarga" @click="descargarPDF">
          <img src="@/assets/download.png" alt="Descargar" />
        </button>
      </div>
      
      <!-- Tabla de Datos del Estudiante -->
      <div class="table-contenedor">
        <table class="table">
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
  </div>
</template>

<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  data() {
    return {
      detalles: [],
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    formatTime(timeString) {
      return new Date('1970-01-01T' + timeString + 'Z').toTimeString().substr(0, 5);
    },
    descargarPDF() {
      const doc = new jsPDF({
        orientation: "portrait",
      });

      // TEXTO DE INICIO -----------------------------------------------
      // Configurar el formato y la orientación del PDF
      const textoReglamento1 =
        "UNIVERSIDAD CENTRAL DEL ECUADOR\n" +
        "Facultad de Ingeniería y Ciencias Aplicadas\n" +
        "Carrera de Ingeniería Civíl\n" +
        "Laboratorio de Cómputo de Ingeniería Civíl\n";

      const maxWidth = doc.internal.pageSize.width - 15; // Reducir el ancho disponible para el texto

      const textoReglamento2 =
        "\nSALA: " + this.detalles[0].aula +
        "\nDOCENTE: " + this.detalles[0].nombre_docente + "  MATERIA: " + this.detalles[0].materia + "  FECHA: " + this.formatDate(this.detalles[0].fecha) +
        "\nSEMESTRE: " + this.detalles[0].semestre + "  PARARELO: " + this.detalles[0].paralelo + "  HORA INICIO: " + this.formatTime(this.detalles[0].hora_inicio) + "  HORA FIN: " + this.formatTime(this.detalles[0].hora_fin)

    
      const textLines = doc.splitTextToSize(
        textoReglamento1 + textoReglamento2,
        maxWidth
      );

      const pageWidth = doc.internal.pageSize.width; // Calcula el ancho de la página
      let yPosition = 10; // Posición vertical inicial

      // Agregar cada línea de texto al PDF centrado
      doc.setFontSize(11);
      textLines.forEach(line => {
        const textWidth = doc.getTextWidth(line);
        const xPosition = (pageWidth - textWidth) / 2;
        doc.text(line, xPosition, yPosition);
        yPosition += 5; // espacio entre líneas 
      });

      /// tabla de asistencia -----------------------------
      const columns = [
        "Cédula",
        "Nombre",
        "Apellido",
        "Máquina",
        "Confirmación",
      ];

      const data = this.detalles.map((asistencia) => {
        return [
          asistencia.cedula_estudiante,
          asistencia.nombre_estudiante,
          asistencia.apellido_estudiante,
          asistencia.maquina,
          asistencia.confirmacion,
        ];
      });

      doc.autoTable({
        head: [columns],
        body: data,
        startY: yPosition + 5,
        theme: "striped",
      });
      // Obtener la posición final de la tabla
      const finalYTable = doc.autoTable.previous.finalY;
      // Calcular la posición y justo después de la tabla con 2 saltos de línea
      let yAfterTable = finalYTable + 2 * 10; // 10 es el espacio entre líneas que has definido

      // Descargar el PDF
      doc.save("Asistencia.pdf");

    },
  },

  async created() {
    const { aula, fecha, materia } = this.$route.query;

    if (!aula || !fecha || !materia) {
      console.error('Faltan parámetros: ', { aula, fecha, materia });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1.0/asistencia/detalle_asistencia?aula=${aula}&fecha=${fecha}&materia=${materia}`);
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
  border: #4A0E0A;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #DEEEFF;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 20px 450px;
  padding: 15px;
}


h2,
h3 {
  margin: 0px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: black;
  font-size: 15px;
}

h2 {
  font-size: 20px;
}

label,
span {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
  color: #000000;
  margin: 10px;
}

label {
  font-weight: bold;
}

.table {
  width: 70%;
  border-collapse: collapse;
  background-color: #000000;
  margin: 0 auto;
}

.table-contenedor {
  margin-bottom: 20px;
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

@media(max-width:880px) {
  .detalle-contenedor {
    margin: 20px 25px;
    ;
  }

  .table {
    width: 90%;
  }
  th{
    font-size: 20px;
  }
  tr{
    font-size: 15px;
  }
}
.descarga {
  border-radius: 10px;
  margin-bottom: 15px;
}

.descarga:hover {
  background: rgb(153, 171, 231);
}

img {
  margin: 3px 0px 0px;
  width: 30px;
  height: 30px;
}
</style>