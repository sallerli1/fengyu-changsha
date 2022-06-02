import { defineComponent, reactive, ref, toRef, toRefs } from "vue";
import { type TableProps, tableProps } from "./types";
import { pagination } from './index'
import Pagination from './Pagination'
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
    const { columns, data, pagination } = toRefs(props);
  
    // 存储表格备份数据
    const backUpsList = JSON.parse(JSON.stringify(props.data));

    // 排序方法，type：0无序 1正序 2逆序
    const type = ref(0);
    const handleSort = (item: string) => {
      if (type.value === 2) {
        type.value = 0;
        data.value = backUpsList;
        return;
      }
      type.value++;
      data.value.sort(compare('id'));
    }

    // 排序
    const compare = (key: string) => {
      return function(a: any, b: any){
        return type.value === 1 ? a[key] - b[key] : b[key] - a[key];	
      }
    }
    
    return () => {
      return (
        <div>
          <table
          cellspacing="0"
          border="1">
            <colgroup>
              {
                columns.value.map(column => <col width={column.width} />)
              }
            </colgroup>
            <thead>
              <tr>
                  {
                    columns.value.map(item => {
                      return <th 
                        class="cell" onClick={handleSort.bind(this,item)}
                      >
                        <span>{item.name}</span>
                        <span v-show={item.isSort} id="sort">{Number(type.value) === 0 ? ' 无序' : Number(type.value) === 1 ? ' 正序' : ' 倒序'}</span>
                      </th>
                    })
                  }
              </tr>
            </thead>
            <tbody>
              {
                data.value.map((item, index) => {
                  return <tr>
                    {
                      columns.value.map(col => {
                        return <td>{item[col.key]}</td>
                      })
                    }
                  </tr>
                })
              }
            </tbody>
          </table>
          <Pagination {...pagination.value} />
        </div>
      );
    };
  },
})
