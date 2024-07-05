const express = require("express");
const app = express();
const productosRouter = require("./routes/productos.routes");
const categoriasRouter = require('./routes/categoria.routes');
const sucursalesRouter = require('./routes/sucursales.routes');
const contactoRouter = require('./routes/contacto.routes');

app.use(express.json());
app.use("/productos", productosRouter);
app.use('/categoria', categoriasRouter);
app.use('/sucursales', sucursalesRouter);
app.use('/contacto', contactoRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));