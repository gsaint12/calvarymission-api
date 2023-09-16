const express = require('express');  // here we import our express framework
const app = express();

const port = 8080;

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res)=>{
    res.json({message: "it's working"})
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });