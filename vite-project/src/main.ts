import { createApp, reactive } from 'vue'
import App from './App.vue'
import Decimal from 'break_eternity.js'
import { startDialogue } from '../images/dialogue'
import { calculatePointgain } from './points'
export const player = reactive({
    Points: new Decimal(1)
})

export interface upgrades {
    title: string
    description: string
    cost: Decimal
    bought: boolean
}



let introTriggered = false

function checkMilestones() {
  if (player.Points.gte(1) && !introTriggered) {
    startDialogue("intro")
    introTriggered = true
  }
}


setInterval(() => {
    player.Points = player.Points.add(calculatePointgain())
    checkMilestones()
}, 1000);
createApp(App).mount('#app')
