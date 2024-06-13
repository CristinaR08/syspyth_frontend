<template>
  <div>
    <h1>Registro de Asistencia Docente</h1>

    <!-- Cuadro de texto para el email -->
    <div>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" @blur="validarEmail">
      <p v-if="emailError" style="color: red;">{{ emailError }}</p>
    </div>

    <!-- Cuadro de texto para la contraseña -->
    <div>
      <label for="password">Contraseña:</label>
      <input :type="tipoDeInput" id="password" v-model="password">
      <button @click="toggleMostrarContrasena">
        {{ mostrarContrasena ? 'Ocultar' : 'Mostrar' }} contraseña
      </button>
    </div>

    <!-- Botón para enviar el formulario (opcional) -->
    <button @click="registrarAsistencia" :disabled="emailError">Registrar Asistencia</button>

    <!-- Hipervínculo para crear docente -->
    <router-link to="/crear-docente">Crear Docente</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      mostrarContrasena: false
    };
  },
  computed: {
    tipoDeInput() {
      return this.mostrarContrasena ? 'text' : 'password';
    }
  },
  methods: {
    validarEmail() {
      if (!this.email.endsWith('@uce.edu.ec')) {
        this.emailError = 'El email debe ser de la Universidad Central del Ecuador (uce.edu.ec)';
      } else {
        this.emailError = '';
      }
    },
    toggleMostrarContrasena() {
      this.mostrarContrasena = !this.mostrarContrasena;
    },
    registrarAsistencia() {
      // Aquí puedes realizar alguna acción con los datos, como enviarlos a un servidor
      console.log('Email:', this.email);
      console.log('Contraseña:', this.password);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
