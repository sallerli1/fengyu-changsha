import { ref, unref, watch, computed } from 'vue';

export function useTable (data: any, type: any) {
    const showData = computed(() =>{
        const list = unref(data)
        return list
    })

    const compare = (key: string) => {
        return function(a: any, b: any){
            return type.value === 1 ? a[key] - b[key] : b[key] - a[key];	
        }
    }
    const handleSort = (item: string) => {
        if (type.value === 2) {
            type.value = 0;
            data.value = JSON.parse(JSON.stringify(showData.value));
            return;
        }
        type.value++;
        data.value.sort(compare(item));
    }
    return {
        showData,
        handleSort
    }
}

const max = 7;

export function pagination (currNum: number, size: number, totalNum: number, emit: any) {
    const curr = unref(currNum)
    const pageSize = unref(size);
    const total = Math.ceil(unref(totalNum) / pageSize);
    const currentPage = ref(1);
    let list = [];
    // 生成页码数据
    const getPageList =  () => {
        list = [];
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
    
    // 跳转至某一页
    const pageJump = (num: number) => {
        if (!isNaN(num)) {
            currentPage.value = num
        }
    }

    // 页码发生变化时触发
    const pageChange = (page: number | string) => {
        emit('pageChange', page.value);
    }

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
