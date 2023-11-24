import dotenv from 'dotenv'; // load environment variables from .env file
import express from 'express';
import bodyParser from "body-parser";
import { createListing, deleteListing, newApplication, updateApplication, getApplications, getListing, updateListing, signUp, updatePswd, login } from './app.js';
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

app.get('/shwift/listing', getListing);

app.get('/shwift/application/:orgName', getApplications);

app.delete('/shwift/listing', deleteListing);

app.post('/shwift/application', newApplication);

app.patch('/shwift/application', updateApplication);

app.patch('/shwift/listing', updateListing);

app.post('/shwift/signUp', signUp);

app.patch('/shwift/updatePswd', updatePswd);

app.get('/shwift/login/:userName', login);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
