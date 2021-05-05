'use strict';

const getAll = (req, res) => {
  res.status(200).json({
    status: 'OK',
    data: [1, 2, 3, 4, 5]
  });
};

exports.getAll = getAll;
