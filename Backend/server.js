// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cluster = require("cluster");
// const os = require("os");
// require("dotenv").config();
// const logger = require("./middlewares/logger");
// const multer = require('multer');
// const path = require('path');


// const app = express();
// const numCPUs = os.cpus().length;

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());
// app.use(logger);

  
// const authRoutes = require("./routes/authroutes");
// app.use("/api/auth", authRoutes);

// // Cluster Implementation
// if (cluster.isPrimary) {
//     console.log(`Primary cluster running on process ${process.pid}`);
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on("exit", (worker) => {
//         console.log(`Worker ${worker.process.pid} died. Restarting...`);
//         cluster.fork();
//     });
// } else {
//     app.listen(process.env.PORT || 3000, () => {
//         console.log(`Server running on process ${process.pid} at http://localhost:${process.env.PORT || 3000}`);
//     });
// }



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os');
const multer = require('multer'); // Import multer for file handling
require('dotenv').config();
const logger = require('./middlewares/logger');

const app = express();
const numCPUs = os.cpus().length;

// Configure multer storage and file upload settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify the folder where the file should be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
  }
});

const upload = multer({ storage: storage }); // Initialize multer with storage configuration

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Routes
const authRoutes = require('./routes/authroutes');
app.use('/api/auth', authRoutes);

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  // 'file' is the name of the input field in the form
  console.log('jjbsfdkkjasndjan');
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }
  
  // Send the file path or any other info to the client
  res.status(200).send({ filePath: `./uploads/${req.file.filename}` });
});

// Cluster Implementation
if (cluster.isPrimary) {
  console.log(`Primary cluster running on process ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on process ${process.pid} at http://localhost:${process.env.PORT || 3000}`);
  });
}
