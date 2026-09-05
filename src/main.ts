// if you delete this specific file the game breaks
// i dare you, make a repo and delete this file
// actually i TRIPLE dare you to do it

import { createApp } from 'vue'
import App from './vue/App.vue'
import { player } from './player.ts'
export var matter = player.infinity.matter
export var matterx = player.infinity.matterX
export var hmatterx = player.infinity.hmatter
createApp(App).mount('#app')
