import { ExtractPropTypes } from "vue";

//  定义 Props
export const tableProps = {
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Object,
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
  total: Number
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;