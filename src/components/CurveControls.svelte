<script lang="ts">
  import { LineType, pathData, type Line } from '../store/path'

  export let index: number
  $: prevLine = $pathData.lines[index - 1]
  $: line = $pathData.lines[index]

  let isStartMoving = false
  let isEndMoving = false

  function mouseMoveStart(e: MouseEvent) {
    //@ts-ignore
    const elementId = e.target.id
    if (elementId !== 'main-svg') return

    if (isStartMoving) {
      pathData.update((data) => {
        const currLine = data.lines[index]
        if (currLine.type === LineType.CUBIC_BEZIER || currLine.type === LineType.QUADRATIC_BEZIER) {
          currLine.x1 = e.offsetX
          currLine.y1 = e.offsetY
        }
        return data
      })
    } else if (isEndMoving) {
      pathData.update((data) => {
        const currLine = data.lines[index]
        if (currLine.type === LineType.CUBIC_BEZIER) {
          currLine.x2 = e.offsetX
          currLine.y2 = e.offsetY
        }
        return data
      })
    }
  }

  function mountMoveListeners() {
    window.addEventListener(
      'mouseup',
      () => {
        isStartMoving = false
        isEndMoving = false
        window.removeEventListener('mousemove', mouseMoveStart)
      },
      { once: true },
    )
    window.addEventListener('mousemove', mouseMoveStart)
  }

  function moveStart() {
    isStartMoving = true
    mountMoveListeners()
  }

  function moveEnd() {
    isEndMoving = true
    mountMoveListeners()
  }
</script>

<div>
  {#if line.type === LineType.CUBIC_BEZIER}
    <div class="control-start" style={`left: ${line.x1}px; top: ${line.y1}px;`} on:mousedown={moveStart} />
    <div class="control-end" style={`left: ${line.x2}px; top: ${line.y2}px;`} on:mousedown={moveEnd} />

    <svg class="control-lines" width="600" height="600" viewBox="0 0 600 600">
      <path d={`M ${prevLine.x} ${prevLine.y} L ${line.x1} ${line.y1}`} stroke-width="2" fill="none" />
      <path d={`M ${line.x} ${line.y} L ${line.x2} ${line.y2}`} stroke-width="2" fill="none" />
    </svg>
  {:else if line.type === LineType.QUADRATIC_BEZIER}
    <div class="control-start" style={`left: ${line.x1}px; top: ${line.y1}px;`} on:mousedown={moveStart} />

    <svg class="control-lines" width="600" height="600" viewBox="0 0 600 600">
      <path d={`M ${prevLine.x} ${prevLine.y} L ${line.x1} ${line.y1}`} stroke-width="2" fill="none" />
      <path d={`M ${line.x} ${line.y} L ${line.x1} ${line.y1}`} stroke-width="2" fill="none" />
    </svg>
  {/if}
</div>

<style lang="less" scoped>
  @import '../style/colors.less';

  .control-start,
  .control-end {
    position: absolute;
    z-index: 1000;
    background: @green;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    box-shadow: 0 0 16px 4px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
  }

  .control-lines {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;

    path {
      stroke: rgba(255, 255, 255, 0.3);
    }
  }
</style>
