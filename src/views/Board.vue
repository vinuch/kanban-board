<template>
<div>
  <b-container fluid class="board" @click.ctrl.exact="home">
    <b-row class="row">
      <b-col
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, $columnIndex)"
      >
        <div class="column-title">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task"
            draggable
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @dragstart.self="pickupTask($event, $taskIndex, $columnIndex)"
            @dragenter.prevent
            @dragover.prevent
            @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
            @click="goToTask(task)"
          >
            <div>
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
              <router-view />
          </div>
            </div>
           
          </div>
          
          
          <input type="text" name="new-task-field"  placeholder=" + Enter New Task" class="new-task" @keyup.enter="createTask($event, column.tasks)">
          
        </div>
      </b-col>

      <b-col class="column">
          <input
            size="33px"
            type="text"
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
        if(this.$router.name !== 'board') {
        this.$router.replace({ name: 'board' })     
        }
         
      },
      home() {
        
        this.$router.push('/')
      },
      pickupTask (e, taskIndex, columnIndex) {
        
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.setData('task-index', taskIndex)
        e.dataTransfer.setData('from-column-index', columnIndex)
        e.dataTransfer.setData('type', 'task')

      },
      pickupColumn (e, columnIndex) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
      
        e.dataTransfer.setData('from-column-index', columnIndex)
        e.dataTransfer.setData('type', 'column')
      },
      moveTask (e, toTasks, toTaskIndex) { // <--- Added toTaskIndex
        const fromColumnIndex = e.dataTransfer.getData('from-column-index')
        const fromTasks = this.board.columns[fromColumnIndex].tasks
        const fromTaskIndex = e.dataTransfer.getData('task-index')
        this.$store.commit('MOVE_TASK', {
          fromTasks,
          fromTaskIndex, // <-- added index
          toTasks,
          toTaskIndex // <-- added index
        })
      },
      moveTaskOrColumn(e,toTasks, toColumnIndex, toTaskIndex) {
        const type = e.dataTransfer.getData('type')
        if(type === 'task') {
          this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
        }else {
          this.moveColumn(e, toColumnIndex)
        }
      },
      moveColumn(e, toColumnIndex) {
        const fromColumnIndex = e.dataTransfer.getData('from-column-index')
        this.$store.commit('MOVE_COLUMN', {
          fromColumnIndex,
          toColumnIndex
        })
      }
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
  overflow-x: auto;
}
.row {
  flex-wrap: nowrap;
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