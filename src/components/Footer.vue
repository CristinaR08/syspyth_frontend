<template>
  <div class="page-container">
    <footer class="footer">
      <img id="logoUCE" alt="Logo" src="@/assets/logoUCE.png" />
      <div class="footer-section">
        <p>Desarrollado por: Cristina Rivera S. & Alfredo Guamaninga Y., 2024</p>
        <p>Responsable: Ing. Jorge Rivera</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>

.content {
  flex: 1;
  padding: 20px;
  /* Ajusta el margen para que el contenido no se superponga con el footer */
}
.footer {
  padding: 10px;
  background-color: #0a2a4b94;
  box-shadow: 0 2px 4px rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-section {
  text-align: right;
  text-shadow: 2px 2px 2px rgb(0, 0, 0);
}

#logoUCE {
  height: 70px;
  margin-left: 10px;
}
</style>