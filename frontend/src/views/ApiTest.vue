<script setup>
import { ref, onMounted } from "vue"

const tasks = ref([])
const text = ref("")

const loadTasks = async () => {
  const res = await fetch("http://localhost:8000/api/v1/test/tasks")
  tasks.value = await res.json()
  console.log(tasks.value)
}

onMounted(() => {
  loadTasks()
})

// Add new task
const addTask = async () => {
  await fetch("http://localhost:8000/api/v1/test/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text.value, completed: false }),
  })
  text.value = ""
  loadTasks()
}

// Toggle completion
const toggleTask = async (task) => {
  await fetch(`http://localhost:8000/api/v1/test/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, completed: !task.completed }),
  })
  loadTasks()
}

// Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:8000/api/v1/test/tasks/${id}`, {
    method: "DELETE",
  })
  loadTasks()
}
</script>

<template>
  <div style="padding: 20px">
    <h1>To-Do App</h1>

    <input v-model="text" />
    <button @click="addTask">Add</button>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleTask(task)"
        />
        {{ task.name }}
        <button @click="deleteTask(task.id)"> X </button>
      </li>
    </ul>
  </div>
</template>