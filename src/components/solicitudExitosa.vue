<template>
    <div class="exito">
      <img class="check" src="@/assets/check.png"/>
      <p>Solicitud Exitosa</p>
    </div>
   </template>
 
 <script>
 export default {
   methods: {
     inicio(){
       this.$router.push({path:"/solicitudExitosa"})
     }
   }
 
 }
 </script>

 <style>
 
 .exito {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.exito img {
  margin: 50px;
  max-width: 10%;
  height: auto;
}

.exito p {
  font-size: 70px;
  color: black;
  margin: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

 </style>
 