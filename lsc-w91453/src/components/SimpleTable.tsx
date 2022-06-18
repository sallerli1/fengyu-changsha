import { defineComponent, computed, ref, toRefs } from "vue";
import { type TableProps,  tableProps } from "./types/index";
import Pagination from './Pagination'
import { useTable } from './hooks/table';
import './style/index.css';

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {
    // 表头数据
    const { columns, data, pagination } = toRefs(props);

    // 排序方法，type：0无序 1正序 2逆序
    const type = ref(0);
    
    const { showData, handleSort } = useTable(data, type)

    // 页码发生变化时触发
    const pageChange = (page: number) => {
      emit('pageChange', page)
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
                        class="cell" onClick={handleSort.bind(this,item.key)}
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
                showData.value.map((item: any) => {
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
          <Pagination {...pagination.value} onPageChange={pageChange} />
        </div>
      );
    };
  },
})
