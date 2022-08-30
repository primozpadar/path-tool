<script lang="ts">
  import type { Point } from '../store/path'

  export let start: Point

  let end: Point | null = null
  function handleMousemove(e: MouseEvent) {
    end = { x: e.offsetX, y: e.offsetY }
  }

  function clearEnd() {
    end = null
  }

  $: d = end ? `M ${start.x} ${start.y} L ${end.x} ${end.y}` : null
</script>

<svg
  class="new-line"
  width="600"
  height="600"
  viewBox="0 0 600 600"
  on:mousemove={handleMousemove}
  on:mouseleave={clearEnd}
>
  {#if end}
    <path {d} stroke-width="2" stroke="#2d3bd3" fill="none" />
  {/if}
</svg>

<style lang="less" scoped>
  .new-line {
    pointer-events: fill;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
