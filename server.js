const express = require('express');  // here we import our express framework
const app = require('./app');
const port = 8080;

//start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });