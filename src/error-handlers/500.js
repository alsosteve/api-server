'use strict';

function serverError(err, req, res, next) {
  console.error('Error! Your server is jacked up foo!');
  res.status(500).send('Server Error');
}

module.exports = serverError;