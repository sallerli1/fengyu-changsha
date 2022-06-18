import { PropType, ExtractPropTypes } from "vue";

export interface ColumnsItem {
    key: string,
    name: string,
    width?: number | string,
    isSort?: boolean
}

export interface Pagination {
    currentPage?: number,
    pageSize?: number,
    total: number,
  }

//  定义 Props
export const tableProps = {
    data: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array as PropType<ColumnsItem[]>,
        default: () => [],
    },
    pagination: {
        type: Object as PropType<Pagination>,
        default: () => {
            currentPage: 1;
            pageSize: 20;
            total: 0;
        }
    }
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

export type PagesProps = {
    currentIndex: number;
    total: number;
}

//  定义 Props
export const paginationProps = {
    currentPage: Number,
    pageSize: Number,
    total: {
        type: Number,
        default: 0
    }
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;