import dotenv from 'dotenv'; // load environment variables from .env file
import express from 'express';
import bodyParser from "body-parser";
import { createListing } from './app.js';
dotenv.config();
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const port = process.env.PORT || 3000; // default port is 3000

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Shwift API endpoint'
    });
});

app.post('/shwift/listing', createListing);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
