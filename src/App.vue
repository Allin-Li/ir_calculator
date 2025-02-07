<template>
  <div class="min-h-screen text-base-content p-4">
    <ThemeToggle :theme="theme" @toggle-theme="toggleTheme" />
    
    <Calculator />
    <Notes />
    
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'
import Calculator from './components/Calculator.vue'
import Notes from './components/Notes.vue'

const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dracula' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

</script>