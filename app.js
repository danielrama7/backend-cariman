const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use('/api', routes);

app.listen(5000, () => {
    console.log(`Listening to port 5000`);
});