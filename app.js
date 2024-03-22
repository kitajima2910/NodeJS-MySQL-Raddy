const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

// Sử dụng bodyParser để xử lý dữ liệu từ form HTML dưới dạng URL encoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// MySQL
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_beers'
})

// Get all bears
app.get('', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) {
            throw err
        }

        console.log(`Connected as id ${connection.threadId}`);

        connection.query('select * from beers', (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })

    })

})

// Get a bear by ID
app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) {
            throw err
        }

        console.log(`Connected as id ${connection.threadId}`);

        connection.query('select * from beers where id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })

    })

})

// Delete a records / beer
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) {
            throw err
        }

        console.log(`Connected as id ${connection.threadId}`);

        connection.query('delete from beers where id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`Bear with the Record ID: ${req.params.id} has been removed.`)
            } else {
                console.log(err);
            }
        })

    })

})

// Add a record / beer
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) {
            throw err
        }

        console.log(`Connected as id ${connection.threadId}`);

        const params = req.body

        connection.query('insert into beers set ?', params, (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`Bear with the Record ID: ${params.name} has been added.`)
            } else {
                console.log(err);
            }
        })

        console.log(req.body);

    })

})

// Update a record / beer
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) {
            throw err
        }

        console.log(`Connected as id ${connection.threadId}`);

        const { id, name, tagline, description, image } = req.body

        connection.query('update beers set name = ?, tagline = ?, description = ?, image = ? where id = ?', [name, tagline, description, image, id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`Bear with the Record ID: ${name} has been updated.`)
            } else {
                console.log(err);
            }
        })

        console.log(req.body);

    })

})

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))