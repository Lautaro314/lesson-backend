const express = require("express");
const fs = require("fs")

const app = express ();

const PORT = 8080;




app.get('/products', async (req,res) => {

    try {
    
    const producto = await fs.promises.readFile('src/productos.json' , "utf-8");
    

    const productos = JSON.parse(producto)

    res.json(productos)

    } catch (error) {
        console.error("ERROR AL CARGAR EL SERVIDOR" , error);
    }  

})


app.listen(PORT , () => {
    
    console.log(`This server is running in the port ${PORT}`);
    
})