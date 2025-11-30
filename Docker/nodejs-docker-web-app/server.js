import express from "express" ; 

const PORT = process.env.PORT || 8080 ; 
const app = express() ; 

app.get("/", (req, res) => {
    res.json({
        message: "app is running on docker container 3"
    })
})

app.listen(PORT, ()=> {
    console.log(`App running on: http://localhost:${PORT}`)
})