const express = require('express');
const bodyParser = require('body-parser');

const upload = require('./multer');
const cloudinary = require('./cloudinary');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.use('/upload-files', upload.array('files'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'files')

    if (req.method === 'POST') {
        const urls = []
        const files = req.files

        for (const file of files) {
            const { path } = file;

            const newPath = await uploader(path);

            urls.push(newPath);

            // To delete file from server
            // fs.unlinkSync(path); 
        }

        res.status(200).json({
            message: 'Images uploaded Successfully',
            data: urls
        })
    } else {
        res.status(405).json({
            err: "Failed to upload image"
        })
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App started at port: http://localhost:5000/`);
});