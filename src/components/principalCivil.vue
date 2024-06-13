<template>
  <div class="relative bg-gray-900">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <h1 class="custom-font">Bienvenido/a</h1>
    </div>
  </div>
</template>


<style>
 .bg-gray-900 {
  background-image: url('~@/assets/logoUCE1.png');
  background-size: auto 70%; /* Ajusta el tamaño de la imagen para cubrir todo el fondo */
  background-position: center; /* Centra la imagen en el fondo */
  background-repeat: no-repeat;
  position: relative; /* Establece posición relativa para los elementos hijos */
  min-height: 100vh; /* Ajusta la altura mínima del contenedor para ocupar toda la pantalla */
}

.opacity-50 {
  opacity: 0.8; /* Establece la opacidad del fondo semi-transparente */
}

.custom-font {
  color: rgb(16, 16, 51);
  font-size: 60px;
  text-shadow: 2px 2px 4px rgba(26, 30, 96, 0.5); /* Añade sombra al texto */
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif, Courier, monospace; /* Cambia la fuente del texto "Bienvenido/a" */
}

</style>