const express = require('express');
const app = express();
const PORT = 3000;

// In-memory database (persists while server runs)
let guests = [];

app.use(express.json());
app.use(express.static('.'));

// Get all guests
app.get('/api/guests', (req, res) => {
  res.json({ guests: guests });
});

// Add a guest
app.post('/api/guests', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Check if guest already exists (case-insensitive)
  const exists = guests.some(guest => 
    guest.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    return res.json({ exists: true });
  }

  // Add new guest
  guests.push(name);
  res.json({ exists: false, guests: guests });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
