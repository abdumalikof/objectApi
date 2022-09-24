const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')



app.use(express.urlencoded({ express: true }))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello world")
})
app.post("/add", async (req, res) => {

    fs.readFile(path.join("./db.json"), 'utf8', (err, data) => {
        if (err) {
            return res.send(err)
        }
        else {
            const content = JSON.parse(data)
            content.push(req.body)
            fs.writeFile(path.join("./db.json"), JSON.stringify(content), 'utf-8', (err) => {

                if (!err) res.send("User created")
                else res.send(err)  
            })
        }
    })
})






const port = 5000
app.listen(port, () => {
    console.log("server working on port", port)
})