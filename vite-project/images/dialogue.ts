import esquared from './esquared.png'
import mc from './maincharacter.png'
export interface DialogueLine {
  text: string
  speakerImg?: string
}

export interface Dialogue {
  id: string
  lines: DialogueLine[]
}


export const dialogues: Record<string, Dialogue> = {
  intro: {
    id: "intro",
    lines: [
      { text: "Fuh..... where am i?", speakerImg: mc },
      { text: "Hey! You!!!!", speakerImg: esquared },
      { text: "What the fuck???", speakerImg: mc },
      { text: "Yea bro i got this sick-ass walkie-talkie to talk to you", speakerImg: esquared},
      { text: "Anyways, you gotta help me im stuck here in this thingie by the god of fundamentals", speakerImg: esquared},
      { text: "Who tf is that bro. Yk what just cuz i can im just gonna do it", speakerImg: mc},
      { text: "Yea uh probably get like alot of those point thingies idk bro", speakerImg: esquared},
    ]
  }
}

import { ref } from 'vue'

export const inDialogue = ref(false)
export const currentMessage = ref('')
export const currentSpeakerImg = ref<string | null>(null)

let currentLines: DialogueLine[] = []
let index = 0

export function startDialogue(id: string) {
  const dlg = dialogues[id]
  if (!dlg) return
  inDialogue.value = true
  currentLines = dlg.lines
  index = 0
  currentMessage.value = currentLines[index].text
  currentSpeakerImg.value = currentLines[index].speakerImg || null
}

export function nextLine() {
  index++
  if (index < currentLines.length) {
    currentMessage.value = currentLines[index].text
    currentSpeakerImg.value = currentLines[index].speakerImg || null
  } else {
    inDialogue.value = false
  }
}
