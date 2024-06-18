<template>
  <div class="title">
    <h1>Bienvenido/a Ingeniero/a</h1>
  </div> 
  <div class="indicacion">
    <h1>Por favor, ingrese sus credenciales</h1>
  </div>
  
  <div class="container">
    <div>
      <label for="cedula">Cédula:</label>
      <input type="text" id="cedula" v-model="cedula" @input="validarCedula">
      <p v-if="cedulaError" style="color: red;">{{ cedulaError }}</p>
    </div>

    <!-- Cuadro de texto para la contraseña -->
    <div>
      <label for="confirmarContraseña">Contraseña:</label>
      <input type="password" id="confirmarContraseña" v-model="confirmarContraseña">
      <p v-if="contraseñaError" style="color: red;">{{ contraseñaError }}</p>
    </div>

    <!-- Botón para enviar el formulario (opcional) -->
    <button @click="crearDocente" :disabled="cedulaError || contraseñaError">INGRESAR</button>
  
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
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px; 
  justify-content: center;
  margin: 30px 0px 40px 0px; /*top right bottom left*/ 
  background-color: #4A0E0A;
  box-shadow: 0 2px 4px rgb(0, 0, 2); 
  padding: 0 20px; 
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.indicacion{
font-size: 15px;
color: black;
font-family: 'Courier New', Courier, monospace;
}

.container{
  padding: 15px;
  justify-content: center;
  align-items: center;
  background-color:#DEEEFF ;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 0% 30%;
}

label, input{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #000000;
  margin: 10px;
}

button{
  margin: 30px 0px;
  font-size: 15px;
  padding: 10px;
  color: #ffffff;
  background: #4A0E0A;
  border-radius: 10px;
  width: 200px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

</style>
