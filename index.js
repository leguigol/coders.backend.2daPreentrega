const path=require("path");
const ProductManager=require("./productManager");

const projectProducts=async()=>{
    console.log('Iniciando manejador de productos');
    try{
        const pathBase=path.join(`${__dirname}/db.json`);
        const manager=new ProductManager(pathBase);

        let products=await manager.getProducts();
        console.log("🚀 ~ projectProducts ~ products:", products)   
    }catch(error){
        console.log(error);
    }
};

projectProducts();

