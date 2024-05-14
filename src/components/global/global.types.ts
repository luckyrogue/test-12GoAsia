import type { App } from 'vue'

type TGlobalComponents = {
    install(app: App<Element>): void
}

export type { TGlobalComponents }
