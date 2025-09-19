const fs = require('fs')


class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];

    }



    async getProduct() {

        try {

        const data = await fs.promises.readFile(this.path , 'utf-8')

        console.log(data);
        

        } catch (error) {

            console.error("Error al leer los productos" , error);
            
        
        }

    }








    async addProduct(title , description , price , code , stock , status , category){
        try {


        let data = await fs.promises.readFile(this.path , "utf-8");
        this.products = data ? JSON.parse(data) : []


        
        if (!title || !description || !code || !category ) {

            return 'Completar los datos...'
        
        }

        if(status == false) {

            return 'Producto invalido'
            
        }
        
        if(price == null || isNaN(price)) {

            return 'precio invalido'
        
        }

        if (stock == null || isNaN(stock)) {
            return 'stock invalido'
        }

        let id = 1;
        if(this.products.length>0){
            id=Math.max(...this.products.map(d=>d.id))+1
        }
        
        const product = {id , title , description , price , code , stock , status , category}
        
        this.products.push(product)

        await fs.promises.writeFile(this.path , JSON.stringify(this.products , null , 5))

        console.log("Tu producto fue agregado satisfactoriamente" , product);
        

        } catch (error) {
            console.error("Error al agregar los productos" , error);
            
        }
    }

}







(async () => {


    console.log("script iniciado");
    

    const manager = new ProductManager('src/productos.json')

    await manager.addProduct("CHALECOS DE METAL", "Talle único de algodón", 45000, "CDE347", 10 , true , "CHALECOS");

    await manager.getProduct();
}) ();


