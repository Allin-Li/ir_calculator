<template>
    <div class="fixed top-4 left-4">
      <ThemeToggle :theme="theme" @toggle-theme="toggleTheme" />
    </div>
  <div class="flex flex-col md:flex-row gap-4 max-w-[800px] text-base-content p-4 mx-auto mt-8">
    
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