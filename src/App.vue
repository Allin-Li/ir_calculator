<template>
  <div class="min-h-screen text-base-content p-4">
    <ThemeToggle :theme="theme" @toggle-theme="toggleTheme" />
    
    <div class="card bg-base-200 max-w-sm mx-auto shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center mb-4">Калькулятор инсулинорезистентности</h2>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Окружность талии (см)</span>
          </label>
          <input 
            type="number" 
            v-model.number="waist" 
            class="input input-bordered"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">HbA1c (%)</span>
          </label>
          <input 
            type="number" 
            v-model.number="hba1c" 
            class="input input-bordered"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Триглицериды (ммоль/л)</span>
          </label>
          <input 
            type="number" 
            v-model.number="triglycerides" 
            class="input input-bordered"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div v-if="showResult" class="mt-4">
          <div class="alert alert-success">
            <p class="font-semibold">IS Index: {{ insulinSensitivity }}</p>
            <small>Мужчины ≤5.02, Женщины ≤5.64 указывают на резистентность</small>
          </div>
        </div>

        <div v-if="showError" class="mt-4">
          <div class="alert alert-error">
            <p>Пожалуйста, введите корректные положительные значения во все поля</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'

const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dracula' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

// Calculator logic
const waist = ref(null)
const hba1c = ref(null)
const triglycerides = ref(null)

const isValid = computed(() => (
  Number.isFinite(waist.value) && waist.value > 0 &&
  Number.isFinite(hba1c.value) && hba1c.value > 0 &&
  Number.isFinite(triglycerides.value) && triglycerides.value > 0
))

const showResult = computed(() => isValid.value)
const showError = computed(() => !isValid.value && hasInteracted.value)

const hasInteracted = ref(false)
watch([waist, hba1c, triglycerides], () => {
  hasInteracted.value = true
})

const insulinSensitivity = computed(() => {
  if (!isValid.value) return null
  
  const triglyceridesMgdl = triglycerides.value / 0.0113
  
  const exponent = 4.64725 
    - (0.02032 * waist.value) 
    - (0.09779 * hba1c.value)
    - (0.00235 * triglyceridesMgdl)
  
  return Number(Math.exp(exponent).toFixed(2))
})
</script>