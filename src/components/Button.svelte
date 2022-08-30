<script lang="ts">
  export let active = false

  $: style = active ? `background: rgb(45, 59, 211);` : ''
</script>

<button class="button" on:click {style}>
  <slot />
</button>

<style lang="less" scoped>
  @import '../style/colors.less';

  .button {
    padding: 12px;
    color: white;
    background: transparent;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border-radius: 2px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: fade(@blue, 20%);
    }

    &:active {
      background: @blue;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px lighten(@blue, 10%);
    }
  }
</style>
