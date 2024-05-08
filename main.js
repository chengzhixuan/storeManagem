import { createSSRApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia';
import Tips from '@/components/tips'
import Container from '@/components/container'
import Modal from '@/components/modal'
export function createApp() {
    const app = createSSRApp(App)
    app.use(Pinia.createPinia());
    app.component('Container', Container)
    app.component('Tips', Tips);
    app.component('Modal', Modal)
    return {
        app,
        Pinia
    }
}