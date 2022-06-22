<template>
  <div id="app">
    <div class="nav">
      <div class="pravPage" @click="prav">上一页</div>
      <div
        class="pages"
        v-for="(item, index) in getShowPage"
        :key="index"
        @click="page(item)"
        :class="item == cur ? 'active' : ''"
      >
        {{ item }}
      </div>
      <div
        class="pages"
        v-if="this.conpages != this.getShowPage[this.getShowPage.length - 1]"
      >
        ...
      </div>
      <!--如果删除这行多就没有省略号余页码隐藏-->
      <div class="nextPage" @click="next">下一页</div>
      前往第：<input type="text" v-model="cur" class="ipt" @blur="blur" />页，
       <select v-model="pageSize">
        <option v-for="(item, index) in list " :key="index">{{item}}</option>
  </select>
      <span>共{{ conpages }}页，共{{ total }}条</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      list: [10, 20, 30, 50, 100],
      total: this.tableData.length,
      conpages: '', // 总页数
      cur: 1, // 当前页
      pageSize: 10, // 每页要展示数据条数
      showPage: [] // 每页展示的内容
    }
  },
  watch: {
    pageSize () {
      this.page(this.cur)
    }
  },
  computed: {
    getShowPage () {
      // 计算指定显示页码数，这里以4页为例
      const arrList = []
      if (this.conpages > 4) {
        for (let i = 0; i < 4; i++) {
          arrList[i] = i + 1
        }
        return arrList
      } else {
        for (let i = 0; i < this.conpages; i++) {
          arrList[i] = i + 1
        }
        return arrList
      }
    }
  },
  created () {
    // 计算有多少页
    this.conpages = Math.ceil(this.tableData.length / this.pageSize)
    this.page(this.cur)
  },
  methods: {
    // 当输入的页码发生改变，失去焦点后触发
    blur () {
      this.page(this.cur)
    },
    blur2 () {
      this.cur = 1
      this.page(this.cur)
    },
    page (item) {
      this.cur = item // 当前页
      // 如果当前页等于数组最后一项并且要不是最后一页
      if (this.cur === this.getShowPage[this.getShowPage.length - 1] && this.conpages > this.cur) {
        for (let i = 0; i < this.getShowPage.length; i++) {
          if (this.conpages - this.getShowPage[this.getShowPage.length - 1] < 2) {
            this.getShowPage[i] = this.getShowPage[i] + 1
          } else {
            this.getShowPage[i] = this.getShowPage[i] + 2
          }
        }
      }
      if (this.cur === this.getShowPage[0] && this.cur > 1) {
        for (let i = 0; i < this.getShowPage.length; i++) {
          // 这里是判断到头了
          if (this.cur === 2) {
            this.getShowPage[i] = this.getShowPage[i] - 1
          } else {
            this.getShowPage[i] = this.getShowPage[i] - 2
          }
        }
      }
      var list = (this.cur - 1) * this.pageSize // 每去一组数据的第一个索引
      this.showPage = this.tableData.slice(list, list + this.pageSize) // 从总数据中取出每页的数据
      this.$emit('pagingInformation', {
        showPage: this.showPage,
        cur: this.cur,
        conpages: this.conpages,
        pageSize: this.pageSize
      })
    },
    prav () {
      if (this.cur !== 1) {
        this.cur--
        this.page(this.cur)
      }
      this.$emit('pagingInformation', {
        showPage: this.showPage,
        cur: this.cur,
        conpages: this.conpages,
        pageSize: this.pageSize
      })
    },
    next () {
      if (this.cur < this.conpages) {
        this.cur++
        this.page(this.cur)
      }
      this.$emit('pagingInformation', {
        showPage: this.showPage,
        cur: this.cur,
        conpages: this.conpages,
        pageSize: this.pageSize
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  width: 650px;
  height: 80px;
  background-color: pink;
  display: flex;
  align-items: center;
}
div[class$="Page"] {
  width: 80px;
  height: 25px;
  text-align: center;
  color: black;
  line-height: 25px;
  background-color: coral;
  margin: 0 5px;
}
div[class="pages"] {
  width: 25px;
  height: 25px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  margin: 0 5px;
  background-color: rgb(236, 235, 235);
  text-align: center;
  line-height: 25px;
}
.active {
  width: 25px;
  height: 25px;
  border: 1px solid #8f8f8f;
  border-radius: 5px;
  margin: 0 5px;
  background-color: rgb(247, 113, 23);
  text-align: center;
  line-height: 25px;
  color: #fff;
}
.nav div:hover {
  cursor: pointer;
}
.ipt {
  width: 20px;
}
</style>
