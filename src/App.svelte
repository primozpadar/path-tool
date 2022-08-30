<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Button from './components/Button.svelte'
  import Canvas from './components/Canvas.svelte'
  import CurveSelect from './components/CurveSelect.svelte'
  import Icon from './components/Icon.svelte'
  import StyleInputs from './components/StyleInputs.svelte'
  import { getToolIcon, Tool, tool } from './store/editor'
  import { pathClosed, pathData, pathString, selectedLineIndex } from './store/path'

  function handleShortcuts(e: KeyboardEvent) {
    if (e.key === 'Delete' && $selectedLineIndex) {
      pathData.update((data) => {
        const tmp = [...data.lines.slice(0, $selectedLineIndex), ...data.lines.slice($selectedLineIndex + 1)]
        data.lines = tmp
        return data
      })

      selectedLineIndex.set(null)
    } else if (e.key === 'Escape') {
      tool.set(null)
    }
  }

  onMount(() => document.addEventListener('keydown', handleShortcuts))
  onDestroy(() => document.removeEventListener('keydown', handleShortcuts))
</script>

<div class="layout">
  <div class="buttons">
    <div>
      {#each Object.values(Tool) as btnTool}
        <Button on:click={() => (btnTool === $tool ? tool.set(null) : tool.set(btnTool))} active={$tool === btnTool}>
          <Icon name={getToolIcon(btnTool)} /></Button
        >
      {/each}
    </div>
    <CurveSelect />
    <Button on:click={() => tool.set(null)}>OFF</Button>
  </div>
  <Canvas />
  <StyleInputs />
  <div class="path-d">{$pathString}</div>
</div>

<style lang="less" scoped>
  @import './style/colors.less';

  .layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .buttons {
      width: 600px;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: center;
    }

    .path-d {
      max-width: 600px;
      background: lighten(@gray, 10%);
      padding: 16px 32px;
      border-radius: 4px;
    }
  }
</style>
