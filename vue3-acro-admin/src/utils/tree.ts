import { BiNode, Node } from '@/model/tree';

export class BinaryTree {
  root: Node;

  lists: Node[];

  constructor(key: number, data: any) {
    this.root = new BiNode(key, data);
    this.lists = [];
  }

  /* 构造二叉树 */
  public createBinaryTree(key: number, data: any) {
    const newNode = new BiNode(key, data);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /*  插入节点 */
  public insertNode(node: Node, newNode: Node) {
    if (newNode.key < node.key) {
      // 如果插入的节点值比父节点小则插入到左节点上反之则插入到右节点上
      if (node.leftChild === null) {
        node.leftChild = newNode;
      } else {
        this.insertNode(node.leftChild, newNode); // 递归找下一层的左侧节点（重点）
      }
    } else if (!node.rightChild) {
      node.rightChild = newNode;
    } else {
      this.insertNode(node.rightChild, newNode);
    }
  }

  /* 搜索最小值 */
  public minValue() {
    const biNode = this.root;
    return this.searchLeftChild(biNode)?.data;
  }

  /* 搜索右子树 */
  private searchLeftChild(node: Node): any {
    if (node.leftChild) return this.searchLeftChild(node.leftChild);
    if (!node.leftChild) return node;
    return null;
  }

  /* 搜索第N小的值 */
  public minNValue(n: number) {
    this.lists = [];
    let biNode = this.root;
    while (biNode != null || this.lists.length) {
      while (biNode != null) {
        this.lists.push(biNode);
        biNode = biNode.leftChild;
      }
      biNode = this.lists?.pop() ?? null;
      n -= 1;
      if (n === 0) {
        break;
      }
      biNode = biNode.rightChild;
    }
    return biNode.data;
  }

  /* 搜索最大值 */
  public maxValue() {
    const biNode = this.root;
    return this.searchRightChild(biNode);
  }

  /* 搜索右子树 */
  private searchRightChild(node: Node): any {
    this.lists.push(node.data);
    if (node.rightChild) return this.searchLeftChild(node.rightChild);
    if (!node.rightChild) return node.data;
    return null;
  }

  /* 搜索最N大的值 */
  public maxNValue(n: number) {
    this.lists = [];
    let biNode: any = this.root;
    while (biNode != null || this.lists.length) {
      while (biNode != null) {
        this.lists.push(biNode);
        biNode = biNode.rightChild;
      }
      biNode = this.lists.pop();
      n -= 1;
      if (n === 0) {
        break;
      }
      biNode = biNode.leftChild;
    }
    return biNode.data;
  }

  /* 删除一个节点 */
  public removeNode(n: number) {
    const biNode = this.root;
    let node = this.traverseLeftRightChildrenTree(biNode, n);
    const parentNode = this.searchParentNode(n);
    if (node?.key) {
      // 当要删除的节点为叶子节点
      if (!node?.rightChild && !node?.leftChild) {
        if (parentNode.key <= n) parentNode.rightChild = null
        if (parentNode.key >= n) parentNode.leftChild = null;
      }
      // 只有左边子树
      if (node?.leftChild && !node?.rightChild) {
        parentNode.leftChild = node.leftChild
      }
      // 只有右边子树
      if (!node?.leftChild && node?.rightChild) {
         parentNode.rightChild = node.rightChild;
      }
      // 左右子树都存在
      if (node?.leftChild && node?.rightChild) {
        //  判断删除的数据是在父节点的左边还是右边

        // let isleft = false
        // if (parentNode?.leftChild?.key === node.key) isleft = true
       
        const aux = this.searchLeftChild(node.rightChild);
        node.key = aux.key;
        node.rightChild = this.removeNode(node.key, aux.key)
        // const data = this.searchParentNode(aux.key);
        // data.leftChild = null;
        // aux.leftChild = node.leftChild;
        // parentNode.leftChild = aux;
        // node.rightChild   = null
        // aux.rightChild  = data
      }
    }
    return biNode;
  }

  /* 查找节点的父节点 */
  private searchParentNode(key: Number): Node {
    const biNode = this.root;
    return this.traverLeftRightChildrenTree(biNode, key);
  }

  /* 遍历节点 */
  private traverLeftRightChildrenTree(biNode: Node, key: number): Node {
    if (
      (biNode.leftChild && biNode.leftChild.key  === key) ||
      (biNode.rightChild && biNode.rightChild.key === key)
    )
    {
      return biNode;
      }
    // 遍历右子树
    if (key > biNode.key && biNode.rightChild)
      return this.traverLeftRightChildrenTree(biNode.rightChild, key);
    // 遍历左子树
    if (key < biNode.key && biNode.leftChild)
      return this.traverLeftRightChildrenTree(biNode.leftChild, key);
    return null;
  }

  /* 查找节点 */
  public searchNode(n: number) {
    const biNode = this.root;
    const node = this.traverseLeftRightChildrenTree(biNode, n);
    if (node?.key) return true;
    return false;
  }

  /* 遍历左右子树 */
  private traverseLeftRightChildrenTree(biNode: Node, n: number): any {
    if (biNode.key === n) return biNode;
    // 遍历右子树
    if (n > biNode.key && biNode.rightChild)
      return this.traverseLeftRightChildrenTree(biNode.rightChild, n);
    // 遍历左子树
    if (n < biNode.key && biNode.leftChild)
      return this.traverseLeftRightChildrenTree(biNode.leftChild, n);
    return null;
  }

  /* 先序遍历(根左右) */
  //  public  preOrderTraverseNode(callback) {
  //    const biNode = this.root
  //    if (biNode != null) {
  //      callback(biNode.key);
  //      this.preOrderTraverseNode(biNode.leftChild, callback);
  //      this.preOrderTraverseNode(biNode.rightChild, callback);
  //    }
  //  }
  //
  //  // 中序遍历所有节点（左根右）
  //  public  inOrderTraverseNode(callback) {
  //    const biNode = this.root
  //    if (biNode != null) {
  //      this.inOrderTraverseNode(biNode.leftChild, callback);
  //      callback(biNode.key);
  //      this.inOrderTraverseNode(biNode.rightChild, callback);
  //    }
  //  }
  //  //后序遍历所有节点（左右根）
  //  public  postOrderTraverseNode(callback) {
  //    const biNode = this.root
  //    if (biNode != null) {
  //      this.postOrderTraverseNode(biNode.leftChild, callback);
  //      this.postOrderTraverseNode(biNode.rightChild, callback);
  //      callback(biNode.key);
  //    }
  //  }
}

// export default { BinaryTree };
