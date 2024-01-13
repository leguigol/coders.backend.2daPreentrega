const fs=require('fs').promises;

class ProductManager {
    constructor(path){
        this.pathDB=path;
        // this.products=[];
        // this.nextProductId = 1;
    }

    addProduct(title,description,price,thumbnail,code,stock){

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios. No se pudo agregar el producto.");
            return;
        }

        if (this.isCodeDuplicate(code)) {
            console.log("Ya existe un producto con el código proporcionado. No se pudo agregar el producto.");
            return;
        }

        const product={
            id: this.nextProductId++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        this.products.push(product);
    }

    async createProduct(product){
        try{
            const allProducts=this.getProducts();
            const lastId=allProducts.length===0 ? 1 
            : 
            allProducts.productos[allProducts.productos.length-1].id+1;
    
            const newProduct=({id: lastId,...product});
    
            allProducts.productos.push(newProduct);
            await fs.writeFile(this.pathDB,JSON.stringify(allProducts));
            return newProduct;
    
        }catch(error){
            console.log(error);
        }
    }

    showProducts(){
        this.products.forEach(product=>{
            console.log("ID:", product.id);
            console.log("Title:", product.title);
            console.log("Description:", product.description);
            console.log("Price:", product.price);
            console.log("Thumbnail:", product.thumbnail);
            console.log("Code:", product.code);
            console.log("Stock:", product.stock);
            console.log("----------------------");            
        })
    }
    isCodeDuplicate(code) {
        return this.products.some(product => product.code === code);
    }

    // async getProducts() {
    //     return this.products;
    // }

    async getProducts(){
        try{
            const allProducts=await fs.readFile(this.pathDB);
            return JSON.parse(allProducts);
        }catch(error){
            console.log(error);
        }
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado (ID:", id + ").");
            return null;
        }
    }
}

const productClass=new ProductManager();

productClass.addProduct('PRODUCTO 1','DESCRIPCION 1',10000,'imagen1.jpg','P01',10);
productClass.addProduct('PRODUCTO 2','DESCRIPCION 2',20000,'imagen2.jpg','P02',5);
productClass.addProduct('PRODUCTO 3','DESCRIPCION 3',30000,'imagen3.jpg','P03',1);

// Mostramos todos los productos

productClass.showProducts();

// Intentar ingresar un codigo repetido

productClass.addProduct('PRODUCTO 4','DESCRIPCION 4',40000,'imagen4.jpg','P01',4);

// Intentar ingresar un producto sin un valor requerido

productClass.addProduct('PRODUCTO 5','DESCRIPCION 5',50000,'P02',5);

// Devolvemos todos los productos en un arreglo

const allProducts=productClass.getProducts();

console.log('Mostrando el arreglo allProducts');
console.log(allProducts);

// Buscamos un id que existe:

const pFind=1;
const encontrarProducto=productClass.getProductById(pFind);

if(encontrarProducto){
    console.log('Producto con ID:',pFind," se encuentra cargado...")
}else{
    console.log('Error: Not Found');
}

// Buscamos un id que NO existe
const pNFind=10;
const nEncontrarProducto=productClass.getProductById(pNFind);

if(nEncontrarProducto){
    console.log('Producto con ID:',pNFind," se encuentra cargado...")
}else{
    console.log('Error: Not Found');
}

