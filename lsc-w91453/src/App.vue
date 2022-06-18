<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import SimpleTable from "./components/SimpleTable";
import { reactive, toRefs } from "vue";

interface ColumnsItem {
  key: string;
  name: string;
  width: number | string;
  isSort: boolean;
}

interface tableItem {
  id: number | string;
  name: string;
  info: string;
}

// 表头数据
const columns = reactive<ColumnsItem[]>([
  {name: 'ID', key: 'id', width: '100px', isSort: true},
  {name: '姓名', key: 'name', width: '100px', isSort: true},
  {name: '说明', key: 'info', width: '300px', isSort: false},
])

const size = 10;
const total = 50;

// 生成指定长度的数组
const creatData = (size: number) => {
  const data = Array.from({length: size}, () => {
    const num = parseInt(String(100 * Math.random()), 10);
    return {
      id: num,
      name: '人物'+ num,
      info: '说明内容'
    }
  });
  return reactive(data)
}

const list = creatData(size);

// 表格数据集合
const dataSource = reactive({
  columns,
  list,
  pagination: {
    pageSize: size,
    currentPage: 1,
    total
  }
})

const pageChange = (page: number) => {
  dataSource.list = creatData(size);
}
</script>

<template>
  <SimpleTable :data="dataSource.list" :columns="dataSource.columns" :pagination="dataSource.pagination" @pageChange="pageChange" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
