const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

// Sử dụng bodyParser để xử lý dữ liệu từ form HTML dưới dạng URL encoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// MySQL

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))