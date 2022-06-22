<template>

  <tr>
    <!--
      生成一行数据，
      遍历生成的标题顺序，
      从每一个对象中取出用户选定的标题的数据
     -->
    <td v-for="td in prop" :key="td" >{{ model[td] }} </td>
  </tr>

</template>

<script>
export default {
  props: {
    // 绑定的tabledata
    model: {
      type: Object,
      default: () => {}
    },
    // 标题顺序
    prop: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
