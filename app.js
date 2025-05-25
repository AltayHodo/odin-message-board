const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/queries')

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const newMessageRouter = require('./routes/newMessageRouter');

// const messages = [
//   {
//     text: 'Hi there!',
//     user: 'Amando',
//     added: new Date(),
//   },
//   {
//     text: 'Hello World!',
//     user: 'Charles',
//     added: new Date(),
//   },
// ];


app.get('/', async (req, res) => {
  const messages = await db.getAllMessages();
  res.render('index', { title: 'Mini Messageboard', messages: messages});
});

app.use('/new', newMessageRouter);

app.post('/new', async (req, res) => {
  const user = req.body.name;
  const message = req.body.message;
  await db.insertMessage({user, text: message});
  res.redirect('/');
});

app.get('/message/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const message = await db.getMessageById(id);
  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.render('message', { message })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
