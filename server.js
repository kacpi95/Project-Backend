const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.set('trust proxy', 1);
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      touchAfter: 24 * 3600,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use('/api/ads', adsRoutes);
app.use('/auth', authRoutes);

// app.use(express.static(path.join(__dirname, '/client/build')));
app.use(
  '/uploads',
  express.static(path.join(__dirname, '/client/public/uploads'))
);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });

app.use((req, res) => {
  res.status(404).json({ message: '404 not found...' });
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
