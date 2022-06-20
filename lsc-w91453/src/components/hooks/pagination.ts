import { ref, Ref, unref, watch, computed } from 'vue';

const max = 7;

export function usePagination(
    currNum: Ref<number | undefined> | undefined,
    size: Ref<number | undefined> | undefined,
    totalNum: Ref<number>,
    emit: any
) {
    const curr = unref(currNum) ?? 1;
    const _pageSize = ref(10);
    // 获取分页大小
    const pageSize = computed(() => {
        return unref(size) ?? _pageSize.value;
    });
    // 获取总分页数
    const num = computed(() => {
        return unref(Math.ceil(unref(totalNum) / unref(pageSize)))
    });
    const currentPage = ref(1);
    const total = unref(num);
    let list = [];
    // 生成页码数据
    const getPageList = () => {
        list = [];
        if (total < max) {
            for (var r = 1; r < total + 1; r++) {
                list.push(r);
            }
        } else {
            if (curr < 4) {
                list = [1, 2, 3, 4, '...', total];
            } else {
                if (curr > total - 3) {
                    list = [1, '...', total - 3, total - 2, total - 1, total];
                } else {
                    list = [1, '...', curr - 1, curr, curr + 1, '...', total];
                }
            }
        }
        return list;
    }

    // 上一页
    const prev = () => {
        if (currentPage.value === 1) {
            return;
        }
        currentPage.value--
    }

    // 下一页
    const next = () => {
        if (currentPage.value === total) {
            return;
        }
        currentPage.value++
    }

    // 跳转至某一页
    const pageJump = (num: number | string) => {
        if (typeof num === 'number') {
            currentPage.value = num
        }
    }

    // 页码发生变化时触发
    const pageChange = (page: Ref<number | string>) => {
        emit('pageChange', page.value);
    }

    // 监听分页变化
    watch(currentPage, () =>
        pageChange(currentPage)
    )
    return {
        currentPage,
        pageList: getPageList(),
        prev,
        next,
        pageJump,
        pageChange
    }
}
