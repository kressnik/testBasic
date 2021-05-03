'use strict';

const getAll = (req, res) => {
  res.status(200).json({
    status: 'OK'
  })
}

exports.getAll = getAll;