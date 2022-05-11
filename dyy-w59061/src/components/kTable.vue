<template>
  <div class="table-data">
    <table border="1">
      <tr>
        <!-- 标题行插槽 用来接收 KtableColumn组件 -->
        <slot></slot>
      </tr>
      <!-- 每一行的组件，根据index过来的数组生成行内数据 -->
      <!--
      model：传入每一个数组元素
      prop：标题的顺序，用来传给下一级组件，来实现标题和列的对应
     -->
      <k-line
        v-for="(item, index) in model"
        :model="item"
        :prop="prop"
        :key="index"
      ></k-line>
    </table>
  </div>
</template>
<script>
import KLine from './Kline.vue'
export default {
  components: { KLine },
  props: {
    // 绑定的tabledata
    model: {
      type: Array,
      default: () => []
    },
    // 标题顺序
    prop: {
      type: Array,
      default: () => []
    }
  }
}
</script>
