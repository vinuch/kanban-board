<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        class="p-2 w-full mr-2 block text-xl font-bold"
        ref="title"
        :value="task.name"
        @click.stop.prevent=""
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
        @load="setFocus"
      >

      <textarea
        ref="description"
        class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
        placeholder="Enter task description"
        @click.stop.prevent=""
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTask']),
    task() {
      return this.getTask(this.$route.params.id)
    }
  },
  mounted() {
      this.$refs.title.focus();
      this.$er
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
      e.target.value = ''
    },
    setFocus(arr) {
      console.log('hi',arr)
      this.$refs.arr.focus();
    }
  }
}
</script>

<style>
.task-view {
  /* @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow; */
  max-width: 700px;
}
</style>
