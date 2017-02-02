const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + './../public'));

const PORT = 3000;




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
