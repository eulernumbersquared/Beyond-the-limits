import { ref, watch } from "vue"

const savedMatterion = localStorage.getItem("matterionAutomationEnabled")
const savedPointUpg = localStorage.getItem("pointupgrepenabled")

export const matterionAutomationEnabled = ref(savedMatterion === "true")
export const pointupgrepenabled = ref(savedPointUpg === "true")

watch(matterionAutomationEnabled, (val) => {
  localStorage.setItem("matterionAutomationEnabled", String(val))
})

watch(pointupgrepenabled, (val) => {
  localStorage.setItem("pointupgrepenabled", String(val))
})