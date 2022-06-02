import { ref, unref, watch } from 'vue';

const max = 7;

export function pagination (currNum: number, size: number, totalNum: number, emit: any) {
    const curr = unref(currNum)
    const pageSize = unref(size);
    const total = Math.ceil(unref(totalNum) / pageSize);
    console.log(pageSize, total)
    const currentPage = ref(1);
    let list = [];
    // 生成页码数据
    const getPageList =  () => {
        list = [];
        console.log(total)
        if(total < max) {
            for(var r = 1; r < total + 1; r++) {
                list.push(r);
            }
        } else {
            if(curr < 4) { 
                list = [1,2,3,4,'...',total];
            } else {
                if(curr > total - 3) {
                    list = [1, '...', total-3,total-2,total-1,total];
                } else {
                    list = [1,'...',curr-1, curr, curr+1,'...',total];
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

    const pageJump = (num: number) => {
        console.log(num)
        if (!isNaN(num) && list.indexOf(num)) {
            currentPage.value = num
        }
    }

    const pageChange = () => {
        console.log('change')
    }

    watch(currentPage, () =>
        // pageChange()
        emit('page-change')
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
