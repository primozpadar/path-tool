<script lang="ts">
  import { selectedLineIndex, updateLinePos, type Point } from '../store/path'
  import CurveControls from './CurveControls.svelte'

  export let point: Point
  export let index: number

  let isMoving = false
  function handleMove(e: MouseEvent) {
    if (isMoving) {
      //@ts-ignore
      const elementId = e.target.id

      if (elementId === 'main-svg') {
        updateLinePos(index, { x: e.offsetX, y: e.offsetY })
      }
    }
  }

  function startMove() {
    selectedLineIndex.set(index)
    isMoving = true

    window.addEventListener(
      'mouseup',
      () => {
        isMoving = false
        window.removeEventListener('mousemove', handleMove)
      },
      { once: true },
    )

    window.addEventListener('mousemove', handleMove)
  }

  $: isSelected = index === $selectedLineIndex
  $: style = `left: ${point.x}px; top: ${point.y}px`
</script>

<div {style} class="control-point" class:control-point--selected={isSelected} on:mousedown={startMove} />
<CurveControls {index} />

<style lang="less" scoped>
  @import '../style/colors.less';

  @size: 12px;

  .control-point {
    position: absolute;
    width: @size;
    height: @size;
    border-radius: calc(@size / 2);
    background: @blue;
    transform: translate(-50%, -50%);

    &--selected {
      background: @yellow;
    }
  }
</style>
