const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const connectDB = require('./db/connect');
require('dotenv').config();

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/message');

const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/images');
   },
   filename: (req, file, cb) => {
      console.log(req.body);
      cb(null, req.body.name);
   },
});
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
   try {
      return res.status(200).json('File uploaded successfully.');
   } catch (error) {
      console.log(error);
   }
});

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
   );
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

const port = process.env.PORT || 8800;

const start = async () => {
   try {
      await connectDB();
      app.listen(port, console.log(`Server is listening on port ${port}`));
   } catch (error) {
      console.log(error);
   }
};

start();
