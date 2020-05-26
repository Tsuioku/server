'use strict';

module.exports.hello = async event => {

  console.log(event);

  const path = event.path;
  const method = event.httpMethod;
  console.log(path, method);

  let res;

  switch (path) {
    case '/bot':
      res = require('./bot/bot').main(event);
      break;
    case '/capsule':
      switch (method) {
        case 'DELETE':
          res = require('./capsule/capsule-delete').main(event);
          break;
        case 'GET':
          res = require('./capsule/capsule-get').main(event);
          break;
        case 'POST':
          res = require('./capsule/capsule-post').main(event);
          break;
      }
      break;
  }

  return res;
};