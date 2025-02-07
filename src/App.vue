<template>
  <div class="min-h-screen text-base-content p-4">
    <label class="flex cursor-pointer gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
      <input type="checkbox" :checked="theme === 'dracula'" @change="toggleTheme" class="toggle theme-controller" />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </label>
    <div class="card bg-base-200 max-w-sm mx-auto flex justify-center items-center pb-8">
      <h2 class="text-xl mb-4">Калькулятор инсулинорезистентности</h2>

      <input 
        type="number" 
        v-model.number="waist" 
        placeholder="Окружность талии (см)" 
        class="input mb-4"
      />

      <input 
        type="number" 
        v-model.number="hba1c" 
        placeholder="HbA1c (%)" 
        class="input mb-4"
      />

      <input 
        type="number" 
        v-model.number="triglycerides" 
        placeholder="Триглицериды (ммоль/л)" 
        class="input mb-4"
      />

      <div v-if="isValid" class="alert alert-success w-80">
        <p>IS Index: {{insulinSensitivity}}</p>
        <small>Men ≤5.02, Women ≤5.64 indicates resistance</small>
      </div>

    </div>
  </div>

</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

// Theme handling
const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dracula' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

// Reactive values
const waist = ref(null)
const hba1c = ref(null)
const triglycerides = ref(null)

// Computed insulin sensitivity

const insulinSensitivity = computed(() => {
  if (!isValid.value) return null
  
  // Convert triglycerides to mg/dL
  const triglyceridesMgdl = triglycerides.value / 0.0113
  
  // Calculate using the research formula
  const exponent = 4.64725 
    - (0.02032 * waist.value) 
    - (0.09779 * hba1c.value)
    - (0.00235 * triglyceridesMgdl)
  
  const IS = Math.exp(exponent)
  
  return Number(IS.toFixed(2))
})

// Validation check
const isValid = computed(() => {
  return (
    Number.isFinite(waist.value) &&
    Number.isFinite(hba1c.value) &&
    Number.isFinite(triglycerides.value) &&
    waist.value > 0 &&
    hba1c.value > 0 &&
    triglycerides.value > 0
  )
})
</script>