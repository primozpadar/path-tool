import { derived, writable } from 'svelte/store'
import type { IconName } from '../types'

export enum Tool {
  PEN = 'PEN',
  CURVE = 'CURVE',
}

export function getToolIcon(tool: Tool): IconName {
  switch (tool) {
    case Tool.PEN:
      return 'pen'
    case Tool.CURVE:
      return 'up-down'
  }
}

export const tool = writable<Tool | null>(null)
