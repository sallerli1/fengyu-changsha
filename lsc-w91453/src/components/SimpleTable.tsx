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

    // 排序方法，type：无序 ASC正序 DESC逆序
    const type = ref('');
    
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
                        class="cell" onClick={handleSort.bind(this,item.key, type.value)}
                      >
                        <span>{item.name}</span>
                        <span v-show={item.isSort} id="sort">{type.value === '' ? ' 无序' : type.value === 'ASC' ? ' 正序' : ' 倒序'}</span>
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
