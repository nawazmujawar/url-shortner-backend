require('dotenv').config()
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
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message,
    });
});

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