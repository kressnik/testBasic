'use strict';

const { validationResult } = require('express-validator');

const numberHandler = (req, res) => {
  console.log(req.params, req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({
    status: 'OK',
    data: [1, 2, 3, 4, 5, 6, 7]
  });
};

exports.numberHandler = numberHandler;
