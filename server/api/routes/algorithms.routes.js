const { Router } = require('express');

const { getResult } = require('../services/algorithms.service');

const router = Router();

router.post('/', (req, res) => {
  const result = getResult(req.body);

  res.send(result);
});

module.exports = router;