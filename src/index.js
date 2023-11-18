import dotenv from 'dotenv'; // load environment variables from .env file
import express from 'express';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000; // default port is 3000

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello World'
    });
});

app.get('/hw', (req, res) => {
    return res.status(200).json({
        message: 'Hello World!!!!'
    });
});

app.get('/hello', (req, res) => {
    return res.status(200).json({
        message: 'Hello World!!! Im Shivang'
    });
});

app.get('/update', (req, res) => {
    return res.status(200).json({
        message: 'Hello World!!! Im Shivang! Im updating'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
