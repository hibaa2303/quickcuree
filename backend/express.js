require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MongoDB URI is not defined.');
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

async function connectWithRetry() {
  for (let i = 0; i < 5; i++) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db('quickcure');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      if (i === 4) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

connectWithRetry();

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

// Login
app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await db.collection('signup').findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({
        status: 'success',
        data: {
          id: user._id.toString(), // Ensure ID is a string
          email: user.email,
          firstName: user.fname, // Rename 'name' to 'firstName'
          username: user.username || user.email.split('@')[0], // Add username, fallback to email prefix
        },
      });
    } else {
      res.status(401).json({
        status: 'error', // Change 'fail' to 'error'
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    next(error);
  }
});

// Signup


app.post('/signup', async (req, res, next) => {
  const { fname, email, password } = req.body;
  try {
    const existingUser = await db.collection('signup').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'fail', message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('signup').insertOne({ fname, email, password: hashedPassword });
    res.json({ status: 'success', data: { id: result.insertedId, email, fname } });
  } catch (error) {
    next(error);
  }
});

// Get Medicines
app.get('/medicines', async (req, res, next) => {
  try {
    const { category } = req.query;
    console.log('Category:', category);
    const query = category ? { category: category.toLowerCase() } : {};
    console.log('Query:', query);
    const medicines = await db.collection('tablets').find(query).toArray();
    console.log('Medicines:', medicines);
    res.json({ status: 'success', data: medicines });
  } catch (error) {
    next(error);
  }
});

// Get Medicine by ID
app.get('/medicines/:id', async (req, res, next) => {
  try {
    const medicine = await db.collection('tablets').findOne({ _id: new ObjectId(req.params.id) });
    if (medicine) {
      res.json({ status: 'success', data: medicine });
    } else {
      res.status(404).json({ status: 'fail', message: 'Medicine not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Search Medicines
app.get('/search', async (req, res, next) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ status: 'fail', message: 'Keyword is required' });
  }
  try {
    const searchResults = await db.collection('tablets').find({
      name: new RegExp(keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')
    }).toArray();
    res.json({ status: 'success', items: searchResults });
  } catch (error) {
    next(error);
  }
});
app.get('/autocomplete', (req, res) => {
  const keyword = req.query.keyword?.toLowerCase();
  if (!keyword) {
    return res.json({ status: 'success', suggestions: [] });
  }
  const suggestions = medicines
    .filter(med => med.name.toLowerCase().includes(keyword))
    .map(med => med.name)
    .slice(0, 5); // Limit to 5 suggestions
  res.json({ status: 'success', suggestions });
});

// Add Membership
app.post('/add-membership', async (req, res, next) => {
  const { userId } = req.body;
  try {
    const result = await db.collection('memberships').updateOne(
      { userId },
      { $set: { membershipActive: true } },
      { upsert: true }
    );
    res.json({ status: 'success', message: 'Membership added successfully!' });
  } catch (error) {
    next(error);
  }
});

// Add Address
app.post('/add-address', async (req, res, next) => {
  const { userId, address } = req.body;
  try {
    const result = await db.collection('addresses').updateOne(
      { userId },
      { $push: { addresses: address } },
      { upsert: true }
    );
    res.json({ status: 'success', message: 'Address added successfully!' });
  } catch (error) {
    next(error);
  }
});

// Checkout
app.post('/checkout', async (req, res, next) => {
  const { userId, cartDetails } = req.body;
  try {
    const totalAmount = cartDetails.reduce((sum, item) => sum + item.price, 0);
    res.json({
      status: 'success',
      message: 'Proceeding to payment...',
      totalAmount,
      paymentLink: 'https://payment-gateway-url.com'
    });
  } catch (error) {
    next(error);
  }
});

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});