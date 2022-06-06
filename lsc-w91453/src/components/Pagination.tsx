import { defineComponent, toRefs, unref, Ref, ref } from "vue";
import { type PaginationProps, paginationProps } from "./types";
import { pagination } from './index';
import './style.css'
export default defineComponent({
    name: "Pagination",
    props: paginationProps,
    setup(props: PaginationProps, { attrs, emit, slots }) {
        const jumpNumber = ref(null);
        const { currentPage: propsCurrentPage, pageSize: propsPageSize, total } = toRefs(props);
        const {
            currentPage,
            pageList,
            prev,
            next,
            pageJump
        } = pagination(propsCurrentPage, propsPageSize, total, emit);
        
        return () => (
            <ul class="pagination">
                <li>共{ total?.value }条</li>
                <li class="li-pre" onClick={prev}>上一页</li>
                {
                    pageList.map(item => {
                        return <li
                            class={`li-item ${currentPage.value === item ? 'li-item_active' : ''}`}
                            onClick={pageJump.bind(this, item)}
                        >{item}</li>
                    })
                }
                <li class="li-next" onClick={next}>下一页</li>
                <li class="li-item">
                    <span>跳转至：</span>
                    <input class="input-number" type="number" v-model={jumpNumber.value} onKeydown={pageJump.bind(this, jumpNumber.value)} />
                </li>
            </ul>
        )
    }
})