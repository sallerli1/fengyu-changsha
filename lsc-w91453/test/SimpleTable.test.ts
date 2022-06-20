import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SimpleTable from "../src/components/SimpleTable";
import Pagination from "../src/components/Pagination";
import { usePagination } from '../src/components/hooks/pagination';
import { ref } from 'vue';

const columns = [
  {name: 'ID', key: 'id', width: '100px', isSort: true},
  {name: '姓名', key: 'name', width: '100px', isSort: true},
  {name: '说明', key: 'info', width: '300px', isSort: false},
]
// 生成指定长度的数组
const creatData = (size: number) => {
  const data = Array.from({length: size}, () => {
    const num = parseInt(String(100 * Math.random()), 10);
    return {
      id: num,
      name: '人物'+ num,
      info: '说明内容'
    }
  });
  return data
}

const list = creatData(10)

const baseInit = (type) => {
  return shallowMount(type, {
    props: {
      data: list,
      columns,
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 42
      }
    },
  })
};

const wrapper = baseInit(SimpleTable);
describe("base test", () => {
  test("mount component", async () => {
    expect(wrapper.html()).toMatchSnapshot();
    const sortbtn = wrapper.findAll('#sort');
    await sortbtn[0].trigger('click');
    expect(wrapper.find('#sort').element.textContent).toBe(' 正序');
    await sortbtn[0].trigger('click');
    expect(wrapper.find('#sort').element.textContent).toBe(' 倒序');
    await sortbtn[0].trigger('click');
    expect(wrapper.find('#sort').element.textContent).toBe(' 无序');
    
  });

  test("pagination component", async () => {
    // 测试分页方法
    const current = ref(1);
    const size = ref(10);
    const total = ref(100);
    const {
      currentPage,
      pageList,
      prev,
      next,
      pageJump
    } = usePagination(current, size, total, null);
    expect(currentPage.value).toBe(1);
    expect(pageList.length).toBe(6);
    await prev();
    expect(currentPage.value).toBe(1);
    await next();
    expect(currentPage.value).toBe(2);
    await pageJump(3);
    expect(currentPage.value).toBe(3);
    // 测试分页显示
    const paginationCom = shallowMount(Pagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        total: 42
      }
    });
    const pages = paginationCom.findAll(".li-item");
    // // 初始化 默认第一页
    expect(paginationCom.find('#total').element.textContent).toBe('共42条');
    expect(paginationCom.find('.li-item_active').element.textContent).toBe('1');
  })
})
