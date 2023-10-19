const {firebasedb, firebasedbbucket}= require('./config/firebaseConnection');  // reference to our db 
require('firebase/storage'); 
const { v4: uuidv4 } = require('uuid')
const { ref, uploadBytesResumable, getDownloadURL, getStorage, listAll, deleteObject } = require("firebase/storage");

// const bucket = firebasedb.storage().bucket();
// bucket.upload('C:/Projects/SKPManagementAppPrototype/skp-management-backend-prototype/Screenshot_BuktiHadir_TalkshowASK-FK5.png', {
//     metadata: {
//         metadata: {firebaseStorageDownloadTokens: uuidv4()}
//     }
// }).then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })

const bucket = firebasedbbucket.storage().bucket();

const storeImage = async (req, res, next) => {
    try {
        const firebasedbstorage = getStorage(firebasedb);
        const timestamp = Date.now();
        const name = req.file.originalname.split(".")[0];
        const type = req.file.originalname.split(".")[1];
        const fileName = `${req.body.folder}/${name}_${timestamp}.${type}`;
        const reference = await ref(firebasedbstorage, fileName);
        const file = req.file;
        const metatype = { contentType: file.mimetype, name: fileName };
        const uploadTask = await uploadBytesResumable(reference, file.buffer, metatype);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        req.downloadURL=downloadURL;
        console.log(downloadURL)
        next();
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image.');
    }
}

const getImage = async (req, res, next) => {
    try {
        const folder = req.query.folder ? req.query.folder : '/'; ;
        const firebasedbstorage = getStorage(firebasedb);
        const imageref = await ref(firebasedbstorage, folder);
        const files = await listAll(imageref);
        if (files.items[0]==undefined) {
            req.fileName=imageref._location.path_;
            req.image=await getDownloadURL(imageref);
            next();
        } else {
            const imageName = await Promise.all(files.items.map((file)=>{
                return file._location.path_;
            }));
            const imageURL = await Promise.all(files.items.map(async(file)=>{
                return await getDownloadURL(file);
            }));
            req.fileName=imageName;
            req.image=imageURL;
            next();
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Error fetching images.');
    }
}

const deleteImage = async (req, res, next) => {
    try {
        const file = req.query.file;
        const firebasedbstorage = getStorage(firebasedb);
        if(file){
            const imageref = await ref(firebasedbstorage, file);
            deleteObject(imageref).then((result) => {
                req.result=result;
                next();
            }).catch((error) => {
                console.error('Error deleting images:', error);
                res.status(500).send('Error deleting images.');
            });
        } else {
            console.log("no params for delete");
            next();
        }
    } catch (error) {
        console.error('Error deleting images:', error);
        res.status(500).send('Error deleting images.');
    }
}


module.exports = {
    storeImage,
    getImage,
    deleteImage,
    bucket
}
