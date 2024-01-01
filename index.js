const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router/router')
const db = require('./config/db')
const port = 3000








app.use(cors());
app.use(express.urlencoded({ extended: true }));







app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`, `http://localhost:${port}`))