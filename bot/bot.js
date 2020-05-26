const line = require('@line/bot-sdk');
const crypto = require('crypto');
const client = new line.Client({
  channelAccessToken: process.env.ACCESSTOKEN
});


exports.main = async (event) => {
  // 署名検証
  const signature = crypto
    .createHmac('sha256', process.env.CHANNELSECRET)
    .update(event.body)
    .digest('base64');
  const checkHeader = (event.headers || {})['X-Line-Signature'];
  const body = JSON.parse(event.body);
  const events = body.events;
  console.log(events);

  // 署名検証が成功した場合
  if (signature === checkHeader) {
    events.forEach(async (lineEvent) => {
      let message;
      // イベントタイプごとに関数を分ける
      switch (lineEvent.type) {
        // メッセージイベント
        case 'message':
          message = await messageFunc(lineEvent);
          break;
      }
      // メッセージを返信
      if (message != undefined) {
        client
          .replyMessage(body.events[0].replyToken, message)
          .then((response) => {
            const lambdaResponse = {
              statusCode: 200,
              headers: {
                'X-Line-Status': 'OK'
              },
              body: '{"result":"completed"}',
            };
            return lambdaResponse;
          })
          .catch((err) => console.log(err));
      }
    });
  }
  // 署名検証に失敗した場合
  else {
    console.log('署名認証エラー');
  }
};

const messageFunc = async (e) => {
  const userMessage = e.message.text;
  let message;
  if (e.source.type === 'group') {
    switch (userMessage) {
      case 'メニュー':
        message = require('../messages/groupMenu.json');
        break;

      default:
        break;
    }
  }
};