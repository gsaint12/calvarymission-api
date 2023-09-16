const express = require('express');  // here we import our express framework
const app = express();

const db = require('./models'); // new require for db object

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

app.get('/api/contacts', (req, res) => {
    return db.Contact.findAll()
      .then((contacts) => res.json(contacts))
      .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
        return res.send(err)
      });
  });  

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });