<template>
  <div class="dropdown">
    <button class="dropbtn" @click="toggleDropdown">{{ title }}</button>
    <div class="dropdown-content" v-if="showDropdown">
      <a v-for="item in items" :key="item" href="#">{{ item }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  }
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  margin-right: 30px;
  margin-left: 30px;
}

.dropbtn {
  background-color: #0A2B4B;
  color: rgb(255, 255, 255);
  padding: 10px 30px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bolder;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #1A72C9;
  color: rgb(255, 255, 255);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgb(0, 0, 0);
  z-index: 1;
}

.dropdown-content a {
  color: rgb(0, 0, 0);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.dropdown-content a:hover {
  background-color: #104478;
  color: rgb(255, 254, 254);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #1A72C9;
  color: rgb(0, 0, 0);
}
</style>

