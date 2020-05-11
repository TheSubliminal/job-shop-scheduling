const express = require('express');
const dotenv = require('dotenv');

const setupApiRoutes = require('./api/routes');
const errorHandlerMiddleware = require('./api/middlewares/errorHandler.middleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlerMiddleware);

setupApiRoutes(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});