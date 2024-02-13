const express = require('express');
const app = express();
const port = 3000; 

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// run "node server" in terminal