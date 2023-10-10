import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log(`server is running at http://localhost:${port}`));
