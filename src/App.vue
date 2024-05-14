<script setup lang="ts">
import { ref } from 'vue'

const date = ref<string>('')
</script>

<template>
    <div class="mt-4">
        <g-date-input :date-value="date" date-input-placeholder="Введите дату" />
    </div>
</template>

<style>
.mt-4 {
    margin-top: 1rem;
}
</style>