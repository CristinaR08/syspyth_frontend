<template>
    <div>
        <div class="title">
            <h2>Bases de Datos</h2>
        </div>
        <div >
            <button class="boton1" @click="estudiante">Estudiantes</button>
        </div>
        <div>
            <button class="boton1" @click="docente">Docentes</button>
        </div>
        <div>
            <button class="boton1" @click="admin">Administradores</button>
        </div>
    </div>
</template>

<script>

export default{
    
    methods:{
        estudiante(){
            this.$router.push({path: "/ver_listas/estudiantes"});
        },
        docente(){
            this.$router.push({path: "/ver_listas/docentes"});
        },
        admin(){
            this.$router.push({path: "/ver_listas/administradores"});
        },
    }

}

</script>

<style>

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  justify-content: center;
  margin: 50px 0px 40px 0px;
  background-color: #4A0E0A;
  box-shadow: 0 2px 4px rgb(0, 0, 2);
  padding: 0 20px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.boton1 {
  margin: 30px 0px;
  justify-content: center;
  font-size: 25px;
  width: 230px;
  padding: 20px;
  font-weight: bold;
  color: #000000;
  background: #B5D9AD;
  border-radius: 10px;
  border-color: rgb(0, 0, 0);
  box-shadow: 5px 5px 5px;
  height: 70px;
  font-family: 'Times New Roman', Times, serif;
  cursor:  pointer;
}


</style>
