'use strict';

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const StreamChat = require('stream-chat').StreamChat;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new StreamChat(process.env.API_KEY, process.env.API_SECRET);

app.post('/users/create', (req, res) => {
  const username = req.body.username;

  if (username === undefined || username.length == 0) {
    res.status(400).send({
      status: false,
      message: 'Please provide your username',
    });
    return;
  }

  const id = uuidv4();

  res.status(200);
  res.send({
    status: true,
    message: 'You have been successfully authenticated',
    token: client.createToken(id),
    user_id: id,
  });
});

module.exports.handler = serverless(app);
