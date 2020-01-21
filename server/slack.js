const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

module.exports.slack = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  if (data.type === 'message.new') {
    await webhook.send({
      text: 'A new message was sent',
    });
  }

  callback(null, {
    statusCode: 201,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ status: true }),
  });
};
