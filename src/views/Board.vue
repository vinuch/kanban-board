<template>
<div>
  <b-container fluid class="board">
    <b-row class="flex flex-row items-start">
      <b-col
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
      >
        <div class="column-title">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @click="goToTask(task)"
          >
            <div class="">
              <span>{{ task.name }}</span>
              
            <p
              v-if="task.description"
              class="font-weight-normal"
            >
              {{ task.description }}
            </p>
            <div class="task-bg"
            v-if="isTaskOpen && currentTask === task.id"
            @click.stop="close">
              <router-view/>
          </div>
            </div>
           
          </div>
          
          
          <input type="text" name="new-task-field"  placeholder=" + Enter New Task" class="new-task" @keyup.enter="createTask($event, column.tasks)">
          
        </div>
      </b-col>

      <b-col class="column">
          <input
            size="35px"
            type="text"
            class="p-2 mr-2"
            placeholder="New Column Name"
            v-model="newColumnName"
            @keyup.enter="createColumn"
          >
      </b-col>
      
    </b-row>
  </b-container>
</div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        newColumnName: ''
      }
    },
    methods: {
      createTask(e, tasks) {
        this.$store.commit('CREATE_TASK', {tasks, name: e.target.value })
        e.target.value = '';
      },
      goToTask(task) {
         this.$router.push({ name: 'task', params: { id: task.id } }).catch(err => {err})
      },
      close() {
        console.log('hello')
        this.$router.replace({ name: 'board' })      }
    },
    computed: {
      ...mapState(['board']),
      isTaskOpen () {
        return this.$route.name === 'task' 
      },
      currentTask() {
        return this.$route.params.id
      } 
    }
  }
</script>

<style  scoped>
.board {
  background-color: #f5824c;
  height: 100vh;
  color: #2c3e50;
  font-weight: 600;
}
.task {
  background-color: #fff;
  padding: .5rem;
  margin: .5rem 0;
  border-radius: .3rem;
  box-shadow: 0px 2px 10px #aaa;
}
.new-task {
  width: 100%;
  background-color: transparent;
  border-radius: .3rem;
  border: none;
  padding: .3rem;
}
.column {
  background-color: #dae1e7;
  margin: 2rem .7rem;
  padding: .5rem;
  border-radius: .3rem;
  min-width: 300px;
  height: 100%;
}
.task-bg {
  /* @apply pin absolute; */
  /* background: red; */
}
</style>