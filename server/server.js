const express = require('express');
const dotenv = require('dotenv');

const setupApiRoutes = require('./api/routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupApiRoutes(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});