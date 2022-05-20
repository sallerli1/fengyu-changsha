import { defineComponent, reactive, ref } from "vue";
import { type TableProps, tableProps } from "./types";
import { pagination } from './index'
import './style.css';

interface tableRow {
  id: number;
  name: string;
}
export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {
    // 表头数据
    const columns = props.columns;
    // 表格数据
    let list = reactive({
      data: props.data?.splice(0, 10) ?? []
    })
    // 存储表格备份数据
    const backUpsList = JSON.parse(JSON.stringify(props.data));
    const type = ref(0);
    // 排序方法，type：0无序 1正序 2逆序
    const handleSort = (item: string) => {
      if (type.value === 2) {
        type.value = 0;
        list.data = backUpsList.slice((currentPage.value-1) * MAX_NUMBER.value, currentPage.value * MAX_NUMBER.value);
        return;
      }
      type.value++;
      list.data.sort(compare('id'));
    }
    // 排序
    const compare = (key: string) => {
      return function(a: any, b: any){
        return type.value === 1 ? a[key] - b[key] : b[key] - a[key];	
      }
    }
  
    const { pagelist } = pagination();
    const MAX_NUMBER = ref(10);
    const total = Math.ceil(props.data?.length / MAX_NUMBER.value);
    const currentPage = ref(1);
    // 初始分页数据
    const pages = ref(pagelist(1, total));
    const jumpNumber = ref('');

    const pageCtrl = (n: number) => {
      if (n && !isNaN(n)) {
        currentPage.value = n;
        pages.value = pagelist(n, total);
        console.log(pages)
        list.data = backUpsList.slice((n-1) * MAX_NUMBER.value, n * MAX_NUMBER.value);
      }
    }
    
    return () => {
      return (
        <div>
          <table border="1">
            <thead>
              <tr>
                  {
                    columns.map(item => {
                      return <th class="cell" onClick={handleSort.bind(this,item)}>
                        <span>{item}</span>
                        <span id="sort">{Number(type.value) === 0 ? ' 无序' : Number(type.value) === 1 ? ' 正序' : ' 倒序'}</span>
                      </th>
                    })
                  }
              </tr>
            </thead>
            <tbody>
              {
                list.data.map(item => {
                  return <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
          <div>
            <ul>
                {
                    pages.value.map(item => {
                        return <li class="li-item" onClick={pageCtrl.bind(this, item)}>{item}</li>
                    })
                }
                <li class="li-item">跳转至</li>
                <li class="li-item">
                    <input type="text" v-model={jumpNumber.value} onKeydown={pageCtrl.bind(this, jumpNumber.value)} />
                </li>
            </ul>
          </div>
        </div>
      );
    };
  },
})
