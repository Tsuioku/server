const line = require('@line/bot-sdk');
const crypto = require('crypto');
const client = new line.Client({
  channelAccessToken: process.env.ACCESSTOKEN
});

exports.main = async (e) => {
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
  return message;
};