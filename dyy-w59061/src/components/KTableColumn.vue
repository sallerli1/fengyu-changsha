<template>
  <th>
    <!-- 展示列名 -->
    <span>{{ label }}</span>
    <!-- 实现升降排序 -->
    <span @click="sort('desc')" v-if="sortable" class="isShow">⇃</span>
    <span @click="sort('asc')" v-if="sortable"  class="isShow">↾</span>
  </th>
</template>
<script>
export default {
  props: {
    // 当前行的标签属性名
    prop: {
      type: String,
      default: ''
    },
    // 当前行的标签属性文本
    label: {
      type: String,
      default: ''
    },
    // 是否排序
    sortable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 实现排序功能
      'asc-n': (a, b) => a - b, // 数字升序
      'desc-n': (a, b) => b - a, // 数字降序
      'asc-s': (a, b) => a.localeCompare(b), // 字母比较
      'desc-s': (a, b) => b.localeCompare(a)
    }
  },
  mounted () {
    // 传回父组件，通知父组件把字符串加入顺序数组
    this.$emit('table-cluomn', this.prop)
  },
  methods: {
    sort (type) {
      // 是否排序
      if (this.sortable) {
        // 对父父元素进行排序
        this.$parent.$parent.pageDate.sort((a, b) => {
          console.log(this.prop)
          console.log(a)
          // 调用排序规则，传入排序方式asc、desc，然后判断数据类型进行拼接后调用方法实现排序
          return this[type + this.getSortType(a[this.prop])](a[this.prop], b[this.prop])
        })
      }
    },
    // 处理排序类型
    getSortType (val) {
      // 返回标识串进行拼接 判断是字符串还是数字
      return typeof val === 'string' ? '-s' : '-n'
    }
  }
}
</script>

<style lang="scss" scoped>
.isShow{
    cursor: pointer;
}
</style>
