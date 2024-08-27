<template>
  <div class="title">
    <h1>Bienvenidos Docentes</h1>
  </div>
  <div class="indicacion">
    <h1>Por favor, ingrese sus credenciales</h1>
  </div>

  <div class="container">
    <div>
      <label for="cedula" pattern="\d{10}" title="Ingrese los 10 dígitos de su cédula">Cédula:</label>
      <input type="text" id="cedula" v-model="cedula" @input="validarCedula" />
      <p v-if="cedulaError" style="color: red">{{ cedulaError }}</p>
    </div>
    <div>
      <label>Contraseña:</label>
      <input type="password" id="contraseña" v-model="contraseña" />
      <p v-if="contraseñaError" style="color: red">{{ contraseñaError }}</p>
    </div>
    <button @click="ingresarDocenteAdmin">INGRESAR</button>
    <div>
      <label for="admin">Administrador</label>
      <input type="checkbox" id="admin" v-model="admin" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      cedula: "",
      contraseña: "",
      cedulaError: "",
      contraseñaError: "",
      admin: false,
    };
  },
  methods: {
    validarCedula() {
      if (!/^\d{10}$/.test(this.cedula)) {
        this.cedulaError = "La cédula debe contener exactamente 10 números.";
      } else {
        this.cedulaError = "";
      }
    },
    async ingresarDocenteAdmin() {
      // Reiniciar errores
      this.cedulaError = "";
      this.contraseñaError = "";

      // Verificar credenciales
      try {
        let response;
        if (this.admin) {
          response = await this.verificarAdmin(this.cedula, this.contraseña);
          //sessionStorage.setItem("administrador", this.admin)
        } else {
          response = await this.verificarDocente(this.cedula, this.contraseña);
        }
        if (response.valido) {
          if (this.admin) {
            sessionStorage.setItem("administrador", this.admin);
            console.log(this.admin);
            this.$router.push("/principal_admin");
          } else {
            const nombre = response.nombre;
            const apellido = response.apellido;
            this.$router.push({
              path: "/asistenciaDocente",
              query: { nombre, apellido }
            });
          }
        } else {
          if (this.admin) {
            this.cedulaError =
              "Cédula o contraseña incorrecta para administrador";
          } else {
            this.cedulaError = "Cédula o contraseña incorrecta para docente";
          }
        }
      } catch (error) {
        console.error(error);
        this.cedulaError = "Error al verificar credenciales";
      }
    },
    async verificarAdmin(cedula, contraseña) {
      // Lógica para verificar credenciales de administrador en la base de datos
      try {
        const response = await fetch(
          "http://10.3.2.44:8087/api/v1.0/administrador/autenticar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cedula, contraseña }),
          }
        );
        return await response.json();
      } catch (error) {
        console.error(error);
        throw new Error("Error al autenticar administrador");
      }
    },
    async verificarDocente(cedula, contraseña) {
      // Lógica para verificar credenciales de docente en la base de datos
      try {
        const response = await fetch(
          "http://10.3.2.44:8087/api/v1.0/docentes/autenticar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cedula, contraseña }),
          }
        );
        return await response.json();
      } catch (error) {
        console.error(error);
        throw new Error("Error al autenticar docente");
      }
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
  margin: 30px 0px 40px 0px;
  /*top right bottom left*/
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
  background: #4a0e0a;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
