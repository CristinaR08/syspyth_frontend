<template>
  <div>
    <h1>Creación Docente</h1>

    <!-- Cuadro de texto para la cédula -->
    <div>
      <label for="cedula">Cédula:</label>
      <input type="text" id="cedula" v-model="cedula" @input="validarCedula">
      <p v-if="cedulaError" style="color: red;">{{ cedulaError }}</p>
    </div>

    <!-- Cuadro de texto para la nueva contraseña -->
    <div>
      <label for="nuevaContraseña">Nueva Contraseña:</label>
      <input type="password" id="nuevaContraseña" v-model="nuevaContraseña">
    </div>

    <!-- Cuadro de texto para confirmar la contraseña -->
    <div>
      <label for="confirmarContraseña">Confirmar Contraseña:</label>
      <input type="password" id="confirmarContraseña" v-model="confirmarContraseña">
      <p v-if="contraseñaError" style="color: red;">{{ contraseñaError }}</p>
    </div>

    <!-- Botón para enviar el formulario (opcional) -->
    <button @click="crearDocente" :disabled="cedulaError || contraseñaError">Crear Docente</button>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      cedula: '',
      nuevaContraseña: '',
      confirmarContraseña: '',
      cedulaError: '',
      contraseñaError: ''
    };
  },
  methods: {
    validarCedula() {
      const cedulaRegex = /^[0-9]{10}$/;
      if (!cedulaRegex.test(this.cedula)) {
        this.cedulaError = 'La cédula debe contener solo números y tener exactamente 10 dígitos';
      } else {
        this.cedulaError = '';
      }
    },
    crearDocente() {
      // Validar que las contraseñas coincidan
      if (this.nuevaContraseña !== this.confirmarContraseña) {
        this.contraseñaError = 'Las contraseñas no coinciden';
        return;
      }
      // Aquí puedes realizar alguna acción con los datos, como enviarlos a un servidor
      console.log('Cédula:', this.cedula);
      console.log('Nueva Contraseña:', this.nuevaContraseña);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
