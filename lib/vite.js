import { register } from 'node:module'

register('./register.js', import.meta.url)

export default (await import('unplugin-vue-components/vite')).default
