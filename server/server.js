const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server was started on ${port}`));
