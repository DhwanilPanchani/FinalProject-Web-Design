require('dotenv').config();
const express = require('express');
const mongoose = require('./database/connection');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.use('/user', authRoutes);

app.listen(3001, () => {
    console.log('Server started running on port 3001');
});