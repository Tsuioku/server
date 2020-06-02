const AWS = require('aws-sdk');
const {
  v4: uuidv4
} = require('uuid');

const dynamoDocument = new AWS.DynamoDB.DocumentClient();

exports.main = async (event) => {
  const data = JSON.parse(event.body);
  // const type = data.type;
  const {
    id,
    title,
    description,
    registeredDate,
    deliveryDate,
    image
  } = data;

  if (description.length > 200 || title.length > 15) {
    const response = {
      statusCode: 401,
      body: JSON.stringify('sorehasou'),
      headers: {
        'Access-Control-Allow-Origin': 'https://peacebox.sugokunaritai.dev',
        'Access-Control-Allow-Credentials': true
      }
    };
    return response;
  }

  const UUID = uuidv4().split('-').join('');

  const param = {
    TableName: 'omoideCapsuleTable',
    Item: {
      ID: id,
      UUID: UUID,
      title: title,
      description: description,
      registeredDate: registeredDate,
      deliveryDate: deliveryDate
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

  if (image) {
    const decodedImage = Buffer.from(image, 'base64');

    const params = {
      Body: decodedImage,
      Bucket: 'capsule-image',
      Key: [UUID, 'jpeg'].join('.'),
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };

    const s3 = new AWS.S3();
    await new Promise((resolve, reject) => {
      s3.upload(params, function (err, data) {
        if (err) {
          console.log('error : ', err);
          throw new Error(err);
        } else {
          console.log('success');
          resolve();
        }
      });
    });
  }

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