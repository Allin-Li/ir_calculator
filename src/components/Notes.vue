<template>
  <div class="card bg-base-200 max-w-sm mx-auto shadow-xl">
    <div class="card-body text-left">
      <h2 class="card-title justify-center mb-2">Информация о расчете</h2>
      <div class="font-bold">Интерпретация результата:</div>

      <ul class="list-disc ml-4">
        <li>Для мужчин: IS ≤ 5.02</li>
        <li>Для женщин: IS ≤ 5.64</li>
      </ul>
      <div class="-mt-2">свидетельствует об инсулинорезистентности</div>

      <div class="font-bold">Формула расчета:</div>
      <div class="bg-base-300 p-4 rounded-lg">
        <div class="text-sm">IS = exp(4.64725 - 0.02032 × WC - 0.09779 × HbA1c - 0.00235 × TG)</div>
      </div>
      <ul class="list-disc ml-4">
        <li>WC - окружность талии (см)</li>
        <li>HbA1c - гликированный гемоглобин (%)</li>
        <li>TG - триглицериды (мг/дл)</li>
      </ul>
      <div class="text-sm font-bold mt-2">
        Результаты расчетов не являются диагнозом, необходима консультация специалиста
      </div>
    </div>
  </div>
</template>
