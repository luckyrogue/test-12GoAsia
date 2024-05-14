import { defineAsyncComponent } from 'vue'
import { TGlobalComponents } from './global.types.ts'

const globalDateInput = defineAsyncComponent(
    () => import('./date-picker/datePicker.template.vue')
)

const globalComponents: TGlobalComponents = {
    install(app) {
        app.component('gDateInput', globalDateInput)
    },
}

export { globalComponents }
