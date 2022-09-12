const express = require('express');
const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

// app.use((err, _req, res, _next) => {
//   res
//     .status(400)
//     .json(err.message);
// });
module.exports = app;