const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const shortUrl = require('node-url-shortener');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    if (req.method === "OPTIONS") {
        req.header('Access-Control-Allow-Method', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()

})

app.get("/", (req, res, next) => {

})

app.post("/", (req, res, next) => {
    let URL = req.body.URL
    shortUrl.short(URL, (err, url) => {
        res.status(200).json({
            URL: url
        })
    })
})

app.listen(5000 || process.env.PORT, () => {
    console.log("Server has been started...")
})