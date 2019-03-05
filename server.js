const express = require('express');

const Console = console;
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Walkin = require('./model/walkin');
const Reservation = require('./model/reservation');

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/rezerva', { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.json({ message: 'welcome to Rezerva!' });
});
// Posting walkins in to the database
app.post('/walkins', (req, res) => {
  const walkin = new Walkin({
    _id: new mongoose.Types.ObjectId(),
    guest_name: req.body.name,
    head_count: req.body.count,
    phone_number: req.body.number,
    tag: req.body.tag,
  });
  walkin
    .save()
    .then((result) => {
      res.json({ walkins: result });
      Console.log(result);
    })
    .catch((err) => {
      Console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Fetching walkins and reservations from the database
app.get('/walkins', (req, res) => {
  Walkin.find()
    .exec()
    .then((result) => {
      Reservation.find()
        .then((out) => {
          Console.log('Reservations', out);
        })
        .catch((err) => {
          Console.log(err);
          res.status(500).json({
            error: err,
          });
        });
      Console.log('Direct walkins', result);
      res.json({ count: result.length, walkins: result });
    })
    .catch((err) => {
      Console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Posting reservations in to the database
app.post('/reservations', (req, res) => {
  const reservation = new Reservation({
    _id: new mongoose.Types.ObjectId(),
    guest_name: req.body.name,
    head_count: req.body.count,
    phone_number: req.body.number,
    tag: req.body.tag,
    date: req.body.date,
    time: req.body.time,
  });
  reservation
    .save()
    .then((result) => {
      res.json({ reservations: result });
      Console.log(result);
    })
    .catch((err) => {
      Console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Fetching reservations from the database
app.get('/reservations', (req, res) => {
  Reservation.find()
    .exec()
    .then((result) => {
      Console.log(result);
      res.json({ reservations: result });
    })
    .catch((err) => {
      Console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.listen(port, () => {
  Console.log(`server stareted on: ${port}`);
});
