<template>
  <div class="container">
    <div>
      <h1>Tareas</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      id: null,
      title: null,
      description: null,
    };
  },
  methods: {
    obtainGetApi() {
      const path = "http://localhost:5000/api/v1.0/tasks";
      axios.get(path).then((response) => {
          this.tasks = response.data.tasks;
        })
        .catch((error) => {
          console.log(error);
        });        
    },
  },
  created() {
    this.obtainGetApi();
  },
};
</script>
  
  <style scoped>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
}

th {
  color: red;
}

td {
  color: blue;
}
</style>
  