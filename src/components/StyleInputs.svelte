<script lang="ts">
  import { pathClosed, pathStyle } from '../store/path'
</script>

<div class="style-inputs">
  <div class="section">
    <input type="color" name="strokeColor" id="strokeColor" bind:value={$pathStyle.strokeColor} />
    <label for="strokeColor">STROKE</label>
  </div>
  <div class="section">
    <input type="number" name="strokeWidth" id="strokeWidth" bind:value={$pathStyle.strokeWidth} />
    <label for="strokeWidth">STROKE WIDTH</label>
  </div>
  <div class="section">
    <input type="checkbox" name="closepath" id="closepath" bind:checked={$pathClosed} />
    <label for="closepath">CLOSE PATH</label>
  </div>
  <div class="section">
    <input type="color" name="fill" id="fill" bind:value={$pathStyle.fill} />
    <label for="fill">FILL</label>
  </div>
  <div class="section">
    <input type="checkbox" name="fillEnable" id="fillEnable" bind:checked={$pathStyle.fillEnable} />
    <label for="fillEnable">ENABLE FILL</label>
  </div>
</div>

<style lang="less" scoped>
  @import '../style/colors.less';

  .style-inputs {
    width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .section {
      display: flex;
      gap: 4px;
      justify-self: center;
      align-items: center;

      input[type='number'] {
        width: 40px;
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: bold;
        background: lighten(@gray, 10%);
        color: white;
      }

      input[type='color'] {
        width: 28px;
        height: 28px;
        border: 2px solid lighten(@gray, 20%);
        border-radius: 2px;

        &::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        &::-webkit-color-swatch {
          border: none;
        }
      }

      label {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
</style>
