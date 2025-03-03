const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/authRouter');
const eventRouter = require('./routers/eventRouter');
// const userRouter = require("./routers/userRouter");

// app.use("/api/user", userRouter);

const app = express();
const PORT = 3000;

// processing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routes
// static routes

// /auth for user authentication pathways
app.use('/auth', authRouter);

// /event for event fetching & creation
app.use('/event', eventRouter);

// should event include item? should item be separate?


// serve HTML
app.get('/', (req, res) => {
  console.log('serve HTML');
  return res.sendFile(path.resolve(__dirname, '../index.html'));
});

// 404
app.use((req, res) => {
  console.log('route not found - 404 ;( ');
  return res.sendStatus(404);
})

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    status: 500,
    log: 'Unknown Error Encountered',
    message: 'Error Encountered'
  };

  const errorObject = { ...defaultErr, ...err };

  console.log(errorObject.log);
  res.status(errorObject.status).send(errorObject.message);
});

app.listen(PORT, () => {
  console.log('Event Handler knows all');
});

module.exports = app;