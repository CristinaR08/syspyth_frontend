<template>
  <div>
    <h1>Registro de Asistencia Estudiante</h1>

    <!-- Cuadro de texto para el email -->
    <div>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" @blur="validarEmail">
      <p v-if="emailError" style="color: red;">{{ emailError }}</p>
    </div>

    <!-- Combobox para seleccionar el equipo -->
    <div>
      <label for="equipo">Equipo:</label>
      <select id="equipo" v-model="equipo">
        <option value="equipo1">Equipo 1</option>
        <option value="equipo2">Equipo 2</option>
        <option value="equipo3">Equipo 3</option>
        <!-- Agrega más opciones si es necesario -->
      </select>
    </div>

    <!-- Botón para enviar el formulario (opcional) -->
    <button @click="registrarAsistencia" :disabled="emailError">Registrar Asistencia</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      equipo: '',
      emailError: ''
    };
  },
  methods: {
    validarEmail() {
      if (!this.email.endsWith('@uce.edu.ec')) {
        this.emailError = 'El email debe ser de la Universidad Central del Ecuador (uce.edu.ec)';
      } else {
        this.emailError = '';
      }
    },
    registrarAsistencia() {
      // Aquí puedes realizar alguna acción con los datos, como enviarlos a un servidor
      console.log('Email:', this.email);
      console.log('Equipo:', this.equipo);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
