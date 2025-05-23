const express = require('express');
const app = express();
const path = require('path');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const newMessageRouter = require('./routes/newMessageRouter');

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

app.get('/', (req, res) => {
  res.render('index', { title: "Mini Messageboard", messages: messages });
});

app.use('/new', newMessageRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
