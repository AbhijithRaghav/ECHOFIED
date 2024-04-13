const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ECHOdatabase', {
});


// Listen for the 'connected' event on the mongoose connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database successfully');
});

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to database:', error);
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve main.html as the default landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.post('/signupp', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

app.post('/loginn', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Incorrect password');
    }

    // Redirect to home.html upon successful login
    res.redirect('/home.html');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});


app.listen(3030, () => {
  console.log('Server is running on port 3030');
});

console.log(__dirname);


