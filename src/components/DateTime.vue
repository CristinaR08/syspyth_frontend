<template>
  <div class="datetime">
    {{ currentDateTime }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDateTime: this.getCurrentDateTime()
    };
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date();
      return now.toLocaleString();
    },
    updateDateTime() {
      this.currentDateTime = this.getCurrentDateTime();
    }
  },
  mounted() {
    this.interval = setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped>
.datetime {
  font-size: 20px; /* Ajusta el tamaño de la fuente según sea necesario */
  margin-left: 20px; /* Espacio entre el logo y la fecha/hora */
  text-shadow: 1px 1px 2px rgba(225, 255, 1, 0.819); /* Añade sombra al texto */
  color: rgb(255, 255, 252);
  
}
</style>
