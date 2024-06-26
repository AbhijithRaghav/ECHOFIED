const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user');
const Contact = require('./contact');
const Developer = require('./developer'); // Import Developer model
const About = require('./about');
const Profile = require('./profile');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ECHOFIED8', {
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

// Route to fetch developers from the database and send as JSON
app.get('/developers', async (req, res) => {
  try {
    const developers = await Developer.find(); // Fetch all developers
    res.json(developers); // Send developer data as JSON response
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).send('Error fetching developers');
  }
});


app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Error fetching contacts');
  }
});

app.get('/abouts', async (req, res) => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Error fetching contacts');
  }
});

app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).send('Error fetching profiles');
  }
});

// Serve contact.html as the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/signupp', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password});
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

    // Check if the password matches the one stored in the database (plaintext comparison)
    if (password !== user.password) {
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
