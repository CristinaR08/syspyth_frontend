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
  text-shadow: 1px 1px 2px rgb(124, 235, 255); 
  color: rgb(255, 255, 252);
  margin-left: 40px; 
  font-size: 25px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; 
  
}
</style>
