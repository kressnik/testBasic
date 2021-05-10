'use strict';

const statusServ = (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
};

exports.statusServ = statusServ;
