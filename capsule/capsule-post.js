const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const data = JSON.parse(event.body);
  // const type = data.type;
  const ID = data.id;
  const memory = data.memory;

  const UUID = uuidv4().split('-').join('');

  const param = {
    TableName: 'omoideCapsuleTable',
    Item: {
      ID: ID,
      UUID: UUID,
      memory: memory
    }
  };
  await new Promise((resolve) => {
    dynamoDocument.put(param, (err, data) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        resolve(data);
      }
    });
  });

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  };
  return response;

};