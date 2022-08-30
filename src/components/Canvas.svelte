<script lang="ts">
  import { Tool, tool } from '../store/editor'

  import { lastLine, LineType, pathClosed, pathData, pathString, pathStyle, type Point } from '../store/path'
  import ControlPoint from './ControlPoint.svelte'
  import NewLine from './NewLine.svelte'

  function draw(e: MouseEvent) {
    if ($tool !== Tool.PEN) return

    const point: Point = { x: e.offsetX, y: e.offsetY }

    pathData.update((data) => {
      data.lines.push({
        type: LineType.LINE,
        ...point,
      })

      return data
    })
  }
</script>

<div class="canvas" on:click={draw}>
  <svg id="main-svg" width="600" height="600" viewBox="0 0 600 600">
    <path
      d={$pathString}
      stroke-width={$pathStyle.strokeWidth}
      stroke={$pathStyle.strokeColor}
      fill={$pathStyle.fillEnable ? $pathStyle.fill : 'none'}
    />
  </svg>

  <!-- CURVE TOOL POINTS -->
  {#if $tool === Tool.CURVE}
    {#each $pathData.lines as line, index}
      <ControlPoint point={{ x: line.x, y: line.y }} {index} />
    {/each}
  {/if}

  <!-- PEN TOOL POINT & LINE -->
  {#if $tool === Tool.PEN && $lastLine}
    <NewLine start={$lastLine} />
  {/if}
</div>

<style lang="less" scoped>
  .canvas {
    position: relative;
    height: 600px;
    width: 600px;
    border: 1px solid rgba(73, 76, 84, 1);

    #main-svg {
      path {
        pointer-events: none;
        z-index: -100;
      }
    }

    background-size: 50px 50px;
    background-image: radial-gradient(circle, #494c54 1px, transparent 1px);
  }
</style>
