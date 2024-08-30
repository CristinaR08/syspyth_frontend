<template>
  <div>
    <div class="title">
      <h2>Registrar Nuevo</h2>
    </div>
    <div class="container">
      <div class="datos">
        <label for="cedula">Cédula:</label>
        <input type="text" v-model="cedula" id="cedula" />

        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" id="nombre" />

        <label for="apellido">Apellido:</label>
        <input type="text" v-model="apellido" id="apellido" />

        <label for="correo">Correo:</label>
        <input type="email" v-model="correo" id="correo" />

        <label for="carrera">Contraseña:</label>
        <input type="text" v-model="contraseña" id="contraseña" />
      </div>
      <div class="cargo">
        <label for="cargo">Cargo:</label>
        <select id="cargo" v-model="cargo">
          <option disabled value="">Seleccione el cargo</option>
          <option value="docente">Docente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div class="boton">
        <button @click="saveUsuario">GUARDAR</button>
      </div>
      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
    
          <router-link class="router" to="/principal_admin">
            <button class="volver">Volver</button>
          </router-link>
        
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      cedula: '',
      nombre: '',
      apellido: '',
      correo: '',
      contraseña: '',
      cargo: '', // Valor por defecto
      errorMessage: ''
    };
  },
  methods: {
    volver(){
      this.$router.push({ path: "/principal_admin"});
    },
  async saveUsuario() {
    // Validaciones antes de enviar la solicitud
    if (!this.cedula || !this.nombre || !this.apellido || !this.correo || !this.contraseña) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    // Validación cédula (10 números)
    if (!(/^\d{10}$/.test(this.cedula))) {
      this.errorMessage = 'La cédula debe contener exactamente 10 números.';
      return;
    }

    // Validación correo electrónico
    if (!(/^[\w.-]+@uce\.edu\.ec$/.test(this.correo))) {
      this.errorMessage = 'El correo electrónico debe ser de la UCE (ejemplo@uce.edu.ec).';
      return;
    }

    // Validación para nombre y apellido (solo caracteres alfabéticos)
    if (!(/^[A-Za-z]+$/.test(this.nombre)) || !(/^[A-Za-z]+$/.test(this.apellido))) {
      this.errorMessage = 'El nombre y apellido deben contener solo letras.';
      return;
    }

    try {
      let url = '';

      if (this.cargo === 'docente') {
        url = 'http://localhost:8080/api/v1.0/docentes/registrar';
      } else if (this.cargo === 'admin') {
        url = 'http://localhost:8080/api/v1.0/administrador/registrar';
      }

      const response = await axios.post(url, {
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contraseña: this.contraseña
      });

      alert('Usuario registrado exitosamente.');
      this.errorMessage = '';
      this.cedula = '';
      this.nombre = '';
      this.apellido = '';
      this.correo = '';
      this.contraseña = '';

    } catch (error) {
      if (error.response) {
        this.errorMessage = error.response.data.error;
      } else {
        this.errorMessage = 'Error al registrar el usuario';
      }
    }
  }
}
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
  background-color: #4A0E0A;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #DEEEFF;
  border-radius: 15px;
  border: 4px solid #000000;
  margin: 0% 30%;
}

.datos {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  margin: 20px;

}

.cargo {
  display: grid;
  grid-template-columns: repeat(2, 100px);
  justify-content: center;
  align-items: center;
}

.volver{
  margin: 20px; 
  margin-right: 70%;
  border-radius: 10px;
  background: #c2b9b8;
  color: #000000;
  font-weight: bold;
  height: 30px;
  width: 80px;
  cursor: pointer;
}

.boton button {
  margin: 30px 0px;
  font-size: 15px;
  padding: 10px;
  color: #ffffff;
  background: #4A0E0A;
  border-radius: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  cursor: pointer;
}


input,
label {
  margin: 10px;
}

input {
  width: 150px;
}

select {
  height: 25px;
  width: 150px;
}

label {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 25px;
  color: #000000;
}

.router {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

@media(max-width:880px){
  .container{
    width: 60%;
  }
}

</style>