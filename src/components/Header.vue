<template>
  <div class="header-container">
    <DateTime />
    <img
      id="logoUCE"
      alt="Logo"
      src="@/assets/logoUCE.png"
      @click="principal"
      style="cursor: pointer"
    />
    
    <ingresar-docente @obtenerEstado = "actualizarEstado">
      
    </ingresar-docente>

    <div v-if="!isAdmin" class="options">
      <button>
        <router-link class="router" to="/registrarEstudiante">
          Registro
        </router-link>
      </button>
      <button>
        <router-link class="router" to="/ingresarEstudiante">
          Estudiante
        </router-link>
      </button>
      <button>
        <router-link class="router" to="/ingresarDocente">
          Docente
        </router-link>
      </button>
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

  data(){
    return{
      isAdmin:false,
    }
  },

  methods: {
    actualizarEstado(nuevoEstado){
      console.log("new estado", nuevoEstado);
      this.isAdmin = nuevoEstado
    },
    principal() {
      this.$router.push({ path: "/" });
    },
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

.left-options {
  display: flex;
  align-items: center;
}

#logoUCE {
  height: 90px;
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

button {
  padding: 10px 30px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bolder;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-color: #0a2b4b;
  margin: 0px 10px;
}

button:hover {
  background-color: #1a72c9;
  
}

.router:hover{
  color: black;
}

</style>
