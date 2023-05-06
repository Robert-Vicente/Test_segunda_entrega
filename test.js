const fs = require("fs");

class Product {
  static idCounter = 0;
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = ++Product.idCounter;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
class ProductManager {
  #products;
  #path;
  constructor(path) {
    this.#products = [];
    this.#path = path;
    if (!fs.existsSync(this.#path)) return fs.writeFileSync(this.#path, "[]");
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));

    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    )
      return console.log("Todos los campos son obligatorios");
    if (this.#products.find((p) => p.code === code))
      return console.log("Ya existe un producto con este codigo");

    const newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    this.#products.push(newProduct);
    fs.writeFileSync(this.#path, JSON.stringify(this.#products));

    return console.log("Producto Añadido");
  }
  getProducts() {
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    return console.log(this.#products);
  }
  getProductById(pid) {
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (this.#products.find((p) => p.id === pid)) {
      const productFound = this.#products.find((p) => p.id === pid);
      return console.log(productFound);
    }
    return console.log("No existe un producto con ese id");
  }
  deleteProduct(pid) {
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (this.#products.find((p) => p.id === pid)) {
      this.#products.splice(
        this.#products.indexOf(this.#products.find((p) => p.id === pid)),
        1
      );
      fs.writeFileSync(this.#path, JSON.stringify(this.#products));
      return console.log("Producto Eliminado");
    } else {
      return console.log("No se encontró un producto con el id indicado");
    }
  }
  updateProduct(pid, k, v) {
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (k == "id") {
      return console.log("No puedes modificarle el id a un producto");
    } else if (this.#products.find((p) => p.id === pid)) {
      const productFound = this.#products.find((p) => p.id === pid);
      productFound[k] = v;
      fs.writeFileSync(this.#path, JSON.stringify(this.#products));
      return console.log("Producto actualizado", productFound);
    } else {
      return console.log("No se encontró un producto con el id indicado");
    }
  }
}
const productManager = new ProductManager("./db/products.json");

// productManager.addProduct("celular", "nuevo", "5000", "/images/producto.png", "2", 5)
// productManager.addProduct("televisor", "nuevo", "5000", "/images/producto.png", "2", 5)
// productManager.addProduct("heladera", "nuevo", "5000", "/images/producto.png", "4", 5)
// productManager.addProduct("cocina", "nuevo", "5000", "/images/producto.png", "5", 5)
// productManager.addProduct("lavarropa", "nuevo", "5000", "/images/producto.png", "6", 5)
// productManager.addProduct("cafetera", "nuevo", "5000", "/images/producto.png", "7", 5)
// productManager.addProduct("microondas", "nuevo", "5000", "/images/producto.png", "8", 5)
// productManager.addProduct("tablet", "nuevo", "5000", "/images/producto.png", "9", 5)

// productManager.getProducts()

//productManager.getProductById(100)

//productManager.deleteProduct(1)

//productManager.updateProduct(2, "title", "Carrito 2.0")
