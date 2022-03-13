import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Hello world! ** Server version **</h1>")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`)
})