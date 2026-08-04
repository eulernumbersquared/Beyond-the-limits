// if you are reading this then why are you here
// the game also shits itself if you delete this file
// i only dobule dare you to make a repo and delete this file

import { reactive } from "vue"

export interface field {
  cropIndex: number | null
  plantedAt: number | null
}

export const farm = reactive<field[][]>(
  Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => ({
      cropIndex: null,
      plantedAt: null,
    }))
  )
)