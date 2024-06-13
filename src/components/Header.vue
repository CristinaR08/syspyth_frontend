<template>
  <div class="header-container">
    <DateTime />
    <img id="logoUCE" alt="Logo" src="@/assets/logoUCE.png" />
    <div class="options">
      <DropdownMenu title="Registrar" :items="['Docente', 'Estudiante']" />
      <DropdownMenu title="Ingresar" :items="['Docente', 'Estudiante']" />
    </div>
  </div>
</template>

<script>
import DropdownMenu from './DropdownMenu.vue'
import DateTime from './DateTime.vue'

export default {
  name: 'Header',
  components: {
    DropdownMenu,
    DateTime
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px; /* Ajusta la altura del contenedor según sea necesario */
  background-color: #0a2b4b; /* Color de fondo del contenedor */
  box-shadow: 0 2px 4px rgb(0, 0, 0); /* Sombra para el contenedor */
  padding: 0 20px; /* Espacio interno del contenedor */
}

.left-options {
  display: flex;
  align-items: center;
}

#logoUCE {
  height: 60px; /* Ajusta el tamaño del logo aquí */
  width: auto;
  position: absolute; /* Absolute positioning to center the logo */
  left: 50%;
  transform: translateX(-50%);
}

.datetime {
 margin-left: 40px; /* Espacio entre el logo y la fecha/hora */
  font-size: 16px; /* Ajusta el tamaño de la fuente según sea necesario */
  color: rgb(255, 255, 252);
  font-weight: bold; /* Hacer el texto en negrita */
  font-family: 'Roboto', sans-serif; /* Cambiar el tipo de fuente a Roboto */
}
</style>
