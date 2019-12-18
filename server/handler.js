'use strict';

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const StreamChat = require('stream-chat').StreamChat;
const { IncomingWebhook } = require('@slack/webhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

const client = new StreamChat(process.env.API_KEY, process.env.API_SECRET);

const channel = client.channel('messaging', 'lambda-webhook-chat');
channel.create();

app.post('/users/create', (req, res) => {
  const username = req.body.username;

  if (username === undefined || username.length == 0) {
    res.status(400).send({
      status: false,
      message: 'Please provide your username',
    });
    return;
  }

  res.status(200);
  res.send({
    status: true,
    message: 'You have been successfully authenticated',
    token: client.createToken(username),
    user_id: username,
  });
});

app.post('/users/add_member', (req, res) => {
  const username = req.body.username;

  if (username === undefined || username.length == 0) {
    res.status(400).send({
      status: false,
      message: 'Please provide your username',
    });
    return;
  }

  channel
    .addMembers([username])
    .then(() => {
      res.status(200).send({ status: true });
    })
    .catch(err => {
      console.log(err);
      res.status(200).send({ status: false });
    });
});

app.post('/hook', (req, res) => {
  const valid = client.verifyWebhook(
    JSON.stringify(req.body),
    req.headers['x-signature']
  );

  if (!valid) {
    res.status(403);
    res.send({
      status: false,
    });
    return;
  }

  (async () => {
    await webhook.send({
      text: 'This webhook has been published to the slack channel',
    });
  })();

  res.status(200);
  res.send({
    status: true,
  });
});

module.exports.handler = serverless(app);
