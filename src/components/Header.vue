<template>
  <div class="header-container">
    <DateTime />
    <img id="logoUCE" alt="Logo" src="@/assets/logoUCE.png" @click="principal" style="cursor: pointer" />
    <div class="Opciones">
      <div v-if="!isAdmin" class="options">
        <router-link class="router" to="/registrarEstudiante">
          <button>
            Registro
          </button>
        </router-link>
        <router-link class="router" to="/ingresarEstudiante">
          <button>Estudiante</button>
        </router-link>
        <router-link class="router" to="/ingresarDocente">
          <button>Docente</button>
        </router-link>
      </div>
      <div v-if="isAdmin" class="options">
        <router-link class="router" to="/registrarNuevo">
          <button>Nuevo</button>
        </router-link>
        <router-link class="router" to="/ver_listas">
          <button>Listas</button>
        </router-link>
        <router-link class="router" to="/asistencia">
          <button>Asistencia</button>
        </router-link>
        <button class="salir" @click="logout">
          LogOut
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from "./DateTime.vue";
import principalAdmin from "../modulos/Administrador/components/principalAdmin.vue"

export default {
  name: "Header",
  components: {
    DateTime,
    principalAdmin,
  },

  data() {
    return {
      isAdmin: false,
    }
  },

  methods: {
    actualizarEstado() {
      this.isAdmin = sessionStorage.getItem("administrador");
      console.log(this.isAdmin);
      console.log("Actualizar");
    },
    principal() {
      this.$router.push({ path: "/" });
      this.isAdmin = false;
      sessionStorage.removeItem("administrador");
    },
    logout() {
      sessionStorage.removeItem("administrador");
      this.isAdmin = false;
      this.$router.push({ path: "/" });
    },
  },

  mounted() {
    this.actualizarEstado()
  },

  watch: {
    '$route'(to, from) {
      this.actualizarEstado();
    }
  },
};
</script>

<style scoped>
.router {
  text-decoration: none;
  color: rgb(255, 252, 252);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 105px;
  background-color: #0a2b4b;
  box-shadow: 0 2px 4px rgb(0, 0, 0);
  padding: 0 20px;
}

.Opciones {
  display: flex;
  align-items: center;
}

.options {
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;
}

.button-row {
  display: flex;
}

.options button {
  margin: 5px;
}


#logoUCE {
  height: 90px;
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bolder;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-color: #0a2b4b;
  color: azure;
}

button:hover {
  background-color: #1a72c9;
  color: black;
}


.salir {
  color: rgb(191, 6, 6);
}

.salir:hover {
  background-color: #c20f03;
  color: black;
}
</style>
