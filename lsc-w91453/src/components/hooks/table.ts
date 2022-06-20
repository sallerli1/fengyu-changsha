import { Ref, unref, watch, computed } from 'vue';
import { ColumnsItem } from '../types/'

export function useTable (data: Ref<ColumnsItem[]>, type: Ref<string>) {
    // 获取页面展示数据
    const showData = computed(() =>{
        const list = unref(data)
        return list
    })

    // 数据排序方法
    const compareData = (key: string) => {
        return function(former: any, latter: any){
            return type.value === 'DESC' ? former[key] - latter[key] : latter[key] - former[key];	
        }
    }

    // 对排序进行处理
    const handleSort = (item: string, status: string) => {
        switch(status) {
            case '': type.value = 'ASC';break;
            case 'ASC': type.value = 'DESC';break;
            case 'DESC': 
                type.value = '';
                data.value = JSON.parse(JSON.stringify(showData.value));
                break;
            default:
        }
        data.value.sort(compareData(item));
    }
    return {
        showData,
        handleSort
    }
}

