<template>
  <div class="container">
    <img id="logoUCE" alt="Logo" src="@/assets/logoUCE.png" />
    <div class="footer-section">
      <p>Desarrollado por: Cristina L. Rivera S., 2024</p>
      <p>Responsable :Ing. Jorge Rivera</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.container {
    margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 105px;
  background-color: #0a2a4b94;
  box-shadow: 0 2px 4px rgb(0, 0, 0);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: auto;
}

.footer-section {
  color: aliceblue;
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: right;
  width: 100%; 
  text-shadow: 2px 2px 2px rgb(0, 0, 0); 
}

#logoUCE {
  height: 70px;
  margin-left: 10px;
}
</style>