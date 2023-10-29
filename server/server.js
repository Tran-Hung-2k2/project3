const express = require('express');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));
