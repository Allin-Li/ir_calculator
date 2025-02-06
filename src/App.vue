<template>
  <div class="min-h-screen text-base-content p-4">
    <input type="checkbox" value="dracula" class="toggle theme-controller" />
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
import { ref, computed } from 'vue'

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