<template>
  <div class="relative bg-gray-900">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <h1 class="Bienvenida">Bienvenido/a</h1>
      <h1 class="lab">Laboratorios de Ingeniería Civil</h1>
    </div>
  </div>
</template>


<style>
 .bg-gray-900 {
  background-image: url('~@/assets/logoUCE1.png');
    background-size: auto 50%; 
    background-position: center; 
    background-repeat: no-repeat;
    position: relative; 
    min-height: 100vh; 
}


.Bienvenida {
  color: rgb(16, 16, 51);
  font-size: 60px;
  text-shadow: 2px 2px 4px rgba(26, 30, 96, 0.5); 
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif, Courier, monospace;
}

.lab{
  color: rgb(16, 16, 51);
  font-size: 40px;
  text-shadow: 2px 2px 4px rgba(26, 30, 96, 0.5); 
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif, Courier, monospace;
}

</style>