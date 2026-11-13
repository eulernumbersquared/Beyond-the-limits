const esquared = new URL('./esquared.png', import.meta.url).href
const mc = new URL('./maincharacter.png', import.meta.url).href
const nat = new URL('./Narrator.png', import.meta.url).href
const GoC = new URL('./GoC.png', import.meta.url).href
const GoCe = new URL('./GoCbutpissed.png', import.meta.url).href
const GoHUH = new URL('./GoHunhindered.png', import.meta.url).href
const GoH = new URL('./GoH.png', import.meta.url).href
const mc2 = new URL('./maincharacter.png', import.meta.url).href
export const speakerNames: Record<string, string> = {
  [esquared]: "e squared",
  [mc]: "???",
  [nat]: "Narrator",
  [GoC]: "Phthoros",
  [GoCe]: "Phthoros",
  [GoHUH]: "Ananke's probe",
  [GoH]: "Ananke",
  [mc2]: "Genesis"
}
export const currentSpeakerName = ref('')
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
      { text: "It's.... so empty here", speakerImg: mc },
      { text: "You hear the screams of what seems to be ruinous souls", speakerImg: nat },
      { text: "How did i end up here? Why do i hear screams..?", speakerImg: mc },
      { text: "You see a broken statue with a message engraved.", speakerImg: nat},
      { text: "To all who see this, we are long gone, a tyrannt god has killed us all.", speakerImg: nat},
      { text: "If he still dares to reign in this barren land, you shall bring his rule to an end", speakerImg: nat},
      { text: "For what he has done is too barbaric to be left unpunished", speakerImg: nat},
      { text: "Oh", speakerImg: mc},
      { text: "You also notice a machine, producing something", speakerImg: nat},
      { text: "They seem to light up your path...", speakerImg: nat, }
    ],
  },
  matterions: {
    id: "matterions",
    lines: [
      { text: "As you continue to walk, you notice 3 strange masses.", speakerImg: nat, },
      { text: "What are these?", speakerImg: mc},
      { text: "They seem so advanced.", speakerImg: mc},
      { text: "These seem to light the pathway better", speakerImg: mc, },
      { text: "I should probably use this to its maximum potential", speakerImg: mc },
    ]
  },
  focus: {
    id: "focus",
    lines: [
      { text: "You start to observe one of these strange masses, and their power strangely increases", speakerImg: nat },
      { text: "Huh? Did one of them grow in power?", speakerImg: mc },
      { text: "That's strange, they seem to be more powerful when i observe them...", speakerImg: mc },
    ]
  },
  finity: {
    id: "finity",
    lines: [
      {text: "Traversing so far, you see another broken statue forming a broken infinity", speakerImg: nat, },
      {text: "A sign, engraved in the statue, describes it as the finity. You can offer your points and, as you now know them as, matterions to it to gain more power", speakerImg: nat, },
      {text: "It feels like a sacrifice to a god..", speakerImg: mc},
      {text: "Are there more gods that exist?", speakerImg: nat},
    ]
  },
  corruption: {
    id: "corruption",
    lines: [
      {text: "You've gone so fast... maybe a bit too far", speakerImg: nat},
      {text: "You observe the reality breaking, and you see a strange figure", speakerImg: nat},
      {text: "Hello? Who is there?", speakerImg: mc},
      {text: "Before you get the chance to question it, it disappears", speakerImg: nat},
    ]
  },
  GoC1: {
    id: "GoC1",
    lines: [
      {text: "The figure shows up infront of you", speakerImg: nat},
      {text: "You.", speakerImg: GoC},
      {text: "He pushes you down", speakerImg: nat},
      {text: "You think you can get past me? Phthoros, the god of corruption? No, i shall keep these land protected.", speakerImg: GoC},
      {text: "If you dare want to challenge me. Enter my domain and prove me wrong", speakerImg: GoC},
      {text: "Just then, he disappears. He isn't too pleased about your presence", speakerImg: nat},
    ]
  },
  pointrepeat: {
    id: "pointrepeat",
    lines: [
      {text: "You discover the endless nature of points", speakerImg: nat},
      {text: "They seem to empower themselves and the finity", speakerImg: nat},
      {text: "You think to yourself that this will be enough to reach him.", speakerImg: nat},
    ]
  },
  CoCu: {
    id: "CoCu",
    lines: [
      {text: "Wasn't expecting you to reach my domain, but who cares.", speakerImg: GoC},
      {text: "You'll just fall like the rest of them", speakerImg: GoC},
      {text: "The corruption shall embue your soul and destroy it from the inside!", speakerImg: GoC},
    ]
  },
  FC1: {
    id: "FC1",
    lines: [
      {text: "Why is it so purple?", speakerImg: mc},
      {text: "Welcome.", speakerImg: GoC},
      {text: "This is where your journey ends", speakerImg: GoC},
    ]
  },
  FC2: {
    id: "FC2",
    lines: [
      {text: "Hey!", speakerImg:GoC},
      {text: "What do you think your doing?", speakerImg: GoC},
      {text: "Trying to destroy me with the de-corruptionizer?", speakerImg: GoC},
      {text: "You know, your effort will have NO use against me!", speakerImg: GoC},
      {text: "He sounds worried, the end might be near", speakerImg: nat}
    ]
  },
  FC3: {
    id: "FC3",
    lines: [
      {text: "Do you seriously think that your terrifying me?", speakerImg: GoC},
      {text: "No....! You'll never defeat me!", speakerImg: GoC},
      {text: "He seems like he is weak, this is your chance to defeat him.", speakerImg: nat}
    ]
  },
  FCfinale: {
    id: "FCfinale",
    lines: [
      {text: "NO", speakerImg: GoC},
      {text: "WHAT HAVE YOU DONE", speakerImg: GoC},
      {text: "You see him starting to fall to his own corruption...", speakerImg: nat},
      {text: "YOU'LL PAY FOR THIS....", speakerImg: GoC},
      {text: "ANANKE WILL DEAL WITH YOU", speakerImg: GoC},
      {text: ".......", speakerImg: GoC},
      {text: "The light seems to bright.. What is happening?", speakerImg: mc},
      {text: "A blue light blinds you.", speakerImg: nat}
    ]
  },
  infinityintro: {
    id: "infinityintro",
    lines: [
      {text: "You rest in a beautiful garden with the statue of infinity. You don't know how you ended up here... but its calming, a strange paper falls in the grasps of your hands which reads:", speakerImg: nat},
      {text: "To see a world in a grain of sand", speakerImg: nat},
      {text: "And a haven in a wild flower", speakerImg: nat},
      {text: "Hold infinity in the palms of your hand", speakerImg: nat},
      {text: "And eternity in an hour", speakerImg: nat},
      {text: "For you shall not stop due to a small hindrance", speakerImg: nat},
      {text: "You must keep on going, even if the reality seems harsh", speakerImg: nat},
      {text: "Good luck with the next era", speakerImg: nat},
      {text: "It will be very brutal....", speakerImg: nat},
      {text: "You feel much better after reading that... and continue your journey", speakerImg: nat},
    ]
  },
  calamity1: {
    id: "calamity1",
    lines: [
      {text: "The light gets darker, and the sky turns red.", speakerImg: nat},
      {text: "Congrats on reaching the calamity tier.", speakerImg: GoHUH},
      {text: "The mercy of this plane however, shall smite you with the power of the gods", speakerImg: GoHUH},
      {text: "For under great accomplishments, comes great consequences.", speakerImg: GoHUH},
      {text: "Just note from now on.", speakerImg: GoHUH},
      {text: "There is no more mercy here.", speakerImg: GoHUH},
      {text: "Who are you? What are you?", speakerImg: mc},
      {text: "You must've heard my name from Phthoros.", speakerImg: GoHUH},
      {text: "You're Ananke?", speakerImg: mc},
      {text: "Yes, well, not really. I'm contacting you from one of my probes", speakerImg: GoHUH},
      {text: "Goodbye, i'll see you the next time you do the calamity tier. If i'll even see you do such thing", speakerImg: GoHUH},
    ]
  },
    calamity2: {
    id: "calamity2",
    lines: [
      {text: "You're pretty persistent.", speakerImg: GoHUH},
      {text: "But, this is only the start of hell.", speakerImg: GoHUH},
      {text: "I have destroyed the finity. Good luck trying to get such to help you!", speakerImg: GoHUH},
      {text: "You notice a field appears infront of you. Some sort of garden? It reminds you about the one you saw before", speakerImg: nat},
      {text: "The entity disappears infront of your eyes", speakerImg: nat},
      {text: "An empty field with a set of seeds.... Hm.", speakerImg: mc},
    ]
  },
      calamity3: {
    id: "calamity3",
    lines: [
      // canonically at CT3, luke turns into a femboy
      {text: "Your determination is high.", speakerImg: GoHUH},
      {text: "The previous residents here before you would've quit here.", speakerImg: GoHUH},
      {text: "Maybe it's better if you quit as well.", speakerImg: GoHUH},
      {text: "And why should I?", speakerImg: mc},
      {text: "Well, i'll let you figure that out on your own.", speakerImg: GoHUH},
      {text: "You are meeting your end.", speakerImg: GoHUH},
    ]
  },
  calamity15: {
    id: 'calamity15',
    lines: [
      {text: "Hello.", speakerImg: GoH},
      {text: "Phthoros had alerted one of my probes about your presence", speakerImg: GoH},
      {text: "You impress me... It reminds me of atraxial.", speakerImg: GoH},
      {text: "Used to be a special friend of mine before the incident...", speakerImg: GoH},
      {text: "Now it feels lonely, only guarding the tower alone now that he and phthoros is gone...", speakerImg: GoH},
      {text: "Anyways, you aren't meant to be here. No one in the entirety of this land's existence has reached this point.", speakerImg: GoH},
      {text: "There's no use in escaping, you're stuck in my hands now.", speakerImg: GoH},
    ]
  },
    hp1: {
    id: 'hp1',
    lines: [
      {text: "Welcome to my palace.", speakerImg: GoH},
      {text: "You'll be stuck here for a whole while", speakerImg: GoH},
      {text: "Isn't it nice? Me and Pthoros made it eons ago.", speakerImg: GoH},
      {text: "Although it does get a bit lonely in here...", speakerImg: GoH},
      {text: "...which is why you'll be here for eternity!", speakerImg: GoH},
    ]
  },
    hp10: {
    id: 'hp10',
    lines: [
      {text: "Still not dead?", speakerImg: GoH},
      {text: "Wow, that's impressive", speakerImg: GoH},
      {text: "I thought you would fail by now.", speakerImg: GoH},
    ]
  },
    hpend: {
    id: 'hpend',
    lines: [
      {text: "Oh...", speakerImg: GoH},
      {text: "Someone was finally strong enough to defeat me.....", speakerImg: GoH},
      {text: "Finally.... it took so long...", speakerImg: GoH},
      {text: "I'm free from him... I'm finally free....", speakerImg: GoH},
      {text: "I hope i can see the true purity of Phtoros....", speakerImg: GoH},
      {text: "Atraxial should be alerted... Goodbye... genesis....", speakerImg: GoH},
      {text: "Huh? My name is.... genesis..?", speakerImg: mc2},
      {text: "You stand there in her palace, looking at the ashes that used to be of her.", speakerImg: nat},
      {text: "A strange portal opens infront of you", speakerImg: nat},
      {text: "Standing next to it makes you feel dizzy..", speakerImg: nat},
      {text: "The portal seems to grow more agro, it implies you have to enter it...", speakerImg: nat},
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
  currentSpeakerName.value = speakerNames[currentSpeakerImg.value || ''] || ''
}

export function nextLine() {
  index++
  if (index < currentLines.length) {
    currentMessage.value = currentLines[index].text
    currentSpeakerImg.value = currentLines[index].speakerImg || null
  } else {
    inDialogue.value = false
  }
  currentSpeakerName.value = speakerNames[currentSpeakerImg.value || ''] || ''
}

export const inTitleCard = ref(false)
export const titleCardTitle = ref("")
export const displayedSubtitle = ref("")
export const titleCardGradient = ref(
    "linear-gradient(90deg, white, white)"
)

let titleCardTimeout: ReturnType<typeof setTimeout> | null = null
let typewriterTimeout: ReturnType<typeof setTimeout> | null = null
export function showTitleCard(
    title: string,
    subtitle: string,
    color: string = "linear-gradient(90deg, white, white)",
    duration: number = 5000
) {
    // Reset everything
    titleCardTitle.value = ""
    displayedSubtitle.value = ""
    titleCardGradient.value = color

    inTitleCard.value = true

    if (titleCardTimeout) {
        clearTimeout(titleCardTimeout)
    }

    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout)
    }

    let index = 0

    function typeNextCharacter() {
        if (index < subtitle.length) {
            displayedSubtitle.value += subtitle[index]
            index++

            typewriterTimeout = setTimeout(
                typeNextCharacter,
                60
            )

            return
        }

        // Subtitle has finished typing
        typewriterTimeout = setTimeout(() => {

            titleCardTitle.value = title

            titleCardTimeout = setTimeout(() => {
                inTitleCard.value = false
                titleCardTitle.value = ""
                displayedSubtitle.value = ""
            }, duration)

        }, 500)
    }

    typeNextCharacter()
}