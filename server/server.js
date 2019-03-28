const express = require('express');

const app = express();

const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});