<script setup lang="ts">
import { focusWatcher, blurWatcher } from './datePicker.helpers'
import { ref, computed, onMounted, watch } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
    dateInputPlaceholder: string
    dateValue: string
}>()

const emits = defineEmits({
    'update:dateValue': (value: string) => true,
})

// Инициализация переменных
const inputPlaceholder = ref<string>(props.dateInputPlaceholder || 'Date')
// Ссылка на input
const inputValueRef = ref<HTMLInputElement | null>(null)

// Получение локализации браузера
const browserLocalization =
    typeof navigator !== 'undefined' ? navigator.language : 'en_US'

// Конвертация даты в формат, который будет отображаться в input
const displayFormat = computed(() => {
    return browserLocalization === 'en_US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'
})

// Форматирование даты для отображения
const formattedDisplayDate = computed(() => {
    return props.dateValue
        ? dayjs(props.dateValue).format(displayFormat.value)
        : ''
})

// Обновление значения props.dateValue при изменении input
const updateDateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    const unformattedDate = target.value
    const parsedDate = dayjs(unformattedDate, displayFormat.value, true)
    if (parsedDate.isValid()) {
        emits('update:dateValue', parsedDate.format('YYYY-MM-DD'))
    }
}

// Обновление значения input при изменении props.dateValue
onMounted(() => {
    if (inputValueRef.value) {
        inputValueRef.value.value = formattedDisplayDate.value
    }
})

// Обновление props.dateValue при изменении значения input
watch(
    () => props.dateValue,
    (newVal) => {
        if (
            inputValueRef.value &&
            newVal !==
                dayjs(inputValueRef.value.value, displayFormat.value).format(
                    'YYYY-MM-DD'
                )
        ) {
            inputValueRef.value.value = dayjs(newVal).format(
                displayFormat.value
            )
        }
    }
)
</script>

<template>
    <div class="global-component__date-input">
        <input
            class="date-input__input"
            type="text"
            :value="formattedDisplayDate"
            :placeholder="inputPlaceholder"
            @input="updateDateValue"
            ref="inputValueRef"
        />
    </div>
</template>

<style scoped>
@import './datePicker.module.scss';
</style>
