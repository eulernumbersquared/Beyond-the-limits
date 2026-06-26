import esquared from './esquared.png'
import mc from './maincharacter.png'
import nat from './Narrator.png'
import GoC from './GoC.png'
import GoCe from './GoCbutpissed.png'
import { ref } from 'vue'

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
      { text: "You wake up in an unknown land", speakerImg: nat,  },
      { text: "Huh?", speakerImg: mc },
      { text: "Where am i.....", speakerImg: mc },
      { text: "What is this thinge?", speakerImg: mc },
      { text: "Hello? Anyone there??", speakerImg: esquared },
      { text: "Uh, hello? Who is this?", speakerImg: mc },
      { text: "Hi, im e squared. Im stuck in the hands of the gods..", speakerImg: esquared},
      { text: "Save me... Save us......", speakerImg: esquared},
      { text: "Gods? Which ones?", speakerImg: mc},
      { text: "Many of them.. i see alot, but the main one is the god of fundamentals", speakerImg: esquared},
      { text: "You must defeat him", speakerImg: esquared},
      { text: "Go on, i believe in you, dont let anything get in your way!", speakerImg: esquared},
      { text: "The strange machine stops producing sound. You know what you have to do.", speakerImg: nat, }
    ],
  },
  matterions: {
    id: "matterions",
    lines: [
      { text: "You see 3 types of strange floating objects", speakerImg: nat, },
      { text: "What could this be?", speakerImg: mc},
      { text: "I wonder if they aid me in my progress", speakerImg: mc},
      { text: "Just then, e squared's voice comes back", speakerImg: nat, },
      { text: "Hi. I've seen you unlocked something called matterions", speakerImg: esquared},
      { text: "They are very powerful. They can generate their previous tier and aid you in your progress!", speakerImg: esquared},
      { text: "Hmmmm...", speakerImg: mc},
      { text: "Good luck! You'll need to get 1e15 points", speakerImg: esquared},
      { text: "Oh! I've been gaining points this entire time?", speakerImg: mc},
      { text: "They are a key part on beating the several gods", speakerImg: esquared},
      { text: "Oh! Ok, thanks for the information! I'll make sure to use them effectively.", speakerImg: mc },
    ]
  },
  focus: {
    id: "focus",
    lines: [
      { text: "Hmmm. My matterions seem to be generating a bit slow", speakerImg: mc },
      { text: "What if i try concentrating all of them at once?", speakerImg: mc },
      { text: "They do seem to be out of order, what if i could gain more buffs like this?", speakerImg: mc },
    ]
  },
  finity: {
    id: "finity",
    lines: [
      {text: "You see half of an infinity in front of you", speakerImg: nat, },
      {text: "What could this mean?", speakerImg: mc},
      {text: "You approach it and you see all your progress fade away.....", speakerImg: nat},
      {text: "The finity.... i can see the power in this.......", speakerImg: mc},
    ]
  },
  corruption: {
    id: "corruption",
    lines: [
      {text: "As you explore the finity, strange errors of the reality are appearing", speakerImg: nat},
      {text: "This is strange... what could be the cause of this", speakerImg: mc},
      {text: "Hey! Be careful! The god of corruption is nearby!", speakerImg: esquared},
      {text: "God of what now?", speakerImg: mc},
      {text: "One of the gods of this place. He is the creator of all this corruption. He was born from the mistakes of the god of fundamentals, you will meet him at the citadel", speakerImg: esquared},
      {text: "You'll need to prove yourself to summon the citadel", speakerImg: esquared},
      {text: "Good luck however, the corruption can be aggressive sometimes....", speakerImg: esquared},
    ]
  },
  GoC1: {
    id: "GoC1",
    lines: [
      {text: "You feel a strange presence", speakerImg: nat},
      {text: "I swear i feel like im getting watched.....", speakerImg: mc},
      {text: "YOU", speakerImg: GoC},
      {text: "You think you can get past me? The god of corruption? No... You will never end the reign of corruption.", speakerImg: GoC},
      {text: "If you dare want to challenge me. Enter my domain and prove me wrong", speakerImg: GoC},
      {text: "You realize that e squared was talking about him, the god of corruption", speakerImg: nat},
      {text: "Oh, that explains alot i guess", speakerImg: mc},
    ]
  },
  pointrepeat: {
    id: "pointrepeat",
    lines: [
      {text: "Three upgrades.... that can be bought forever and ever..?", speakerImg: mc},
      {text: "Huh.....", speakerImg: mc},
      {text: "I'm feeling the presence of corruption as i near them", speakerImg: mc},
      {text: "These should help me summon the citadel of corruption", speakerImg: mc}
    ]
  },
  CoCu: {
    id: "CoCu",
    lines: [
      {text: "Wow..... You seriously think you can beat me?", speakerImg: GoC},
      {text: "Your really underestimating the power of a god, a god based on the mistakes of the god of fundamentals", speakerImg: GoC},
      {text: "If you really think your worthy enough.....", speakerImg: GoC},
      {text: "Lets see how you'll do against the final corruption", speakerImg: GoCe},
    ]
  },
  FC1: {
    id: "FC1",
    lines: [
      {text: "Where am i......", speakerImg: mc},
      {text: "Welcome... to my domain", speakerImg: GoC},
      {text: "You wont be able to survive here", speakerImg: GoC},
      {text: "You will perish to the ultimate powers of the corruption!", speakerImg: GoC},
    ]
  },
  FC2: {
    id: "FC2",
    lines: [
      {text: "Hey!", speakerImg:GoC},
      {text: "What do you think your doing?", speakerImg: GoC},
      {text: "Trying to destroy me with the de-corruptionizer?", speakerImg: GoC},
      {text: "You know, your effort will have NO use against me!", speakerImg: GoC},
      {text: "He sounds very worried... maybe this is the key to escape!", speakerImg: nat}
    ]
  },
  FC3: {
    id: "FC3",
    lines: [
      {text: "Do you seriously think that your terrifying me?", speakerImg: GoC},
      {text: "No....! You'll never defeat me!", speakerImg: GoC},
      {text: "He seems like he is weak, this is your chance to defeat him!", speakerImg: nat}
    ]
  },
  FCfinale: {
    id: "FCfinale",
    lines: [
      {text: "NO", speakerImg: GoC},
      {text: "WHAT HAVE YOU DONE", speakerImg: GoC},
      {text: "You see him starting to fall to his own corruption...", speakerImg: nat},
      {text: "YOU'LL PAY FOR THIS....", speakerImg: GoC},
      {text: "THE GOD OF HINDRANCES WILL DEAL WITH YOU", speakerImg: GoC},
      {text: ".......", speakerImg: GoC},
      {text: "Wow.... i guess i defeated him!", speakerImg: mc}
    ]
  },
  infinityintro: {
    id: "infinityintro",
    lines: [
      {text: "You see a pedestal rise and the full infinity", speakerImg: nat},
      {text: "Oooo! What is this? What does this pedstal say?", speakerImg: mc},
      {text: "You read the pedesteal and it says the following", speakerImg: nat},
      {text: "To see a world in a grain of sand", speakerImg: nat},
      {text: "And a haven in a wild flower", speakerImg: nat},
      {text: "Hold infinity in the palms of your hand", speakerImg: nat},
      {text: "And eternity in an hour", speakerImg: nat},
      {text: "For you shall not stop due to a small hindrance", speakerImg: nat},
      {text: "You must keep on going, even if the reality seems harsh", speakerImg: nat},
      {text: "Good luck with the next era", speakerImg: nat},
      {text: "It will be very brutal....", speakerImg: nat},
      {text: "You feel much better after reading that....", speakerImg: nat},
    ]
  }
}

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
