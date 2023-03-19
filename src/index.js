const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const validateToken = require('./utils/validateToken');
const routes = require('./routes/api.routes')
const config = require('./config');
const app = express();

app.use(validateToken);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(`${config.apiUrl}`, routes);

app.listen(3000, () => console.log("App running on port 3000"));
