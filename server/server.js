const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const setupApiRoutes = require('./api/routes');
const errorHandlerMiddleware = require('./api/middlewares/errorHandler.middleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const staticPath = path.resolve(`${__dirname}/../client/build`);

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlerMiddleware);

setupApiRoutes(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../client/build/index.html`));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});