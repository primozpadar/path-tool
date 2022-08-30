<script lang="ts">
  import { LineType, pathData, selectedLine, selectedLineIndex } from '../store/path'
  import Button from './Button.svelte'

  function setLineType(type: LineType) {
    pathData.update((data) => {
      if (!data.lines[$selectedLineIndex]) return data

      const currentLine = data.lines[$selectedLineIndex]

      currentLine.type = type
      if (currentLine.type === LineType.CUBIC_BEZIER) {
        currentLine.x1 = currentLine.x1 || currentLine.x + 50
        currentLine.y1 = currentLine.y1 || currentLine.y + 50
        currentLine.x2 = currentLine.x2 || currentLine.x - 50
        currentLine.y2 = currentLine.y2 || currentLine.y - 50
      } else if (currentLine.type === LineType.QUADRATIC_BEZIER) {
        currentLine.x1 = currentLine.x1 || currentLine.x + 50
        currentLine.y1 = currentLine.y1 || currentLine.y + 50
      }

      return data
    })
  }
</script>

{#if $selectedLine}
  <div class="curve-select">
    {#each Object.values(LineType) as lineType}
      <Button on:click={() => setLineType(lineType)} active={$selectedLine.type === lineType}>{lineType[0]}</Button>
    {/each}
  </div>
{/if}

<style lang="less" scoped>
  .curve-select {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
