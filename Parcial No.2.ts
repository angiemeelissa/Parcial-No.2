class Product {
    constructor(
      public code: string,
      public name: string,
      public price: number
    ) {}
  }
  
  class AVLNode {
    public left: AVLNode | null = null;
    public right: AVLNode | null = null;
    public height: number = 1;
    constructor(public product: Product) {}
  }
  
  class AVLTree {
    private root: AVLNode | null = null;
  
    private getHeight(node: AVLNode | null): number {
      return node ? node.height : 0;
    }
  
    private updateHeight(node: AVLNode): void {
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
  
    private rotateRight(y: AVLNode): AVLNode {
      const x = y.left!;
      y.left = x.right;
      x.right = y;
      this.updateHeight(y);
      this.updateHeight(x);
      return x;
    }
  
    private rotateLeft(x: AVLNode): AVLNode {
      const y = x.right!;
      x.right = y.left;
      y.left = x;
      this.updateHeight(x);
      this.updateHeight(y);
      return y;
    }
  
    private getBalanceFactor(node: AVLNode): number {
      return this.getHeight(node.left) - this.getHeight(node.right);
    }
  
    insert(product: Product): void {
      this.root = this._insert(this.root, product);
    }
  
    private _insert(node: AVLNode | null, product: Product): AVLNode {
      if (!node) return new AVLNode(product);
  
      if (product.price < node.product.price) {
        node.left = this._insert(node.left, product);
      } else if (product.price > node.product.price) {
        node.right = this._insert(node.right, product);
      } else {
        throw new Error("Product with this price already exists.");
      }
  
      this.updateHeight(node);
      return this.balance(node);
    }
  
    remove(code: string): void {
      this.root = this._remove(this.root, code);
    }
  
    private _remove(node: AVLNode | null, code: string): AVLNode | null {
      if (!node) return null;
  
      if (code < node.product.code) {
        node.left = this._remove(node.left, code);
      } else if (code > node.product.code) {
        node.right = this._remove(node.right, code);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        const minLargerNode = this.getMinNode(node.right);
        node.product = minLargerNode.product;
        node.right = this._remove(node.right, minLargerNode.product.code);
      }
  
      this.updateHeight(node);
      return this.balance(node);
    }
  
    updatePrice(code: string, newPrice: number): void {
      const productNode = this.findProductNode(this.root, code);
      if (productNode) {
        this.remove(code);
        productNode.product.price = newPrice;
        this.insert(productNode.product);
      } else {
        throw new Error("Product not found");
      }
    }
  
    findMinPrice(): Product | null {
      const minNode = this.getMinNode(this.root);
      return minNode ? minNode.product : null;
    }
  
    private getMinNode(node: AVLNode | null): AVLNode {
      while (node?.left) node = node.left;
      return node!;
    }
  
    findMaxPrice(): Product | null {
      const maxNode = this.getMaxNode(this.root);
      return maxNode ? maxNode.product : null;
    }
  
    private getMaxNode(node: AVLNode | null): AVLNode {
      while (node?.right) node = node.right;
      return node!;
    }
  
    findProductsInRange(min: number, max: number): Product[] {
      const result: Product[] = [];
      this._findProductsInRange(this.root, min, max, result);
      return result;
    }
  
    private _findProductsInRange(node: AVLNode | null, min: number, max: number, result: Product[]): void {
      if (!node) return;
  
      if (node.product.price >= min) {
        this._findProductsInRange(node.left, min, max, result);
      }
  
      if (node.product.price >= min && node.product.price <= max) {
        result.push(node.product);
      }
  
      if (node.product.price <= max) {
        this._findProductsInRange(node.right, min, max, result);
      }
    }
  
    private balance(node: AVLNode): AVLNode {
      const balanceFactor = this.getBalanceFactor(node);
  
      if (balanceFactor > 1) {
        if (this.getBalanceFactor(node.left!) < 0) {
          node.left = this.rotateLeft(node.left!);
        }
        return this.rotateRight(node);
      }
  
      if (balanceFactor < -1) {
        if (this.getBalanceFactor(node.right!) > 0) {
          node.right = this.rotateRight(node.right!);
        }
        return this.rotateLeft(node);
      }
  
      return node;
    }
  
    private findProductNode(node: AVLNode | null, code: string): AVLNode | null {
      if (!node) return null;
      if (code < node.product.code) return this.findProductNode(node.left, code);
      else if (code > node.product.code) return this.findProductNode(node.right, code);
      else return node;
    }
  }
  
  console.log("Gracias por Utilizar mi Programa");
  console.log("Programa Hecho Por: Angie Melissa Santiago Rodriguez");