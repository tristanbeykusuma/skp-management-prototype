const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { storeImage, getImage, deleteImage, bucket } = require('./upload')
const firebasedb = require('./config/firebaseConnection');

router.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
})
  
router.post('/upload', upload.single('image'), storeImage, async(req, res)=>{
    try {
        res.status(201);
        res.send(req.downloadURL);
      } catch (error) {
        res.status(500);
        res.json({ status: "error", message: error });
      }
})

router.get('/images', getImage, async (req, res) => {
    try {
        res.status(201);
        res.json({  
            fileName:req.fileName,
            image:req.image
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Error fetching images.');
    }
});

router.delete('/images', deleteImage, async (req, res) => {
    try {
        res.status(201);
        res.json({ message: "you deleted it", result: req.result });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Error fetching images.');
    }
});

module.exports = router;