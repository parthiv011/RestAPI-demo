import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.listen(port, () => {
    console.log(`Server is listening on : http://localhost:${port}`);
});