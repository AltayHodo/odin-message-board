const express = require('express');
const app = express();
const path = require('path');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

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

function openMessage(index){
  console.log(index);
}

app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages, openMessage: openMessage });
});

app.use('/new', newMessageRouter);

app.post('/new', (req, res) => {
  const user = req.body.name;
  const message = req.body.message;
  messages.push({ text: message, user: user, added: new Date() });
  res.redirect('/');
});

app.get('/message/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const message = messages[id];
  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.render('message', { message })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
