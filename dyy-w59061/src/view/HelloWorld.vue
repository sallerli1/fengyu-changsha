<template>
  <div class="hello">
    <k-table :model="pageDate" :prop="label">
     <k-table-column
     :sortable="true"
      :prop="'big'"
      :label="'序号'"
      @table-cluomn="cluomn($event)"
    ></k-table-column>
    <k-table-column
     :sortable="true"
      :prop="'address'"
      :label="'地址'"
       @table-cluomn="cluomn($event)"
    ></k-table-column>
    <k-table-column
    :sortable="false"
      :prop="'name'"
      :label="'姓名'"
       @table-cluomn="cluomn($event)"
    ></k-table-column>
    <k-table-column
    :sortable="true"
      :prop="'date'"
      :label="'日期'"
       @table-cluomn="cluomn($event)"
    ></k-table-column>
    </k-table>
    <!-- 前端实现分页，将请求出来的数据手动进行分页 -->
    <Paging :tableData="tableData" @pagingInformation="pagingInformation" ></Paging>
  </div>
</template>

<script>
import KTable from '../components/kTable.vue'
import KTableColumn from '../components/KTableColumn.vue'
import Paging from '../components/paging.vue'

export default {
  data () {
    return {
      label: [],
      pageDate: [],
      tableData: [
        {
          address: '上海市普陀区金沙江路 1518 弄',
          big: 1,
          date: '2016-05-02',
          name: '1王小虎'
        },
        {
          big: 2,
          date: '2016-05-04',
          name: '2王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          big: 3,
          date: '2016-05-01',
          name: '4王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          big: 4,
          date: '2016-05-03',
          name: '3王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
          big: 5,
          date: '2016-05-02',
          name: '1王小虎'
        },
        {
          big: 6,
          date: '2016-05-04',
          name: '2王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          big: 7,
          date: '2016-05-01',
          name: '4王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          big: 8,
          date: '2016-05-03',
          name: '3王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          address: '上海市普陀区金沙江路 1518 弄',
          big: 9,
          date: '2016-05-02',
          name: '1王小虎'
        },
        {
          big: 10,
          date: '2016-05-04',
          name: '2王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          big: 11,
          date: '2016-05-01',
          name: '4王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          big: 12,
          date: '2016-05-03',
          name: '3王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          big: 13,
          date: '2016-05-04',
          name: '2王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          big: 14,
          date: '2016-05-01',
          name: '4王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          big: 15,
          date: '2016-05-03',
          name: '3王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          big: 16,
          date: '2016-05-03',
          name: '3王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]

    }
  },
  components: {
    KTable,
    KTableColumn,
    Paging
  },
  methods: {
    // 可以获取所有的分页信息，
    // showPage,每页展示的信息 如果后台写好分页，则可不传
    // cur, 当前页
    // conpages, total总数
    // pageSize 多少条
    pagingInformation (data) {
      // console.log(data.cur, data.pageSize)
      this.pageDate = data.showPage
    },
    cluomn (e) {
      // 每次生成一个列的标题就push一个标题到label
      this.label.push(e)
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
