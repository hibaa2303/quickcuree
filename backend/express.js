require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors());


const uri = process.env.MONGODB_URI;
const GEOCODING_API_KEY = '20f20d4537e04235a2a66ec1008db66d';
const GEOCODING_API_URL = 'https://opencagedata.com/';
if (!uri) {
  console.error('MongoDB URI is not defined. Please check your environment variables.');
  process.exit(1);
}


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;


client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
    db = client.db('quickcure'); 
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); 
  });


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const result = await db.collection('login').insertOne({ email, password });

   
    if (result.insertedId) {
      res.json({ status: "success", data: { id: result.insertedId, email } });
    } else {
      res.json({ status: "fail", message: "Failed to insert user" });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.post('/signup', async (req, res) => {
  const { fname, email, password } = req.body;

  try {
    const user = await db.collection('signup').insertOne({ fname, email, password });
    res.json({ status: 'success', data: user });
  } catch (error) {
    console.error('Error during account creation:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.get('/medicines', async (req, res) => {
  try {
    const medicines = await db.collection('a to z').find({}).toArray();

    if (medicines.length > 0) {
      res.json({ status: 'success', data: medicines });
    } else {
      res.json({ status: 'fail', message: 'No medicines found' });
    }
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


app.get('/search', async (req, res) => {
  const { keyword } = req.query;

  // Log the keyword received from the frontend
  console.log('Search keyword:', keyword);

  if (!keyword) {
    return res.status(400).json({ status: 'fail', message: 'Keyword is required for search' });
  }

  try {
    // Perform the search in the 'a to z' collection
    const searchResults = await db.collection('a to z').find({
      name: new RegExp(keyword, 'i') // 'i' for case-insensitive
    }).toArray();

    // Log the results found in the database
    console.log('Search results:', searchResults);

    if (searchResults.length > 0) {
      res.json({ status: 'success', items: searchResults });
    } else {
      res.json({ status: 'fail', message: 'No items found matching your search' });
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Add Membership
app.post('/add-membership', async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await db.collection('memberships').updateOne(
      { userId }, 
      { $set: { membershipActive: true } }, 
      { upsert: true } // Create if not exists
    );
    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      res.json({ status: 'success', message: 'Membership added successfully!' });
    } else {
      res.json({ status: 'fail', message: 'Failed to add membership' });
    }
  } catch (error) {
    console.error('Error during adding membership:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Add Address
app.post('/add-address', async (req, res) => {
  const { userId, address } = req.body;

  try {
    const result = await db.collection('addresses').updateOne(
      { userId },
      { $push: { addresses: address } }, 
      { upsert: true } // Create if not exists
    );
    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      res.json({ status: 'success', message: 'Address added successfully!' });
    } else {
      res.json({ status: 'fail', message: 'Failed to add address' });
    }
  } catch (error) {
    console.error('Error during adding address:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Proceed to Payment
app.post('/checkout', async (req, res) => {
  const { userId, cartDetails } = req.body;
  
  // Calculate total cost
  const totalAmount = cartDetails.reduce((sum, item) => sum + item.price, 0);

  try {
    // Simulate payment initiation
    res.json({
      status: 'success',
      message: 'Proceeding to payment...',
      totalAmount,
      paymentLink: 'https://payment-gateway-url.com' // Simulated payment link
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});
