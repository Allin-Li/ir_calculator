<script setup lang="ts">
import ThemeToggle from './components/ThemeToggle.vue'
import Calculator from './components/Calculator.vue'
import Notes from './components/Notes.vue'
</script>

<template>
  <div class="fixed top-0 right-0 w-full h-10 bg-base-100 z-50">
    <div class="fixed top-2 left-2">
      <ThemeToggle />
    </div>
  </div>
  <div class="flex flex-col md:flex-row gap-4 max-w-[800px] text-base-content p-3 mx-auto mt-8">
    <Calculator />
    <Notes />
  </div>
</template>
