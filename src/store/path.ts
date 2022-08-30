import { derived, writable } from 'svelte/store'

export enum LineType {
  LINE = 'LINE',
  CUBIC_BEZIER = 'CUBIC_BEZIER',
  QUADRATIC_BEZIER = 'QUADRATIC_BEZIER',
}

export type Point = {
  x: number
  y: number
}

export type Line = Point &
  (
    | {
        type: LineType.LINE
      }
    | {
        type: LineType.CUBIC_BEZIER
        x1: number
        y1: number
        x2: number
        y2: number
      }
    | {
        type: LineType.QUADRATIC_BEZIER
        x1: number
        y1: number
      }
  )

type PathData = {
  lines: Line[]
}

export const pathData = writable<PathData>({
  lines: [],
})

export const pathClosed = writable<boolean>(false)

export const pathStyle = writable({
  strokeWidth: 1,
  strokeColor: '#ffffff',
  fill: '#000000',
  fillEnable: false,
})

export const selectedLineIndex = writable<number | null>(null)

export const selectedLine = derived([pathData, selectedLineIndex], ([$pathData, $selectedLineIndex]) => {
  if ($selectedLineIndex <= 0) {
    return null
  }

  return $pathData.lines[$selectedLineIndex]
})

export const lastLine = derived(pathData, ($pathData) => {
  if ($pathData.lines.length <= 0) {
    return null
  }

  return $pathData.lines[$pathData.lines.length - 1]
})

export const pathString = derived([pathData, pathClosed], ([$pathData, $pathClosed]) => {
  if ($pathData.lines.length <= 0) {
    return ''
  }

  const firstLine = $pathData.lines[0]

  let d = $pathData.lines.slice(1).reduce((acc, line) => {
    switch (line.type) {
      case LineType.LINE:
        acc += ` L ${line.x} ${line.y}`
        return acc
      case LineType.CUBIC_BEZIER:
        acc += ` C ${line.x1} ${line.y1} ${line.x2} ${line.y2} ${line.x} ${line.y}`
        return acc
      case LineType.QUADRATIC_BEZIER:
        acc += ` Q ${line.x1} ${line.y1} ${line.x} ${line.y}`
        return acc
    }
  }, `M ${firstLine.x} ${firstLine.y}`)

  if ($pathClosed) {
    d += ' Z'
  }

  return d
})

export function updateLinePos(lineIndex: number, newPos: Point): void {
  pathData.update((data) => {
    if (!data.lines[lineIndex]) return data

    data.lines[lineIndex].x = newPos.x
    data.lines[lineIndex].y = newPos.y

    return data
  })
}
