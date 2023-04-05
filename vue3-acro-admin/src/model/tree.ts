export interface Node {
  data: any; //节点内容
  key: number; //key值
  isVisted: boolean; //是否遍历过
  leftChild: BiNode | null; //左孩子
  rightChild: BiNode | null; // 右孩子
}

/* 构造二叉树 */
export class BiNode {
  data: any; //节点内容
  key: number; //key值
  isVisted: boolean; //是否遍历过
  leftChild: BiNode | null; //左孩子
  rightChild: BiNode | null; // 右孩子
  constructor(key: number, data: any) {
    this.key = key;
    this.data = data;
    this.isVisted = false;
    this.leftChild = null;
    this.rightChild = null;
  }
}
// export default { BiNode, Node };
// export class BiNode {
//   node: BiTreeNode;
//   rightChild: any;
//   key: number;
//   leftChild: any;
//   data: any;
//   constructor(key: number, data: any) {
//     this.node = new  BiTreeNode(key, data) || null
//   }
// }
