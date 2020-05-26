const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const params = event.queryStringParameters;

  const id = params.id;
  const UUID = params.UUID;

  const deleteParam = {
    TableName: 'travelTable',
    Key: {
      ID: id,
      UUID: UUID
    }
  };
  await new Promise((resolve, reject) => {
    dynamoDocument.delete(deleteParam, (err, data) => {
      if (err) {
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