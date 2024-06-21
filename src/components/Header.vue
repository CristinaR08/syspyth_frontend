<template>
  <div class="header-container">
    <DateTime />
    <img id="logoUCE" alt="Logo" src="@/assets/logoUCE.png" @click="principal" style="cursor: pointer;"/>
    <div class="options">
      <DropdownMenu title="Registrar" :items="['Estudiante']" />
      <DropdownMenu title="Ingresar" :items="['Docente', 'Estudiante']" />
    </div>
  </div>
</template>

<script>
import DropdownMenu from './Opciones.vue'
import DateTime from './DateTime.vue'

export default {
  name: 'Header',
  components: {
    DropdownMenu,
    DateTime
  },

  methods: {
    principal(){
      this.$router.push({path:"/"})
    }
  }

}
</script>

<style scoped>
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

</style>
