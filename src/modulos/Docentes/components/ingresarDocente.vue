<template>
  <div class="title">
    <h1>Bienvenidos Docentes</h1>
  </div>
  <div class="indicacion">
    <h1>Por favor, ingrese sus credenciales</h1>
  </div>

  <div class="container">
    <div>
      <label for="cedula">Cédula:</label>
      <input type="text" id="cedula" v-model="cedula" @input="validarCedula" />
      <p v-if="cedulaError" style="color: red">{{ cedulaError }}</p>
    </div>

    <!-- Cuadro de texto para la contraseña -->
    <div>
      <label for="confirmarContraseña">Contraseña:</label>
      <input
        type="password"
        id="confirmarContraseña"
        v-model="confirmarContraseña"
      />
      <p v-if="contraseñaError" style="color: red">{{ contraseñaError }}</p>
    </div>

    <button @click="ingresarDocenteAdmin">INGRESAR</button>
  </div>
</template>

  <script>
import axios from "axios";

export default {
  data() {
    return {
      cedula: "",
      confirmarContraseña: "",
      cedulaError: "",
      contraseñaError: "",
    };
  },
  methods: {
    async ingresarDocenteAdmin() {
      this.cedulaError = "";
      this.contraseñaError = "";

      // Validar cédula y contraseña
      if (!this.cedula) {
        this.cedulaError = "Debe ingresar la cédula";
      }
      if (!this.confirmarContraseña) {
        this.contraseñaError = "Debe ingresar la contraseña";
      }
      if (this.cedulaError || this.contraseñaError) {
        return;
      }

      try {
        // Consultar si la cédula pertenece a un docente
        const responseDocente = await axios.get(
          `http://127.0.0.1:5000/api/v1.0/docentes/consultar/${this.cedula}`
        );
        if (responseDocente.status === 200 && responseDocente.data.id_docente) {
          // Redireccionar a la página de docente
          this.$router.push("/asistenciaDocente");
          return;
        }
      } catch (error) {
        console.error("Error al consultar el docente:", error);
      }

      try {
        // Consultar si la cédula pertenece a un administrador
        const responseAdmin = await axios.get(
          `http://127.0.0.1:5000/api/v1.0/administrador/consultar/${this.cedula}`
        );
        if (
          responseAdmin.status === 200 &&
          responseAdmin.data.id_administrador
        ) {
          // Redireccionar a la página de administrador
          this.$router.push("/principal_admin");
          return;
        }
      } catch (error) {
        console.error("Error al consultar el administrador:", error);
      }

      // Si no se encuentra ni como docente ni como administrador
      this.cedulaError = "Cédula no encontrada en el sistema";
    },
  },
};
</script>


<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  justify-content: center;
  margin: 30px 0px 40px 0px; /*top right bottom left*/
  background-color: #4a0e0a;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.indicacion {
  font-size: 15px;
  color: black;
  font-family: "Courier New", Courier, monospace;
}

.container {
  padding: 15px;
  justify-content: center;
  align-items: center;
  background-color: #deeeff;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 0% 30%;
}

label,
input {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 25px;
  color: #000000;
  margin: 10px;
}

button {
  margin: 30px 0px;
  font-size: 15px;
  padding: 10px;
  color: #ffffff;
  background: #4A0E0A;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
