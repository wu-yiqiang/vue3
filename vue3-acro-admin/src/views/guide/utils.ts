interface Selectors {
  selector: string;
  message: string;
}
const selectors: Array<Selectors> = [
  {
    selector: '#btn1',
    message: '点此【新增】数据！',
  },
  {
    selector: '#btn2',
    message: '小心【删除】数据！',
  },
  {
    selector: '#btn3',
    message: '可通过此按钮【修改】数据！',
  },
  {
    selector: '#btn4',
    message: '一键【完成】所有操作！',
  },
];
export default { selectors };
