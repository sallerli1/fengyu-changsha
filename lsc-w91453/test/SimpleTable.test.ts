import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/SimpleTable";

const columns = [
  {name: 'ID', key: 'id', width: '100px', isSort: true},
  {name: '姓名', key: 'name', width: '100px', isSort: true},
  {name: '说明', key: 'info', width: '300px', isSort: false},
]
const list = [
  {id: 1, name: '姓名'},
  {id: 2, name: '姓名'},
  {id: 3, name: '姓名3'},
  {id: 7, name: '姓名'},
  {id: 5, name: '姓名'},
  {id: 6, name: '姓名'},
]
test("mount component", () => {
  const wrapper = shallowMount(SimpleTable, {
    props: {
      data: list,
      columns
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

