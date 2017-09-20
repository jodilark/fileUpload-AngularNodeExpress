const express = require('express'), bodyParser = require('body-parser'), multer = require('multer'), app = express(), port = 3005, uploadPath = './uploads/', urlPath = 'http://localhost'
var url = ''

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", urlPath);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('./'))
app.use(bodyParser.json())
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        var datetimestamp = Date.now()
        var uploadedFileName = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
        cb(null, uploadedFileName, getFilename(uploadedFileName))
    }
})
const getFilename = (name) => {
    let splitPath = uploadPath.split('')
    splitPath.shift()
    let path = splitPath.join('')
    url = `${urlPath}:${port}${path}${name}`
}

var upload = multer({
    storage: storage
}).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, function(err){
        if(err){
            res.json({error_code:1, err_desc:err})
            return
        }
        res.json({error_code:0, err_desc:null, url:url})
    })
})

app.post('/api/items', (req, res) => {
    console.log(req.body)
    res.status(200).send({message:'got the object, good job!!!', url:req.body.url})
})

app.listen(port, _ => console.log(`listening on port ${port}`))