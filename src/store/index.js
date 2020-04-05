import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../defaultBoard'
import { saveStatePlugin, uuid } from '../utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK(state, {task, key, value}) {
      Vue.set(task, key, value)
    }
  },
  actions: {
  },
  getters: {// <-- Add a getter
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  modules: {
  }
})
