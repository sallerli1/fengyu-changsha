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

