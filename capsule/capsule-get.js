const {
  v4: uuidv4
} = require('uuid');

const AWS = require('aws-sdk');
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {

  const params = event.queryStringParameters;
  const type = params.type;
  const id = params.id;

  const param = {
    TableName: 'omoideCapsuleTable',
    KeyConditionExpression: '#k = :val',
    ExpressionAttributeValues: {
      ':val': id
    },
    ExpressionAttributeNames: {
      '#k': 'ID'
    }
  };
  const promise = await new Promise((resolve, reject) => {
    dynamoDocument.query(param, (err, data) => {
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
    body: JSON.stringify(id)
  };
  return response;
};