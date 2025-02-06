<template>
  <div data-theme="nord" class="min-h-screen bg-base-100 text-base-content p-4">
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
        class="input"
      />

      <div v-if="isValid" class="alert alert-success">
        <p>IS Index: {{insulinSensitivity}}</p>
        <small>Men ≤5.02, Women ≤5.64 indicates resistance</small>
      </div>

    </div>
  </div>

</template>

<script setup>

</script>
