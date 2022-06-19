import { mount, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SimpleTable from "../src/components/SimpleTable";
import Pagination from "../src/components/Pagination";

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
    setTimeout(async () => {
      expect(wrapper.html()).toMatchSnapshot();
      const sortbtn = wrapper.findAll('#sort');
      await sortbtn[0].trigger('click');
      expect(wrapper.find('#sort').element.textContent).toBe(' 正序');
      await sortbtn[0].trigger('click');
      expect(wrapper.find('#sort').element.textContent).toBe(' 倒序');
    }, 1000)
    
  });

  test("pagination component", async () => {
    setTimeout(async () => {
      const paginationCom = wrapper.findComponent(Pagination);
      const pages = paginationCom.findAll(".li-item");
      // 初始化 默认第一页
      expect(paginationCom.find('#total').element.textContent).toBe('共42条');
      expect(paginationCom.find('.li-item_active').element.textContent).toBe('1');
      // 点击页码第二页
      await pages[1].trigger('click');
      expect(paginationCom.find('.li-item_active').element.textContent).toBe('2');
      // 点击上一页
      const pagepre = paginationCom.findAll(".li-pre");
      await pagepre[0].trigger('click');
      expect(paginationCom.find('.li-item_active').element.textContent).toBe('1');
      // 点击下一页
      const pagenext = paginationCom.findAll(".li-next");
      await pagenext[0].trigger('click');
      expect(paginationCom.find('.li-item_active').element.textContent).toBe('2');
      // 跳转页码
      const pagejump = paginationCom.find('input');
      await pagejump.setValue('3');
      expect(paginationCom.find('.li-item_active').element.textContent).toBe('3');
      }, 200)    
  })
})
